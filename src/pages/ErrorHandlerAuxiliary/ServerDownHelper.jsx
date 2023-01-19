import React from "react";
import { Box } from "@mui/material";
import "../../assets/styles/common.scss";

import { CommonButton } from "components/UI/index";

import { centredContainer } from "./ErrorHandlerAuxiliary.styled";

const ServerDownHelper = () => {
  return (
    <>
      <Box className="loginWrap">
        <Box sx={centredContainer} className="loginWrapInner">
          <Box sx={{ mb: 4 }}>
            <h1 className="securityTitle">Our Server Apologizes :(</h1>
          </Box>

          <Box component="p" className="textCenter texGray authMessage">
            Please refresh your page to start hustling again! We are sorry for the inconvenience
          </Box>
          <Box sx={{ mt: 4 }}>
            <CommonButton label="Navigate Back" className={"backround"} onClick={() => { window.history.back(); } } />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ServerDownHelper;
