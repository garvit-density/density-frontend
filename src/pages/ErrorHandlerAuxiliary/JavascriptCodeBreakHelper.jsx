import React from "react";
import { Box } from "@mui/material";
import "../../assets/styles/common.scss";

import { CommonButton } from "components/UI/index";

import { centredContainer } from "./ErrorHandlerAuxiliary.styled";

const JavascriptCodeBreakHelper = () => {
  return (
    <>
      <Box className="loginWrap">
        <Box sx={centredContainer} className="loginWrapInner">
          <Box sx={{ mb: 4 }}>
            <h1 className="securityTitle">Our Developers are having a bad day :(</h1>
          </Box>

          <Box component="p" className="textCenter texGray authMessage">
            Please click the following to navigate to help
          </Box>
          <Box sx={{ mt: 4 }}>
            <CommonButton label="Help" className={"backround"} onClick={() => {
            } } />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default JavascriptCodeBreakHelper;
