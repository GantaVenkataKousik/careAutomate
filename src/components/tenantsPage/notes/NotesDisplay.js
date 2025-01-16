import React, { useState } from "react";
import DOMPurify from "dompurify";
import { FaTrashCan } from "react-icons/fa6";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"; // Import MUI Dialog components
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { API_ROUTES } from "../../../routes";
import { toast } from "react-toastify";
import { useAuth } from "../../../AuthContext";

const NotesDisplay = ({
  noteContent,
  tenantId,
  setShouldRefetchNotes,
  onEditNote,
}) => {
  const { token } = useAuth();
  const [showDelete, setShowDelete] = useState(false);
  const sanitizeHTML = (html) => DOMPurify.sanitize(html);

  const formatDate = (createdAt) => {
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
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12 || 12; // If hours is 0, set it to 12.

    return `${month} ${day}, ${year}  ${hours}:${minutes} ${amPm}`;
  };

  const handleCloseDialog = () => {
    setShowDelete(false); // Close the dialog without deleting
  };

  const handleConfirmDelete = async () => {
    const noteId = noteContent.id;

    if (!noteId || !tenantId) {
      toast.error("Note ID or Tenant ID is missing.");
      console.error("Note ID or Tenant ID is missing.");
      setShowDelete(false);
      return;
    }
    // Delete the note here
    try {
      const response = await axios.post(
        `${API_ROUTES.TENANTS.NOTES.DELETE_NOTE}`,
        {
          noteId: noteId,
          tenantId: tenantId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Note deleted successfully!");
        setShouldRefetchNotes(true); // Trigger notes refetch after deletion
      } else {
        toast.error("Failed to delete the note.");
        console.log("Failed to delete the note.");
      }
    } catch (error) {
      toast.error("Failed to delete the note.");
      console.error("Error deleting note:", error);
    }
    setShowDelete(false);
  };

  if (!noteContent) {
    return (
      <div className="m-4 border-2 border-gray-300 rounded-xl p-5 w-full text-center">
        <p className="text-gray-500">
          No note selected. Please select a note to view its details.
        </p>
      </div>
    );
  }
  const handleEditNotes = () => {
    onEditNote(noteContent);
  };
  return (
    <div className="m-4 border-2 border-gray-300 rounded-xl p-5 w-full">
      {/* Header: Notes Title */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center pb-3">
          <div className="bg-[#6F84F8] w-3 rounded-[20px] h-10"></div>
          <h2 className="text-xl font-semibold text-gray-600">
            {noteContent.title || "Untitled Note"}
          </h2>
        </div>

        {/**Buttons */}
        <div className="flex gap-2">
          <button
            className={`flex items-center gap-2 text-white p-2 px-5 rounded-full bg-[#F57070]`}
            onClick={() => setShowDelete(true)}
          >
            <FaTrashCan />
            <span>Delete</span>
          </button>

          <button
            className={`flex items-center gap-2 text-[#6F84F8] border-2 border-[#6F84F8] p-2 px-5 rounded-full hover:text-white hover:bg-[#6F84F8] `}
            onClick={() => handleEditNotes()}
          >
            <MdEdit />
            <span>Edit</span>
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="m-5 p-5 border-2 border-gray-300 rounded-xl">
        <div
          className="p-5"
          dangerouslySetInnerHTML={{
            __html: sanitizeHTML(
              noteContent.content || "<p>No content available.</p>"
            ),
          }}
        />
        <p className="flex justify-end mt-4 mr-5 text-sm">
          <span className="text-[#6F84F8] font-medium">Created At: </span>&nbsp;
          {noteContent.createdAt
            ? formatDate(noteContent.createdAt)
            : "Unknown"}
        </p>
      </div>

      {/* Noted By */}
      <p className="flex justify-end mt-4 mr-5 text-sm">
        <span className="text-[#6F84F8] font-medium">Noted By: </span>&nbsp;
        {noteContent.notedBy || "Unknown"}
      </p>

      {/* MUI Dialog for Delete Confirmation */}
      <Dialog
        open={showDelete}
        onClose={handleCloseDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "#f4f7fc", // Light background color for the dialog box
            borderRadius: "10px", // Rounded corners
            padding: "20px", // Padding inside the dialog box
          },
        }}
      >
        <DialogTitle
          id="delete-dialog-title"
          style={{
            fontSize: "1.25rem", // Larger font size for title
            fontWeight: "bold", // Bold title
            color: "#333", // Dark color for the title text
            borderBottom: "2px solid #F57070", // Add a border under the title
            paddingBottom: "10px", // Padding bottom for title
          }}
        >
          Confirm Deletion
        </DialogTitle>
        <DialogContent sx={{ padding: "20px" }}>
          <p>
            Are you sure you want to delete this note? This action cannot be
            undone.
          </p>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleCloseDialog}
            className="px-3 py-1 text-sm bg-gray-400 text-white rounded-2xl hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-3 py-1 text-sm border-2 border-red-300 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white"
          >
            Delete
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NotesDisplay;
