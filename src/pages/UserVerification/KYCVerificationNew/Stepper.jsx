import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const steps = [
  {
    label: "Aadhar Verification",
    description: "NOTE : Your Aadhar verification is IN PROGRESS. Please be patient, our compliance Team is screening your document.\nReview Time : 12 Hours\nStill need help ?  Contact Support "
  },
  {
    label: "PAN Verification",
    description: "NOTE : Your Aadhar verification is IN PROGRESS. Please be patient, our compliance Team is screening your document.\nReview Time : 12 Hours\nStill need help ?  Contact Support "
  },
  {
    label: "Selfie Verification",
    description: "NOTE : Your Aadhar verification is IN PROGRESS. Please be patient, our compliance Team is screening your document.\nReview Time : 12 Hours\nStill need help ?  Contact Support "
  }
];

function VerticalStepper({ level }) {
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={level} orientation="vertical">
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}></Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

VerticalStepper.propTypes = {
  level: PropTypes.number
};

export default VerticalStepper;
