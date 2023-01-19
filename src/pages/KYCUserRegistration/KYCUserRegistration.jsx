/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Box, TextField, InputLabel } from "@mui/material";

import { CustomTextField, CommonButton } from "components/UI/index";
import { useNavigate } from "react-router-dom";
import "./KYCUserRegistration.scss";
import { Regx } from "utils/constants";

import useStyles from "../../components/UI/Input/input.style";

// Formik
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { updateProfileApi, getProfileApi } from "../../frontend-api-service/Api/Futures";

// Validation
const validationSchema = Yup.object().shape({
  nameAsPerPAN: Yup.string().required("Name as per your PAN is mandatory").matches(Regx.alfabetsRegExp, "Only alphabets are allowed for this field"),
  firstName: Yup.string().required("First name is required").matches(Regx.alfabetsRegExp, "Only alphabets are allowed for this field"),
  lastName: Yup.string().required("Last name is required").matches(Regx.alfabetsRegExp, "Only alphabets are allowed for this field"),
  panNumber: Yup.string().required("Last name is required").matches(Regx.panRegExp, "Invalid PAN"),
  date: Yup.date().required().max(new Date())
});

const UserRegistration = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  // Initial Value
  const [initialValues, setInitialValues] = useState({
    nameAsPerPAN: "",
    firstName: "",
    lastName: "",
    panNumber: "",
    date: null
  });

  useEffect(() => {
    getProfileApi()
      .then((successResponse) => {
        const loggedInUser = successResponse.data.user;
        if (loggedInUser && loggedInUser.dob && loggedInUser.firstName && loggedInUser.lastName && loggedInUser.panNumber && loggedInUser.nameAsPerPAN) {
          setInitialValues({ nameAsPerPAN: loggedInUser.nameAsPerPAN, firstName: loggedInUser.firstName, lastName: loggedInUser.lastName, date: loggedInUser.dob, panNumber: loggedInUser.panNumber });
        }
      })
      .catch(() => {
        navigate("/");
      });
  }, []);

  const onSignup = (values) => {
    const updateProfileApiPromise = updateProfileApi(
      JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        dob: new Date(new Date(values.date).getTime() + 330 * 60000),
        panNumber: values.panNumber,
        nameAsPerPAN: values.nameAsPerPAN
      })
    );
    updateProfileApiPromise.then(() => {
      navigate("/update-account-details-kyc-initiate");
    });
  };

  function handleNameAsPerPANChange(event, setFieldValue) {
    setFieldValue("nameAsPerPAN", event.target.value);
    setFieldValue("firstName", event.target.value.split(" ")[0]);
    setFieldValue("lastName", event.target.value.split(" ")[event.target.value.split(" ").length - 1]);
  }

  const CONSTANTS = {
    ENTER_YOUR_BASIC_DETAILS: "Enter your basic details",
    NAME_AS_PER_PAN: "Name as per PAN",
    PLEASE_ENTER_YOUR_FULL_NAME: "Please enter your full name",
    FIRST_NAME: "First name",
    LAST_NAME: "Last name",
    ENTER_YOUR_PAN: "Enter your PAN",
    PLEASE_ENTER_YOUR_FIRST_NAME: "Please enter your first name",
    PLEASE_ENTER_YOUR_LAST_NAME: "Please enter your last name",
    PANCARD_VALUE: "BDR*****4M",
    ENTER_YOUR_DATE_OF_BIRTH: "Enter your date of birth",
    CONFIRM: "Confirm"
  };
  return (
    <>
      <Formik initialValues={initialValues} enableReinitialize={true} validationSchema={validationSchema} validateOnBlur={false} validateOnChange={false} onSubmit={(values) => onSignup(values)}>
        {(props) => (
          <Form id="signup-form">
            <Box className="signupWrap">
              <Box className="signupWrapInner">
                <h4 onClick={() => navigate("/update-account-details-kyc-initiate")} className="backButton">
                  {"X"}
                </h4>
                <h1 className="signupTitle">{CONSTANTS.ENTER_YOUR_BASIC_DETAILS}</h1>
                <CustomTextField
                  name="nameAsPerPAN"
                  onChange={(event) => handleNameAsPerPANChange(event, props.setFieldValue)}
                  label={CONSTANTS.NAME_AS_PER_PAN}
                  placeholder={CONSTANTS.PLEASE_ENTER_YOUR_FULL_NAME}
                  Required
                />
                <CustomTextField name="firstName" label={CONSTANTS.FIRST_NAME} placeholder={CONSTANTS.PLEASE_ENTER_YOUR_FIRST_NAME} Required />
                <CustomTextField name="lastName" label={CONSTANTS.LAST_NAME} placeholder={CONSTANTS.PLEASE_ENTER_YOUR_LAST_NAME} Required />
                <CustomTextField name="panNumber" label={CONSTANTS.ENTER_YOUR_PAN} placeholder={CONSTANTS.PANCARD_VALUE} Required />
                <InputLabel
                  required
                  className={classes.inputLabel}
                  classes={{
                    asterisk: classes.labelAsterisk
                  }}
                >
                  {" "}
                  {CONSTANTS.ENTER_YOUR_DATE_OF_BIRTH}
                </InputLabel>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
                    value={props.values.date}
                    onChange={(value) => props.setFieldValue("date", value)}
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          svg: { color: "background.white" },
                          input: { color: "background.white" }
                        }}
                        xclassName={classes.textField}
                        error={props.errors.date}
                        helperText={props.errors.date}
                        FormHelperTextProps={{
                          classes: {
                            root: classes.helperText
                          }
                        }}
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>

                <Box sx={{ mt: 4 }}>
                  <CommonButton label={CONSTANTS.CONFIRM} className={"backround"} type="submit" />
                </Box>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default UserRegistration;
