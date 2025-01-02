export const formatFormData = (formData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const accountData = {
    firstName: formData.firstName || "",
    lastName: formData.lastName || "",
    companyName: formData.companyName || "",
    address: {
      addressLine1: formData.addressLine1 || "",
      addressLine2: formData.addressLine2 || "",
      city: formData.city || "",
      state: formData.state || "",
      zipCode: formData.zipCode || "",
    },
    contact: {
      officePhoneNumber: formData.officePhoneNumber || "",
      cellPhoneNumber: formData.cellPhoneNumber || "",
      primaryEmailAddress: formData.primaryEmail || "",
      alternateEmailAddress: formData.alternateEmail || "",
    },
    federalTaxId: formData.federalTaxId || "",
    idnpiUmpi: formData.npiUmpi || "",
    taxonomy: formData.Taxonomy || "",
    mnitsLogin: {
      username: formData.mnitsUserName || "",
      password: formData.mnitsPassword || "",
    },
    waystarLogin: {
      username: formData.WaystarUserName || "",
      password: formData.WaystarPassword || "",
    },
    childAdminAccounts: formData.childAccount
      ? [
          {
            firstName: formData.childFirstName || "",
            lastName: formData.childLastName || "",
            address: {
              addressLine1: formData.childAddressLine1 || "",
              addressLine2: formData.childAddressLine2 || "",
              city: formData.childCity || "",
              state: formData.childState || "",
              zipCode: formData.childZipCode || "",
            },
            contact: {
              officePhoneNumber: formData.childOfficePhoneNumber || "",
              cellPhoneNumber: formData.childCellPhoneNumber || "",
            },
            username: formData.childUsername || "",
            password: formData.childPassword || "",
            permissions: {
              billing: formData.billing || false,
              tenant: formData.tenant || false,
              hcm: formData.hcm || false,
              appointments: formData.appointments || false,
              visit: formData.visit || false,
              communication: formData.communication || false,
            },
          },
        ]
      : [],
    bankingInfo: {
      nameOnCard: formData.nameOnCard || "",
      cardNumber: formData.cardNumber || "",
      expiryDate: formData.expiryDate || "",
      billingAddress: {
        addressLine1:
          formData.billingAddressCheckBox === true
            ? formData.addressLine1
            : formData.billingAddress || "",
        addressLine2:
          formData.billingAddressCheckBox === true ? formData.addressLine2 : "",
        city: formData.billingCity || formData.city || "",
        state: formData.billingState || formData.state || "",
        zipCode: formData.billingZipCode || formData.zipCode || "",
      },
    },
  };

  return { accountData, adminId: userId };
};
