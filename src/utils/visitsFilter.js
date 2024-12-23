//visitFilter.js
export const visitsFilter = (visitsData) => {
  return visitsData.map((visit) => {
    const {
      serviceType,
      duration,
      details,
      status,
      hcm,
      startDate,
      rejected,
      approved,
      dummy,
    } = visit;

    // Helper function to safely parse date strings
    const parseDateSafe = (dateString) => {
      const parsedDate = new Date(dateString);
      return isNaN(parsedDate.getTime()) ? null : parsedDate;
    };

    // Extract start and end times from the duration field if available
    let startTime = null;
    let endTime = null;

    if (duration) {
      const [start, end] = duration.split(" - ");
      startTime = parseDateSafe(`${startDate?.split("T")[0]}T${start}:00`);
      endTime = parseDateSafe(`${startDate?.split("T")[0]}T${end}:00`);
    }

    // Handle cases where `dummy` is provided instead of `start` and `end`
    if (!startTime && dummy) {
      const dummyDate = parseDateSafe(dummy);
      startTime = dummyDate;
    }

    // Fallback to `startDate` if neither `startTime` nor `dummy` is valid
    if (!startTime) {
      startTime = parseDateSafe(startDate);
    }

    // Ensure end time exists, even if derived from startTime
    if (!endTime && startTime) {
      endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 1); // Default duration of 1 hour
    }

    return {
      title: serviceType || "Service", // Default title if not provided
      start: startTime || null, // Full start date-time as Date object
      end: endTime || null, // Full end date-time
      description: `${details || "Details"} with ${hcm || "Person"}`, // Combine details and person
      status: status || "unknown", // Retain appointment status
      approved: !!approved, // Ensure boolean
      rejected: !!rejected, // Ensure boolean
    };
  });
};
