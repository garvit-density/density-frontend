import React from "react";
import { Box } from "@mui/material";
import "../../assets/styles/common.scss";

import { CommonButton } from "components/UI/index";

import { centredContainer } from "./ErrorHandlerAuxiliary.styled";
import { GetAppURL } from "../../frontend-api-service/Base";

const RouteNotFoundHelper = () => {
  return (
    <>
      <Box className="loginWrap">
        <Box sx={centredContainer} className="loginWrapInner">
          <Box sx={{ mb: 4 }}>
            <h1 className="securityTitle">No Stalking, sir!</h1>
          </Box>

          <Box component="p" className="textCenter texGray authMessage">
            Please navigate to home page and start trading, mister :p
          </Box>
          <Box sx={{ mt: 4 }}>
            <CommonButton label="Home Page" className={"backround"} onClick={() => { window.location.href = GetAppURL(); } } />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RouteNotFoundHelper;
