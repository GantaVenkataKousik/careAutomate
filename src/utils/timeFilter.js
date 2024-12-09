export const today = new Date();
export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatTime = (timeString) => {
  const date = new Date(timeString); // Create a Date object from the time string
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12; // Convert to 12-hour format
  hours = hours ? hours : 12; // The hour '0' should be '12'
  const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
  return formattedTime;
};
export const formatTime24Hours = (timeString) => {
  const date = new Date(timeString); // Create a Date object from the time string
  const hours = date.getHours();
  const minutes = date.getMinutes();
  // Format the time in HH:mm format
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  return formattedTime;
};
