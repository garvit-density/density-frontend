import { Button, Grid, Tooltip } from "@mui/material";

import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import { SellModal, BuyModal, WithdrawModal, DepositModal } from "../CustomModals";
import { Toggle } from "../UI/Toggle";

import { walletScreenRender } from "../../frontend-BL/redux/actions/Internal/WalletScreenRender.ac";
import CachedIcon from "@mui/icons-material/Cached";
import { styles } from "./ToggleHeader.styled";

import { TOGGLEHEADER_CONSTANTS } from "./ToggleHeader.const";
import { mobileViewActiveFlex } from "components/UI/MWebStyles/MWeb.styles";

function ToggleHeaderMobile({ currentTab, setCurrentTab, kycStatus, pennydropStatus }) {
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
    <Grid p={2} justifyContent="center" sx={mobileViewActiveFlex}>
    <Grid item>
      <Toggle values={tabs} value={currentTab} setValue={setCurrentTab} />
    </Grid>
  </Grid>
  <Grid container px={4} py={2} sx={[styles.mobBtnContainer, mobileViewActiveFlex]}>
      {(
        selectedWalletFromTabs === TOGGLEHEADER_CONSTANTS.FIAT_WALLET &&
        [<Grid item xs={5.2} key={TOGGLEHEADER_CONSTANTS.DEPOSIT_INR}>
        <Button
          key={TOGGLEHEADER_CONSTANTS.DEPOSIT_INR}
          disabled={!(kycStatus === TOGGLEHEADER_CONSTANTS.KYC_VERIFIED && pennydropStatus === TOGGLEHEADER_CONSTANTS.PENNYDROP_VERIFIED)}
          onClick={() => setDeposit(true)}
          sx={styles.btnContainedMobile}>
          {TOGGLEHEADER_CONSTANTS.DEPOSIT_INR}
          </Button>
          </Grid>,

          <Grid item xs={5.2} key={TOGGLEHEADER_CONSTANTS.WITHDRAW_INR}>
        <Button
          key={TOGGLEHEADER_CONSTANTS.WITHDRAW_INR}
          disabled={!(kycStatus === TOGGLEHEADER_CONSTANTS.KYC_VERIFIED && pennydropStatus === TOGGLEHEADER_CONSTANTS.PENNYDROP_VERIFIED)}
          onClick={() => setWithdraw(true)}
          sx={styles.btnContainedMobile}>
          {TOGGLEHEADER_CONSTANTS.WITHDRAW_INR}
        </Button>
        </Grid>,
          (kycStatus === TOGGLEHEADER_CONSTANTS.KYC_VERIFIED && pennydropStatus === TOGGLEHEADER_CONSTANTS.PENNYDROP_VERIFIED) &&
        <Grid item xs={0.5} key={TOGGLEHEADER_CONSTANTS.REFRESH}>
        <Tooltip title={TOGGLEHEADER_CONSTANTS.REFRESH}>
          <CachedIcon sx={{ my: 0.5 }} onClick={() => dispatch(walletScreenRender(true, !walletScreenRenderBoolean))}/>
        </Tooltip>
        </Grid>
        ]) ||
        (selectedWalletFromTabs === TOGGLEHEADER_CONSTANTS.FUTURES_WALLET &&
        [<Grid item xs={5.2} key={TOGGLEHEADER_CONSTANTS.BUY_USDT}>
        <Button onClick={() => setBuy(true)}
          disabled={!(kycStatus === TOGGLEHEADER_CONSTANTS.KYC_VERIFIED && pennydropStatus === TOGGLEHEADER_CONSTANTS.PENNYDROP_VERIFIED)}
          sx={styles.btnContainedMobile}>
          {TOGGLEHEADER_CONSTANTS.BUY_USDT}
        </Button>
        </Grid>,
        <Grid item xs={5.2} key={TOGGLEHEADER_CONSTANTS.SELL_USDT}>
        <Button
          onClick={() => setSell(true)}
          disabled={!(kycStatus === TOGGLEHEADER_CONSTANTS.KYC_VERIFIED && pennydropStatus === TOGGLEHEADER_CONSTANTS.PENNYDROP_VERIFIED)}
          sx={styles.btnContainedMobile}>
          {TOGGLEHEADER_CONSTANTS.SELL_USDT}
        </Button>
        </Grid>,
        (kycStatus === TOGGLEHEADER_CONSTANTS.KYC_VERIFIED && pennydropStatus === TOGGLEHEADER_CONSTANTS.PENNYDROP_VERIFIED) &&
        <Grid item xs={0.5} key={TOGGLEHEADER_CONSTANTS.REFRESH}>
        <Tooltip title={TOGGLEHEADER_CONSTANTS.REFRESH}>
          <CachedIcon sx={{ my: 0.5 }} key={TOGGLEHEADER_CONSTANTS.REFRESH} onClick={() => dispatch(walletScreenRender(true, !walletScreenRenderBoolean))}/>
        </Tooltip>
        </Grid>
        ])}
      <WithdrawModal isOpen={withdraw} close={() => setWithdraw(false)} />
      <DepositModal isOpen={deposit} close={() => setDeposit(false)} />
      <BuyModal isOpen={buy} close={() => setBuy(false)} />
      <SellModal isOpen={sell} close={() => setSell(false)} />
    </Grid>
    </>
  );
}
ToggleHeaderMobile.propTypes = {
  currentTab: PropTypes.number,
  setCurrentTab: PropTypes.any,
  kycStatus: PropTypes.string,
  pennydropStatus: PropTypes.string
};
export default ToggleHeaderMobile;
