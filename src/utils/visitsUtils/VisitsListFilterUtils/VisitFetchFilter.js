import dayjs from "dayjs";

export const applyVisitsFilters = (visitData, activeFilters) => {
  // Return original data if no filters are active
  if (!activeFilters || !visitData) {
    return visitData;
  }

  // Start with a copy of the original data
  let filteredData = [...visitData];

  // Date filtering
  if (activeFilters.startDate || activeFilters.endDate) {
    filteredData = filteredData.filter((visit) => {
      const visitDate = dayjs(visit.dos);
      const start = activeFilters.startDate
        ? dayjs(activeFilters.startDate)
        : null;
      const end = activeFilters.endDate ? dayjs(activeFilters.endDate) : null;

      // Include the start and end dates in the range (inclusive)
      if (start && end) {
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

  // Tenant filtering
  if (activeFilters.tenant && activeFilters.tenant.length > 0) {
    filteredData = filteredData.filter(
      (visit) => visit.tenantId && activeFilters.tenant.includes(visit.tenantId)
    );
  }

  // HCM filtering
  if (activeFilters.hcm && activeFilters.hcm.length > 0) {
    filteredData = filteredData.filter(
      (visit) => visit.hcmId && activeFilters.hcm.includes(visit.hcmId)
    );
  }

  // Status filtering
  if (activeFilters.status && activeFilters.status.length > 0) {
    filteredData = filteredData.filter(
      (visit) =>
        visit.status &&
        activeFilters.status.includes(visit.status.toLowerCase())
    );
  }

  return filteredData;
};
