import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const WaystarLogin = () => {
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState("surya.abothula@gmail.com");
  const [password, setPassword] = useState("surya1234");
  const [showPassword, setShowPassword] = useState(false);

  const getInputProps = () => {
    if (editMode) {
      return { disabled: false, className: "border-2 border-gray-300" };
    } else {
      return { disabled: true, className: "text-[#6F84F8] bg-white" };
    }
  };

  // Optimized usage
  const { disabled, className } = getInputProps();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      console.log("Password and Confirm Password are same");
      return;
    }
    const payload = {
      email: email,
      password: password,
    };
    console.log("Waystar : ", payload);
  };
  return (
    <div className="m-6 border-2 border-gray-390 rounded-xl p-5 w-full">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center pb-3">
          <div className="bg-[#6F84F8] w-3 rounded-[20px] h-10"></div>
          <h2 className="text-xl font-semibold text-gray-600">Waystar Login</h2>
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
      {/* Inner Container */}
      <div className="m-5 p-5 border-2 border-gray-350 rounded-xl">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-5 items-center p-2 mt-5 w-2/3">
            <label htmlFor="email" className="text-xl w-1/3">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={disabled}
              className={`rounded-lg px-5 py-2 w-2/3 ${className}`}
            />
          </div>
          <div className="flex gap-5 items-center p-2 mt-5 w-2/3">
            <label htmlFor="password" className="text-xl w-1/3">
              Password:
            </label>
            <div className="relative w-2/3">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={disabled}
                className={`rounded-lg px-5 py-2 w-full ${className}`}
                required
              />
              <span
                className="absolute top-2.5 right-3 cursor-pointer text-gray-500 hover:text-black"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <FaRegEye className="w-5 h-5" />
                ) : (
                  <FaRegEyeSlash className="w-5 h-5" />
                )}
              </span>
            </div>
          </div>

          {/**Buttons div */}
          {editMode && (
            <div className="flex items-center w-2/3">
              <button
                className=" cursor-pointer   text-[#F57070] rounded-lg border-[#F57070] border-2 py-3 px-6 w-full mt-4 mb-9 mr-8 hover:bg-[#F57070] hover:text-white"
                onClick={() => setEditMode((prev) => !prev)}
              >
                Reset Changes
              </button>
              <button
                className=" cursor-pointer   text-[#6F84F8] rounded-lg border-[#6F84F8] border-2 py-3 px-6 w-full mt-4 mb-9 mr-8 hover:bg-[#6F84F8] hover:text-white"
                type="submit"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default WaystarLogin;
