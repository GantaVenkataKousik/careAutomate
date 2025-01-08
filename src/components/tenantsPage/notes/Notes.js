import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NotesDisplay from "./NotesDisplay";
import AddNotes from "./AddNotes";

const Notes = () => {
  const location = useLocation();
  const { tenantData } = location.state || {};
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [notes, setNotes] = useState([
    {
      id: 1,
      name: "Meeting Notes",
      content:
        "<h1>Project Milestones</h1><p>During today's meeting, we discussed the overall project milestones and established timelines. The key milestones for the project include:</p><ol><li><strong>Design Phase:</strong> This phase will involve finalizing wireframes and UI designs, ensuring user experience is smooth. The design team will present a mockup by the end of this month.</li><li><strong>Development Phase:</strong> The backend and frontend development will be initiated after the design phase. This will involve coding the core features and setting up the database. Development will take 8 weeks.</li><li><strong>Testing Phase:</strong> Testing will begin once the development phase reaches 90% completion. The QA team will focus on functionality, security, and performance. A full user acceptance testing (UAT) session will follow.</li></ol><p>Action Items:</p><ul><li>Design mockup to be delivered by January 15th</li><li>Development sprint to start by February 1st</li><li>QA team preparation for testing phase to begin mid-March</li></ul>",
      notedBy: "John Doe",
      createdAt: "2025-01-03T10:30:00Z",
    },
    {
      id: 2,
      name: "Design Feedback",
      content:
        "<h1>Header Design</h1><p>During the design review meeting, several changes were proposed to the header design. The goal is to enhance the visual appeal and ensure that it aligns with the company's brand identity. The key updates suggested were:</p><ul><li><strong>Logo Size Adjustment:</strong> The logo needs to be slightly reduced in size to create a cleaner look and ensure the header doesn't appear too crowded.</li><li><strong>Increase Spacing Between Header and Content:</strong> A greater amount of padding should be added between the header and the body of the webpage to improve readability and provide a more balanced design.</li><li><strong>Color Contrast Improvement:</strong> The text color needs to be darkened for better contrast against the background. This will make it easier for users to read.</li></ul><p>Next Steps:</p><ul><li>Designer to implement changes by the end of the week</li><li>Review updated header design on January 7th</li></ul>",
      notedBy: "Jane Smith",
      createdAt: "2025-01-03T11:00:00Z",
    },
    {
      id: 3,
      name: "Sprint Planning",
      content:
        "<h1>Next Sprint Goals</h1><p>During the sprint planning session, we finalized the features to prioritize for the upcoming sprint. The main focus will be on improving the overall user experience and addressing critical bugs. The selected features are as follows:</p><ul><li><strong>Improve User Authentication:</strong> Simplify the login process by adding social media sign-in options and improve password recovery. The goal is to reduce the friction for users trying to access their accounts.</li><li><strong>Refactor Payment System:</strong> There were several issues with the current payment gateway integration, such as slow response times. The team will refactor the system to ensure faster transactions and better error handling.</li><li><strong>Enhance UI/UX:</strong> We received multiple complaints about the user interface being too cluttered. The design team will focus on simplifying the navigation, improving the layout, and ensuring that the app is more intuitive.</li></ul><p>Additional Points:</p><ul><li>The sprint will last 2 weeks, starting on January 10th and ending on January 24th.</li><li>Daily stand-up meetings will be held to track progress.</li><li>The QA team will start testing features on January 20th.</li></ul>",
      notedBy: "Alex Johnson",
      createdAt: "2025-01-03T11:30:00Z",
    },
  ]);

  const [selectedNotes, setSelectedNotes] = useState("Meeting Notes");

  // Callback to add a new note
  const addNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setEditMode(false); // Exit edit mode after adding
  };

  const noteContent = notes.find((note) => note.name === selectedNotes);
  const filteredNotes = notes.filter((note) =>
    note.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-4 pb-4 border-b-2 border-gray-300 font-poppins font-semibold">
        <h1 className="text-[1.8rem] m-0">
          Notes of {tenantData?.name || "Tenant"}
        </h1>
        <button
          className={`text-white p-2 px-5 rounded-full ${editMode ? "bg-[#F57070]" : "bg-[#6F84F8]"} `}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "X Cancel" : "+ Add Notes"}
        </button>
      </div>

      <div className="flex p-4">
        <div className="flex flex-col pr-4 h-[78vh] w-[300px] overflow-y-auto">
          <input
            type="text"
            placeholder="Search notes"
            className="p-4 text-base text-left text-black font-normal bg-transparent border-2 border-gray-200 rounded-lg mb-2 focus:border-[#6F84F8] focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {filteredNotes.map((note) => (
            <button
              key={note.id}
              onClick={() => setSelectedNotes(note.name)}
              className={`p-4 text-base text-left ${
                selectedNotes === note.name
                  ? "bg-[#6f84f8] font-semibold text-white"
                  : "bg-transparent font-normal text-black"
              } border-none outline-none cursor-pointer rounded-md`}
            >
              {note.name}
            </button>
          ))}
        </div>

        <div className="flex-1 p-4 border-l-2 border-gray-300 mr-auto">
          {noteContent ? (
            editMode ? (
              <AddNotes addNote={addNote} setEditMode={setEditMode} />
            ) : (
              <NotesDisplay noteContent={noteContent} />
            )
          ) : (
            <p className="text-gray-500">Select a note to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
