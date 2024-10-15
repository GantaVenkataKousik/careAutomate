import React from "react";

const SubStep6 = () =>{
    return (
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <h2 className="text-xl font-medium mb-4">Login Information</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
  <div>
    <label className="block text-gray-700" htmlFor="first-name">
       UserName
    </label>
    <input
      className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
      type="text"
      id="user-name"
      name="user-name"
      placeholder=""
      required
    />
  </div>

  <div>
    <label className="block text-gray-700" htmlFor="middle-name">
        Password
    </label>
    <input
      className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
      type="passowrd"
      id="password"
      name="passowrd"
      placeholder=""
    />
  </div>

  <div>
    <label className="block text-gray-700" htmlFor="last-name">
      Confirm Password
    </label>
    <input
      className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
      type="password"
      id="last-name"
      name="last-name"
      placeholder=""
      required
    />
  </div>
  
  

  
</div>
        </div>
    );
};

export default SubStep6;