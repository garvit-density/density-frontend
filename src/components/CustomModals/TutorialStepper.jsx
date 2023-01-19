// React
import React from "react";
import PropTypes from "prop-types";
import { Modal } from "../UI/Modal";
// import { Field } from "../ui/Field";

// Mui
import { Box } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StepContent from "@mui/material/StepContent";
import Divider from "@mui/material/Divider";
// Assets
import FundDeposit from "../../assets/images/AddFunds.svg";
import SelectTradingPairs from "../../assets/images/SelectTradingPairs.svg";
import SelectSide from "../../assets/images/SelectSide.svg";
import SelectLeverage from "../../assets/images/SelectLeverage.svg";
import SelectOrderType from "../../assets/images/SelectOrderType.svg";
import EnterPrice from "../../assets/images/EnterPrize.svg";
import EnterSize from "../../assets/images/EnterSize.svg";
import SubmitOrder from "../../assets/images/SubmitOrder.svg";
import ClosePosition from "../../assets/images/ClosePosition.svg";
import CheckTransactionHistory from "../../assets/images/CheckTransactionHistory.svg";
// import { LabelInfo } from "components/ui/LabelInfo";
// import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
const steps = [
  { id: 0, label: "Fund Deposit :", value: "Transfer fund to wallet and convert it to USDT", image: FundDeposit },
  { id: 1, label: "Select Trading Pairs from the Market Screen : ", value: "You can select trading pairs", image: SelectTradingPairs },
  { id: 2, label: "Select Side:", value: "You can select the side from which you want to place the trade", image: SelectSide },
  { id: 3, label: "Select the leverage: ", value: "You can adjust leverage according to your risk profile for different symbols", image: SelectLeverage },
  { id: 4, label: "Select the Order Type :", value: "You can select different order types according to your trading strategy for different market conditions", image: SelectOrderType },
  { id: 5, label: "Enter the Price :", value: "You can enter your entry or exit price for your position from here according to your trading strategy", image: EnterPrice },
  { id: 6, label: "Enter the Size :", value: "You can enter the size in USDT or in contract. Minimum size for every contract is mentioned in contract details", image: EnterSize },
  { id: 7, label: "Submit the order :", value: "Once all the trading parameters are set, you can submit the trade", image: SubmitOrder },
  { id: 8, label: "Close the position :", value: "You can directly click on close position to close your position or you can place a new exit order from order form", image: ClosePosition },
  { id: 9, label: "Check transaction History :", value: "Once trade is completed, you can check your transaction history for PnL, commission, funding rate", image: CheckTransactionHistory }
];

const wrapperBoxStyle = { display: "flex", flexDirection: "row", pt: 2 };
const NextBoxStyle = { flex: "1 1 auto" };
const StepLabelTypo = { color: "#808080" };
const StepValueTypo = { color: "text.regular", width: "300px" };
const DividerStyle = { color: "text.regular", margin: "20px", height: "250px" };

const TutorialStepper = ({ isOpen, close }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);

    if (allStepsCompleted()) {
      close();
      setActiveStep(0);
      setCompleted({});
    }

    const newActiveStep = isLastStep() && !allStepsCompleted() // It's the last step, but not all steps have been completed,
    // find the first step that has been completed
      ? steps.findIndex((step, i) => !(i in completed))
      : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <Modal
      stylesContainer={{ width: "calc(100vw - 40rem)", maxWidth: "100%" }}
      childrenActionOutsideDialogContainer={<div>
        {
        <React.Fragment>
            <Box sx={wrapperBoxStyle}>
            <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}>
                Back
            </Button>
            <Box sx={NextBoxStyle} />
            <Button onClick={handleNext}>
                Next
            </Button>
            </Box>
        </React.Fragment>
        }
    </div>} actionText={"Exit"} isOpen={isOpen} close={() => {
      close();
      setActiveStep(0);
      setCompleted({});
    }} title={"Get Started!"}>
      <Box>
            <Stepper nonLinear orientation="vertical" activeStep={activeStep}>
              {steps.map((step, index) => (
                <Step key={step.label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                      <Typography sx={StepLabelTypo}>{step.label}</Typography>
                  </StepButton>
                  <StepContent>
                      <Grid container>
                        <Grid item xs={5}>
                          <Typography sx={StepValueTypo}>{step.value}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Divider sx={DividerStyle} orientation="vertical" />
                        </Grid>
                        <Grid item xs={6}>
                          <img width="250" height="250" src={step.image}></img>
                          {/* <>
                            {step.id
                              ? <Box >
                                <Field label={"Deposit INR"} type="number" value={"34"} placeholder="xxxxxxx" sx={{ border: "1px solid #4F4F4F", borderRadius: "5px" }} />
                                <Divider sx={{ my: 2 }} />
                                <LabelInfo label={"Your Bank Account Number:"} value={"userAccountNumbe" || "-"} />
                                <Divider sx={{ my: 2 }} />
                                <LabelInfo isCopiedToClipboard label={"Beneficiary Entity:"} value={"densityBankAccount.accountHolderName"} />
                                <LabelInfo isCopiedToClipboard label={"Beneficiary Account Number:"} value={"densityBankAccount.accountNumber"} />
                                <LabelInfo isCopiedToClipboard label={"Beneficiary IFSC Number:"} value={"densityBankAccount.ifsc"} />
                                <LabelInfo isCopiedToClipboard label={"Bank Account Type:"} value={"densityBankAccount.accountType"} />
                                <Divider sx={{ my: 2 }} />
                                <LabelInfo value={"NOTE : The amount should be deposited with above bank account only. Amount coming from any other bank account would be refunded back. *Payment through UPI is not allowed*"} />
                                <Divider sx={{ my: 2 }} />
                                <FormGroup>
                                  <FormControlLabel control={<Checkbox sx={{ color: "#4f4f4f" }} />} label="Transfer to USDT Wallet Directly" />
                                </FormGroup>
                              </Box>
                              : null }
                            </> */}
                        </Grid>
                      </Grid>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
    </Box>
    </Modal>
  );
};

TutorialStepper.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func
};

export default TutorialStepper;
