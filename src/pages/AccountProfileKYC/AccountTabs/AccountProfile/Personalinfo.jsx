/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { CustomTextField } from "components/UI/index";

import "./Personalinfo.scss";

// Formik
import { Formik, Form } from "formik";

import { getProfileApi } from "../../../../frontend-api-service/Api/Futures";

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [kycStatus, setKycStatus] = useState("");

  const navigate = useNavigate();

  // Initial Value
  const [initialValues, setInitialValues] = useState({
    nameAsPerPAN: "",
    firstName: "",
    lastName: "",
    panNumber: "",
    email: "",
    dob: ""
  });

  function formatTimefromTimestamp(timestamp) {
    return [timestamp.getDate(),
      timestamp.getMonth() + 1,
      timestamp.getFullYear()].join("/");
  }

  useEffect(() => {
    getProfileApi()
      .then((successResponse) => {
        const loggedInUser = successResponse.data.user;
        setInitialValues({ firstName: loggedInUser.firstName, lastName: loggedInUser.lastName, dob: loggedInUser.dob && formatTimefromTimestamp(new Date(loggedInUser.dob)), panNumber: loggedInUser.panNumber, nameAsPerPAN: loggedInUser.nameAsPerPAN, email: loggedInUser.email });
        setKycStatus(loggedInUser.kyc_status);
      })
      .catch(() => {
        navigate("/");
      });
  }
  , []);

  return (
    <>
      <Box className="profileInfo">
        <Box className="profileInfoInner">
          <h1 className="profileInfoTitle">Personal Information</h1>
          <Stack direction="row" className="stack">
            <Avatar className="Avatar"></Avatar>
          </Stack>
          <Formik enableReinitialize={true} initialValues={initialValues}>
            {() => (
              <Form id="Personal-form">
                <Box className="between-align">
                  <Box className="textPrimary">
                    <h6>KYC Status: </h6>
                  </Box>
                  <Box className="verifiedLinks">
                    {kycStatus === "pending" && <p className="success pointer">In Progress</p>}
                    {kycStatus === "not_verified" && <p onClick={() => navigate("/update-account-details-kyc-initiate")} className="pointer">Verify Now</p>}
                    {kycStatus === "failed" && <p onClick={() => navigate("/update-account-details-kyc-initiate")} className="error pointer">Failed</p>}
                    {kycStatus === "verified" && <p className="success pointer">Verifed</p>}
                  </Box>
                </Box>
                <CustomTextField name="nameAsPerPAN" label="Name as per PAN" placeholder="Please enter your first name" Required disabled/>
                <CustomTextField name="firstName" label="First name" placeholder="Please enter your last name" Required disabled/>
                <CustomTextField name="lastName" label="Last name" placeholder="Doe" Required disabled/>
                <CustomTextField name="email" label="Email ID" placeholder="Doe" Required disabled/>
                <CustomTextField name="panNumber" label="PAN Number" placeholder="Doe" Required disabled/>
                <CustomTextField name="dob" label="Date of Birth" placeholder="Doe" Required disabled/>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};
export default Signup;
