import React from "react";
import { formatTime24Hours } from "../../utils/timeFilter";
import { MdOutlineLocationOn, MdAccessTime } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { API_ROUTES } from "../../routes";
import { MdPersonPinCircle } from "react-icons/md";

function formatTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

const AppointmentCard = ({
  appointment,
  togglePopup1,
  handleDeleteClick1,
  showDeletePopup1,
  setShowDeletePopup1,
  setCurrentAppointment,
  setIsEdit,
  setShowModal,
}) => {
  const getColor = () => {
    let color = "#6F84F8";
    if (appointment.status === "Completed") {
      color = "#6DD98C";
    } else if (appointment.status === "Pending") {
      color = "#6F84F8";
    } else if (appointment.status === "Cancelled") {
      color = "#FF6B6B";
    }
    return color;
  };
  const handleEdit = () => {
    togglePopup1(appointment.id);
    // Pass the appointment data to the modal
    setShowModal(true);
    setIsEdit(true);
    setCurrentAppointment(appointment);
  };
  // console.log(appointment);
  const handleDelete = async (appointment, index) => {
    try {
      const response = await fetch(`${API_ROUTES.APPOINTMENTS.BASE}/${index}`, {
        method: "DELETE", // Correctly placed within the options object
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        console.log("Deleted successfully", index, appointment);
        // Update your state or perform any action required on successful delete
      } else {
        console.error(
          "Failed to delete:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    } finally {
      setShowDeletePopup1(false); // Ensure the popup closes regardless of the outcome
    }
  };

  return (
    <div
      key={appointment.id}
      className="relative flex items-center justify-between bg-white px-5 py-5 mt-4 shadow-lg rounded-3xl max-w-5xl mx-auto "
    >
      {/* Date and Time */}
      <div className="flex items-center space-x-4">
        <div className="text-center">
          <div className="text-gray-500">
            {new Date(appointment.date).toLocaleDateString("en-US", {
              weekday: "short",
            })}
          </div>
          <div className="text-2xl font-semibold" style={{ color: getColor() }}>
            {new Date(appointment.date).getDate().toString().padStart(2, "0")}
          </div>
        </div>
        <div>
          <p className="text-2xl" style={{ color: getColor() }}>
            |
          </p>
        </div>
        {/* Time and Location */}
        <div className="w-64">
          <div className="text-black-600">{appointment.service}</div>
          <div className="flex justify-between items-center mt-1">
            {/* Time */}
            <div className="flex items-center space-x-2 text-gray-600">
              <MdAccessTime className="w-6 h-6" style={{ color: getColor() }} />
              <span className="text-gray">
                {appointment.startTime && appointment.endTime ? (
                  <>
                    {formatTime(appointment.startTime)} -{" "}
                    {formatTime(appointment.endTime)}
                  </>
                ) : (
                  "Time not available"
                )}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <MdOutlineLocationOn
                className="w-6 h-6"
                style={{ color: getColor() }}
              />
              <span className="text-gray">{appointment.location}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-1 text-gray-600">
            <MdPersonPinCircle
              className="w-6 h-6"
              style={{ color: getColor() }}
            />
            <span className="text-gray">{appointment.methodOfContact}</span>
          </div>
        </div>
      </div>

      {/* Person Information */}
      <div className="flex flex-col w-[50%] ">
        <div className="text- truncate w-full my-3">
          {"Activity- " + appointment.activity}
        </div>
        <div className="flex justify-between items-center  w-full ">
          {/* From Person */}
          <div className="flex items-center space-x-2 text-gray-600 truncate w-[45%]">
            <BsPersonFill className="w-8 h-8" />
            <span
              className=" truncate w-full overflow-hidden text-ellipsis"
              style={{ color: getColor() }}
            >
              {appointment.from}
            </span>
          </div>
          <div className="text-gray-600">with</div>
          {/* With Person */}
          <div className="flex items-center space-x-2 text-gray-600 truncate w-[45%]">
            <BsPersonFill className="w-8 h-8" />
            <span
              className=" truncate w-full overflow-hidden text-ellipsis"
              style={{ color: getColor() }}
            >
              {appointment.with}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-6">
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={() => handleEdit(appointment)}
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
                  onClick={() => handleDelete(appointment, appointment.id)}
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
