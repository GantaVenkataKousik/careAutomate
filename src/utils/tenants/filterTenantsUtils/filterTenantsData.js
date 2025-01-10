// utils/filterUtils.js
export const applyTenantFilters = (tenants, filters, searchQuery) => {
  if (!Array.isArray(tenants)) return [];

  return tenants.filter((tenant) => {
    // Basic data validation
    if (!tenant?.tenantData) return false;

    // Destructure for cleaner code
    const { personalInfo, admissionInfo, address, contactInfo } =
      tenant.tenantData;

    // Apply insurance filter
    const insuranceMatch =
      !filters.insurances.length ||
      filters.insurances.includes(admissionInfo?.insurance?.toLowerCase());

    // Apply city filter
    const cityMatch =
      !filters.cities.length || filters.cities.includes(address?.city);

    // Apply service type filter (if you have service data in your tenant object)
    const serviceMatch =
      !filters.services.length ||
      (tenant.services &&
        filters.services.some((service) => tenant.services.includes(service)));

    // Apply search query
    const searchMatch =
      !searchQuery ||
      [
        personalInfo?.firstName,
        personalInfo?.lastName,
        contactInfo?.phoneNumber || tenant.phoneNo,
        personalInfo?.email || tenant.email,
        admissionInfo?.maPMINumber || personalInfo?.maPMINumber,
        admissionInfo?.insuranceNumber,
      ].some((field) =>
        field?.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return insuranceMatch && cityMatch && serviceMatch && searchMatch;
  });
};
