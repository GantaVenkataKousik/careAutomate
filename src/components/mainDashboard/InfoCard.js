import React from "react";

const InfoCard = ({ count, description, icon }) => {
  return (
    <div className="flex p-6 items-center border-2 rounded-3xl justify-between shadow-md w-52">
      <div className="flex items-center">
        {/* Count */}
        <p className="text-[#6F84F8] text-3xl font-bold mr-4">{count}</p>

        {/* Description */}
        <p className="text-base text-gray-700 font-medium leading-snug">
          {description}
        </p>
      </div>

      {/* Icon */}
      {icon && <div className="ml-4">{icon}</div>}
    </div>
  );
};

export default InfoCard;
