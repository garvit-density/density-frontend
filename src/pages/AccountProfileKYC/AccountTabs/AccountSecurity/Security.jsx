import React from "react";
import { Box } from "@mui/material";

import Arrow from "../../../../assets/images/arrow";
import "./Security.scss";
import Passwordreset from "./PasswordReset/Passwordreset";
import TwoFactorAuth from "./TwoFactorAuth/TwoFactorAuth";

const Login = () => {
  const [isVisiblepwd, setIsVisiblepwd] = React.useState(false);
  const [authVisible, setAuthVisible] = React.useState(false);

  const openPasswordreset = () => {
    setIsVisiblepwd(!isVisiblepwd);
  };

  const openAuthentication = () => {
    setAuthVisible(!authVisible);
  };

  return (
    <>
      {!(isVisiblepwd || authVisible) && (
        <>
          <Box className="security">
            <Box className="securityInner">
              <h1 className="securityTitle">Security</h1>
              <Box>
                <Box className="passwordreset">
                  <p>Password reset</p>
                  <div onClick={openPasswordreset} className="pointer centre-align">
                    <Arrow />
                  </div>
                </Box>
                <Box className="passwordreset">
                  <p>Two Factor Authetication</p>
                  <div className="pointer centre-align" onClick={openAuthentication}>
                    <Arrow />
                  </div>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
      {isVisiblepwd && <Passwordreset openPasswordreset={openPasswordreset} />}
      {authVisible && <TwoFactorAuth openAuthentication={openAuthentication} />}
    </>
  );
};
export default Login;
