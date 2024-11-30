import React, { useState, useEffect } from "react";
import AppointmentModal from "./AppointModal";
import axios from "axios";
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

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("Completed");
  const [showPopup1, setShowPopup1] = useState(null);
  const [showDeletePopup1, setShowDeletePopup1] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const token = localStorage.getItem("token");
  const [hcmList, setHcmList] = useState([]);
  const [allTenants, setAllTenants] = useState([]);
  const [filters, setFilters] = useState({
    tenantId: "",
    hcmId: "",
    startDate: "",
    endDate: "",
    status: "",
  });
  // Fetch appointments data on component mount
  const fetchAppointments = async () => {
    try {
      const response = await axios.post(
        "https://careautomate-backend.vercel.app/tenant/get-appointments",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.appointments) {
        // Map API data to match the desired structure
        const mappedAppointments = response.data.appointments.map((apt) => ({
          id: apt._id,
          date: new Date(apt.date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          time: `${apt.startTime} – ${apt.endTime}`,
          location: apt.placeOfService || "N/A",
          from: apt.hcmDetails?.name || "Unknown",
          service: apt.serviceType || "Unknown",
          with: apt.tenantDetails?.name || "Unknown",
          status: apt.status.charAt(0).toUpperCase() + apt.status.slice(1),
        }));
        setAppointments(mappedAppointments);
      } else {
        console.error("Failed to fetch appointment data");
      }
    } catch (error) {
      console.error("Error fetching appointment data:", error);
    }
  };
  useEffect(() => {
    

    fetchAppointments();
  }, []);

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


  const handleInputChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters
  const applyFilters = async () => {
    console.log("Applying filters with the following criteria:", filters);
    try {
      const response = await axios.post(
        "https://careautomate-backend.vercel.app/appointment/filterAppointments",
        filters,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.visits) {
        
        setAppointments(); // Update the visit data with filtered results
      } else {
        setAppointments([]); // Clear the visit data if no results are found
      }
    } catch (error) {
      console.error("Error fetching data:", error.response || error);
    }
  };
  const handleFilterIconClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };
  const togglePopup1 = (id) => {
    setShowPopup1((prevId) => (prevId === id ? null : id));
  };

  const handleDeleteClick1 = (id) => {
    setShowDeletePopup1((prevId) => (prevId === id ? null : id));
  };

  return (
    <div style={{ width: '1000px', marginLeft: '250px', maxHeight: '200px' }}>
      <div style={{ width: '1000px' }}>
        {/* Fixed Header and Tabs */}
        <div className="p-4 shadow-sm w-1000px">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl font-bold">Appointments</h1>
            <div className="flex">
              <button
                className="px-4 py-2 rounded-full text-white bg-blue-500 mr-4"
                onClick={() => { setShowModal(true) }}
              >
                New Appointment
              </button>
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
          <div className="flex space-x-4 mt-4 rounded-2xl bg-gray-100 w-fit">
            {["Completed", "Pending", "Cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full font-medium ${activeTab === tab
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-500"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>


      {/* Dynamic Content */}
      {/* <h2 className="text-lg font-semibold mt-6">Today</h2> */}
      <div className="space-y-4 h-[200px]">
        {appointments
          .filter((appointment) => appointment.status === activeTab)
          .map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              togglePopup1={togglePopup1}
              handleDeleteClick1={handleDeleteClick1}
              showPopup1={showPopup1}
              showDeletePopup1={showDeletePopup1}
              setShowDeletePopup1={setShowDeletePopup1}
            />
          ))}


      </div>
      <AppointmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)} // Close the modal
        onAptCreated={fetchAppointments}
      />
    </div>
  );

}
const AppointmentCard = ({
  appointment,
  togglePopup1,
  handleDeleteClick1,
  showPopup1,
  showDeletePopup1,
  setShowDeletePopup1,
}) => {
  return (
    <div
      key={appointment.id}
      className="relative  flex  items-center justify-between bg-white px-4 mt-4 py-2  shadow-lg rounded-3xl max-w-4xl mx-auto space-y-4 lg:space-y-0"
    >
      {/* Date and Time */}
      <div className="flex items-center space-x-4">
        <div className="text-center">
          <div className="text-gray-500">
            {new Date(appointment.date).toLocaleDateString("en-US", { weekday: "short" })}
          </div>
          <div className="text-2xl font-semibold text-blue-500">
            {new Date(appointment.date).getDate()}
          </div>
        </div>
        <div>
          <p className="text-2xl text-blue-500">|</p>
        </div>
        <div className="w-[200px]">
          <div>
            <div className="text-gray-600">{appointment.service}</div>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center space-x-2 text-gray-600">
              <i className="fa-regular fa-clock"></i>
              <span className="text-blue-500">{appointment.time}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <img src="Place.png" alt="Place" className="w-4 h6" />
              <span className="text-blue-500">{appointment.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Person Information */}
      <div className="justify-between flex w-[50%]">
        <div className="flex items-center space-x-2 text-gray-600 w-1/2">
          <img src="Person.png" alt="Person" className="w-4 h-4" />
          <div className="text-blue-500 underline">{appointment.from}</div>
        </div>
        <div className=" content-center text-gray-600 mr-4">with</div>
        <div className="flex items-center space-x-2 text-gray-600 w-1/2">
          <img src="Person.png" alt="Person" className="w-4 h-4" />
          <div className="text-blue-500 underline">{appointment.with}</div>
        </div>

      </div>


      {/* Action Buttons */}
      <div className="flex items-center space-x-6">
        <button
          className="text-gray-600 w-5 h-5"
          onClick={() => togglePopup1(appointment.id)}
        >
          <img src="Edit.png" alt="Edit" />
        </button>
        <button
          className="text-gray-600 w-5 h-5"
          onClick={() => handleDeleteClick1(appointment.id)}
        >
          <img src="Delete.png" alt="Delete" />
        </button>
        {showDeletePopup1 === appointment.id && (
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="bg-white p-8 w-80 rounded shadow-lg">
              <p>Are you sure you want to delete this appointment?</p>
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => setShowDeletePopup1(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  onClick={() => setShowDeletePopup1(false)}
                >
                  Confirm
                </button>
              </div>
              <br />
              <div>
                <p>
                  <span className="text-blue-800">Note:</span>&nbsp;Respective HCM will be notified about this.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  );
}

export default Appointment;
