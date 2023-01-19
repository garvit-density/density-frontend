/* eslint-disable multiline-ternary */
import React from "react";
import Box from "@mui/material/Box";
import EnterAmount from "./EnterAmount";
import TransferFund from "./TransferFund";
import Reference from "./Reference";
import Final from "./Final";
import PropTypes from "prop-types";
function Middle({ activeStep, steps, Data, setData }) {
  return (
    <Box sx={{ height: "328px" }}>
      {" "}
      {activeStep === steps.length - 1 ? (
        <Final></Final>
      ) : (
        <>
          {activeStep === 0 && <EnterAmount Data={Data} setData={setData}></EnterAmount>}
          {activeStep === 1 && <TransferFund></TransferFund>}
          {activeStep === 2 && <Reference Data={Data} setData={setData}></Reference>}
        </>
      )}
    </Box>
  );
}

Middle.propTypes = {
  activeStep: PropTypes.number,
  steps: PropTypes.array,
  Data: PropTypes.any,
  setData: PropTypes.object
};
export default Middle;
