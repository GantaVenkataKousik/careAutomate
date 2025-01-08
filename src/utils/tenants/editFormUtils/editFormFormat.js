// utils/formUtils.js
import dayjs from "dayjs";

export const mapTenantToFormData = (tenant) => {
  const personalData = tenant?.tenantData?.personalInfo || {};
  const addressData = tenant?.tenantData?.address || {};
  const contactData = tenant?.tenantData?.contactInfo || {};
  const emergencyData = tenant?.tenantData?.emergencyContact || {};
  const admissionData = tenant?.tenantData?.admissionInfo || {};
  const caseManagerData = tenant?.tenantData?.caseManager || {};
  const responsiblePartyData = tenant?.tenantData?.responsibleParty || {};

  return {
    firstName: personalData?.firstName || "",
    middleName: personalData?.middleName || "",
    lastName: personalData?.lastName || "",
    dob: personalData?.dob ? dayjs(personalData?.dob) : null,
    maPMINumber: personalData?.maPMINumber || "",
    email: personalData?.email || "",
    // Address
    addressLine1: addressData?.addressLine1 || "",
    addressLine2: addressData?.addressLine2 || "",
    city: addressData?.city || "",
    state: addressData?.state || "",
    zipCode: addressData?.zipCode || "",
    mailingSameAsAbove: addressData?.mailingSameAsAbove || false,
    mailingDifferent: addressData?.mailingDifferent || false,
    // Contact
    phoneNumber: contactData?.phoneNumber || "",
    homePhone: contactData?.homePhone || "",
    cellPhone: contactData?.cellPhone || "",
    raceAndEthnicity: contactData?.raceAndEthnicity || "",
    // Emergency Contact
    emergencyFirstName: emergencyData?.firstName || "",
    emergencyMiddleName: emergencyData?.middleName || "",
    emergencyLastName: emergencyData?.lastName || "",
    emergencyPhoneNumber: emergencyData?.phoneNumber || "",
    emergencyEmail: emergencyData?.email || "",
    emergencyRelationship: emergencyData?.relationship || "",
    // Admission Info
    insurance: admissionData?.insurance || "",
    insuranceNumber: admissionData?.insuranceNumber || "",
    ssn: admissionData?.ssn || "",
    intakeDate: admissionData?.intakeDate
      ? dayjs(admissionData?.intakeDate)
      : null,
    letGoDate: admissionData?.letGoDate
      ? dayjs(admissionData?.letGoDate)
      : null,
    diagnosisCode: admissionData?.diagnosisCode || "",
    // Case Manager
    caseManagerFirstName: caseManagerData?.firstName || "",
    caseManagerMiddleName: caseManagerData?.middleInitial || "",
    caseManagerLastName: caseManagerData?.lastName || "",
    caseManagerPhoneNumber: caseManagerData?.phoneNumber || "",
    caseManagerEmail: caseManagerData?.email || "",
    // Responsible Party
    responsiblePartyFirstName: responsiblePartyData?.firstName || "",
    responsiblePartyMiddleName: responsiblePartyData?.middleName || "",
    responsiblePartyLastName: responsiblePartyData?.lastName || "",
    responsiblePartyPhoneNumber: responsiblePartyData?.phoneNumber || "",
    responsiblePartyEmail: responsiblePartyData?.email || "",
    responsiblePartyRelationship: responsiblePartyData?.relationship || "",
    // Login Info
    userName: tenant?.loginInfo?.userName || "",
    password: tenant?.loginInfo?.password || "",
    notes: tenant?.notes || [],
  };
};
