/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { Field } from "../UI/Field";
import { Modal } from "../UI/Modal";
import { LabelInfo } from "../UI/LabelInfo";
import PropTypes from "prop-types";
import { Divider } from "@mui/material";

import { useWithdrawModal } from "../../frontend-BL/businessHooks";

import WalletTransactionSuccessModal from "./WalletTransactionSuccessModal";

import { WALLET_CONSTANTS } from "../../frontend-BL/businessHooks/WALLET/Constants/WalletConstants.const";

const borderStyle = { border: "1px solid #4F4F4F", borderRadius: "5px" };

const WithdrawModal = ({ isOpen, close }) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [helperText, setHelperText] = useState("");
  const [helperTextForOTP, setHelperTextForOTP] = useState("");

  const {
    formValues,
    showConfirm,
    setShowConfirm,
    amount,
    setAmount,
    action,
    actionText,
    userAccountNumber,
    userAccountIfscNumber,
    otpNumber,
    setOtpNumber
  } = useWithdrawModal({ isOpen, close, setHelperText, setHelperTextForOTP, setIsSuccessModalOpen });

  return (
    <><WalletTransactionSuccessModal formValues={formValues} isOpen={isSuccessModalOpen} close={() => setIsSuccessModalOpen(false)} /><Modal isOpen={isOpen} close={() => { close(); setShowConfirm(false); setAmount(""); setHelperText(""); setHelperTextForOTP(""); } } title={WALLET_CONSTANTS.WITHDRAW_MODAL_TITLE} actionText={actionText} action={action}>
      {showConfirm
        ? (
          <Field label={WALLET_CONSTANTS.ENTER_OTP_LABEL} type="number" helperText={helperTextForOTP} setHelperText={setHelperTextForOTP} value={otpNumber} setValue={setOtpNumber} placeholder="xxxxxxx" sx={borderStyle} />
          )
        : (
          <>
            <Field label={WALLET_CONSTANTS.WITHDRAW_INR_LABEL} type="number" value={amount} helperText={helperText} setHelperText={setHelperText} setValue={setAmount} placeholder="xxxxxxx" sx={borderStyle} />
            <Divider sx={{ my: 2 }} />
            <LabelInfo label={WALLET_CONSTANTS.BANK_ACCOUNT_NUMBER_LABEL} value={userAccountNumber} />
            <LabelInfo label={WALLET_CONSTANTS.BANK_ACCOUNT_IFSC_LABEL} value={userAccountIfscNumber} />
          </>
          )}
    </Modal></>
  );
};

WithdrawModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.any
};

export default WithdrawModal;
