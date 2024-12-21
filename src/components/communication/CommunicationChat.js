import React, { useState, useEffect } from "react";
import { SystemMessage, MessageList } from "react-chat-elements";
import { IoIosSend } from "react-icons/io";

const CommunicationChat = ({ chatMessages = [], selectedChat }) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(chatMessages);

  // Sync messages state with chatMessages prop
  useEffect(() => {
    setMessages(chatMessages);
  }, [chatMessages]);

  const handleSend = (value) => {
    if (value.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          position: "right",
          type: "text",
          title: "Surya",
          text: value,
          date: new Date(),
          replyButton: true,
        },
      ]);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col p-5 h-full w-2/3 border-2 border-gray-200">
      {/* Check if a chat is selected */}
      {selectedChat ? (
        <>
          {/* Chat Header */}
          <div className="flex w-full items-center gap-5 rounded-lg border-2 border-gray-400 p-2">
            <img
              src={selectedChat.avatar}
              alt={selectedChat.alt}
              className="w-10 h-10 rounded-full"
            />
            <h2 className="text-xl font-semibold">{selectedChat.title}</h2>
          </div>

          {/* Scrollable Message Area */}
          <div className="h-[55vh] overflow-y-auto mt-3 tenant-visits-scrollbar">
            {/* System Message */}
            {messages.length > 0 && <SystemMessage text={"Today."} />}

            {/* Message List */}
            <MessageList
              className="message-list mt-5"
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={messages}
            />
          </div>

          {/* Input Section */}
          <div className="flex items-center mt-3">
            <input
              type="text"
              className="w-full border-2 border-gray-400 p-2 rounded-lg"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSend(inputValue);
                }
              }}
            />
            <button
              className="flex w-10 h-10 justify-center items-center rounded-full bg-[#6F84F8] shadow-md mx-2"
              onClick={() => handleSend(inputValue)}
            >
              <IoIosSend className="text-white text-2xl" />
            </button>
          </div>
        </>
      ) : (
        // If no chat is selected, display an alternative message or component
        <div className="flex flex-col justify-center items-center h-[71vh]">
          <h2 className="text-xl font-semibold">Select a Chat</h2>
          <p className="text-gray-500">
            Please select a chat from the list to start messaging.
          </p>
        </div>
      )}
    </div>
  );
};

export default CommunicationChat;
