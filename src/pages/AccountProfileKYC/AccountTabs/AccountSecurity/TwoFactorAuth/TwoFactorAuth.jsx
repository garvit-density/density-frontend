import React from "react";
import "./TwoFactorAuth.scss";
import { Box } from "@mui/material";
import Authenticat from "../../../../../assets/images/Authenticat";
import { Link } from "react-router-dom";

const TwoFactorAuth = () => {
  return (
    <>
      <Box className="securityAuth">
        <Box className="securityInner">
          <h1 className="securityTitle">Two Factor Authentication</h1>
          <Box>
            <Box className="textCenter">
              <Box sx={{ mb: 3 }}>
                <Authenticat />
              </Box>
              <Box component="p" className="textCenter texGray authMessage">
                Two Factor Authentication enabled. This helps keep your account safe. We strongly recommend you keep 2FA turned on.
              </Box>
              <Box>
                <Link to="/accountProfileKYC" className="buttonCommon errorBtn">
                  {" "}
                  Turn off 2FA{" "}
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TwoFactorAuth;
