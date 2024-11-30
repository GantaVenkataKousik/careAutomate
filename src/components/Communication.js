import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import tenant from '../images/tenant.jpg';

const Communication = ({ userId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const socket = io('http://localhost:9003'); // Replace with your server URL

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      try {
        const response = await axios.post('https://careautomate-backend.vercel.app/fetchAll/fetchAllHCMsTenants', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const { hcm, tenants } = response.data.data;
        setUsers([...hcm, ...tenants]);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch messages when a user is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;

      try {
        const response = await axios.get('http://localhost:9003/api/messages', {
          params: { userId, selectedUserId: selectedUser }
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [selectedUser]);

  // Handle incoming messages via Socket.IO
  useEffect(() => {
    socket.on('chat message', (msg) => {
      if ((msg.sender === userId && msg.receiver === selectedUser) || (msg.sender === selectedUser && msg.receiver === userId)) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedUser, userId]);

  // Send a new message
  const handleSendMessage = () => {
    if (message.trim() && selectedUser) {
      const newMessage = {
        text: message,
        sender: userId,
        receiver: selectedUser,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      socket.emit('chat message', newMessage);

      // Save message to backend
      axios.post('http://localhost:9003/api/messages', newMessage)
        .catch(error => console.error('Error saving message:', error));

      setMessage('');
    }
  };

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className="p-8 w-[1200px] h-full justify-center items-center">
      <div className="flex gap-4">
        {/* Chat List Component */}
        <div className="relative w-full h-full p-4">
          <h1 className="text-2xl font-bold mb-2">Communications</h1>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full flex bg-white border rounded-full px-4 py-2">
              <div className="w-4 h-4">
                <img src="Vector.png" alt="Search" />
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
                <img src="Filter.png" alt="Filter" />
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
            {users.map(user => (
              <div
                key={user._id}
                className="flex items-center py-3 border-b border-gray-200 bg-[#f9f9ff] hover:bg-gray-100 rounded-lg mb-2"
                onClick={() => setSelectedUser(user._id)}
              >
                <img src={tenant} alt={user.name} className="w-11 h-11 rounded-full mr-3 ml-2" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-400">Last message time</p>
                  <p className="text-sm text-gray-600 truncate">Last message preview...</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Screen Component */}
        <div className="w-full h-[600px] bg-white rounded-lg shadow-lg flex flex-col mt-8">
          <div className="flex items-center p-4 border-b h-20">
            <img src={tenant} alt="profile" className="rounded-full w-10 h-10" />
            <div className="ml-4 mt-6">
              <h2 className="text-lg font-semibold">{users.find(user => user._id === selectedUser)?.name}</h2>
            </div>
          </div>
          <div className="flex-1 p-4 space-y-2 overflow-y-auto pb-8 text-sm">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === userId ? 'flex justify-end' : 'flex'}>
                <div className={`bg-${msg.sender === userId ? 'blue' : 'gray'}-200 rounded-3xl ${msg.sender === userId ? 'rounded-tr-none' : 'rounded-tl-none'} px-3 py-1 text-sm text-gray-900 max-w-xs`}>
                  <div>{msg.text}</div>
                  <div className="text-xs text-gray-500 text-right">{msg.timestamp}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-2 flex items-center">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Enter your message"
                className="w-full p-2 pl-4 pr-10 border rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="absolute right-12 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5">
                <img src="Attach.png" alt="Attach" />
              </button>
              <button
                onClick={handleSendMessage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5"
              >
                <img src="Send.png" alt="Send" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;