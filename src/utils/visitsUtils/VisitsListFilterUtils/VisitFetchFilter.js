import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

// Extend dayjs with required plugins
dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const applyVisitsFilters = (visitData, activeFilters) => {
  // Return an empty array if visitData or activeFilters is null/undefined
  if (!visitData || !activeFilters) {
    return [];
  }

  // Start with a copy of the original data
  let filteredData = [...visitData];

  // Date filtering
  if (activeFilters.startDate || activeFilters.endDate) {
    filteredData = filteredData.filter((visit) => {
      // Convert all dates to start of day for consistent comparison
      const visitDate = dayjs(visit.dos).startOf("day");
      const start = activeFilters.startDate
        ? dayjs(activeFilters.startDate).startOf("day")
        : null;
      const end = activeFilters.endDate
        ? dayjs(activeFilters.endDate).startOf("day")
        : null;

      // When start and end dates are the same
      if (start && end && start.isSame(end)) {
        return visitDate.isSame(start, "day");
      }

      // When both start and end dates are provided
      if (start && end) {
        return (
          visitDate.isSameOrAfter(start, "day") &&
          visitDate.isSameOrBefore(end, "day")
        );
      }

      // When only start date is provided
      if (start) {
        return visitDate.isSameOrAfter(start, "day");
      }

      // When only end date is provided
      if (end) {
        return visitDate.isSameOrBefore(end, "day");
      }

      return true;
    });
  }

  // Tenant and HCM filtering
  if (activeFilters.tenant?.length > 0 && activeFilters.hcm?.length > 0) {
    filteredData = filteredData.filter(
      (visit) =>
        visit.tenantId &&
        activeFilters.tenant.includes(visit.tenantId) &&
        visit.hcmId &&
        activeFilters.hcm.includes(visit.hcmId)
    );
  } else {
    if (activeFilters.tenant?.length > 0) {
      filteredData = filteredData.filter(
        (visit) =>
          visit.tenantId && activeFilters.tenant.includes(visit.tenantId)
      );
    }

    if (activeFilters.hcm?.length > 0) {
      filteredData = filteredData.filter(
        (visit) => visit.hcmId && activeFilters.hcm.includes(visit.hcmId)
      );
    }
  }

  // Status filtering
  if (activeFilters.status?.length > 0) {
    filteredData = filteredData.filter(
      (visit) =>
        visit.status &&
        activeFilters.status.some(
          (filterStatus) =>
            filterStatus.toLowerCase() === visit.status.toLowerCase()
        )
    );
  }

  return filteredData.length > 0 ? filteredData : [];
};
