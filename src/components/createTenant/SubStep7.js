import React from "react";

const SubStep7 = () =>{
    return (
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <h2 className="text-xl font-medium mb-4">Responsible Party Information</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
  <div>
    <label className="block text-gray-700" htmlFor="first-name">
      First Name
    </label>
    <input
      className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
      type="text"
      id="first-name"
      name="first-name"
      placeholder=""
      required
    />
  </div>

  <div>
    <label className="block text-gray-700" htmlFor="middle-name">
      Middle Name
    </label>
    <input
      className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
      type="text"
      id="middle-name"
      name="middle-name"
      placeholder=""
    />
  </div>

  <div>
    <label className="block text-gray-700" htmlFor="last-name">
      Last Name
    </label>
    <input
      className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
      type="text"
      id="last-name"
      name="last-name"
      placeholder=""
      required
    />
  </div>
  

  
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
  <div>
    <label className="block text-gray-700" htmlFor="first-name">
      Phone Number
    </label>
    <input
      className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
      type="text"
      id="first-name"
      name="first-name"
      placeholder=""
      required
    />
  </div>

  <div>
    <label className="block text-gray-700" htmlFor="middle-name">
      Email
    </label>
    <input
      className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
      type="text"
      id="middle-name"
      name="middle-name"
      placeholder=""
    />
  </div>

  <div>
    <label className="block text-gray-700" htmlFor="last-name">
      Relationship
    </label>
    <input
      className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
      type="text"
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

export default SubStep7;