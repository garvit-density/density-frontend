/* eslint-disable no-unused-vars */
import React from "react";
import { Modal } from "../UI/Modal";
import { LabelInfo } from "../UI/LabelInfo";
import PropTypes from "prop-types";

const CompletedKYCModal = ({ isOpen, close, formValues }) => {
  return (
    <Modal isOpen={isOpen} close={close} title={"SUCCESS"}>
        {formValues && formValues.map((displayValue) => <LabelInfo key={displayValue.key} value={displayValue.value} />)}
    </Modal>
  );
};

CompletedKYCModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  formValues: PropTypes.array
};

export default CompletedKYCModal;
