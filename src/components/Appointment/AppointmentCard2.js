import React, { useState } from "react";
import {
  MdAccessTime,
  MdOutlineLocationOn,
  MdPersonPinCircle,
} from "react-icons/md";
import { formatTime } from "../../utils/commonUtils/timeFilter";
import { RiAdminLine, RiUserLine } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { GoTrash } from "react-icons/go";
import { API_ROUTES } from "../../routes";
import { toast } from "react-toastify";

const AppointmentCard2 = ({
  appointment,
  handleDetailsClick,
  onAptCreated,
  setShowModal,
  setIsEdit,
  setCurrentAppointment,
}) => {
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const getColor = () => {
    const colors = {
      Completed: "#6DD98C",
      Pending: "#6F84F8",
      Cancelled: "#FF6B6B",
    };
    return colors[appointment.status] || "#6F84F8"; // Default to "Pending" color
  };
  const handleEdit = () => {
    // Pass the appointment data to the modal
    setShowModal(true);
    setIsEdit(true);
    setCurrentAppointment(appointment);
  };

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
        toast.success("Delete successful");
        onAptCreated();
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
      setOpenDeletePopup(false); // Ensure the popup closes regardless of the outcome
    }
  };

  const formattedDate = isNaN(new Date(appointment.date))
    ? "Invalid Date"
    : new Date(appointment.date).toLocaleDateString("en-US", {
        weekday: "short",
      });

  const formattedDay = isNaN(new Date(appointment.date))
    ? "--"
    : new Date(appointment.date).getDate().toString().padStart(2, "0");

  return (
    <div
      style={{ boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.25)" }}
      className="flex justify-between bg-white px-5 py-5 mt-4 rounded-3xl w-full  mx-auto"
    >
      <div className="flex items-center gap-3 w-[10%]">
        {/** Left side date container */}
        <div className="text-center">
          <div className="text-gray-500">{formattedDate}</div>
          <div className="text-2xl font-semibold" style={{ color: getColor() }}>
            {formattedDay}
          </div>
        </div>
        <div>
          <p className="text-2xl" style={{ color: getColor() }}>
            |
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center w-[75%] gap-2">
        {/** Center container */}
        <div className="flex justify-between items-center overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="flex items-center text-gray-600 gap-2">
              <RiAdminLine className="w-8 h-8" />
              <span
                className="truncate w-full overflow-hidden text-ellipsis"
                style={{ color: getColor() }}
              >
                {appointment.from}
              </span>
            </div>
            <div className="text-gray-600">with</div>
            <div className="flex items-center text-gray-600 gap-2">
              <RiUserLine className="w-8 h-8" />
              <span
                className="truncate w-full overflow-hidden text-ellipsis"
                style={{ color: getColor() }}
              >
                {appointment.with}
              </span>
            </div>
          </div>

          <div className="flex items-center text-gray-600">
            <MdAccessTime className="w-6 h-6" style={{ color: getColor() }} />
            <span>
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
        </div>

        {/** Below container */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col justify-center gap-2 w-[20%]">
            <div className="flex items-center text-gray-600">
              <MdOutlineLocationOn
                className="w-6 h-6"
                style={{ color: getColor() }}
              />
              <span>{appointment.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MdPersonPinCircle
                className="w-6 h-6"
                style={{ color: getColor() }}
              />
              <span>{appointment.methodOfContact}</span>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 w-[80%] overflow-hidden">
            <div className="flex items-center">
              <div
                className="font-bold flex-shrink-0 mr-2"
                style={{ color: getColor() }}
              >
                {appointment.service || "No Service"} {" - "}
              </div>
              <div className="text-gray-600 w-full truncate overflow-hidden break-words">
                {appointment.activity || "No Activity"}
              </div>
            </div>

            {appointment.reasonForRemote && (
              <div className="flex items-center text-gray-600">
                <span
                  className="font-bold flex-shrink-0 mr-2"
                  style={{ color: getColor() }}
                >
                  Reason For Remote:
                </span>
                <span className="truncate overflow-hidden">
                  {appointment.reasonForRemote.length > 10 ? (
                    <>
                      {appointment.reasonForRemote.slice(0, 15)}...
                      <button
                        className="ml-2 border rounded-full px-2 text-sm"
                        style={{
                          borderColor: getColor(),
                          color: getColor(),
                          backgroundColor: "transparent",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = getColor() + "33")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                        onClick={() =>
                          handleDetailsClick(appointment.reasonForRemote)
                        }
                      >
                        View More
                      </button>
                    </>
                  ) : (
                    appointment.reasonForRemote
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 w-[15%] justify-end">
        <button
          className="text-gray-600 hover:text-[#6F84F8]"
          onClick={() => handleEdit(appointment)}
          aria-label="Edit Appointment"
        >
          <BiEditAlt className="w-6 h-6" />
        </button>

        <GoTrash
          className="w-6 h-6 text-gray-600 hover:text-[#F57070] cursor-pointer"
          aria-label="Delete Appointment"
          onClick={() => setOpenDeletePopup(true)}
        />
      </div>

      {openDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white p-6 w-fit rounded-xl shadow-lg">
            <p className="text-black font-semibold">
              Are you sure you want to delete this appointment?
            </p>
            <div className="mt-4 text-gray-500 text-sm">
              <span className="text-black">Note:</span> The respective HCM will
              be notified about this.
            </div>
            <div className="mt-5 flex justify-end space-x-4">
              <button
                className="px-3 py-1 text-sm border-2 border-red-300 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white"
                onClick={() => setOpenDeletePopup(false)}
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
  );
};

export default AppointmentCard2;
