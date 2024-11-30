import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Menu,
  MenuItem,
  Select,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisitModal from './VisitModal'; // Ensure VisitModal is correctly implemented and imported
import axios from 'axios';
import { GrLocation } from 'react-icons/gr';

const VisitList = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterOption, setFilterOption] = useState('All');
  const [detailsPopup, setDetailsPopup] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [openNewVisitPopup, setOpenNewVisitPopup] = useState(false);
  const [visitData, setVisitData] = useState([]);

  const [editVisitIndex, setEditVisitIndex] = useState(null);
  const [editVisitData, setEditVisitData] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [allTenants, setAllTenants] = useState([]);
  const [hcmList, setHcmList] = useState([]);
  const [filters, setFilters] = useState({
    tenantId: "",
    hcmId: "",
    startDate: "",
    endDate: "",
    status: "",
  });
  const fetchVisits = async () => {
    let url = 'https://careautomate-backend.vercel.app/visit/fetchVisits';
    let token = localStorage.getItem('token');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.visits) {
        const mappedVisits = response.data.visits.map((visit) => ({
          _id: visit._id,
          title: visit.title,
          startDate: visit.dateOfService,
          endDate: visit.dateOfService,
          typeMethod: visit.methodOfVisit,
          hcm: visit.hcmId?.name || 'N/A',
          scheduledDate: visit.scheduledDate,
          dos: visit.dateOfService,
          duration: `${visit.startTime} - ${visit.endTime}`,
          details: visit.detailsOfVisit,
          signature: visit.signature,
          status: visit.status,
          serviceType: visit.serviceType,
          placeOfService: visit.placeOfService,
          approved: visit.approved,
          rejected: visit.rejected,
        }));
        setVisitData(mappedVisits);
      } else {
        console.error('Failed to fetch visit data');
      }
    } catch (error) {
      console.error('Error fetching visit data:', error);
    }
  };
  // Fetch all visits initially
  useEffect(() => {
    
    fetchVisits();
  }, []);

  // Handle filter changes
  const handleInputChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters
  const applyFilters = async () => {
    console.log("Applying filters with the following criteria:", filters);
    try {
      const response = await axios.post(
        "https://careautomate-backend.vercel.app/visit/filterVisits",
        filters,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.visits) {
        const mappedVisits = response.data.visits.map((visit) => ({
          _id: visit._id,
          title: visit.title,
          startDate: visit.dateOfService,
          endDate: visit.dateOfService,
          typeMethod: visit.methodOfVisit,
          hcm: visit.hcmId?.name || 'N/A',
          scheduledDate: visit.scheduledDate,
          dos: visit.dateOfService,
          duration: `${visit.startTime} - ${visit.endTime}`,
          details: visit.detailsOfVisit,
          signature: visit.signature,
          status: visit.status,
          serviceType: visit.serviceType,
          placeOfService: visit.placeOfService,
          approved: visit.approved,
          rejected: visit.rejected,
        }));
        setVisitData(mappedVisits); // Update the visit data with filtered results
      } else {
        console.error('Failed to fetch visit data');
        setVisitData([]); // Clear the visit data if no results are found
      }
    } catch (error) {
      console.error("Error fetching data:", error.response || error);
    }
  };

  const handleDetailsClick = (details) => {
    setDetailsPopup(details);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleEditClick = (index) => {
    setEditVisitIndex(index);
    setEditVisitData(visitData[index]);
    setOpenNewVisitPopup(true);
  };

  const handleFilterIconClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  // Fetch tenants for filter options
  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Authorization token is missing.');
          return;
        }

        const response = await fetch('https://careautomate-backend.vercel.app/tenant/all', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });

        const data = await response.json();

        if (response.status === 200 && data.success) {
          const tenantData = data.tenants.map((tenant) => ({
            id: tenant._id,
            name: tenant.name,
          }));
          setAllTenants(tenantData);
        } else {
          console.error('Failed to fetch tenants:', data.message);
        }
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };

    fetchTenants();
  }, []);

  // Fetch HCMs for filter options
  useEffect(() => {
    const fetchHcm = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Authorization token is missing.');
          return;
        }

        const response = await fetch('https://careautomate-backend.vercel.app/hcm/all', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });

        const data = await response.json();

        if (response.status === 200 && data.success) {
          const hcmData = data.hcms.map((hcm) => ({
            id: hcm._id,
            name: hcm.name,
          }));
          setHcmList(hcmData);
        } else {
          console.error('Failed to fetch HCMs:', data.message);
        }
      } catch (error) {
        console.error('Error fetching HCMs:', error);
      }
    };

    fetchHcm();
  }, []);

  const handleStatusUpdate = async (index, isApproved) => {
    // Code for updating status
  };

  const handleDeleteClick = async (index) => {
    // Code for deleting visits
  };

  return (
    <div className='w-[1100px] ml-[250px] mt-10' style={{ maxHeight: '700px', overflowY: 'auto' }}>
      {/* Header Section */}
      <div className=''>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Visits</h1>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: '10px', borderRadius: '20px' }}
              onClick={() => setOpenNewVisitPopup(true)}
            >
              + New Visit
            </Button>

            {/* Filter Icon and Dropdown */}
            <div>
              <IconButton onClick={handleFilterIconClick}>
                <FilterListIcon />
              </IconButton>
              <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={handleFilterClose}
              >
                <Box sx={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {/* HCM Dropdown */}
                  <Select
                    value={filters.hcmId}
                    onChange={(e) => handleInputChange('hcmId', e.target.value)}
                    displayEmpty
                    sx={{ width: '250px' }}
                  >
                    <MenuItem value="">Select HCM</MenuItem>
                    {hcmList.map((hcm) => (
                      <MenuItem key={hcm.id} value={hcm.id}>
                        {hcm.name}
                      </MenuItem>
                    ))}
                  </Select>

                  {/* Tenant Dropdown */}
                  <Select
                    value={filters.tenantId}
                    onChange={(e) => handleInputChange('tenantId', e.target.value)}
                    displayEmpty
                    sx={{ width: '250px' }}
                  >
                    <MenuItem value="">Select Tenant</MenuItem>
                    {allTenants.map((tenant) => (
                      <MenuItem key={tenant.id} value={tenant.id}>
                        {tenant.name}
                      </MenuItem>
                    ))}
                  </Select>

                  {/* Date Filters */}
                  <TextField
                    label="From Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={filters.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    sx={{ width: '250px' }}
                  />
                  <TextField
                    label="To Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={filters.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    sx={{ width: '250px' }}
                  />

                  {/* Status Dropdown */}
                  <Select
                    value={filters.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    displayEmpty
                    sx={{ width: '250px' }}
                  >
                    <MenuItem value="All">All Statuses</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>

                  {/* Apply Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      applyFilters();
                      setFilterAnchorEl(null);
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      {
        visitData.length === 0 && (
          <div className="flex justify-center items-center mt-10">
            <h1 className="text-2xl">No visits found</h1>
          </div>
        )
      }

      {/* Visit List */}
      <div className="flex flex-col w-full">
        {visitData.map((visit, index) => (
          <Box
            key={index}
            sx={{
              marginBottom: '20px',
              padding: '10px',
              borderRadius: '8px',
              backgroundColor:
                visit.approved && !visit.rejected
                  ? 'lightgreen'
                  : !visit.approved && visit.rejected
                    ? 'lightcoral'
                    : 'lightblue',
            }}
          >
            {/* Title and Date/Duration Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{visit?.serviceType ? visit.serviceType : "no service"}</h3>
            </div>

            {/* HCM and DOS Row */}
            <div className="flex gap-3" style={{ marginBottom: '10px' }}>
              <p>
                <strong>HCM:</strong> {visit.hcm}
              </p>
              <p>
                <strong>DOS:</strong> {visit.dos.split('T')[0]}
              </p>
              <p>
                <strong>Duration:</strong> {visit.duration}
              </p>
              <p style={{ display: 'flex' }}>
                <strong><GrLocation size={24} className="mr-2" /></strong> {visit.placeOfService}
              </p>
              <p>
                {visit.typeMethod}
              </p>
            </div>

            {/* Visit Details */}
            <p>
              <strong>Visit Details:</strong>{' '}
              {visit.details && visit.details.length > 100 ? (
                <>
                  {visit.details.substring(0, 100)}...
                  <Button onClick={() => handleDetailsClick(visit.details)}>View More</Button>
                </>
              ) : (
                visit.details || 'No details provided.'
              )}
            </p>

            {/* Signature and Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>
                <strong>Signature:</strong> {visit.signature || 'N/A'}
              </span>
              <div className="flex gap-10 mt-5">
                {!visit.approved && !visit.rejected && (
                  <div className="flex gap-4">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleStatusUpdate(index, true)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleStatusUpdate(index, false)}
                    >
                      Reject
                    </Button>
                  </div>
                )}

                {/* Edit and Delete Icons */}
                <div>
                  <IconButton onClick={() => handleEditClick(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(index)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </Box>
        ))}
      </div>

      {/* Popup for Details */}
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>Visit Details</DialogTitle>
        <DialogContent>
          <p>{detailsPopup}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Visit Modal */}
      <VisitModal
        isOpen={openNewVisitPopup}
        onClose={() => setOpenNewVisitPopup(false)}
        onVisitCreated={fetchVisits}
      />
    </div>
  );
};

export default VisitList;
