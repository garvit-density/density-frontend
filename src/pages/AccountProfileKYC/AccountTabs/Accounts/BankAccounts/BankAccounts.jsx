import React from "react";
import { Box } from "@mui/material";
import "../../../../../assets/styles/common.scss";

import PropTypes from "prop-types";

import { CommonButton } from "components/UI/index";

const BankAccounts = ({ addBankAccount }) => {
  return (
    <React.Fragment>
      <Box className="loginWrap">
        <Box className="loginWrapInner">
          <Box sx={{ mb: 4, "text-align": "center" }}>
            <h1 className="securityTitle">Bank Accounts</h1>
          </Box>

          <Box component="p" className="textCenter texGray authMessage">
            You have not added any bank account associated with your profile. Kindly add a bank account to access funds transfer facility and start trading.
          </Box>
          <Box sx={{ mt: 4 }}>
            <CommonButton label="Add bank Account" className={"backround"} onClick={addBankAccount} />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

BankAccounts.propTypes = {
  addedAccounts: PropTypes.bool,
  addBankAccount: PropTypes.func
};

export default BankAccounts;
