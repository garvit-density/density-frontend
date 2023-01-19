import React from "react";
import { Box } from "@mui/material";
import "../../assets/styles/common.scss";

import { CommonButton } from "components/UI/index";

import { centredContainer } from "./ErrorHandlerAuxiliary.styled";

const InternetDownHelper = () => {
  return (
    <>
      <Box className="loginWrap">
        <Box sx={centredContainer} className="loginWrapInner">
          <Box sx={{ mb: 4 }}>
            <h1 className="securityTitle">No Wi-Fi Sucks :(</h1>
          </Box>

          <Box component="p" className="textCenter texGray authMessage">
            Please check your internet connection and refresh page to start hustling again!
          </Box>
          <Box sx={{ mt: 4 }}>
            <CommonButton label="Refresh" className={"backround"} onClick={() => {
              if (window.navigator.onLine) window.history.back();
            } } />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default InternetDownHelper;
