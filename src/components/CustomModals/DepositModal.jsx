/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Field } from "../UI/Field";
import { Modal } from "../UI/Modal";
import { LabelInfo } from "../UI/LabelInfo";
import PropTypes from "prop-types";
import { Divider, Checkbox, FormControlLabel, FormGroup, Chip, Box } from "@mui/material";

import WalletTransactionSuccessModal from "./WalletTransactionSuccessModal";

import { useDepositModal } from "../../frontend-BL/businessHooks";
import { WALLET_CONSTANTS } from "../../frontend-BL/businessHooks/WALLET/Constants/WalletConstants.const";

const flex = { display: "flex" };
const my_2 = { my: 2 };
const checkbox_color = { color: "#4f4f4f" };
const fieldBorder = { border: "1px solid #4F4F4F", borderRadius: "5px" };

const DepositModal = ({ isOpen, close }) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [helperText, setHelperText] = useState("");
  const [helperTextForTransaction, setHelperTextForTransaction] = useState("");

  const {
    formValues,
    showConfirm,
    referenceId,
    setReferenceId,
    densityBankAccount,
    userAccountNumber,
    action,
    actionText,
    amount,
    setAmount,
    transferToFutures,
    setTransferToFutures
  } = useDepositModal({ isOpen, close, setHelperText, setHelperTextForTransaction, setIsSuccessModalOpen });

  return (
    <><WalletTransactionSuccessModal formValues={formValues} isOpen={isSuccessModalOpen} close={() => setIsSuccessModalOpen(false)}/><Modal isOpen={isOpen} close={() => { close(); setAmount(""); setHelperText(""); setHelperTextForTransaction(""); } } title={WALLET_CONSTANTS.DEPOSIT_MODAL_LABEL} actionText={actionText} action={action}>
      {showConfirm
        ? (
          <Field label={WALLET_CONSTANTS.ENTER_REFERENCE_ID_LABEL} value={referenceId} helperText={helperTextForTransaction} setHelperText={setHelperTextForTransaction} setValue={setReferenceId} placeholder="xxxxxxx" sx={fieldBorder} />
          )
        : (
          <>
            <Field helperText={helperText} setHelperText={setHelperText} label={WALLET_CONSTANTS.DEPOSIT_MODAL_LABEL + WALLET_CONSTANTS.INR_DENOMINATION_LABEL} type="number" value={amount} setValue={setAmount} placeholder="xxxxxxx" sx={fieldBorder} />
            <Divider sx={my_2} />
            <Box sx={flex}>
              <Chip label={WALLET_CONSTANTS.NOTE}/> &nbsp;&nbsp; <LabelInfo label={WALLET_CONSTANTS.BENEFICIARY_NOTE} value={""} />
            </Box>
            <Divider sx={my_2} />
            <LabelInfo isCopiedToClipboard label={WALLET_CONSTANTS.BENEFICIARY_ENTITY_LABEL} value={densityBankAccount.accountHolderName} />
            <LabelInfo isCopiedToClipboard label={WALLET_CONSTANTS.BENEFICIARY_ACCOUNT_NUMBER_LABEL} value={densityBankAccount.accountNumber} />
            <LabelInfo isCopiedToClipboard label={WALLET_CONSTANTS.BENEFICIARY_IFSC_LABEL} value={densityBankAccount.ifsc} />
            <LabelInfo isCopiedToClipboard label={WALLET_CONSTANTS.BANK_ACCOUNT_TYPE_LABEL} value={densityBankAccount.accountType} />
            <Divider sx={my_2} />
            <LabelInfo label={WALLET_CONSTANTS.CUSTOMER_BANK_ACCOUNT_NUMBER_LABEL} value={userAccountNumber || "-"} />
            <Divider sx={my_2} />
            <Box sx={flex}>
            <Chip label={WALLET_CONSTANTS.NOTE} />&nbsp;&nbsp; <LabelInfo value={WALLET_CONSTANTS.DEPOSIT_INSTRUCTIONS_LABEL} />
            </Box>
            <Divider sx={my_2} />
            <FormGroup>
              <FormControlLabel control={<Checkbox sx={checkbox_color} checked={transferToFutures} onChange={(event) => { setTransferToFutures(event.target.checked); } } />} label={WALLET_CONSTANTS.TRANSFER_TO_FUTURES_DIRECTLY_LABEL} />
            </FormGroup>
          </>
          )}
    </Modal></>
  );
};

DepositModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.any
};

export default DepositModal;
