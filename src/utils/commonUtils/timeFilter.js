export function formatTimeFormate(dateTime, format = "MM-DD-YYYY") {
  const date = new Date(dateTime);

  const padZero = (num) => String(num).padStart(2, "0");

  const tokens = {
    YYYY: date.getFullYear(),
    MM: padZero(date.getMonth() + 1), // Months are zero-based
    DD: padZero(date.getDate()),
    HH: padZero(date.getHours()),
    mm: padZero(date.getMinutes()),
    ss: padZero(date.getSeconds()),
  };

  // Replace format tokens with actual values
  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => tokens[match]);
}
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
