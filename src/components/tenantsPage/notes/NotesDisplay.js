import React from "react";
import DOMPurify from "dompurify";

const NotesDisplay = ({ noteContent }) => {
  const sanitizeHTML = (html) => DOMPurify.sanitize(html);
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
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${month} ${day} ${year}  ${hours}:${minutes}`;
  }

  return (
    <div className="m-4 border-2 border-gray-390 rounded-xl p-5 w-full">
      {/**Header notes title */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center pb-3">
          <div className="bg-[#6F84F8] w-3 rounded-[20px] h-10"></div>
          <h2 className="text-xl font-semibold text-gray-600">
            {noteContent.name}
          </h2>
        </div>
      </div>

      {/**Inner Container for display */}
      <div className="m-5 p-5 border-2 border-gray-350 rounded-xl">
        <div
          className="p-5"
          dangerouslySetInnerHTML={{
            __html: sanitizeHTML(noteContent.content),
          }}
        />
        <p className="flex justify-end mt-4 mr-5">
          <span className="text-[#6F84F8]">Created At : </span>
          {formatDate(noteContent.createdAt)}
        </p>
      </div>

      {/**Noted by aligned to the right */}
      <p className="flex justify-end mt-4 mr-5">
        <span className="text-[#6F84F8]">Noted by : </span>
        {noteContent.notedBy}
      </p>
    </div>
  );
};

export default NotesDisplay;
