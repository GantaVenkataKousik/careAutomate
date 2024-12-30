import React, { useState } from "react";
import ChildAdminAccountForm from "./ChildAdminAccountForm";

const ChildAccountDetails = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="m-6 border-2 border-gray-390 rounded-xl p-5">
      {/*Header*/}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center pb-3">
          <div className="bg-[#6F84F8] w-3 rounded-[20px] h-10"></div>
          <h2 className="text-xl font-semibold ">Child Accounts</h2>
        </div>

        <button
          className={`text-white p-2 px-5 rounded-full ${showForm ? "bg-[#F57070]" : "bg-[#6F84F8]"} `}
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          {showForm ? "x Close" : "+ Add"}
        </button>
      </div>

      {/**FormTab */}
      {showForm && <ChildAdminAccountForm />}
    </div>
  );
};

export default ChildAccountDetails;
