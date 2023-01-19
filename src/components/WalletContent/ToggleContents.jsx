/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { FiatSpotTab, FuturesTab } from "./tabs";

const ToggleContents = ({ currentTab }) => {
  return (
    <Box sx={{ mt: 4 }}>
      {currentTab === 0 && <FiatSpotTab />}
      {currentTab === 1 && <FuturesTab />}
    </Box>
  );
};

ToggleContents.propTypes = {
  currentTab: PropTypes.number
};

export default ToggleContents;
