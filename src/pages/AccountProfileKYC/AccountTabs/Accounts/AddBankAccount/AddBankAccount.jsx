/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { CustomTextField, CommonButton } from "components/UI/index";

import "./add-bank-account.scss";

// Formik
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Regx } from "utils/constants";

import { useSelector, useDispatch } from "react-redux";

import { addBankAccountApi } from "../../../../../frontend-api-service/Api/KYCHelpers";
import { getProfileApi } from "../../../../../frontend-api-service/Api";
import { setProfileDetails } from "../../../../../frontend-BL/redux/actions/User/SetProfile.ac";

import PropTypes from "prop-types";

import "../../AccountSecurity/Security.scss";

// Validation
const validationSchema = Yup.object().shape({
  accountNumber: Yup.string().required("Account Number is required"),
  ifsc: Yup.string()
    .required("IFSC Code is Required")
    .matches(Regx.ifscRegExp, "Enter valid IFSC Code")
});

const AddBankAccount = ({ action }) => {
  const userProfileDetails = useSelector(
    (state) => state.profile.profileDetails
  );
  const dispatch = useDispatch();

  const [isBankAccountDetailsSet, setIsBankAccountDetailsSet] = useState(false);

  useEffect(() => {
    const isBankAccountAdded =
      userProfileDetails && userProfileDetails.userBankAccount
        ? Object.keys(userProfileDetails.userBankAccount).length > 0
        : false;
    if (isBankAccountAdded) {
      setIsBankAccountDetailsSet(isBankAccountAdded);
      setInitialValues({
        accountNumber:
          userProfileDetails &&
          userProfileDetails.userBankAccount &&
          userProfileDetails.userBankAccount.accountNumber,
        ifsc:
          userProfileDetails &&
          userProfileDetails.userBankAccount &&
          userProfileDetails.userBankAccount.ifsc
      });
    }
    if (userProfileDetails.pennydrop_status === "pending") {
      action();
    }
  }, []);

  // Initial Value
  const [initialValues, setInitialValues] = useState({
    // accountHolder: "",
    accountNumber: "",
    ifsc: ""
  });

  const accountSubmit = (value) => {
    addBankAccountApi(
      JSON.stringify({ accountNumber: value.accountNumber, ifsc: value.ifsc })
    ).then(() => {
      getProfileApi().then((successResponse) => {
        dispatch(setProfileDetails(successResponse));
        setIsBankAccountDetailsSet(true);
        action();
      });
    });
  };

  return (
    <React.Fragment>
      <Box className="loginWrap">
        <Box className="loginWrapInner">
          <h1 className="securityTitle">Your Bank Account Details</h1>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={(value) => accountSubmit(value)}
          >
            {() => (
              <Form id="bankAccount-form">
                <Box className="between-align">
                  <Box className="textPrimary">
                    <h6>Verification status: </h6>
                  </Box>
                  <Box className="verifiedLinks">
                    {userProfileDetails.pennydrop_status === "pending" && (
                      <p className="success">pending</p>
                    )}
                    {userProfileDetails.pennydrop_status === "not_verified" && (
                      <p className="pointer">not verified</p>
                    )}
                    {userProfileDetails.pennydrop_status === "failed" && (
                      <p className="error pointer">failed</p>
                    )}
                    {userProfileDetails.pennydrop_status === "verified" && (
                      <p className="pointer">verifed</p>
                    )}
                  </Box>
                </Box>
                <CustomTextField
                  name="accountNumber"
                  disabled={
                    isBankAccountDetailsSet &&
                    userProfileDetails.pennydrop_status !== "failed"
                  }
                  label="Account Number"
                  placeholder="501002******37"
                  Required
                />
                <CustomTextField
                  name="ifsc"
                  disabled={
                    isBankAccountDetailsSet &&
                    userProfileDetails.pennydrop_status !== "failed"
                  }
                  label="IFSC Code"
                  placeholder="HDFC0000**3"
                  Required
                />
                {!isBankAccountDetailsSet &&
                  userProfileDetails.pennydrop_status !== "failed" && (

                    <Box sx={{ mt: 4 }}>
                      <CommonButton
                        type="submit"
                        label="Save your details"
                        className={"backround"}
                      />
                    </Box>
                )}
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </React.Fragment>
  );
};

AddBankAccount.propTypes = {
  action: PropTypes.func
};

export default AddBankAccount;
