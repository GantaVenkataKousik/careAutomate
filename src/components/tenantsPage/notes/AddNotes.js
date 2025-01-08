import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddNotes = ({ setEditMode, addNote }) => {
  const [title, setTitle] = useState("");
  const [noteDetails, setNoteDetails] = useState("");

  const handleSaveNotes = (e) => {
    e.preventDefault();
    const newNote = {
      id: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000, // Generate a unique ID
      name: title,
      content: noteDetails,
      notedBy: "Surya Abothula",
      createdAt: new Date().toISOString(),
    };
    // console.log(newNote);
    addNote(newNote);
  };

  return (
    <div className="m-6 border-2 border-gray-390 rounded-xl p-5 w-full">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center pb-3">
          <div className="bg-[#6F84F8] w-3 rounded-[20px] h-10"></div>
          <h2 className="text-xl font-semibold text-gray-600">Add Notes</h2>
        </div>
      </div>
      <div className="m-5 p-5 border-2 border-gray-350 rounded-xl">
        <form onSubmit={handleSaveNotes}>
          <div className="flex flex-col gap-4 mb-6">
            <label className="text-[#6F84F8] text-xl" htmlFor="title">
              Title of the Notes file:
            </label>
            <input
              type="text"
              placeholder="Enter the name for the note"
              className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 focus:border-[#6F84F8] focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <label className="text-[#6F84F8] text-xl" htmlFor="notesDetails">
              Notes Details:
            </label>
            <ReactQuill
              theme="snow"
              value={noteDetails}
              onChange={setNoteDetails}
              className="h-[250px]"
              placeholder="Enter Notes"
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
            />
          </div>

          <div className="flex items-center w-1/3 mt-8 ml-auto">
            <button
              type="button"
              className="cursor-pointer text-[#F57070] rounded-full border-[#F57070] border-2 py-3 px-2 w-full mt-4 mb-9 mr-8 hover:bg-[#F57070] hover:text-white"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer text-[#6F84F8] rounded-full border-[#6F84F8] border-2 py-3 px-2 w-full mt-4 mb-9 hover:bg-[#6F84F8] hover:text-white"
            >
              Create Notes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotes;
