// utils/hcmUtils.js
export const mapHcmDataToSchema = (hcmData) => {
  return {
    personalInfo: {
      firstName: hcmData.firstName,
      middleName: hcmData.middleName,
      lastName: hcmData.lastName,
      dob: hcmData.dob,
      gender: hcmData.gender,
    },
    contactInfo: {
      phoneNumber: hcmData.phoneNumber,
      email: hcmData.email,
      homePhone: hcmData.homePhone,
      cellPhone: hcmData.cellPhone,
    },
    addressInfo: {
      addressLine1: hcmData.addressLine1,
      addressLine2: hcmData.addressLine2,
      city: hcmData.city,
      state: hcmData.state,
      zipCode: hcmData.zipCode,
      mailingAddress: hcmData.mailingAddress,
    },
    employmentInfo: {
      employmentTitle: hcmData.employmentTitle,
      hireDate: hcmData.hireDate,
      terminationDate: hcmData.terminationDate,
      rateOfPay: parseFloat(hcmData.rateOfPay), // Ensure numeric conversion
      ssn: hcmData.ssn,
    },
    loginInfo: {
      email: hcmData.email,
      password: hcmData.password,
    },
  };
};
