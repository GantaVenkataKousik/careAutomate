import dayjs from "dayjs";

export const getChangedFields = (formData, tenant) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const personalData = tenant?.tenantData?.personalInfo || {};
  const addressData = tenant?.tenantData?.address || {};
  const contactData = tenant?.tenantData?.contactInfo || {};
  const emergencyData = tenant?.tenantData?.emergencyContact || {};
  const admissionData = tenant?.tenantData?.admissionInfo || {};
  const caseManagerData = tenant?.tenantData?.caseManager || {};
  const responsiblePartyData = tenant?.tenantData?.responsibleParty || {};
  const changedFields = {
    personalInfo: {},
    address: {},
    contactInfo: {},
    emergencyContact: {},
    admissionInfo: {},
    caseManager: {},
    responsibleParty: {},
  };
  // Helper function to check if an object is empty
  const isEmpty = (obj) => Object.keys(obj).length === 0;

  // Personal Info
  if (formData.firstName !== personalData?.firstName)
    changedFields.personalInfo.firstName = formData.firstName;
  if (formData.middleName !== personalData?.middleName)
    changedFields.personalInfo.middleName = formData.middleName;
  if (formData.lastName !== personalData?.lastName)
    changedFields.personalInfo.lastName = formData.lastName;
  if (!dayjs(formData.dob).isSame(dayjs(personalData?.dob)))
    changedFields.personalInfo.dob = formData.dob;
  if (formData.maPMINumber !== personalData?.maPMINumber)
    changedFields.personalInfo.maPMINumber = formData.maPMINumber;

  // Address
  if (formData.addressLine1 !== addressData?.addressLine1)
    changedFields.address.addressLine1 = formData.addressLine1;
  if (formData.addressLine2 !== addressData?.addressLine2)
    changedFields.address.addressLine2 = formData.addressLine2;
  if (formData.city !== addressData?.city)
    changedFields.address.city = formData.city;
  if (formData.state !== addressData?.state)
    changedFields.address.state = formData.state;
  if (formData.zipCode !== addressData?.zipCode)
    changedFields.address.zipCode = formData.zipCode;

  // Contact Info
  if (formData.phoneNumber !== contactData?.phoneNumber)
    changedFields.contactInfo.phoneNumber = formData.phoneNumber;
  if (formData.email !== contactData?.email)
    changedFields.contactInfo.email = formData.email;
  if (formData.homePhone !== contactData?.homePhone)
    changedFields.contactInfo.homePhone = formData.homePhone;
  if (formData.cellPhone !== contactData?.cellPhone)
    changedFields.contactInfo.cellPhone = formData.cellPhone;

  // Emergency Contact
  if (formData.emergencyFirstName !== emergencyData?.firstName)
    changedFields.emergencyContact.firstName = formData.emergencyFirstName;
  if (formData.emergencyMiddleName !== emergencyData?.middleName)
    changedFields.emergencyContact.middleName = formData.emergencyMiddleName;
  if (formData.emergencyLastName !== emergencyData?.lastName)
    changedFields.emergencyContact.lastName = formData.emergencyLastName;
  if (formData.emergencyPhoneNumber !== emergencyData?.phoneNumber)
    changedFields.emergencyContact.phoneNumber = formData.emergencyPhoneNumber;
  if (formData.emergencyEmail !== emergencyData?.email)
    changedFields.emergencyContact.email = formData.emergencyEmail;
  if (formData.emergencyRelationship !== emergencyData?.relationship)
    changedFields.emergencyContact.relationship =
      formData.emergencyRelationship;

  // Admission Info
  if (formData.insurance !== admissionData?.insurance)
    changedFields.admissionInfo.insurance = formData.insurance;
  if (formData.insuranceNumber !== admissionData?.insuranceNumber)
    changedFields.admissionInfo.insuranceNumber = formData.insuranceNumber;
  if (formData.ssn !== admissionData?.ssn)
    changedFields.admissionInfo.ssn = formData.ssn;
  if (!dayjs(formData.intakeDate).isSame(dayjs(admissionData?.intakeDate)))
    changedFields.admissionInfo.intakeDate = formData.intakeDate;
  if (!dayjs(formData.letGoDate).isSame(dayjs(admissionData?.letGoDate)))
    changedFields.admissionInfo.letGoDate = formData.letGoDate;
  if (formData.diagnosisCode !== admissionData?.diagnosisCode)
    changedFields.admissionInfo.diagnosisCode = formData.diagnosisCode;

  // Case Manager
  if (formData.caseManagerFirstName !== caseManagerData?.firstName)
    changedFields.caseManager.firstName = formData.caseManagerFirstName;
  if (formData.caseManagerMiddleName !== caseManagerData?.middleInitial)
    changedFields.caseManager.middleName = formData.caseManagerMiddleName;
  if (formData.caseManagerLastName !== caseManagerData?.lastName)
    changedFields.caseManager.lastName = formData.caseManagerLastName;
  if (formData.caseManagerPhoneNumber !== caseManagerData?.phoneNumber)
    changedFields.caseManager.phoneNumber = formData.caseManagerPhoneNumber;
  if (formData.caseManagerEmail !== caseManagerData?.email)
    changedFields.caseManager.email = formData.caseManagerEmail;

  // Responsible Party
  if (formData.responsiblePartyFirstName !== responsiblePartyData?.firstName)
    changedFields.responsibleParty.firstName =
      formData.responsiblePartyFirstName;
  if (formData.responsiblePartyMiddleName !== responsiblePartyData?.middleName)
    changedFields.responsibleParty.middleName =
      formData.responsiblePartyMiddleName;
  if (formData.responsiblePartyLastName !== responsiblePartyData?.lastName)
    changedFields.responsibleParty.lastName = formData.responsiblePartyLastName;
  if (
    formData.responsiblePartyPhoneNumber !== responsiblePartyData?.phoneNumber
  )
    changedFields.responsibleParty.phoneNumber =
      formData.responsiblePartyPhoneNumber;
  if (formData.responsiblePartyEmail !== responsiblePartyData?.email)
    changedFields.responsibleParty.email = formData.responsiblePartyEmail;
  if (
    formData.responsiblePartyRelationship !== responsiblePartyData?.relationship
  )
    changedFields.responsibleParty.relationship =
      formData.responsiblePartyRelationship;

  // Filter out empty sections
  Object.keys(changedFields).forEach(
    (key) => isEmpty(changedFields[key]) && delete changedFields[key]
  );
  const result = {
    updatedById: userId,
    tenantData: changedFields,
    email: contactData?.email,
  };
  return result;
};
