import React from "react";

import { Box } from "@mui/material";

import { CustomTextField, CommonButton, CustomSelectField } from "components/UI/index";
import MenuItem from "@mui/material/MenuItem";

import "./bank-account.scss";
// Formik
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Regx } from "utils/constants";

// Validation
const validationSchema = Yup.object().shape({
  accountHolder: Yup.string().required("Acountholder Name is required"),
  accountNumber: Yup.string().required("Account Number is required"),
  ifsc: Yup.string().required("IFSC Code is Required").matches(Regx.ifscRegExp, "Enter valid IFSC Code")
});

const BankAccount = () => {
  const [selectedBank, setSelectedBank] = React.useState("bank-1");
  // Initial Value
  const initialValues = {
    accountHolder: "",
    accountNumber: "",
    ifsc: ""
  };
  const accountSubmit = (value) => {};

  return (
    <React.Fragment>
      <Box className="loginWrap">
        <Box className="loginWrapInner">
          <h1 className="loginTitle">Add Bank Account</h1>
          <Formik initialValues={initialValues} validationSchema={validationSchema} validateOnBlur={false} validateOnChange={false} onSubmit={(value) => accountSubmit(value)}>
            {() => (
              <Form id="bankAccount-form">
                <CustomSelectField label="Select Bank*" placeholder="mail@abc.com" value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
                  <MenuItem value={"bank-1"}>Bank 1</MenuItem>
                  <MenuItem value={"bank-2"}>Bank 2</MenuItem>
                </CustomSelectField>

                <CustomTextField name="accountHolder" label="Account Holder's Name" placeholder="Please enter your full name" Required />

                <CustomTextField name="accountNumber" label="Account Number" placeholder="1234567890" Required />

                <CustomTextField name="ifsc" label="IFSC Code" placeholder="ABCDE12345" Required />

                <Box sx={{ mt: 4 }}>
                  <CommonButton label="Add Account" className={"backround"} type="submit" />
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default BankAccount;
