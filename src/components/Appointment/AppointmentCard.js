import React from "react";
import { formatTime24Hours } from "../../utils/timeFilter";
import { MdOutlineLocationOn, MdAccessTime } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";

const AppointmentCard = ({
  appointment,
  togglePopup1,
  handleDeleteClick1,
  showPopup1,
  showDeletePopup1,
  setShowDeletePopup1,
}) => {
  return (
    <div
      key={appointment.id}
      className="relative flex items-center justify-between bg-white px-5 py-4 mt-4 shadow-lg rounded-3xl max-w-5xl mx-auto "
    >
      {/* Date and Time */}
      <div className="flex items-center space-x-4">
        <div className="text-center">
          <div className="text-gray-500">
            {new Date(appointment.date).toLocaleDateString("en-US", {
              weekday: "short",
            })}
          </div>
          <div className="text-2xl font-semibold text-[#6F84F8]">
            {new Date(appointment.date).getDate().toString().padStart(2, "0")}
          </div>
        </div>
        <div>
          <p className="text-2xl text-[#6F84F8]">|</p>
        </div>
        {/* Time and Location */}
        <div className="w-56">
          <div className="text-black-600">{appointment.service}</div>
          <div className="flex justify-between items-center mt-1">
            {/* Time */}
            <div className="flex items-center space-x-2 text-gray-600">
              <MdAccessTime className="text-[#6F84F8] w-6 h-6" />
              <span className="text-gray">
                {appointment.time.length < 15 ? (
                  appointment.time
                ) : (
                  <>
                    {formatTime24Hours(appointment.time.split(/\s[-–]\s/)[0])} -{" "}
                    {formatTime24Hours(appointment.time.split(/\s[-–]\s/)[1])}
                  </>
                )}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-2 text-gray-600">
              <MdOutlineLocationOn className="text-[#6F84F8] w-6 h-6" />
              <span className="text-gray">{appointment.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Person Information */}
      <div className="flex justify-between items-center w-[50%] space-x-4">
        {/* From Person */}
        <div className="flex items-center space-x-2 text-gray-600 truncate w-[45%]">
          <BsPersonFill className="w-8 h-8" />
          <span className="text-[#6F84F8] truncate w-full overflow-hidden text-ellipsis">
            {appointment.from}
          </span>
        </div>
        <div className="text-gray-600">with</div>
        {/* With Person */}
        <div className="flex items-center space-x-2 text-gray-600 truncate w-[45%]">
          <BsPersonFill className="w-8 h-8" />
          <span className="text-[#6F84F8] truncate w-full overflow-hidden text-ellipsis">
            {appointment.with}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-6">
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={() => togglePopup1(appointment.id)}
          aria-label="Edit Appointment"
        >
          <BiEditAlt className="w-6 h-6" />
        </button>

        <GoTrash
          className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer"
          onClick={() => handleDeleteClick1(appointment.id)}
          aria-label="Delete Appointment"
        />

        {showDeletePopup1 === appointment.id && (
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
            <div className="bg-white p-6 w-fit rounded-xl shadow-lg">
              <p className="text-black font-semibold">
                Are you sure you want to delete this appointment?
              </p>
              <div className="mt-4 text-gray-500 text-sm">
                <span className="text-black">Note:</span> The respective HCM
                will be notified about this.
              </div>
              <div className="mt-5 flex justify-end space-x-4">
                <button
                  className="px-3 py-1 text-sm border-2 border-red-300 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white"
                  onClick={() => setShowDeletePopup1(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-3 py-1 text-sm bg-green-500 text-white rounded-2xl hover:bg-green-600"
                  onClick={() => setShowDeletePopup1(false)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
