import React, { useState } from "react";
import "./AccountKYC.scss";
import { Box } from "@mui/material";
import { CustomTextField } from "components/UI/index";
import { Link } from "react-router-dom";

// Formik
import { Formik, Form } from "formik";

const AccountKYC = () => {
  const [kycVerify, setKycVerify] = useState(false);
  // Initial Value
  const initialValues = {
    firstname: "",
    lastname: "",
    country: "",
    adharno: "",
    panNo: ""
  };

  const kycSubmit = (value) => {};

  return (
    <Box className="accountkyc">
      <Box className="accountkycInner">
        {kycVerify
          ? (
          <Box>
            <h1 className="accountkycTitle">KYC Details</h1>
            <Box className="between-align" sx={{ mb: 3 }}>
              <Box className="textPrimary">
                <h6>KYC Status</h6>
              </Box>
              <Box className="verifiedLinks">
                <p className="error pointer">Not Verified</p>
              </Box>
            </Box>
            <Box component="p" className="textCenter texGray authMessage">
              Two Factor Authentication enabled. This helps keep your account safe. We strongly recommend you keep 2FA turned on.
            </Box>
            <Box>
              <Link to="/accountProfileKYC" className="buttonCommon backround">
                Verify KYC
              </Link>
            </Box>
          </Box>
            )
          : (
          <Box>
            <h1 className="accountkycTitle">Personal Information</h1>
            <Box className="between-align" sx={{ mb: 3 }}>
              <Box className="textPrimary">
                <h6>KYC Status</h6>
              </Box>
              <Box className="verifiedLinks">
                <p className="success pointer" onClick={() => setKycVerify(!kycVerify)}>
                  Verified
                </p>
              </Box>
            </Box>
            <Formik initialValues={initialValues} onSubmit={(value) => kycSubmit(value)}>
              {() => (
                <Form id="accountKyc-form">
                  <CustomTextField name="firstname" label="First name" placeholder="Please enter your first name" disabled />
                  <CustomTextField name="lastname" label="Last name" placeholder="Please enter your last name" disabled />
                  <CustomTextField name="country" label="Country" placeholder="mail@abc.com" disabled />
                  <CustomTextField name="adharno" label="Aadhar Number" placeholder="XXXX XXXX XXXX XXXX" disabled />
                  <CustomTextField name="panNo" label="PAN Number" placeholder="ABCDE1234F" disabled />
                </Form>
              )}
            </Formik>
          </Box>
            )}
      </Box>
    </Box>
  );
};

export default AccountKYC;
