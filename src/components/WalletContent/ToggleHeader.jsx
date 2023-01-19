import { Button, Grid, Tooltip } from "@mui/material";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import { SellModal, BuyModal, WithdrawModal } from "../CustomModals";
import { Toggle } from "../UI/Toggle";

import { walletScreenRender } from "../../frontend-BL/redux/actions/Internal/WalletScreenRender.ac";
import CachedIcon from "@mui/icons-material/Cached";
import { styles } from "./ToggleHeader.styled";

import { TOGGLEHEADER_CONSTANTS } from "./ToggleHeader.const";
import { WebViewActiveFlex } from "components/UI/MWebStyles/MWeb.styles";
import ToggleHeaderMobile from "./MwebToggleHeader";
import NewDeposite from "components/newWallet/Deposite/NewDeposite";
// import NewDeposite from "components/newWallet/Deposite/NewDeposite";

const ToggleHeader = ({ currentTab, setCurrentTab, kycStatus, pennydropStatus }) => {
  const navigate = useNavigate();

  const tabs = [TOGGLEHEADER_CONSTANTS.INR_WALLET, TOGGLEHEADER_CONSTANTS.USDT_WALLET].map((name, index) => ({ name, index }));

  const [withdraw, setWithdraw] = useState(false);
  const [deposit, setDeposit] = useState(false);
  const [buy, setBuy] = useState(false);
  const [sell, setSell] = useState(false);

  const dispatch = useDispatch();

  const selectedWalletFromTabs = useSelector((state) => state.selectedWallet.selectedWallet);

  const walletScreenRenderBoolean = useSelector((state) => state.walletScreenRender.walletScreenRenderFlag);

  return (
    <>
      {/* Web UI */}
      <Grid className="walletHeaderContainer" p={4} container justifyContent="space-between" sx={WebViewActiveFlex}>
        <Grid item>
          <Toggle values={tabs} value={currentTab} setValue={setCurrentTab} />
        </Grid>
        <Grid item sx={styles.btnContainer}>
          {(selectedWalletFromTabs === TOGGLEHEADER_CONSTANTS.FIAT_WALLET && [
            <Button
              key={TOGGLEHEADER_CONSTANTS.DEPOSIT_INR}
              disabled={kycStatus === TOGGLEHEADER_CONSTANTS.KYC_VERIFIED && pennydropStatus === TOGGLEHEADER_CONSTANTS.PENNYDROP_VERIFIED}
              onClick={() => setDeposit(true)}
              sx={styles.btnContained}
            >
              {TOGGLEHEADER_CONSTANTS.DEPOSIT_INR}
            </Button>,
            <Button
              key={TOGGLEHEADER_CONSTANTS.WITHDRAW_INR}
              disabled={!(kycStatus === TOGGLEHEADER_CONSTANTS.KYC_VERIFIED && pennydropStatus === TOGGLEHEADER_CONSTANTS.PENNYDROP_VERIFIED)}
              onClick={() => setWithdraw(true)}
              sx={styles.btnContained}
            >
              {TOGGLEHEADER_CONSTANTS.WITHDRAW_INR}
            </Button>,
            kycStatus === TOGGLEHEADER_CONSTANTS.KYC_VERIFIED && pennydropStatus === TOGGLEHEADER_CONSTANTS.PENNYDROP_VERIFIED && (
              <Tooltip title={TOGGLEHEADER_CONSTANTS.REFRESH}>
                <CachedIcon key={TOGGLEHEADER_CONSTANTS.REFRESH} onClick={() => dispatch(walletScreenRender(true, !walletScreenRenderBoolean))} />
              </Tooltip>
            )
          ]) ||
            (selectedWalletFromTabs === TOGGLEHEADER_CONSTANTS.FUTURES_WALLET && [
              <Button
                key={TOGGLEHEADER_CONSTANTS.BUY_USDT}
                onClick={() => setBuy(true)}
                disabled={!(kycStatus === TOGGLEHEADER_CONSTANTS.KYC_VERIFIED && pennydropStatus === TOGGLEHEADER_CONSTANTS.PENNYDROP_VERIFIED)}
                sx={styles.btnContained}
              >
                {TOGGLEHEADER_CONSTANTS.BUY_USDT}
              </Button>,
              <Button
                key={TOGGLEHEADER_CONSTANTS.SELL_USDT}
                onClick={() => setSell(true)}
                disabled={!(kycStatus === TOGGLEHEADER_CONSTANTS.KYC_VERIFIED && pennydropStatus === TOGGLEHEADER_CONSTANTS.PENNYDROP_VERIFIED)}
                sx={styles.btnContained}
              >
                {TOGGLEHEADER_CONSTANTS.SELL_USDT}
              </Button>,
              kycStatus === TOGGLEHEADER_CONSTANTS.KYC_VERIFIED && pennydropStatus === TOGGLEHEADER_CONSTANTS.PENNYDROP_VERIFIED && (
                <Tooltip title={TOGGLEHEADER_CONSTANTS.REFRESH}>
                  <CachedIcon key={TOGGLEHEADER_CONSTANTS.REFRESH} onClick={() => dispatch(walletScreenRender(true, !walletScreenRenderBoolean))} />
                </Tooltip>
              )
            ])}
          {(kycStatus === TOGGLEHEADER_CONSTANTS.KYC_NOT_VERIFIED || kycStatus === TOGGLEHEADER_CONSTANTS.KYC_FAILED) && (
            <Tooltip title={TOGGLEHEADER_CONSTANTS.KYC_BANK_VERIFICATION_NOT_COMPLETE} placement="top-start">
              <Button onClick={() => navigate("/update-account-details-kyc-initiate")} sx={styles.btnContained}>
                {TOGGLEHEADER_CONSTANTS.COMPLETE_KYC}
              </Button>
            </Tooltip>
          )}
          {(pennydropStatus === TOGGLEHEADER_CONSTANTS.PENNYDROP_NOT_VERIFIED || pennydropStatus === TOGGLEHEADER_CONSTANTS.PENNYDROP_FAILED) && (
            <Tooltip title={TOGGLEHEADER_CONSTANTS.KYC_BANK_VERIFICATION_NOT_COMPLETE} placement="top-start">
              <Button
                onClick={() => {
                  navigate("/accountProfileKYC");
                  window.localStorage.settingsTabValue = "4";
                }}
                sx={styles.btnContained}
              >
                {TOGGLEHEADER_CONSTANTS.VERIFY_BANK_ACCOUNT}
              </Button>
            </Tooltip>
          )}
          <WithdrawModal isOpen={withdraw} close={() => setWithdraw(false)} />
          <NewDeposite isOpen={deposit} close={() => setDeposit(false)} />
          {/* <DepositModal isOpen={deposit} close={() => setDeposit(false)} /> */}
          <BuyModal isOpen={buy} close={() => setBuy(false)} />
          <SellModal isOpen={sell} close={() => setSell(false)} />
        </Grid>
      </Grid>
      {/* Mobile */}
      <ToggleHeaderMobile currentTab={currentTab} setCurrentTab={setCurrentTab} kycStatus={kycStatus} pennydropStatus={pennydropStatus} />
    </>
  );
};

ToggleHeader.propTypes = {
  currentTab: PropTypes.number,
  setCurrentTab: PropTypes.any,
  kycStatus: PropTypes.string,
  pennydropStatus: PropTypes.string
};

export default ToggleHeader;
