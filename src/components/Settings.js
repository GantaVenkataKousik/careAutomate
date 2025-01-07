import React, { useState } from "react";
import Security from "./settings/Security";
import ChildAccountDetails from "./settings/ChildAccountDetails";
import Preferences from "./settings/Preferences";

export default function Settings() {
  const [selectedOption, setSelectedOption] = useState("Child Accounts");

  const menuOptions = ["Child Accounts", "Security", "Preferences"];

  return (
    <>
      <div
        style={{
          color: "black",
          fontWeight: 600,
          fontFamily: "Poppins",
          paddingLeft: "1rem",
          borderBottom: "2px solid #ccc",
        }}
      >
        <h1 style={{ fontSize: "1.8rem" }}>Settings</h1>
      </div>
      <div style={{ display: "flex", padding: "1rem" }}>
        {/* Sidebar */}
        <div
          style={{
            width: "300px",
            display: "flex",
            flexDirection: "column",
            // height: "100%",
            paddingRight: "1rem",
            height: "78vh",
          }}
        >
          {menuOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedOption(option)}
              style={{
                padding: "1rem",
                fontSize: "1rem",
                textAlign: "left",
                backgroundColor:
                  selectedOption === option ? "#6f84f8" : "transparent",
                border: "none",
                outline: "none",
                cursor: "pointer",
                fontWeight: selectedOption === option ? 600 : 400,
                color: selectedOption === option ? "white" : "black",
                borderRadius: "0.5rem",
              }}
            >
              {option}
            </button>
          ))}
        </div>

        <div
          style={{
            padding: "1rem",
            flex: 1,
            borderLeft: "2px solid #ccc",
          }}
        >
          {/* {selectedOption === "Personal Details" && <PersonalDetails />} */}
          {selectedOption === "Child Accounts" && <ChildAccountDetails />}
          {selectedOption === "Security" && <Security />}

          {selectedOption === "Preferences" && <Preferences />}
        </div>
      </div>
    </>
  );
}
