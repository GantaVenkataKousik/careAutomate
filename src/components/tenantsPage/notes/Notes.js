import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NotesDisplay from "./NotesDisplay";
import AddNotes from "./AddNotes";
import { API_ROUTES } from "../../../routes";
import { useAuth } from "../../../AuthContext";
import axios from "axios";

const Notes = () => {
  const { token } = useAuth();
  const location = useLocation();
  const { tenantData } = location.state || {};
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotes, setSelectedNotes] = useState("");
  const [shouldRefetchNotes, setShouldRefetchNotes] = useState(false); // Renamed state

  function formatDate(createdAt) {
    const date = new Date(createdAt);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${month} ${day}`;
  }

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.post(
          `${API_ROUTES.TENANTS.BASE}/get-tenant-notes`,
          { tenantId: tenantData._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const tenantNotes = response.data.response?.tenantNotes || [];
        // console.log("Fetched Notes:", tenantNotes);

        const mappedNotes = tenantNotes.map((note) => ({
          id: note.noteId,
          title: note.title,
          content: note.content,
          notedBy: note.notedBy?.name || "Unknown",
          createdAt: note.createdAt,
        }));

        setNotes(mappedNotes);
        setSelectedNotes(mappedNotes[0]?.title || ""); // Default to the first note
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchNotes();
  }, [tenantData, token, shouldRefetchNotes]);

  const addNote = (newNote) => {
    console.log("add", newNote);
    const mappedNotes = newNote.map((note) => ({
      id: note.noteId,
      title: note.title,
      content: note.content,
      notedBy: note.notedBy?.name || "Unknown",
      createdAt: note.createdAt,
    }));

    setNotes(mappedNotes);
    setEditMode(false); // Exit edit mode after adding
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const noteContent = notes.find((note) => note.title === selectedNotes);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-4 pb-4 border-b-2 border-gray-300 font-poppins font-semibold">
        <h1 className="text-[1.8rem] m-0">
          Notes of {tenantData?.name || "Tenant"}
        </h1>
        <button
          className={`text-white p-2 px-5 rounded-full ${
            editMode ? "bg-[#F57070]" : "bg-[#6F84F8]"
          } `}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "X Cancel" : "+ Add Notes"}
        </button>
      </div>

      <div className="flex p-4">
        {/* Notes List */}
        <div className="flex flex-col pr-4 h-[78vh] w-[300px] overflow-y-auto">
          <input
            type="text"
            placeholder="Search notes"
            className="p-4 text-base text-left text-black font-normal bg-transparent border-2 border-gray-200 rounded-lg mb-2 focus:border-[#6F84F8] focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {loading ? (
            // Show a loading spinner or fallback message
            <div className="p-4">
              <p className="animate-pulse text-gray-400">Loading notes...</p>
            </div>
          ) : notes.length === 0 ? (
            // If no notes are found, display a fallback message
            <div className="p-4">
              <p className="text-gray-400">
                No notes available for this tenant.
              </p>
            </div>
          ) : filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <button
                key={note.id}
                onClick={() => setSelectedNotes(note.title)}
                className={`flex p-4 justify-between items-center text-base text-left ${
                  selectedNotes === note.title
                    ? "bg-[#6f84f8] font-semibold text-white"
                    : "bg-transparent font-normal text-black"
                } border-none outline-none cursor-pointer rounded-md`}
              >
                {note.title.length > 15
                  ? `${note.title.slice(0, 15)}...`
                  : note.title}
                <span className="text-sm">{formatDate(note.createdAt)}</span>
              </button>
            ))
          ) : (
            <p className="text-gray-400">No notes match your search.</p>
          )}
        </div>

        {/* Notes Content */}
        <div className="flex-1 p-4 border-l-2 border-gray-300 mr-auto">
          {noteContent ? (
            editMode ? (
              <AddNotes
                addNote={addNote}
                setEditMode={setEditMode}
                tenantId={tenantData._id}
              />
            ) : (
              <NotesDisplay
                noteContent={noteContent}
                tenantId={tenantData._id}
                setShouldRefetchNotes={setShouldRefetchNotes} // Pass this function as prop
              />
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
