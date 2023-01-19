/* eslint-disable multiline-ternary */
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
function Footer({ activeStep, steps, handleNext, handleBack, handleReset }) {
  return (
    <Box>
      {activeStep === steps.length - 1 ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              backgroundColor: "#2C2C34",
              width: "100%"
            }}
          >
            {/* this rest button should be removed later */}
            <Button onClick={handleReset} sx={{ color: "background.white" }}>
              Reset
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                ":hover": {
                  borderColor: "white"
                }
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                color: "black",
                backgroundColor: "white",
                ":hover": {
                  bgcolor: "white"
                }
              }}
            >
              Trade Now
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          maxWidth="md"
          sx={{
            display: "flex",
            py: "25px",
            backgroundColor: "#2C2C34",
            width: "100%",
            justifyContent: "flex-end",
            gap: "25px",
            pr: "45px"
          }}
        >
          <Button variant="outlined" color="inherit" onClick={handleBack} sx={{ color: "text.primary", width: "196px", borderRadius: "0px" }}>
            {activeStep === 0 ? "Cancel" : "Back"}
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{
              backgroundColor: "background.white",
              ":hover": {
                bgcolor: "background.white"
              },
              color: "text.secondary",
              width: "196px",
              borderRadius: "0px"
            }}
          >
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Box>
      )}
    </Box>
  );
}
Footer.propTypes = {
  activeStep: PropTypes.number,
  steps: PropTypes.array,
  handleNext: PropTypes.object,
  handleBack: PropTypes.object,
  handleReset: PropTypes.object
};
export default Footer;
