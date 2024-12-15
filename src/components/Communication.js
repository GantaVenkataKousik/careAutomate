import React, { useState } from 'react';
import tenant from '../images/tenant.jpg';

const Communication = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewMode, setViewMode] = useState('tenants');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([
    { senderId: '1', text: 'Hi there!', createdAt: new Date() },
    { senderId: '2', text: 'Hello!', createdAt: new Date() },
  ]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState('');

  const users = [
    { _id: '1', name: 'John Doe', lastMessage: 'Hello!', type: 'tenant' },
    { _id: '2', name: 'Jane Smith', lastMessage: 'How are you?', type: 'hcm' },
  ];

  const handleSendMessage = () => {
    if (message.trim() || file) {
      const newMessage = {
        senderId: selectedUser,
        text: message,
        createdAt: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setFile(null);
    }
  };

  const handleFilter = (criteria) => {
    setFilterCriteria(criteria);
    setShowFilter(false);
    // Implement filtering logic here
  };

  return (
    <div className="p-8 w-[1200px] h-full flex justify-center items-center">
      <div className="flex gap-4 w-full">
        <div className="w-1/3 h-full p-4 bg-gray-100 rounded-lg relative">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold">Communications</h1>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="text-blue-500 hover:text-blue-700 border border-gray-300 rounded px-2 py-1"
            >
              Filter
            </button>
          </div>
          {showFilter && (
            <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 z-10">
              <button
                onClick={() => handleFilter('date')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                By Date
              </button>
              <button
                onClick={() => handleFilter('name')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                By Name
              </button>
              <button
                onClick={() => handleFilter('newest')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Newest
              </button>
              {/* Add more filter options as needed */}
            </div>
          )}
          <div className="flex justify-between mb-4">
            <div className="flex">
              <button
                className={`px-4 py-2 rounded-l-full ${viewMode === 'tenants' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setViewMode('tenants')}
              >
                Tenants
              </button>
              <button
                className={`px-4 py-2 rounded-r-full ${viewMode === 'hcm' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setViewMode('hcm')}
              >
                HCM
              </button>
            </div>
          </div>
          <div className="h-[500px] overflow-y-auto pr-3">
            {users
              .filter(user => user.type === viewMode)
              .map(user => (
                <div
                  key={user._id}
                  className={`flex items-center py-3 border-b border-gray-200 bg-[#f9f9ff] hover:bg-gray-100 rounded-lg mb-2 cursor-pointer ${selectedUser === user._id ? 'bg-blue-100' : ''}`}
                  onClick={() => setSelectedUser(user._id)}
                >
                  <img src={tenant} alt={user.name} className="w-11 h-11 rounded-full mr-3 ml-2" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.lastMessage}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {selectedUser && (
          <div className="w-2/3 h-[600px] bg-white rounded-lg shadow-lg flex flex-col">
            <div className="flex items-center p-4 border-b h-20">
              <img src={tenant} alt="profile" className="rounded-full w-10 h-10" />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold">{users.find(user => user._id === selectedUser)?.name}</h2>
              </div>
              <button onClick={() => setSelectedUser(null)} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <div className="flex-1 p-4 space-y-2 overflow-y-auto pb-8 text-sm">
              {messages.map((msg, index) => (
                <div key={index} className={msg.senderId === selectedUser ? 'flex justify-end' : 'flex'}>
                  <div className={`bg-${msg.senderId === selectedUser ? 'blue' : 'gray'}-200 rounded-3xl ${msg.senderId === selectedUser ? 'rounded-tr-none' : 'rounded-tl-none'} px-3 py-1 text-sm text-gray-900 max-w-xs`}>
                    <div>{msg.text}</div>
                    <div className="text-xs text-gray-500 text-right">{new Date(msg.createdAt).toLocaleTimeString()}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 flex items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Enter your message"
                  className="w-full p-2 pl-4 pr-10 border rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                {file && (
                  <div className="absolute left-0 top-0 mt-2 ml-2 bg-gray-200 p-2 rounded">
                    <span>{file.name}</span>
                    <button onClick={() => setFile(null)} className="ml-2 text-red-500">&times;</button>
                  </div>
                )}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center">
                  <label htmlFor="fileUpload" className="cursor-pointer mr-2">
                    <img src="Attach.png" alt="Attach" className="w-5 h-5" />
                  </label>
                  <input
                    type="file"
                    className="hidden"
                    id="fileUpload"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="text-blue-500 w-5 h-5"
                  >
                    <img src="Send.png" alt="Send" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Communication;