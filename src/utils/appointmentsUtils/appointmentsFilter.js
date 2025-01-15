export const appointmentFilter = (appointments) => {
  // console.log(appointments);
  return appointments
    .map((appointment) => {
      const {
        // date,
        startTime,
        endTime,
        service,
        from,
        with: personWith,
        status,
        hcmId,
        tenantId,
        activity,
      } = appointment;

      // Ensure startTime and endTime are valid Date objects
      const start = new Date(startTime);
      const end = new Date(endTime);

      // Validate the parsed dates
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.warn(
          `Invalid startTime or endTime for appointment: ${JSON.stringify(appointment)}`
        );
        return null; // Skip invalid appointments
      }

      // Construct the standardized appointment object
      return {
        title: `${from} with ${personWith}`, // Title of the event
        start, // Start time of the appointment
        end, // End time of the appointment
        description: `${service} - ${activity}`, // Description
        status, // Appointment status
        hcmId,
        tenantId,
      };
    })
    .filter(Boolean); // Remove null entries
};
