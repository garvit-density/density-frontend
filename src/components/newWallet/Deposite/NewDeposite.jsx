import * as React from "react";

import { Container, Modal } from "@mui/material";
import { useState } from "react";
import Top from "./Content/Top";
import Middle from "./Content/Middle";
import Footer from "./Content/Footer";
import PropTypes from "prop-types";
import { DEPOSIT_MAIN } from "./style";
// 4 steps to be displayed on top progress bar (non-clickable)

const steps = ["Enter Amount", "Transfer Fund", "Enter Reference ID", "Success"];

function NewDeposite({ isOpen, close }) {
  const [Data, setData] = useState({
    accountNumber: "",
    depositAmount: "",
    referenceId: ""
  });
  // steps are 0-based indexed
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Modal open={isOpen} onClose={close}>
      <Container maxWidth="md" sx={DEPOSIT_MAIN}>
        <Top activeStep={activeStep} steps={steps}></Top>
        <Middle activeStep={activeStep} steps={steps} Data={Data} setData={setData}></Middle>
        <Footer activeStep={activeStep} steps={steps} handleNext={handleNext} handleBack={handleBack} handleReset={handleReset}></Footer>
      </Container>
    </Modal>
  );
}
NewDeposite.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.object
};
export default NewDeposite;
