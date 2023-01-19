import React from "react";
import { Divider } from "@mui/material";
import { Modal } from "../UI/Modal";
import { LabelInfo } from "../UI/LabelInfo";
import PropTypes from "prop-types";

const ConfirmKYCModal = ({ isOpen, close, handleSubmit, userDetailsProfile }) => {
  const modalTitle = "Proceed for KYC";
  return (
    <Modal action={handleSubmit} isOpen={isOpen} close={close} title={modalTitle}>
      <Divider sx={{ mt: 3 }} />
        <LabelInfo {...{ label: "Name as per PAN:", value: userDetailsProfile.nameAsPerPAN }} />
        <LabelInfo {...{ label: "Date of Birth:", value: userDetailsProfile.dob && userDetailsProfile.dob.slice(0, 10) }} />
        <LabelInfo {...{ label: "PAN:", value: userDetailsProfile.panNumber }} />
    </Modal>
  );
};

ConfirmKYCModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  handleSubmit: PropTypes.func,
  userDetailsProfile: PropTypes.object
};

export default ConfirmKYCModal;
