/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  InputAdornment,
  FormControlLabel,
  FormGroup,
  Checkbox
} from "@mui/material";
import { Field } from "../UI/Field";
import { Modal } from "../UI/Modal";
import { LabelInfo } from "../UI/LabelInfo";
import PropTypes from "prop-types";

import WalletTransactionSuccessModal from "./WalletTransactionSuccessModal";

import { styles } from "./SellModal.styled";

import { useSellModal } from "../../frontend-BL/businessHooks";

import { useDispatch, useSelector } from "react-redux";

import { walletScreenRender } from "../../frontend-BL/redux/actions/Internal/WalletScreenRender.ac";
import { WALLET_CONSTANTS } from "../../frontend-BL/businessHooks/WALLET/Constants/WalletConstants.const";

const SellModal = ({ isOpen, close }) => {
  const dispatch = useDispatch();

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [helperText, setHelperText] = useState("");
  const [helperTextForOTP, setHelperTextForOTP] = useState("");

  const walletScreenRenderBoolean = useSelector(
    (state) => state.walletScreenRender.walletScreenRenderFlag
  );

  const {
    formValues,
    isOtpScreen,
    setIsOtpScreen,
    amountInUsdt,
    setAmountinUsdt,
    handleMaxClickForUsdt,
    amountInInr,
    conversionRateforUSDT,
    transferToAccount,
    setTransferToAccount,
    action,
    actionText,
    otpNumber,
    setOtpNumber
  } = useSellModal({
    isOpen,
    close,
    setIsSuccessModalOpen,
    setHelperText,
    setHelperTextForOTP
  });

  return (
    <>
      <WalletTransactionSuccessModal
        formValues={formValues}
        isOpen={isSuccessModalOpen}
        close={() => setIsSuccessModalOpen(false)}
      />
      <Modal
        isSecondaryActionVisible={!isOtpScreen}
        isOpen={isOpen}
        close={() => {
          close();
          setIsOtpScreen(false);
          setHelperTextForOTP("");
          setHelperText("");
          setAmountinUsdt("");
        }}
        title={WALLET_CONSTANTS.SELL_MODAL_TITLE}
        actionText={actionText}
        secondaryAction={() =>
          dispatch(walletScreenRender(true, !walletScreenRenderBoolean))
        }
        secondaryActionTitle={WALLET_CONSTANTS.REFRESH_LABEL}
        action={action}
      >
        <Divider sx={{ mt: 3 }} />
        {!isOtpScreen && (
          <>
            <Field
              helperText={helperText}
              setHelperText={setHelperText}
              label={WALLET_CONSTANTS.ENTER_AMOUNT_USDT_LABEL}
              value={amountInUsdt}
              setValue={setAmountinUsdt}
              margin
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" disableTypography>
                    <span onClick={handleMaxClickForUsdt} style={styles.maxBtn}>
                      MAX
                    </span>
                  </InputAdornment>
                )
              }}
            />
            <LabelInfo
              {...{
                label: WALLET_CONSTANTS.RECEIVE_INR_LABEL,
                value: amountInInr + WALLET_CONSTANTS.INR_DENOMINATION_LABEL
              }}
            />
            <Divider sx={{ mt: 3 }} />
            <LabelInfo
              {...{
                label: WALLET_CONSTANTS.TDS_LABEL,
                value:
                  WALLET_CONSTANTS.TDS_AMOUNT_PERCENTAGE +
                  "% (" +
                  Math.trunc(
                    amountInUsdt *
                      conversionRateforUSDT *
                      (WALLET_CONSTANTS.TDS_AMOUNT_PERCENTAGE / 100) *
                      100
                  ) /
                    100 +
                  " INR)"
              }}
            />
            <LabelInfo
              {...{
                label: WALLET_CONSTANTS.UNIT_DENOMINATION_USDT_LABEL,
                value:
                  conversionRateforUSDT +
                  WALLET_CONSTANTS.INR_DENOMINATION_LABEL
              }}
            />
            <FormGroup>
              <FormControlLabel
                sx={{ marginTop: "10px" }}
                control={
                  <Checkbox
                    sx={{ color: "#4f4f4f" }}
                    checked={transferToAccount}
                    onChange={(event) => {
                      setTransferToAccount(event.target.checked);
                    }}
                  />
                }
                label={WALLET_CONSTANTS.WITHDRAW_TO_ACCOUNT_DIRECTLY_LABEL}
              />
            </FormGroup>
          </>
        )}
        {isOtpScreen && (
          <Field
            label={WALLET_CONSTANTS.ENTER_OTP_LABEL}
            value={otpNumber}
            helperText={helperTextForOTP}
            setHelperText={setHelperTextForOTP}
            type="number"
            setValue={setOtpNumber}
            placeholder="xxxxxxx"
            sx={{ border: "1px solid #4F4F4F", borderRadius: "5px" }}
          />
        )}
      </Modal>
    </>
  );
};

SellModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.any
};

export default SellModal;
