import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

// Extend dayjs with the UTC plugin
dayjs.extend(utc);

export const applyVisitsFilters = (visitData, activeFilters) => {
  // Return an empty array if visitData is null/undefined or activeFilters is null/undefined
  if (!visitData || !activeFilters) {
    return [];
  }

  // Start with a copy of the original data
  let filteredData = [...visitData];

  // Date filtering
  if (activeFilters.startDate || activeFilters.endDate) {
    filteredData = filteredData.filter((visit) => {
      const visitDate = dayjs(visit.dos).utc(); // Convert visit date to UTC
      const start = activeFilters.startDate
        ? dayjs(activeFilters.startDate).utc() // Convert start date to UTC
        : null;
      const end = activeFilters.endDate
        ? dayjs(activeFilters.endDate).utc()
        : null; // Convert end date to UTC

      // Handle date comparisons
      if (start && end && start.isSame(end)) {
        return visitDate.isSame(start);
      } else if (start && end) {
        return (
          visitDate.isSame(start) ||
          visitDate.isSame(end) ||
          (visitDate.isAfter(start) && visitDate.isBefore(end))
        );
      } else if (start) {
        return visitDate.isSame(start) || visitDate.isAfter(start);
      } else if (end) {
        return visitDate.isSame(end) || visitDate.isBefore(end);
      }
      return true;
    });
  }

  // Tenant and HCM filtering
  if (
    activeFilters.tenant &&
    activeFilters.tenant.length > 0 &&
    activeFilters.hcm &&
    activeFilters.hcm.length > 0
  ) {
    filteredData = filteredData.filter(
      (visit) =>
        visit.tenantId &&
        activeFilters.tenant.includes(visit.tenantId) &&
        visit.hcmId &&
        activeFilters.hcm.includes(visit.hcmId)
    );
  } else {
    if (activeFilters.tenant && activeFilters.tenant.length > 0) {
      filteredData = filteredData.filter(
        (visit) =>
          visit.tenantId && activeFilters.tenant.includes(visit.tenantId)
      );
    }

    if (activeFilters.hcm && activeFilters.hcm.length > 0) {
      filteredData = filteredData.filter(
        (visit) => visit.hcmId && activeFilters.hcm.includes(visit.hcmId)
      );
    }
  }

  // Status filtering
  if (activeFilters.status && activeFilters.status.length > 0) {
    filteredData = filteredData.filter((visit) => {
      return (
        visit.status &&
        activeFilters.status.some(
          (filterStatus) =>
            filterStatus.toLowerCase() === visit.status.toLowerCase()
        )
      );
    });
  }

  // Return the filtered data or an empty array if no matches found
  console.log("fiter", filteredData);
  return filteredData.length > 0 ? filteredData : [];
};
