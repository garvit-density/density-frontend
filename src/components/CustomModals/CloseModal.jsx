import React from "react";
import PropTypes from "prop-types";
import { Modal } from "../UI/Modal";
import { Box } from "@mui/system";
import AlertIcon from "../../assets/images/alert.svg";
import { Typography } from "@mui/material";

const CloseModal = ({ isOpen, close, positionEntry, symbol }) => {
  return (
    <Modal isOpen={isOpen} close={close} action={positionEntry} secondaryActionTitle={"Cancel"} actionText={"Confirm"} isSecondaryActionVisible={true} secondaryAction={close}>
      <Box component="form" noValidate autoComplete="off" textAlign="center">
        <img src={AlertIcon} />
        <Typography>You are about to close the Position for {symbol} . Are you sure you want to exit ?</Typography>
        </Box>
    </Modal>
  );
};

CloseModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  secondaryActionTitle: PropTypes.string,
  secondaryAction: PropTypes.func,
  isSecondaryActionVisible: PropTypes.bool,
  positionEntry: PropTypes.func,
  symbol: PropTypes.string
};
export default CloseModal;
