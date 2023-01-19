/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AddBankAccount from "./AddBankAccount/AddBankAccount";
import BankAccounts from "./BankAccounts/BankAccounts";
import Arrow from "../../../../assets/images/arrow";

import { useSelector } from "react-redux";

const Account = () => {
  const [isExisitingAccountNotPresent, setIsExisitingAccountNotPresent] = useState(true);
  const [isListOfAccountsPageVisible, setIsListOfAccountsPageVisible] = useState(false);
  const [isAccountDetailsPageVisible, setIsAccountDetailsPageVisible] = useState(false);
  const [userBankAccountVerificationstatus, setUserBankAccountVerificationSattus] = useState("");

  const userProfileDetails = useSelector((state) => state.profile.profileDetails);

  const NavigateToAccountDetails = () => {
    setIsAccountDetailsPageVisible(true);
    setIsListOfAccountsPageVisible(false);
    setIsExisitingAccountNotPresent(false);
  };

  const NavigateToListOfAccounstPage = () => {
    setIsListOfAccountsPageVisible(true);
    setIsAccountDetailsPageVisible(false);
    setIsExisitingAccountNotPresent(false);
  };

  useEffect(() => {
    const isBankAccountAdded = (userProfileDetails && userProfileDetails.userBankAccount) ? Object.keys(userProfileDetails.userBankAccount).length > 0 || userProfileDetails.pennydrop_status === "pending" : false;
    if (isBankAccountAdded) {
      setIsListOfAccountsPageVisible(true);
      setIsExisitingAccountNotPresent(false);
    }
    setUserBankAccountVerificationSattus(userProfileDetails.pennydrop_status);
    if (userProfileDetails.pennydrop_status === "pending") NavigateToListOfAccounstPage();
  }, [
    userProfileDetails
  ]);

  return (
    <>
      {isExisitingAccountNotPresent && <BankAccounts addBankAccount={NavigateToAccountDetails} />}
      {isListOfAccountsPageVisible && (
        <Box className="security">
          <Box className="securityInner">
            <h1 className="securityTitle">Your Bank Account</h1>
            <Box>
              <Box className="passwordreset">
                {userBankAccountVerificationstatus === "pending"
                  ? <p>Your details are being processed. Please stay tuned for the latest updates!</p>
                  : userBankAccountVerificationstatus === "failed"
                    ? <><p>Your bank account verification has failed. Please try again!</p><div className="pointer centre-align" onClick={() => NavigateToAccountDetails()}>
                  <Arrow />
                </div></>
                    : (userBankAccountVerificationstatus === "not_verified" || userBankAccountVerificationstatus === "")
                        ? <><p>Click to add your bank account details</p><div className="pointer centre-align" onClick={() => NavigateToAccountDetails()}>
                    <Arrow />
                  </div></>
                        : <><p>Click to view your bank account details</p><div className="pointer centre-align" onClick={() => NavigateToAccountDetails()}>
                    <Arrow />
                  </div></> }
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {isAccountDetailsPageVisible && <AddBankAccount action={NavigateToListOfAccounstPage}/>}
    </>
  );
};
export default Account;
