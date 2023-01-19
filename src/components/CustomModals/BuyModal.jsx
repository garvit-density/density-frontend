/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Divider, InputAdornment } from "@mui/material";
import { Field } from "../UI/Field";
import { Modal } from "../UI/Modal";
import { LabelInfo } from "../UI/LabelInfo";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { walletScreenRender } from "../../frontend-BL/redux/actions/Internal/WalletScreenRender.ac";

import WalletTransactionSuccessModal from "./WalletTransactionSuccessModal";

import { useBuyModal } from "../../frontend-BL/businessHooks";

import { styles } from "./BuyModal.styled";

import { WALLET_CONSTANTS } from "../../frontend-BL/businessHooks/WALLET/Constants/WalletConstants.const";

const BuyModal = ({ isOpen, close }) => {
  const dispatch = useDispatch();

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [helperText, setHelperText] = useState("");

  const walletScreenRenderBoolean = useSelector((state) => state.walletScreenRender.walletScreenRenderFlag);

  const {
    formValues,
    handleSubmit,
    handleMaxClickForINR,
    amountInInr,
    setAmountInInr,
    amountInUsdt,
    conversionRateforUSDT
  } = useBuyModal({ isOpen, close, setIsSuccessModalOpen, setHelperText });

  return (
    <><WalletTransactionSuccessModal formValues={formValues} isOpen={isSuccessModalOpen} close={() => setIsSuccessModalOpen(false)} /><Modal action={handleSubmit} isSecondaryActionVisible={true} secondaryAction={() => dispatch(walletScreenRender(true, !walletScreenRenderBoolean))} secondaryActionTitle={WALLET_CONSTANTS.REFRESH_LABEL} isOpen={isOpen} close={() => { close(); setHelperText(""); setAmountInInr(""); } } title={WALLET_CONSTANTS.BUY_MODAL_TITLE}>
      <Divider sx={{ mt: 3 }} />
      <Field
        data-testid={"buyModal"}
        helperText={helperText}
        setHelperText={setHelperText}
        label={WALLET_CONSTANTS.ENTER_AMOUNT_INR_LABEL}
        value={amountInInr}
        setValue={setAmountInInr}
        margin
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" disableTypography>
              <span onClick={handleMaxClickForINR} style={styles.maxBtn}>{WALLET_CONSTANTS.MAX_LABEL}</span>
            </InputAdornment>
          )
        }} />
      <LabelInfo {...{ label: WALLET_CONSTANTS.RECEIVE_USDT_LABEL, value: amountInUsdt }} />
      <Divider sx={{ mt: 3 }} />
      <LabelInfo {...{ label: WALLET_CONSTANTS.UNIT_DENOMINATION_USDT_LABEL, value: conversionRateforUSDT + WALLET_CONSTANTS.INR_DENOMINATION_LABEL }} />
    </Modal></>
  );
};

BuyModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.any
};

export default BuyModal;
