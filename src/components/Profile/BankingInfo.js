import React, { useState } from "react";
import BankCard from "./BankCard";

const BankingInfo = () => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="m-6 border-2 border-gray-390 rounded-xl p-5 w-full">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center pb-3">
          <div className="bg-[#6F84F8] w-3 rounded-[20px] h-10"></div>
          <h2 className="text-xl font-semibold text-gray-600">
            Banking Information
          </h2>
        </div>
        <button
          className={`text-white p-2 px-5 rounded-full ${editMode ? "bg-[#F57070]" : "bg-[#6F84F8]"} `}
          onClick={() => {
            setEditMode(!editMode);
          }}
        >
          {editMode ? "Cancel" : "Edit"}
        </button>
      </div>
      <BankCard editMode={editMode} />
    </div>
  );
};

export default BankingInfo;
