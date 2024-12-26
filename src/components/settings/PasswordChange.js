import React, { useState } from "react";
import { toast } from "react-toastify";
import { API_ROUTES } from "../../routes";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordChange = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleReset = () => {
    setPassword("");
    setConfirmPassword("");
    setPasswordStrength("");
    setPasswordMatch(true);
  };
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Check password strength
    if (value.length < 6) {
      setPasswordStrength("Weak (at least 6 characters)");
    } else if (!/[!@#$%^&*]/.test(value)) {
      setPasswordStrength("Medium (add special characters)");
    } else {
      setPasswordStrength("Strong");
    }

    // Check if password matches confirmPassword
    setPasswordMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // Update password match status
    setPasswordMatch(password === value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    // Proceed with the submission
    const payload = {
      email: email,
      password: password,
    };
    console.log("Submitting:", payload);

    try {
      const response = await fetch(`${API_ROUTES.AUTH.BASE}/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Password updated successfully!");
        // handleReset(); // Reset the form
      } else {
        toast.error(data.message || "Failed to update password.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the password.");
    }
  };
  return (
    <div className="m-5 p-5 border-2 border-gray-350 rounded-xl">
      <div className="flex gap-2 items-center pb-3 mx-10 mt-4">
        <div className="bg-[#6F84F8] w-2 rounded-[20px] h-8"></div>
        <h2 className="text-xl ">Change Password</h2>
      </div>
      <div>
        {/**form */}
        <form
          className="flex flex-col gap-2 mx-10 mt-4"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-5 items-center p-2 mt-5 w-2/3">
            <label htmlFor="email" className="text-xl w-1/3 ">
              Email :
            </label>
            <input
              type="email"
              value={email}
              disabled={true}
              className="border-2 border-gray-300 rounded-lg px-5 py-2 w-2/3 cursor-not-allowed"
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
                onChange={handlePasswordChange}
                className="border-2 border-gray-300 rounded-lg px-5 py-2 w-full"
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
          {passwordStrength && (
            <p className="text-sm text-gray-600 ml-16">
              Password strength: <span>{passwordStrength}</span>
            </p>
          )}

          <div className="flex gap-5 items-center p-2 mt-5 w-2/3">
            <label htmlFor="confirmPassword" className="text-xl w-1/3">
              Confirm Password:
            </label>
            <div className="relative w-2/3">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="border-2 border-gray-300 rounded-lg px-5 py-2 w-full"
                required
              />
              <span
                className="absolute top-2.5 right-3 cursor-pointer text-gray-500 hover:text-black"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <FaRegEye className="w-5 h-5" />
                ) : (
                  <FaRegEyeSlash className="w-5 h-5" />
                )}
              </span>
            </div>
          </div>
          {!passwordMatch && (
            <p className="text-sm text-red-500 ml-16">
              Passwords do not match.
            </p>
          )}
          <div className="flex items-center w-2/3">
            <button
              className=" cursor-pointer transition-all bg-[#F57070] text-white 
                    px-6 py-2 rounded-lg border-red-700 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] 
                    active:border-b-[2px] active:brightness-90 active:translate-y-[2px] 
                    py-3 px-6 w-full mt-4 mb-9 mr-8"
              onClick={handleReset}
            >
              Reset Changes
            </button>
            <button
              className=" cursor-pointer transition-all bg-[#6F84F8] text-white px-6 py-2 rounded-lg
                  border-blue-600
                  border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                  active:border-b-[2px] active:brightness-90 active:translate-y-[2px]  py-3 px-6 w-full mt-4  mb-9"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;
