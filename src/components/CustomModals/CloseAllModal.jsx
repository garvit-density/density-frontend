/* eslint-disable react/prop-types */
import { Modal } from "components/UI/Modal";
import React from "react";
import PropTypes from "prop-types";
import AlertIcon from "../../assets/images/alert.svg";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const CloseAllModal = ({ isOpen, positionEntry, close }) => {
  return <Modal isOpen={isOpen} close={close} action={positionEntry} secondaryActionTitle={"Cancel"} secondaryAction={close} isSecondaryActionVisible={true}>
    <Box textAlign="center">
      <img src={AlertIcon}/>
      <Typography>You are about to close All The Position. Are you sure you want to exit ?</Typography>

    </Box>
  </Modal>;
};
CloseAllModal.prototype = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  secondaryActionTitle: PropTypes.string,
  secondaryAction: PropTypes.func,
  isSecondaryActionVisible: PropTypes.bool,
  positionEntry: PropTypes.func
};

export default CloseAllModal;
