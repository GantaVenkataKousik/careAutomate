import React, { useState } from "react";
import { ChatList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

const CommunicationList = ({ chats, setChatClick }) => {
  const [messageCategory, setMessageCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  // Sample data source with a favorite flag
  const [dataSource, setDataSource] = useState(chats);

  // Filter data based on category and search query
  const filteredDataSource = () => {
    let filtered = dataSource;

    if (messageCategory === "Unread") {
      filtered = filtered.filter((message) => message.unread > 0);
    } else if (messageCategory === "Favourites") {
      filtered = filtered.filter((message) => message.favorite);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((message) =>
        message.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  return (
    <div className="h-full w-1/3 border-r-4 py-2 flex flex-col items-center">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search"
        className="p-2 w-10/12 rounded-lg my-4 border border-2 border-[#505254] focus:outline-none focus:ring-2 focus:ring-[#6F84F8]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Tabs for filtering */}
      <div className="flex mb-4">
        {["All", "Unread", "Favourites"].map((tab) => {
          return (
            <button
              key={tab}
              className={`border-b-4 hover:border-[#6F84F8] text-[#505254] text-lg px-7 ${
                messageCategory === tab ? "border-[#6F84F8] font-bold" : ""
              }`}
              onClick={() => setMessageCategory(tab)}
              aria-pressed={messageCategory === tab}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Chat List */}
      <ChatList
        className="chat-list w-11/12 h-[58vh] tenant-visits-scrollbar"
        dataSource={filteredDataSource()}
        onClick={(chatItem) => {
          setChatClick(chatItem);
        }}
      />
    </div>
  );
};

export default CommunicationList;
