// import React, { useState } from "react";

// const appointmentsData = [
//   {
//     id: 1,
//     date: "Wed 28",
//     time: "11:15 – 12:15",
//     location: "Office",
//     with: "Robert John",
//     status: "Upcoming",
//   },
//   {
//     id: 2,
//     date: "Wed 28",
//     time: "11:15 – 12:15",
//     location: "Office",
//     with: "Robert John",
//     status: "Upcoming",
//   },
//   {
//     id: 3,
//     date: "Wed 28",
//     time: "11:15 – 12:15",
//     location: "Office",
//     with: "Robert John",
//     status: "Upcoming",
//   },
//   {
//     id: 4,
//     date: "Wed 28",
//     time: "11:15 – 12:15",
//     location: "Office",
//     with: "Robert John",
//     status: "Upcoming",
//   },
// ];

// const Visits = () => {
//   const [activeTab, setActiveTab] = useState("Upcoming");
//   const [showPopup1, setShowPopup1] = useState(null); // Track which popup to show
//   const [showPopup2, setShowPopup2] = useState(null); // Track which popup to show
//   const [showDeletePopup1, setShowDeletePopup1] = useState(false);

// const [showDeletePopup2, setShowDeletePopup2] = useState(false);


//   const togglePopup1 = (id) => {
//     setShowPopup1((prevId) => (prevId === id ? null : id));
//   };
//   const togglePopup2 = (id) => {
//     setShowPopup2((prevId) => (prevId === id ? null : id));
//   };

//   const handleDeleteClick1 = (id) => {
//     setShowDeletePopup1((prevId) => (prevId === id ? null : id));
//   };

//   const handleDeleteClick2 = (id) => {
//     setShowDeletePopup2((prevId) => (prevId === id ? null : id));
//   };


//   return (
//     <div className="p-6 w-[1200px]">
//       {/* Tabs */}
//       <div>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         {/* Add spacing */}
//       </div>
//       <div className="flex flex-row justify-between">
//       <h1 className="text-2xl font-bold">
//         Visits
//       </h1>
//       <div>
//       <button className="px-4 py-2 rounded-full text-white bg-blue-500 mr-14">
//       <i class="fa-solid fa-sliders"></i>&nbsp;Filters
//       </button></div>
//       </div>

//       <div className="flex space-x-4 mb-6">
//         {["Upcoming", "Pending", "Cancelled"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 rounded-full font-medium ${
//               activeTab === tab
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-100 text-gray-500"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Today Section */}
//       <h2 className="text-lg font-semibold mb-4">Today</h2>
//       <div className="space-y-4">
//         {appointmentsData.map(
//           (appointment) =>
//             activeTab === appointment.status && (
//               <div
//                 key={appointment.id}
//                 className="relative flex items-center justify-center space-x-48 bg-white p-4 shadow rounded-lg"
//               >
//                 <div className="flex items-center space-x-4">
//                   <div className="text-center">
//                     <div className="text-gray-500">Wed</div>
//                     <div className="text-2xl font-semibold text-blue-500">
//                       {appointment.date.split(" ")[1]}
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-4xl text-blue-500">|</p>
//                   </div>
//                   <div>
//                     <div className="flex items-center space-x-2 text-gray-600">
//                       <i className="fa-regular fa-clock"></i>
//                       <div className="text-blue-500">
//                         <span>{appointment.time}</span>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2 text-gray-600">
//                       <i className="fa-solid fa-location-dot"></i>
//                       <div className="text-blue-500">
//                         <span>{appointment.location}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                 <div>with</div>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                 <div className="flex items-center space-x-1 text-gray-600">
//                     <i className="fa-solid fa-user"></i>
//                     <a href="#" className="text-blue-500 underline">
//                       {appointment.with}
//                     </a>
//                   </div>
//                   </div>
//                 <div className="flex items-center space-x-4">


//                   <div className="flex items-center space-x-10 relative">
//                     <button
//                       className="text-gray-600"
//                       onClick={() => togglePopup1(appointment.id)}
//                     >
//                       <i className="fa-regular fa-pen-to-square"></i>
//                     </button>
//                     <button
//                       className="text-gray-600"
//                       onClick={() => handleDeleteClick1(appointment.id)} // Update this line
//                     >
//                     <i className="fa-regular fa-trash-can"></i>
//                     </button>
//                       {showDeletePopup1 === appointment.id && (
//                       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-20">
//                           <div className="bg-white p-8 w-80 rounded shadow-lg">
//                           <p>Are you sure you want to delete this appointment?</p>
//                             <div className="mt-4 flex justify-center space-x-4">
//                                           <button
//           className="px-4 py-2 bg-red-500 text-white rounded"
//           onClick={() => {
//             // Handle deletion logic here
//             setShowDeletePopup1(false);
//           }}
//         >
//           Cancel
//         </button>
//         <button
//           className="px-4 py-2 bg-green-500 rounded"
//           onClick={() => setShowDeletePopup1(false)}
//         >
//           Confirm
//         </button>
//       </div>
//       <br></br>
//       <div><p><let className="text-blue-800">Note:</let>&nbsp;Respective HCM will be notified about this</p></div>
//     </div>
//   </div>
// )}


//                     {/* Popup */}
//                     {showPopup1 === appointment.id && (
//                       <div className="absolute top-full right-0 mt-2 w-48 p-4 bg-white border rounded shadow-lg z-10">
//                         <button className="w-full py-2 px-4 mb-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded" onClick={() => setShowPopup1(false)}>
//                         <i className="fa-regular fa-clock"></i>&nbsp;Reschedule Appointment
//                         </button>
//                         <button className="w-full py-2 px-4 text-left text-sm text-gray-700 hover:bg-gray-100 rounded" onClick={() => setShowPopup1(false)}>
//                         <i class="fa-solid fa-paper-plane"></i>&nbsp;Rerequest Appointment
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )
//         )}
//       </div>

//       {/* Next Month Section */}
//       <h2 className="text-lg font-semibold mt-8 mb-4">November</h2>
//       <div className="space-y-4">
//         {appointmentsData.map(
//           (appointment) =>
//             activeTab === appointment.status && (
//               <div
//                 key={appointment.id}
//                 className="relative flex items-center justify-center space-x-48 bg-white p-4 shadow rounded-lg"
//               >
//                 <div className="flex items-center space-x-4">
//                   <div className="text-center">
//                     <div className="text-gray-500">Wed</div>
//                     <div className="text-2xl font-semibold text-blue-500">
//                       {appointment.date.split(" ")[1]}
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-4xl text-blue-500">|</p>
//                   </div>
//                   <div>
//                     <div className="flex items-center space-x-2 text-gray-600">
//                       <i className="fa-regular fa-clock"></i>
//                       <div className="text-blue-500">
//                         <span>{appointment.time}</span>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2 text-gray-600">
//                       <i className="fa-solid fa-location-dot"></i>
//                       <div className="text-blue-500">
//                         <span>{appointment.location}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <div>with</div>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <div className="flex items-center space-x-1 text-gray-600">
//                     <i className="fa-solid fa-user"></i>
//                     <a href="#" className="text-blue-500 underline">
//                       {appointment.with}
//                     </a>
//                     </div>
//                     </div>
//                       <div className="flex items-center space-x-4">

//                   <div className="flex items-center space-x-10 relative">
//                     <button
//                       className="text-gray-600"
//                       onClick={() => togglePopup2(appointment.id)}
//                     >
//                       <i className="fa-regular fa-pen-to-square"></i>
//                     </button>
//                     <button
//   className="text-gray-600"
//   onClick={() => handleDeleteClick2(appointment.id)} // Update this line
// >
//   <i className="fa-regular fa-trash-can"></i>
// </button>
// {showDeletePopup2 === appointment.id && (
// <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-20">
//     <div className="bg-white p-8 w-80 rounded shadow-lg">
//       <p>Are you sure you want to delete this appointment?</p>
//       <div className="mt-4 flex justify-center space-x-8">
//         <button
//           className="px-4 py-2 bg-red-500 text-white rounded"
//           onClick={() => {
//             // Handle deletion logic here
//             setShowDeletePopup2(false);
//           }}
//         >
//           Cancel
//         </button>
//         <button
//           className="px-4 py-2 bg-green-500 rounded"
//           onClick={() => setShowDeletePopup2(false)}
//         >
//           Confirm
//         </button>
//       </div>
//       <br></br>
//       <div><p><let className="text-blue-800">Note:</let>&nbsp;Respective HCM will be notified about this</p></div>

//     </div>
//   </div>
// )}


//                     {/* Popup */}
//                     {showPopup2 === appointment.id && (
//                       <div className="absolute top-full right-0 mt-2 w-48 p-4 bg-white border rounded shadow-lg z-10">
//                         <button className="w-full py-2 px-4 mb-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded" onClick={() => setShowPopup2(false)}>
//                         <i className="fa-regular fa-clock"></i>&nbsp;Reschedule Appointment
//                         </button>
//                         <button className="w-full py-2 px-4 text-left text-sm text-gray-700 hover:bg-gray-100 rounded" onClick={() => setShowPopup2(false)}>
//                         <i class="fa-solid fa-paper-plane"></i>&nbsp;Rerequest Appointment
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )
//         )}
//       </div>
//     </div>
//   );
// };

// export default Visits;

import React, { useState } from 'react';
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

const VisitList = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterOption, setFilterOption] = useState('All');
  const [detailsPopup, setDetailsPopup] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [openNewVisitPopup, setOpenNewVisitPopup] = useState(false);
  const [visitData, setVisitData] = useState([
    {
      title: 'Client Meeting',
      startDate: '2024-11-01',
      endDate: '2024-11-01',
      typeMethod: 'Online',
      hcm: 'John Doe',
      scheduledDate: '2024-11-01 10:00 AM',
      dos: '2024-11-01',
      duration: '2 hours',
      details: 'Discussed project requirements and timelines.',
      signature: 'John Doe',
      status: 'Pending',
    },
    {
      title: 'Site Visit',
      startDate: '2024-11-02',
      endDate: '2024-11-02',
      typeMethod: 'In-Person',
      hcm: 'Jane Smith',
      scheduledDate: '2024-11-02 11:00 AM',
      dos: '2024-11-02',
      duration: '3 hours',
      details: 'Inspected site for construction progress and issues.',
      signature: '',
      status: 'Approved',
    },
  ]);

  const [editVisitIndex, setEditVisitIndex] = useState(null);
  const [editVisitData, setEditVisitData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

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
    <div className="visit-list-container">
      {/* Header Section */}
      <div className="top-actions flex items-center justify-between" style={{ marginBottom: '20px' }}>
        <h1 className="text-3xl font-bold">Visits</h1>
        <div className='flex items-center justify-center gap-2'>
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
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
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

      

      {/* Visit List */}
      <div className="flex flex-col w-[60rem]">
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>{visit.title}</h3>
              <span>
                {visit.startDate} - {visit.endDate}
              </span>
            </div>
            <div className="flex gap-3" style={{ marginBottom: '10px' }}>
              <p>
                <strong>HCM:</strong> {visit.hcm}
              </p>
              <p>
                <strong>DOS:</strong> {visit.dos}
              </p>
              <p>
                <strong>Duration:</strong> {visit.duration}
              </p>
            </div>
            <p>
              <strong>Visit Details:</strong>{' '}
              {visit.details.length > 100 ? (
                <>
                  {visit.details.substring(0, 100)}...
                  <Button onClick={() => handleDetailsClick(visit.details)}>View More</Button>
                </>
              ) : (
                visit.details
              )}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Signature: {visit.signature || 'N/A'}</span>
              <div className="flex gap-10 mt-5">
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
