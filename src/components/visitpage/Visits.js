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
  const [searchText, setSearchText] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

  useEffect(() => {
    const fetchVisits = async () => {
      let url = 'https://careautomate-backend.vercel.app/visit/fetchVisits';
      let token = localStorage.getItem('token');
      try {
        const response = await axios.get(
          url,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.visits) {
          const mappedVisits = response.data.visits.map((visit) => ({
            title: visit.title,
            startDate: visit.dateOfService, // Adjusted field name
            endDate: visit.dateOfService,   // Assuming same day for start and end
            typeMethod: visit.methodOfVisit,
            hcm: visit.hcmDetails?.name || 'N/A',
            scheduledDate: visit.scheduledDate,
            dos: visit.dateOfService,
            duration: `${visit.startTime} - ${visit.endTime}`,
            details: visit.detailsOfVisit,
            signature: visit.signature,
            status: visit.status,
          }));
          setVisitData(mappedVisits);
        } else {
          console.error('Failed to fetch visit data');
        }
      } catch (error) {
        console.error('Error fetching visit data:', error);
      }
    };
    fetchVisits();
  }, []);

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

  const handleDeleteClick = (index) => {
    const updatedData = visitData.filter((_, i) => i !== index);
    setVisitData(updatedData);
  };

  const handleStatusUpdate = (index, status) => {
    const updatedData = [...visitData];
    updatedData[index].status = status;
    setVisitData(updatedData);
  };

  const handleFilterIconClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  return (
    <div className='w-[1000px] ml-[250px] mt-10'>
      {/* Header Section */}
      <div className=''>
        <div className="flex items-center justify-between" >
          <h1 className="text-3xl font-bold">Visits</h1>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outlined"
              color="primary"
              sx={{ marginRight: '10px', borderRadius: '20px' }}
              onClick={() => setOpenNewVisitPopup(true)}
            >
              + New Visit
            </Button>
            <Button variant="outlined" sx={{ borderRadius: '20px' }}>
              Export
            </Button>
            {/* Filter Icon and Dropdown */}
            <div>
              <IconButton onClick={handleFilterIconClick}>
                <FilterListIcon />
              </IconButton>
              <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterClose}>
                <Box sx={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <TextField
                    label="Start Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    sx={{ width: '250px' }}
                  />
                  <TextField
                    label="End Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    sx={{ width: '250px' }}
                  />
                  <Select
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                    displayEmpty
                    sx={{ width: '250px' }}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                  </Select>
                  <TextField
                    label="Search"
                    variant="outlined"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    sx={{ width: '250px' }}
                  />
                </Box>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      {/* Visit List */}
      <div className="flex flex-col w-full">
        {visitData.map((visit, index) => (
          <Box
            key={index}
            sx={{
              marginBottom: '20px',
              padding: '15px',
              borderRadius: '8px',
              backgroundColor:
                visit.status === 'Approved'
                  ? 'lightgreen'
                  : visit.status === 'Rejected'
                    ? 'lightcoral'
                    : 'lightblue',
            }}
          >
            {/* Title and Date/Duration Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{visit.title}</h3>
              {/* Date and Duration in a Single Row */}
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <span>
                  <strong>Date:</strong> {visit.startDate.split('T')[0]}
                </span>
                <span>
                  <strong>Time:</strong> {visit.duration}
                </span>
              </div>
            </div>

            {/* HCM and DOS Row */}
            <div className="flex gap-3" style={{ marginBottom: '10px' }}>
              <p>
                <strong>HCM:</strong> {visit.hcm}
              </p>
              <p>
                <strong>Method:</strong> {visit.typeMethod}
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
                {/* Conditional Rendering of Approve/Reject Buttons */}
                {visit.status === 'pending' && (
                  <div className="flex gap-4">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleStatusUpdate(index, 'Approved')}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleStatusUpdate(index, 'Rejected')}
                    >
                      Reject
                    </Button>
                  </div>
                )}
                {/* Display Status if not Pending */}
                {visit.status !== 'pending' && (
                  <span>
                    <strong>Status:</strong> {visit.status}
                  </span>
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
        onClose={() => {
          setOpenNewVisitPopup(false);
          setEditVisitIndex(null);
          setEditVisitData(null);
        }}
        editData={editVisitData}
        onSubmit={(updatedData) => {
          if (editVisitIndex !== null) {
            const updatedVisitData = [...visitData];
            updatedVisitData[editVisitIndex] = updatedData;
            setVisitData(updatedVisitData);
          } else {
            setVisitData([...visitData, updatedData]);
          }
          setOpenNewVisitPopup(false);
        }}
      />
    </div>
  );
};

export default VisitList;
