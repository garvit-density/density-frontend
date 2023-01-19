import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import PropTypes from "prop-types";
function Top({ activeStep, steps }) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};
        return (
          <Step
            key={label}
            {...stepProps}
            sx={{
              "& .MuiStepLabel-root .Mui-completed": {
                color: "success.main" // circle color (COMPLETED)
              },
              "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
                color: "common.white" // Just text label (COMPLETED)
              },
              "& .MuiStepLabel-root .Mui-active": {
                color: "success.main" // circle color (ACTIVE)
              },
              "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
                color: "common.white" // Just text label (ACTIVE)
                //  color: "black",
              },
              "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                fill: "common.white", // circle's number (ACTIVE)
                color: "common.white"
              }
            }}
          >
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}

Top.propTypes = {
  activeStep: PropTypes.number,
  steps: PropTypes.array
};

export default Top;
