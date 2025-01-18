import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

// Extend dayjs with required plugins
dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

/**
 * Filter appointments based on active filters
 * @param {Array} appointmentData - Array of appointment objects
 * @param {Object} activeFilters - Object containing active filter criteria
 * @param {Array} activeFilters.tenant - Array of tenant IDs
 * @param {Array} activeFilters.hcm - Array of HCM IDs
 * @param {Array} activeFilters.status - Array of status strings
 * @param {string} activeFilters.startDate - Start date string
 * @param {string} activeFilters.endDate - End date string
 * @returns {Array} Filtered appointments
 */
export const applyAppointmentFilters = (appointmentData, activeFilters) => {
  // Return empty array if appointmentData or activeFilters is null/undefined
  if (!appointmentData || !activeFilters) {
    return [];
  }

  // Start with a copy of the original data
  let filteredData = [...appointmentData];

  // Date filtering
  if (activeFilters.startDate || activeFilters.endDate) {
    filteredData = filteredData.filter((appointment) => {
      // Convert all dates to start of day for consistent comparison
      const appointmentDate = dayjs(appointment.startDate).startOf("day");
      const start = activeFilters.startDate
        ? dayjs(activeFilters.startDate).startOf("day")
        : null;
      const end = activeFilters.endDate
        ? dayjs(activeFilters.endDate).startOf("day")
        : null;

      // When start and end dates are the same
      if (start && end && start.isSame(end)) {
        return appointmentDate.isSame(start, "day");
      }

      // When both start and end dates are provided
      if (start && end) {
        return (
          appointmentDate.isSameOrAfter(start, "day") &&
          appointmentDate.isSameOrBefore(end, "day")
        );
      }

      // When only start date is provided
      if (start) {
        return appointmentDate.isSameOrAfter(start, "day");
      }

      // When only end date is provided
      if (end) {
        return appointmentDate.isSameOrBefore(end, "day");
      }

      return true;
    });
  }

  // Tenant and HCM filtering
  if (activeFilters.tenant?.length > 0 && activeFilters.hcm?.length > 0) {
    filteredData = filteredData.filter(
      (appointment) =>
        appointment.tenantId &&
        activeFilters.tenant.includes(appointment.tenantId) &&
        appointment.hcmId &&
        activeFilters.hcm.includes(appointment.hcmId)
    );
  } else {
    // Apply tenant filter if present
    if (activeFilters.tenant?.length > 0) {
      filteredData = filteredData.filter(
        (appointment) =>
          appointment.tenantId &&
          activeFilters.tenant.includes(appointment.tenantId)
      );
    }

    // Apply HCM filter if present
    if (activeFilters.hcm?.length > 0) {
      filteredData = filteredData.filter(
        (appointment) =>
          appointment.hcmId && activeFilters.hcm.includes(appointment.hcmId)
      );
    }
  }

  // Status filtering
  if (activeFilters.status?.length > 0) {
    filteredData = filteredData.filter(
      (appointment) =>
        appointment.status &&
        activeFilters.status.some(
          (filterStatus) =>
            filterStatus.toLowerCase() === appointment.status.toLowerCase()
        )
    );
  }

  // Optional: Sort filtered results by date and time
  filteredData.sort((a, b) => {
    const dateCompare =
      dayjs(a.startDate).valueOf() - dayjs(b.startDate).valueOf();
    if (dateCompare !== 0) return dateCompare;
    return dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf();
  });

  return filteredData.length > 0 ? filteredData : [];
};

/**
 * Helper function to format appointment filters before applying them
 * @param {Object} rawFilters - Raw filter values from the UI
 * @returns {Object} Formatted filters
 */
export const formatAppointmentFilters = (rawFilters) => {
  return {
    tenant: Array.isArray(rawFilters.tenant) ? rawFilters.tenant : [],
    hcm: Array.isArray(rawFilters.hcm) ? rawFilters.hcm : [],
    status: Array.isArray(rawFilters.status) ? rawFilters.status : [],
    startDate: rawFilters.startDate || null,
    endDate: rawFilters.endDate || null,
  };
};
