// import { formatTime } from "./timeFilter";

export const appointmentFilter = (appointments) => {
  return appointments.map((appointment) => {
    const {
      date,
      time,
      service,
      from,
      with: personWith,
      status,
      hcmId,
      tenantId,
    } = appointment;

    // Helper function to parse date string and merge with time
    const parseDateTime = (dateString, timeString) => {
      // Parse the date string to a valid format
      const parsedDate = new Date(dateString.replace(",", ""));
      const [hours, minutes] = timeString.split(":").map(Number);
      parsedDate.setHours(hours);
      parsedDate.setMinutes(minutes);
      parsedDate.setSeconds(0);
      return parsedDate;
    };

    // Check if time length is less than 15 and merge with date
    if (time.length < 15) {
      const [start, end] = time.split("–").map((t) => t.trim());

      // Merge the date and time strings to create full Date objects
      const startTime = parseDateTime(date, start);
      const endTime = parseDateTime(date, end);
      return {
        title: service, // Title of the event
        start: startTime, // Start time of the appointment
        end: endTime, // End time of the appointment
        description: `${from} with ${personWith}`, // Description
        status: status, // Appointment status
        hcmId: hcmId,
        tenantId: tenantId,
      };
    }

    // Fallback logic for time with longer length if needed
    const [start, end] = time.split("–").map((t) => t.trim());
    const startTime = new Date(start);
    const endTime = new Date(end);

    return {
      title: service,
      start: startTime,
      end: endTime,
      description: `${from} with ${personWith}`,
      status: status,
    };
  });
};
