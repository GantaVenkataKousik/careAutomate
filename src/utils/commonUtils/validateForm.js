import { toast } from "react-toastify";

export const validateForm = (formData) => {
  let isValid = true;
  for (const field in formData) {
    if (!formData[field] && field !== "confirmPassword") {
      toast.error(`${field.replace(/([A-Z])/g, " $1")} cannot be blank.`);
      return false;
    }
  }

  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match.");
    isValid = false;
  }

  return isValid;
};
