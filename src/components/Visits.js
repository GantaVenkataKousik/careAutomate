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

import React, { useState } from "react";

const appointmentsData = [
  {
    id: 1,
    date: "Wed 28",
    time: "11:15 – 12:15",
    location: "Office",
    with: "Robert John",
    status: "Waiting on Decision",
  },
  {
    id: 2,
    date: "Wed 28",
    time: "11:15 – 12:15",
    location: "Office",
    with: "Robert John",
    status: "Waiting on Decision",
  },
  {
    id: 3,
    date: "Wed 28",
    time: "11:15 – 12:15",
    location: "Office",
    with: "Robert John",
    status: "Waiting on Decision",
  },
  {
    id: 4,
    date: "Wed 28",
    time: "11:15 – 12:15",
    location: "Office",
    with: "Robert John",
    status: "Waiting on Decision",
  },

  {
    id: 1,
    date: "Wed 28",
    time: "11:15 – 12:15",
    location: "Office",
    with: "Robert John",
    status: "Pending",
  },
  {
    id: 2,
    date: "Wed 28",
    time: "11:15 – 12:15",
    location: "Office",
    with: "Robert John",
    status: "Pending",
  },
  {
    id: 3,
    date: "Wed 28",
    time: "11:15 – 12:15",
    location: "Office",
    with: "Robert John",
    status: "Pending",
  },
  {
    id: 4,
    date: "Wed 28",
    time: "11:15 – 12:15",
    location: "Office",
    with: "Robert John",
    status: "Pending",
  },

  {
    id: 1,
    date: "Wed 28",
    time: "11:15 – 12:15",
    location: "Office",
    with: "Robert John",
    status: "Cancelled",
  },
  {
    id: 2,
    date: "Wed 28",
    time: "11:15 – 12:15",
    location: "Office",
    with: "Robert John",
    status: "Cancelled",
  },
  {
    id: 3,
    date: "Wed 28",
    time: "11:15 – 12:15",
    location: "Office",
    with: "Robert John",
    status: "Cancelled",
  },
  {
    id: 4,
    date: "Wed 28",
    time: "11:15 – 12:15",
    location: "Office",
    with: "Robert John",
    status: "Cancelled",
  },
];

const Visits = () => {
  const [activeTab, setActiveTab] = useState("Waiting on Decision");
  const [showPopup1, setShowPopup1] = useState(null); // Track which popup to show
  const [showPopup2, setShowPopup2] = useState(null); // Track which popup to show
  const [showDeletePopup1, setShowDeletePopup1] = useState(false);
  
const [showDeletePopup2, setShowDeletePopup2] = useState(false);


  const togglePopup1 = (id) => {
    setShowPopup1((prevId) => (prevId === id ? null : id));
  };
  const togglePopup2 = (id) => {
    setShowPopup2((prevId) => (prevId === id ? null : id));
  };

  const handleDeleteClick1 = (id) => {
    setShowDeletePopup1((prevId) => (prevId === id ? null : id));
  };

  const handleDeleteClick2 = (id) => {
    setShowDeletePopup2((prevId) => (prevId === id ? null : id));
  };
  

  return (
    <div className="p-6 w-fit mr-24">
      {/* Tabs */}
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {/* Add spacing */}
      </div>
      <div className="flex flex-row justify-between">
      <h1 className="text-2xl font-bold mb-2">
        Visits
      </h1>
      <div>
       <button className="px-4 py-2 rounded-full text-white bg-blue-500 mr-14">
       <i class="fa-solid fa-sliders"></i>&nbsp;Filters
      </button></div>
      </div>
      <div className="flex space-x-4 mb-6 rounded-2xl bg-gray-100 w-fit">
        {["Waiting on Decision", "Pending", "Cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-medium ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Today Section */}
      <h2 className="text-lg font-semibold mb-4">Today</h2>
      <div className="space-y-4">
        {appointmentsData.map(
          (appointment) =>
            activeTab === appointment.status && (
              <div
                key={appointment.id}
                className="relative flex items-center justify-center space-x-36 bg-white p-4 shadow-lg rounded-3xl"
              >
                <div className="flex items-center space-x-4 ml-12">
                  <div className="text-center">
                    <div className="text-gray-500">Wed</div>
                    <div className="text-2xl font-semibold text-blue-500">
                      {appointment.date.split(" ")[1]}
                    </div>
                  </div>
                  <div>
                    <p className="text-4xl text-blue-500">|</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <i className="fa-regular fa-clock"></i>
                      <div className="text-blue-500">
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <div className="w-4 h-4"><img src="Place.png"/></div>
                      <div className="text-blue-500">
                        <span>{appointment.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                <div>with</div>
                </div>
                <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-gray-600">
                    <div className="w-4 h-4"><img src="Person.png"/></div>
                    <a href="#" className="text-blue-500 underline">
                      {appointment.with}
                    </a>
                  </div>
                  </div>
                <div className="flex items-center space-x-4">
                  
                  
                  <div className="flex items-center space-x-10 mr-12">
                    <button
                      className="text-gray-600 w-5 h-5"
                      onClick={() => togglePopup1(appointment.id)}
                    >
                      <img src="Edit.png"/> 
                    </button>
                    <button
                      className="text-gray-600 w-5 h-5"
                      onClick={() => handleDeleteClick1(appointment.id)} // Update this line
                    >
                   <img src="Delete.png"/> 
                    </button>
                      {showDeletePopup1 === appointment.id && (
                      <div className="fixed inset-0 flex items-center justify-center shadow-3xl z-20">
                          <div className="bg-white p-8 w-80 rounded shadow-lg">
                          <p>Are you sure you want to delete this appointment?</p>
                            <div className="mt-4 flex justify-center space-x-4">
                                          <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => {
            // Handle deletion logic here
            setShowDeletePopup1(false);
          }}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-green-500 rounded"
          onClick={() => setShowDeletePopup1(false)}
        >
          Confirm
        </button>
      </div>
      <br></br>
      <div><p><let className="text-blue-800">Note:</let>&nbsp;Respective HCM will be notified about this</p></div>
    </div>
  </div>
)}


                    {/* Popup */}
                    {showPopup1 === appointment.id && (
                      <div className="absolute top-full right-0 mt-2 w-48 p-4 bg-white border rounded shadow-lg z-10">
                        <button className="w-full py-2 px-4 mb-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded" onClick={() => setShowPopup1(false)}>
                        <i className="fa-regular fa-clock"></i>&nbsp;Reschedule Appointment
                        </button>
                        <button className="w-full py-2 px-4 text-left text-sm text-gray-700 hover:bg-gray-100 rounded" onClick={() => setShowPopup1(false)}>
                        <i class="fa-solid fa-paper-plane"></i>&nbsp;Rerequest Appointment
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
        )}
      </div>

      {/* Next Month Section */}
      <h2 className="text-lg font-semibold mt-8 mb-4">November</h2>
      <div className="space-y-4">
        {appointmentsData.map(
          (appointment) =>
            activeTab === appointment.status && (
              <div
                key={appointment.id}
                className="relative flex items-center justify-center space-x-36 bg-white p-4 shadow-lg rounded-3xl"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-gray-500">Wed</div>
                    <div className="text-2xl font-semibold text-blue-500">
                      {appointment.date.split(" ")[1]}
                    </div>
                  </div>
                  <div>
                    <p className="text-4xl text-blue-500">|</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-4 h-4"><img src="Clock.png"/></div>
                      <div className="text-blue-500">
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-4 h-4"><img src="Place.png"/></div>
                      <div className="text-blue-500">
                        <span>{appointment.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div>with</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-gray-600">
                    <div className="w-4 h-4"><img src="Person.png"/></div>
                    <a href="#" className="text-blue-500 underline">
                      {appointment.with}
                    </a>
                    </div>
                    </div>
                      <div className="flex items-center space-x-4">

                  <div className="flex items-center space-x-10 relative">
                    <button
                      className=" text-gray-600 w-5 h-5"
                      onClick={() => togglePopup2(appointment.id)}
              > 
                <img src="Edit.png"/> 
                    </button>
                    <button
  className=" text-gray-600 w-5 h-5"
  onClick={() => handleDeleteClick2(appointment.id)} // Update this line
>
<img src="Delete.png"/> 
</button>
{showDeletePopup2 === appointment.id && (
<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center shadow-3xl z-20">
    <div className="bg-white p-8 w-80 rounded shadow-lg">
      <p>Are you sure you want to delete this appointment?</p>
      <div className="mt-4 flex justify-center space-x-8">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => {
            // Handle deletion logic here
            setShowDeletePopup2(false);
          }}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-green-500 rounded"
          onClick={() => setShowDeletePopup2(false)}
        >
          Confirm
        </button>
      </div>
      <br></br>
      <div><p><let className="text-blue-800">Note:</let>&nbsp;Respective HCM will be notified about this</p></div>

    </div>
  </div>
)}


                    {/* Popup */}
                    {showPopup2 === appointment.id && (
                      <div className="absolute top-full right-0 mt-2 w-48 p-4 bg-white border rounded shadow-lg z-10">
                        <button className="w-full py-2 px-4 mb-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded" onClick={() => setShowPopup2(false)}>
                        <i className="fa-regular fa-clock"></i>&nbsp;Reschedule Appointment
                        </button>
                        <button className="w-full py-2 px-4 text-left text-sm text-gray-700 hover:bg-gray-100 rounded" onClick={() => setShowPopup2(false)}>
                        <i class="fa-solid fa-paper-plane"></i>&nbsp;Rerequest Appointment
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Visits;

