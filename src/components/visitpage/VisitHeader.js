import React from "react";
import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { IoCalendar, IoList } from "react-icons/io5";

const VisitHeader = ({
  isListView,
  setIsListView,
  setOpenNewVisitPopup,
  visitCount,
}) => {
  return (
    <div className="shadow-sm pb-3">
      <div className="flex items-center justify-between ">
        <h1 style={styles.header} className="text-2xl flex items-center gap-2">
          <span>Visits</span>
          <span className="h-9 w-9 flex items-center justify-center rounded-full font-bold text-lg p-2 bg-[#6F84F8] text-white">
            {visitCount}
          </span>
        </h1>
        <div className="flex items-center justify-center gap-2">
          <div className="flex bg-gray-200 rounded-2xl p-1  w-fit mr-6">
            {/* Calendar Button */}
            <button
              onClick={() => setIsListView(false)}
              className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
                !isListView ? "bg-white text-[#6F84F8]" : "text-gray-600"
              }`}
            >
              <IoCalendar className="text-2xl" />
            </button>

            {/* List Button */}
            <button
              onClick={() => setIsListView(true)}
              className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
                isListView ? "bg-white text-[#6F84F8]" : "text-gray-600"
              }`}
            >
              <IoList className="text-2xl" />
            </button>
          </div>

          <Button
            style={{
              marginRight: "10px",
              borderRadius: "20px",
              fontFamily: "Poppins",
              background: "none",
              color: "#505254",
              border: "2px solid #6F84F8",
              padding: "5px 30px",
              fontSize: "1rem",
            }}
            onClick={{}}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#6F84F8";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "#505254";
            }}
          >
            Export{" "}
          </Button>
          <Button
            style={{
              marginRight: "10px",
              borderRadius: "20px",
              fontFamily: "Poppins",
              background: "none",
              color: "#505254",
              border: "2px solid #6F84F8",
              padding: "5px 30px",
              fontSize: "1rem",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
            onClick={() => setOpenNewVisitPopup(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#6F84F8";
              e.currentTarget.style.color = "white";

              const icon = e.currentTarget.querySelector("svg");
              if (icon) icon.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "#505254";

              const icon = e.currentTarget.querySelector("svg");
              if (icon) icon.style.color = "#6F84F8";
            }}
          >
            <FaPlus
              style={{
                marginRight: "0.5rem",
                color: "#6F84F8",
                transition: "color 0.3s ease",
              }}
            />
            New Visit
          </Button>
        </div>
      </div>
    </div>
  );
};
const styles = {
  header: {
    fontWeight: "bold",
    marginBottom: "20px",
  },
};
export default VisitHeader;
