/**
 * Converts local time and date to UTC ISO string.
 *
 * @param {string} date - The local date in "YYYY-MM-DD" format.
 * @param {string} time - The local time in "HH:mm" format.
 * @returns {string} - The UTC time string in ISO format.
 */
export const convertToUTCString = (date, time) => {
  if (!date || !time) {
    throw new Error("Both date and time must be provided.");
  }

  // Combine date and time into a single string
  const localDateTime = new Date(`${date}T${time}:00`);

  if (isNaN(localDateTime.getTime())) {
    throw new Error("Invalid date or time format.");
  }

  // Convert to UTC and return the ISO string
  return localDateTime.toISOString();
};

/**
 * Converts a local Date object to a UTC ISO string.
 *
 * @param {Date} date - The local Date object.
 * @returns {string} - The UTC date string in ISO format.
 */
export function convertDateToUTCString(date) {
  if (!date || !(date instanceof Date)) {
    throw new Error("A valid Date object must be provided.");
  }

  // Adjust to UTC by considering the local time zone offset
  const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

  // Return the UTC ISO string (only the date part)
  console.log(utcDate);
  return utcDate.toISOString(); // We only need the date, so we split at 'T'
}

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
  const date = new Date(timeString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return date;
};
export const formatTime24Hours = (timeString) => {
  const date = new Date(timeString); // Create a Date object from the time string
  const hours = date.getHours();
  const minutes = date.getMinutes();
  // Format the time in HH:mm format
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  return formattedTime;
};
