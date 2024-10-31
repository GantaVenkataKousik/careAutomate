// // import React, { useState } from "react";

// // const Communication = () => {
// //   const [messages, setMessages] = useState([
// //     {
// //       sender: "Ankith tiwari",
// //       message: "Hlo Doctor, Is that surgery can be done some what earlier",
// //       time: "11:24am",
// //     },
// //     {
// //       sender: "Yaa Ankith",
// //       message: "that was so necessary",
// //       time: "11:28am",
// //     },
// //     {
// //       sender: "Sure Doctor",
// //       message: "",
// //       time: "11:29am",
// //     },
// //     {
// //       sender: "",
// //       message: "And one thing you need to maintain a diet, so that surgery can be done smoothly",
// //       time: "11:31am",
// //     },
// //     {
// //       sender: "Sure Doctor",
// //       message: "Can I get the prescription from the nurse?",
// //       time: "11:34am",
// //     },
// //     {
// //       sender: "",
// //       message: "Yes. I'll inform her.",
// //       time: "11:31am",
// //     },
// //   ]);
// //   const [newMessage, setNewMessage] = useState("");

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (newMessage.trim() !== "") {
// //       setMessages([
// //         ...messages,
// //         { sender: "Ankith tiwari", message: newMessage, time: "11:31am" },
// //       ]);
// //       setNewMessage("");
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-2xl font-bold mb-4">Communication</h1>
// //       <div className="flex justify-between items-center mb-4">
// //         <input
// //           type="text"
// //           className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           placeholder="Search"
// //         />
// //         <svg
// //           xmlns="http://www.w3.org/2000/svg"
// //           className="h-6 w-6"
// //  fill="none"
// //           viewBox="0 0 24 24"
// //           stroke="currentColor"
// //         >
// //           <path
// //             strokeLinecap="round"
// //             strokeLinejoin="round"
// //             strokeWidth={2}
// //             d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
// //           />
// //         </svg>
// //       </div>
// //       <div className="flex flex-col">
// //         {messages.map((message, index) => (
// //           <div
// //             key={index}
// //             className={`flex ${
// //               message.sender === "Ankith tiwari" ? "justify-end" : "justify-start"
// //             } mb-4`}
// //           >
// //             <div
// //               className={`bg-${
// //                 message.sender === "Ankith tiwari" ? "blue-500" : "gray-500"
// //               } p-2 rounded-md`}
// //             >
// //               <p className="text-sm">{message.message}</p>
// //               <p className="text-xs text-gray-500">{message.time}</p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
// //           value={newMessage}
// //           onChange={(e) => setNewMessage(e.target.value)}
// //           placeholder="Type a message..."
// //         />
// //         <button
// //           type="submit"
// //           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
// //         >
// //           Send
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Communication;

// import React from 'react';

// const messages = [
//   { sender: 'Ankith tiwari', time: '11:24am', text: 'Hlo Doctor, Is that surgery can be done somewhat earlier', isUser: false },
//   { sender: 'Doctor', time: '11:28am', text: 'Yaa Ankith, that was so necessary', isUser: true },
//   { sender: 'Ankith tiwari', time: '11:29am', text: 'Sure Doctor.', isUser: false },
//   { sender: 'Doctor', time: '11:31am', text: 'And one thing you need to maintain a diet, so that surgery can be done smoothly', isUser: true },
//   { sender: 'Ankith tiwari', time: '11:34am', text: 'Sure Doctor. Can I get the prescription from the nurse?', isUser: false },
//   { sender: 'Doctor', time: '11:36am', text: 'Yes. I’ll inform her.', isUser: true },
// ];

// export default function Communication() {
//   return (
//     <div className="flex  p-4">
//       {/* Left Sidebar */}
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <div className="w-1/3 bg-white rounded-xl shadow-md p-4">
//         <div className="flex items-center justify-between mb-4">
//           <input
//             type="text"
//             placeholder="Search"
//             className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
//           />
//           <button className="ml-2 p-2 rounded-lg bg-gray-200 hover:bg-gray-300">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 text-gray-600"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* List of messages */}
//         <div className="space-y-2 overflow-y-auto h-[80vh]">
//           {Array(8)
//             .fill('')
//             .map((_, idx) => (
//               <div
//                 key={idx}
//                 className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
//               >
//                 <div className="flex items-center space-x-3">
//                   <img
//                     src="https://via.placeholder.com/40"
//                     alt="profile"
//                     className="w-10 h-10 rounded-full"
//                   />
//                   <div>
//                     <p className="font-medium text-gray-800">Ankith tiwari</p>
//                     <p className="text-sm text-gray-500 truncate">
//                       I would like to have the treatment...
//                     </p>
//                   </div>
//                 </div>
//                 <span className="text-xs text-gray-500">11:23am</span>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* Right Chat Area */}
//       <div className="flex-1 bg-white ml-4 rounded-xl shadow-md flex flex-col">
//         {/* Header */}
//         <div className="flex items-center p-4 border-b">
//           <img
//             src="https://via.placeholder.com/40"
//             alt="profile"
//             className="w-12 h-12 rounded-full"
//           />
//           <div className="ml-3">
//             <p className="font-medium text-gray-800">Ankith tiwari</p>
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 p-4 space-y-4 overflow-y-auto">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`max-w-xs p-3 rounded-lg shadow-md ${
//                   msg.isUser
//                     ? 'bg-blue-100 text-blue-800'
//                     : 'bg-gray-100 text-gray-800'
//                 }`}
//               >
//                 <p>{msg.text}</p>
//                 <span className="text-xs text-gray-500 block text-right mt-1">
//                   {msg.time}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Message Input */}
//         <div className="p-4 border-t flex items-center">
//           <input
//             type="text"
//             placeholder="Enter your message"
//             className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none"
//           />
//           <button className="ml-2 p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-7V7a1 1 0 112 0v4a1 1 0 01-2 0zm0 4a1 1 0 112-0v-1a1 1 0 10-2 0v1z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import tenant from '../images/tenant.jpg';

const Communication = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hlo Doctor, Is that surgery can be done somewhat earlier', sender: 'incoming', time: '11:24am' },
    { id: 2, text: 'Yaa Ankith, that was so necessary', sender: 'outgoing', time: '11:28am' }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { id: messages.length + 1, text: message, sender: 'outgoing', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages([...messages, newMessage]);
      setMessage(''); // Clear the input field after sending
    }
  };

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className="p-8 w-[1200px] h-full justify-center items-center">
      <br></br>
      <br></br>
      <div className="flex gap-4">
        <br></br>
        <br></br>
        {/* Chat List Component */}
        <div className="relative w-full h-full p-4">
        <h1 className="text-2xl font-bold mb-2">
        Communications
      </h1>
        <br></br>
         <div className="flex justify-between items-center mb-4">
        <div className="relative w-full flex bg-white border rounded-full px-4 py-2">
        <div className="w-4 h-4">
            <img src="Vector.png" /> 
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent border-none outline-none text-sm text-gray-700 ml-2"
          />
        </div>
        <div
          className="ml-3 p-2 bg-white border rounded-full cursor-pointer"
          onClick={toggleFilter}
        >
          <div className="w-5 h-5">
            <img src="Filter.png"/>{/* Updated to use solid filter icon */}
          </div>
        </div>
      </div>

          {isFilterVisible && (
        <div className="absolute right-0 mt-2 w-48 p-4 bg-white border rounded shadow-md">
          <div className="text-blue-500 font-bold mb-2">Filter by</div>
          <div className="flex items-center mb-2">
            <input type="checkbox" id="date" className="mr-2 rounded-full" />
            <label htmlFor="date" className="text-gray-700">Date</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="hcm" className="mr-2 rounded-full" />
            <label htmlFor="hcm" className="text-gray-700">HCM</label>
          </div>
        </div>
      )}
          <div className="h-[500px] overflow-y-auto pr-3">
            {/* Chat Item */}
            <div className="flex items-center py-3 border-b border-gray-200 bg-[#f9f9ff] hover:bg-gray-100 rounded-lg mb-2">
              <img src={tenant} alt="Ankith Tiwari" className="w-11 h-11 rounded-full mr-3 ml-2" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Ankith Tiwari</p>
                <p className="text-xs text-gray-400">11:23 AM</p>
                <p className="text-sm text-gray-600 truncate">I would like to have the treatment ...</p>
              </div>
            </div>

            <div className="flex items-center py-3 border-b border-gray-200 bg-[#f9f9ff] hover:bg-gray-100 rounded-lg mb-2">
              <img src={tenant} alt="Ankith Tiwari" className="w-11 h-11 rounded-full mr-3 ml-2" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Ankith Tiwari</p>
                <p className="text-xs text-gray-400">11:23 AM</p>
                <p className="text-sm text-gray-600 truncate">I would like to have the treatment ...</p>
              </div>
            </div>

            <div className="flex items-center py-3 border-b border-gray-200 bg-[#f9f9ff] hover:bg-gray-100 rounded-lg mb-2">
              <img src={tenant} alt="Ankith Tiwari" className="w-11 h-11 rounded-full mr-3 ml-2" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Ankith Tiwari</p>
                <p className="text-xs text-gray-400">11:23 AM</p>
                <p className="text-sm text-gray-600 truncate">I would like to have the treatment ...</p>
              </div>
            </div>

            <div className="flex items-center py-3 border-b border-gray-200 bg-[#f9f9ff] hover:bg-gray-100 rounded-lg mb-2">
              <img src={tenant} alt="Ankith Tiwari" className="w-11 h-11 rounded-full mr-3 ml-2" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Ankith Tiwari</p>
                <p className="text-xs text-gray-400">11:23 AM</p>
                <p className="text-sm text-gray-600 truncate">I would like to have the treatment ...</p>
              </div>
            </div>

            <div className="flex items-center py-3 border-b border-gray-200 bg-[#f9f9ff] hover:bg-gray-100 rounded-lg mb-2">
              <img src={tenant} alt="Ankith Tiwari" className="w-11 h-11 rounded-full mr-3 ml-2" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Ankith Tiwari</p>
                <p className="text-xs text-gray-400">11:23 AM</p>
                <p className="text-sm text-gray-600 truncate">I would like to have the treatment ...</p>
              </div>
            </div>

            <div className="flex items-center py-3 border-b border-gray-200 bg-[#f9f9ff] hover:bg-gray-100 rounded-lg mb-2">
              <img src={tenant} alt="Ankith Tiwari" className="w-11 h-11 rounded-full mr-3 ml-2" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Ankith Tiwari</p>
                <p className="text-xs text-gray-400">11:23 AM</p>
                <p className="text-sm text-gray-600 truncate">I would like to have the treatment ...</p>
              </div>
            </div>

            <div className="flex items-center py-3 border-b border-gray-200 bg-[#f9f9ff] hover:bg-gray-100 rounded-lg mb-2">
              <img src={tenant} alt="Ankith Tiwari" className="w-11 h-11 rounded-full mr-3 ml-2" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Ankith Tiwari</p>
                <p className="text-xs text-gray-400">11:23 AM</p>
                <p className="text-sm text-gray-600 truncate">I would like to have the treatment ...</p>
              </div>
            </div>

            <div className="flex items-center py-3 border-b border-gray-200 bg-[#f9f9ff] hover:bg-gray-100 rounded-lg mb-2">
              <img src={tenant} alt="Ankith Tiwari" className="w-11 h-11 rounded-full mr-3 ml-2" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Ankith Tiwari</p>
                <p className="text-xs text-gray-400">11:23 AM</p>
                <p className="text-sm text-gray-600 truncate">I would like to have the treatment ...</p>
              </div>
            </div>

            <div className="flex items-center py-3 border-b border-gray-200 bg-[#f9f9ff] hover:bg-gray-100 rounded-lg mb-2">
              <img src={tenant} alt="Ankith Tiwari" className="w-11 h-11 rounded-full mr-3 ml-2" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Ankith Tiwari</p>
                <p className="text-xs text-gray-400">11:23 AM</p>
                <p className="text-sm text-gray-600 truncate">I would like to have the treatment ...</p>
              </div>
            </div>

            <div className="flex items-center py-3 border-b border-gray-200 bg-[#f9f9ff] hover:bg-gray-100 rounded-lg mb-2">
              <img src={tenant} alt="Ankith Tiwari" className="w-11 h-11 rounded-full mr-3 ml-2" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Ankith Tiwari</p>
                <p className="text-xs text-gray-400">11:23 AM</p>
                <p className="text-sm text-gray-600 truncate">I would like to have the treatment ...</p>
              </div>
            </div>

            <div className="flex items-center py-3 border-b border-gray-200 bg-[#f9f9ff] hover:bg-gray-100 rounded-lg mb-2">
              <img src={tenant} alt="Ankith Tiwari" className="w-11 h-11 rounded-full mr-3 ml-2" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Ankith Tiwari</p>
                <p className="text-xs text-gray-400">11:23 AM</p>
                <p className="text-sm text-gray-600 truncate">I would like to have the treatment ...</p>
              </div>
            </div>

            <div className="flex items-center py-3 border-b border-gray-200 bg-[#f9f9ff] hover:bg-gray-100 rounded-lg mb-2">
              <img src={tenant} alt="Ankith Tiwari" className="w-11 h-11 rounded-full mr-3 ml-2" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Ankith Tiwari</p>
                <p className="text-xs text-gray-400">11:23 AM</p>
                <p className="text-sm text-gray-600 truncate">I would like to have the treatment ...</p>
              </div>
            </div>
            {/* Repeat for other chat items */}
          </div>
        </div>

        {/* Chat Screen Component */}
        <div className="w-full h-[600px] bg-white rounded-lg shadow-lg flex flex-col mt-8">
          <div className="flex items-center p-4 border-b h-20">
            <img src={tenant} alt="profile" className="rounded-full w-10 h-10" />
            <div className="ml-4 mt-6">
              <h2 className="text-lg font-semibold">Ankith Tiwari</h2>
            </div>
          </div>
            {/* Chat Messages */}
            {/* Chat Messages Container */}
<div className="flex-1 p-4 space-y-2 overflow-y-auto pb-8 text-sm">
    {/* Incoming Message */}
    <div className="flex">
        <div className="bg-gray-200 rounded-3xl rounded-tl-none px-3 py-1 text-sm text-gray-900 max-w-xs">
            <div>Hlo Doctor, Is that surgery can be done somewhat earlier?</div>
            <div className="text-xs text-gray-500 text-right">11:24am</div>
        </div>
    </div>

    {/* Outgoing Message */}
    <div className="flex justify-end">
        <div className="bg-blue-200 rounded-3xl rounded-tr-none px-3 py-1 text-sm text-gray-900 max-w-xs">
            <div>Yaa Ankith, that was so necessary</div>
            <div className="text-xs text-gray-500 text-right">11:28am</div>
        </div>
    </div>

    {/* Additional Messages */}
    <div className="flex">
        <div className="bg-gray-200 rounded-3xl rounded-tl-none px-3 py-1 text-sm text-gray-900 max-w-xs">
            <div>Sure Doctor.</div>
            <div className="text-xs text-gray-500 text-right">11:29am</div>
        </div>
    </div>

    <div className="flex justify-end">
        <div className="bg-blue-200 rounded-3xl rounded-tr-none px-3 py-1 text-sm text-gray-900 max-w-xs">
            <div>And one thing you need to maintain a diet, so that surgery can be done smoothly</div>
            <div className="text-xs text-gray-500 text-right">11:31am</div>
        </div>
    </div>

    <div className="flex">
        <div className="bg-gray-200 rounded-3xl rounded-tl-none px-3 py-1 text-sm text-gray-900 max-w-xs">
            <div>Sure Doctor. Can I get the prescription from the nurse?</div>
            <div className="text-xs text-gray-500 text-right">11:34am</div>
        </div>
    </div>

    <div className="flex justify-end">
        <div className="bg-blue-200 rounded-3xl rounded-tr-none px-3 py-1 text-sm text-gray-900 max-w-xs">
            <div>Yes. I'll inform her.</div>
            <div className="text-xs text-gray-500 text-right">11:31am</div>
        </div>
    </div>
</div>

          {/* Message Input */}
          <div className=" p-2 flex items-center">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Enter your message"
                className="w-full p-2 pl-4 pr-10 border rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="absolute right-12 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5">
              <img src="Attach.png"/>
              </button>
              <button
                onClick={handleSendMessage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5"
              > 
                <img src="Send.png"/>
              </button>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
};

export default Communication;

