import React, { useState } from 'react';
import '../styles/ProfilePage.css';
import tenant from "../images/tenant.jpg";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { FaBars, FaCheck, FaDownload, FaFileAlt, FaMicrophone, FaTimes, FaUser, FaUserTie, FaCalendarAlt, FaEnvelope, FaUserEdit, FaWalking } from 'react-icons/fa';
import { Document, Page } from 'react-pdf';
import samplePDF from '../assets/sample_document.pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ProfilePage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const openDocument = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const sampleRecords = [
    {
      id: 1,
      name: 'Robert John',
      date: '08-09-2024, 2:00 PM',
      description: "We'll meet tomorrow, also bring some additional documents...",
    },
    {
      id: 2,
      name: 'Alice Smith',
      date: '08-09-2024, 3:00 PM',
      description: "Discussion about project updates. Make sure to prepare the latest stats.",
    },
    {
      id: 3,
      name: 'Mark Brown',
      date: '08-10-2024, 1:00 PM',
      description: "Review meeting for the last quarter's performance and next steps.",
    },
    {
      id: 4,
      name: 'Sarah',
      date: '08-11-2024, 4:00 PM',
      description: "Catch-up on the progress of ongoing tasks, please bring your reports.",
    },
    {
      id: 4,
      name: 'Saraheu',
      date: '08-11-2024, 4:00 PM',
      description: "Catch-up on the progress of ongoing tasks, please bring your reports.",
    }
  ];

  const togglePopup = (description) => {
    setSelectedDescription(description);
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className=" flex flex-col h-[80vh] gap-10  ">
      <div className="flex gap-6">
        {/* 70% Column */}
        <div className=" bg-white p-6 rounded-[20px] shadow-lg w-[56rem]">
          {/* Profile Header */}
          <div className="flex justify-between items-center mb-1 ">
            <div className='flex justify-center items-center gap-3'>
              <div className='bg-blue-600 w-3 rounded-[20px] h-10'></div>
              <h2 className="text-2xl font-semibold text-gray-800  ">Profile Details</h2>
            </div>

            <div className="flex space-x-4">
              <button className="  text-blue-500 py-2 px-4 rounded-[20px] border border-blue-500 border-2">Notes</button>
              <button className="  text-blue-500 py-2 px-4 rounded-[20px] border border-blue-500 border-2">Eligibility</button>
              <button className="  text-blue-500 py-2 px-4 rounded-[20px] border border-blue-500 border-2">This Year</button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-[20px] flex items-center">
                <FaDownload className="mr-2" /> Download Info
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex flex-row items-center justify-evenly p-1 gap-6">
            <div className='flex flex-col gap-10'>
              <div className="flex items-center gap-6">
                <img src={tenant} alt="John Doe" className="w-36 h-36 rounded-full object-cover" />
                <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
              </div>

              <div className="flex space-x-4 mt-4">
                <FaCalendarAlt className="text-2xl text-blue-500 cursor-pointer" title="Appointments" />
                <FaEnvelope className="text-2xl text-blue-500 cursor-pointer" title="Messages" />
                <FaWalking className="text-2xl text-blue-500 cursor-pointer" title="Visits" />
                <FaUserEdit className="text-2xl text-blue-500 cursor-pointer" title="Edit Profile" />
              </div>

              {/* Contact Info */}
              <div className="w-full space-y-4 text-gray-700">
                <div className="flex justify-between flex-col">
                  <p className='text-blue-500 text-xl'><strong>Phone Number:</strong></p>
                  <p className='text-xl font-semibold'>{user?.mobileNo}</p>
                </div>
                <div className="flex justify-between flex-col">
                  <p className='text-blue-500 text-xl'><strong>Email:</strong></p>
                  <p className='text-xl font-semibold'>{user?.email}</p>
                </div>
              </div>
            </div>
            {/* Documents */}
            <div className="mt-8 bg-gray-100 p-6 rounded-[20px] shadow-sm w-[23rem]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[20px] font-semibold text-blue-500">Documents</h2>
                <a href="/assign-hcm" className="text-blue-500 hover:underline">View More</a>
              </div>
              <p className=" text-sm text-blue-500">27 Oct 2024</p>
              <ul className="mt-4 space-y-2 doc-list">
                <li>
                  <button className="text-gray-500 hover:underline" onClick={openDocument}>tenant_krishna.pdf</button>
                  <ul className="pl-4 space-y-2 doc-list">
                    <li><button className="text-gray-500 hover:underline" onClick={openDocument}>tenant_street_group</button></li>
                    <li><button className="text-gray-500 hover:underline" onClick={openDocument}>tenant_krishna.pdf</button></li>
                    <li><button className="text-gray-500 hover:underline" onClick={openDocument}>tenant_krishna.pdf</button></li>
                    <li>
                      <button className="text-gray-500 hover:underline" onClick={openDocument}>tenant_krishna.pdf</button>
                      <ul className="pl-4 space-y-2">
                        <li><button className="text-gray-500 hover:underline" onClick={openDocument}>tenant_krishna.pdf</button></li>
                        <li><button className="text-gray-500 hover:underline" onClick={openDocument}>tenant_krishna.pdf</button></li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
              {openModal && (
                <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
                    <span className="text-gray-600 text-xl cursor-pointer absolute top-2 right-2" onClick={closeModal}>&times;</span>
                    <Document file={samplePDF}>
                      <Page pageNumber={1} />
                    </Document>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 30% Column */}
        <div className=" bg-white p-6 rounded-[20px] shadow-lg w-[19rem] " >
          {/* Assigned HCMs */}
          <div className="flex flex-col justify-between items-center mb-6">
            <div className='flex justify-center items-center gap-3'>
              <div className='bg-blue-600 w-3 rounded-[20px] h-10'></div>
              <h2 className="text-2xl font-semibold text-gray-800">Assigned HCMs</h2>
            </div>

            <a href="/assign-hcm" className="text-blue-500 hover:underline">View More</a>
          </div>

          <div className="space-y-4 flex flex-col justify-center items-center">
            {[...Array(4)].map((_, index) => (
              <div className="bg-blue-100 w-[15rem] flex items-center justify-between bg-gray-100 p-4 rounded-[20px] shadow-sm gap-3" key={index}>
                <FaUserTie className="text-2xl text-gray-700" />
                <p className="flex-1 text-blue-500">Robert John</p>
                <PhoneInTalkIcon className="text-xl text-gray-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Four columns layout */}
      <div className="w-full flex gap-1 gap-3  pb-10 ">
        {/* Appointments */}
        <div className='flex w-[36rem] bg-white p-4 shadow-lg rounded-[20px] gap-5'>
          <div className="w-[19rem]   p-1 ">
            <div className="flex gap-2 items-center  pb-3 ">
              <div className='bg-blue-600 w-3 rounded-[20px] h-10'></div>
              <h2 className="text-2xl font-semibold text-blue-500">Appointments</h2>

            </div>
            <div className='flex justify-between'>
              <span className=" text-gray-600 mb-4 text-md">Today</span>
              <a href="/appointments" className="text-blue-600 hover:underline text-md">View More</a>
            </div>

            <div className="space-y-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-700">8:00 AM - 10:00 AM</p>
                  </div>
                  <div className='hover:bg-green-100 p-3 rounded-[20px]'>
                    <div className="flex justify-between items-center mt-3 ">
                      <p className="text-blue-500">Robert John</p>
                      <div className="flex space-x-3 text-gray-500">
                        <FaMicrophone />
                        <FaUser />
                        <PhoneInTalkIcon />
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-600">Check for Housing</p>
                      <div className="flex space-x-2">
                        <div className="w-6 h-6 bg-green-200 flex items-center justify-center rounded-full">
                          <FaCheck className="text-green-600" />
                        </div>
                        <div className="w-6 h-6 bg-red-200 flex items-center justify-center rounded-full">
                          <FaTimes className="text-red-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className=" border-dotted border-2 border-blue-500"></div>
          {/* Visits */}
          <div className="w-[21rem] p-1  ">
            <div className="flex  gap-3 items-center pb-3 ">
              <div className='bg-blue-600 w-3 rounded-[20px] h-10'></div>
              <h2 className="text-2xl font-semibold text-blue-500">Visits</h2>

            </div>
            <div className='flex justify-between'>
              <span className="block text-gray-600  text-md">Today</span>
              <a href="/calendar" className="text-blue-600 hover:underline text-md">View More</a>
            </div>

            <div className="space-y-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className=" p-2 ">

                  <div className="flex justify-between items-center mt-3">
                    <p className="font-medium text-blue-500">Robert John</p>

                    <div className="flex space-x-3 text-gray-500">
                      <FaMicrophone />
                      <FaUser />
                      <FaFileAlt />
                      <FaBars />
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <p className="text-gray-800">8:00 AM - 10:00 AM</p>
                      <p className="text-sm text-gray-600">Lease Agreement</p>
                    </div>
                    <a href="/sign-send" className="text-blue-600 hover:underline text-[15px]">Sign & Send</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Communication */}
        <div className="w-[21rem] bg-white p-6 shadow-lg rounded-[20px]">
          <div className="flex   items-center  pb-1">
            <div className='flex justify-center items-center gap-2'>
              <div className='bg-blue-600 w-3 rounded-[20px] h-10'></div>
              <h2 className="text-2xl font-semibold text-blue-500">Communication</h2>
            </div>
          </div>
          <div className='flex justify-end p-2'>
            <a href="/messages" className="text-blue-600 hover:underline text-md">View More</a>
          </div>
          <div className="space-y-2">
            {sampleRecords.map((record) => (
              <div key={record.id} className=" bg-blue-50 px-6 p-2 rounded-[20px]">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-gray-800">{record.name}</p>
                  <span className="text-sm text-gray-500">{record.date}</span>
                </div>
                <p
                  className="text-gray-600 mt-2 cursor-pointer hover:text-blue-600"
                  onClick={() => togglePopup(record.description)}
                >
                  {record.description.length > 50
                    ? `${record.description.substring(0, 50)}...`
                    : record.description}
                </p>
              </div>
            ))}
          </div>
          {isPopupOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[25rem]">
                <h3 className="text-lg font-semibold mb-4">Details</h3>
                <p className="text-gray-700">{selectedDescription}</p>
                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={togglePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bills & Payments */}
        <div className="w-[18rem]  bg-white p-6 shadow-lg rounded-[20px]">
          <div className="flex justify-between items-center  pb-3 ">
            <div className='flex justify-center items-center gap-2'>
              <div className='bg-blue-600 w-3 rounded-[20px] h-10'></div>
              <h2 className="text-2xl font-semibold text-blue-500">Bills & Payments</h2>
            </div>
          </div>
          <div className='flex justify-end'>
            <a href="/BillingPayments" className="text-blue-600 hover:underline">View More</a>
          </div>
          <p className="text-blue-500 mb-4 text-xl font-bold">This Month</p>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-blue-500">Robert John</p>
                  <p className="text-green-600">$20</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">10:00 AM</p>
                <p>Hourly Pay</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;

