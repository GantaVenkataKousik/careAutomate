import React, { useState } from "react";
import CommunicationHeader from "./communication/CommunicationHeader";
import CommunicationList from "./communication/CommunicationList";
import CommunicationChat from "./communication/CommunicationChat";

const Communication = () => {
  const chats = [
    {
      id: 1,
      avatar: "https://picsum.photos/seed/picsum/200/300",
      alt: "john_doe_avatar",
      title: "John Doe",
      subtitle: "Are we still on for dinner tomorrow night?",
      date: new Date(),
      unread: 5,
      favorite: false,
      chatMessage: [
        {
          position: "left",
          type: "text",
          title: "John Doe",
          text: "Give me a message list example!",
          date: new Date(),
          replyButton: true,
        },
        {
          position: "right",
          type: "text",
          title: "Surya",
          text: "That's all.",
          date: new Date(),
          replyButton: true,
        },
      ],
    },
    {
      id: 2,
      avatar: "https://picsum.photos/id/16/200/300",
      alt: "mike_brown_avatar",
      title: "Mike Brown",
      subtitle: "Check out this article I found on AI!",
      date: new Date(),
      unread: 2,
      favorite: false,
      chatMessage: [
        {
          position: "left",
          type: "text",
          title: "Mike Brown",
          text: "Check out this article I found on AI!",
          date: new Date(),
          replyButton: true,
        },
        {
          position: "right",
          type: "text",
          title: "Surya",
          text: "Interesting! I'll read it later.",
          date: new Date(),
          replyButton: true,
        },
      ],
    },
    {
      id: 3,
      avatar: "https://picsum.photos/id/13/200/300",
      alt: "lucy_williams_avatar",
      title: "Lucy Williams",
      subtitle: "The project deadline is tomorrow!",
      date: new Date(),
      unread: 1,
      favorite: false,
      chatMessage: [
        {
          position: "left",
          type: "text",
          title: "Lucy Williams",
          text: "The project deadline is tomorrow!",
          date: new Date(),
          replyButton: true,
        },
        {
          position: "right",
          type: "text",
          title: "Surya",
          text: "Got it! I'll submit it tonight.",
          date: new Date(),
          replyButton: true,
        },
      ],
    },
    {
      id: 4,
      avatar: "https://picsum.photos/id/11/200/300",
      alt: "jake_brown_avatar",
      title: "Jake Brown",
      subtitle: "How about a quick call in 10 minutes?",
      date: new Date(),
      unread: 3,
      favorite: false,
      chatMessage: [
        {
          position: "left",
          type: "text",
          title: "Jake Brown",
          text: "How about a quick call in 10 minutes?",
          date: new Date(),
          replyButton: true,
        },
        {
          position: "right",
          type: "text",
          title: "Surya",
          text: "Sure, let's catch up then.",
          date: new Date(),
          replyButton: true,
        },
      ],
    },
    {
      id: 5,
      avatar: "https://picsum.photos/200/300",
      alt: "olivia_martin_avatar",
      title: "Olivia Martin",
      subtitle: "Reminder: The event starts at 8 PM.",
      date: new Date(),
      unread: 0,
      favorite: true,
      chatMessage: [
        {
          position: "left",
          type: "text",
          title: "Olivia Martin",
          text: "Reminder: The event starts at 8 PM.",
          date: new Date(),
          replyButton: true,
        },
        {
          position: "right",
          type: "text",
          title: "Surya",
          text: "Thanks for the reminder!",
          date: new Date(),
          replyButton: true,
        },
      ],
    },
    {
      id: 6,
      avatar: "https://picsum.photos/id/5/200/300",
      alt: "nathan_williams_avatar",
      title: "Nathan Williams",
      subtitle: "Can you send over the updated proposal?",
      date: new Date(),
      unread: 0,
      favorite: false,
      chatMessage: [
        {
          position: "left",
          type: "text",
          title: "Nathan Williams",
          text: "Can you send over the updated proposal?",
          date: new Date(),
          replyButton: true,
        },
        {
          position: "right",
          type: "text",
          title: "Surya",
          text: "I will send it right away.",
          date: new Date(),
          replyButton: true,
        },
      ],
    },
    {
      id: 7,
      avatar: "https://picsum.photos/200/300",
      alt: "noah_davis_avatar",
      title: "Noah Davis",
      subtitle: "How was your weekend?",
      date: new Date(),
      unread: 0,
      favorite: false,
      chatMessage: [
        {
          position: "left",
          type: "text",
          title: "Noah Davis",
          text: "How was your weekend?",
          date: new Date(),
          replyButton: true,
        },
        {
          position: "right",
          type: "text",
          title: "Surya",
          text: "It was great, thanks! How about you?",
          date: new Date(),
          replyButton: true,
        },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState("HCM");
  const [chatClick, setChatClick] = useState(null);

  // Filter the chats based on the active tab and the id being odd or even
  // const filteredChat = chats.filter((chat) => {
  //   // If "HCM" tab is selected, show even ID chats
  //   if (activeTab === "HCM") {
  //     return chat.id % 2 === 0;
  //   }
  //   // If "Tenant" tab is selected, show odd ID chats
  //   if (activeTab === "Tenant") {
  //     return chat.id % 2 !== 0;
  //   }
  //   return false;
  // });

  const countUnreadMessages = () => {
    return chats.reduce((total, chat) => {
      return total + (chat.unread > 0 ? chat.unread : 0);
    }, 0);
  };
  // Get the selected chat
  const selectedChat =
    chats.find((chat) => chat.title === chatClick?.title) || null;

  return (
    <div className="h-full w-full font-poppins">
      <div className="flex flex-col h-full">
        <CommunicationHeader
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          unreadCount={countUnreadMessages()}
        />
        <div className="flex h-full">
          {/* Pass the filtered chats instead of all chats */}
          <CommunicationList chats={chats} setChatClick={setChatClick} />

          {/* Show the selected chat */}
          <CommunicationChat
            chatMessages={selectedChat?.chatMessage || []}
            selectedChat={selectedChat}
          />
        </div>
      </div>
    </div>
  );
};

export default Communication;
