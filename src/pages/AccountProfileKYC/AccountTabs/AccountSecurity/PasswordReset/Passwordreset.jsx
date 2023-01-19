import React from "react";
import { IconButton, InputAdornment, Box } from "@mui/material";

import PropTypes from "prop-types";

// Formik
import { Formik, Form } from "formik";
import * as Yup from "yup";
// MUI Icons
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { CustomTextField, CommonButton } from "components/UI/index";

import "./Passwordreset.scss";

import { Regx } from "utils/constants";

// import API endpoint
import { changePasswordApi } from "api-server/Api/Futures";

const validationSchema = Yup.object().shape({
  oldpassword: Yup.string().required("Password is required"),
  newpassword: Yup.string()
    .required("New Password is required")
    .matches(Regx.passwordRegExp, "Passwords shall have a minimum of 10 characters with a mix of alphabets, number, alphanumeric and special characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newpassword")], "Confirm Password didn't match with New Password. Try again")
    .required("ConfirmPassword is required")
});

const Login = ({ openPasswordreset }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisiblenew, setIsVisiblenew] = React.useState(false);
  const [isVisibleconfirm, setIsVisibleconfirm] = React.useState(false);

  // Initial Value
  const initialValues = {
    oldpassword: "",
    newpassword: "",
    confirmpassword: ""
  };

  const sendPasswordReset = (value) => {
    const changePasswordPromise = changePasswordApi(JSON.stringify({ OldPassword: value.oldpassword, NewPassword: value.newpassword }));
    changePasswordPromise.then((response) => {
    });
  };

  return (
    <>
      <Box className="security">
        <Box className="securityInner">
          <h1 className="securityTitle">Reset Password</h1>
          <Formik initialValues={initialValues} validationSchema={validationSchema} validateOnBlur={false} validateOnChange={false} onSubmit={(value) => sendPasswordReset(value)}>
            {() => (
              <Form id="PasswordReset-form">
                <CustomTextField
                  name="oldpassword"
                  type={isVisible ? "text" : "password"}
                  id="oldpassword"
                  label="Old Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setIsVisible(!isVisible)} edge="end" className="visibilityIcon">
                          {isVisible ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <CustomTextField
                  name="newpassword"
                  type={isVisiblenew ? "text" : "password"}
                  id="Newpassword"
                  label="New Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setIsVisiblenew(!isVisiblenew)} edge="end" className="visibilityIcon">
                          {isVisible ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <CustomTextField
                  name="confirmPassword"
                  type={isVisibleconfirm ? "text" : "password"}
                  label="Confirm Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setIsVisibleconfirm(!isVisibleconfirm)} edge="end" className="visibilityIcon">
                          {isVisible ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Box sx={{ mt: 4 }}>
                  <CommonButton label="Password Reset" className="backround" onChange={openPasswordreset} />
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};

Login.propTypes = {
  openPasswordreset: PropTypes.func
};

export default Login;
