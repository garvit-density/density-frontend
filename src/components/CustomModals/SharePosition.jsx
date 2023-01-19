/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Modal } from "../UI/Modal";
import PropTypes from "prop-types";
import { Box, Typography, Divider, Grid } from "@mui/material";
import React, { useRef } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";
import Button from "@mui/material/Button";
import densityLogo from "assets/images/logo.svg";
import arrow from "assets/images/arrow.svg";
import arrowdown from "assets/images/arrowdown.svg";
import coinImg from "assets/images/img.svg";
import spaceship from "assets/images/spaceship.svg";
import QRCode from "assets/images/QRCode.svg";
import design from "assets/images/design.svg";
import {
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterIcon
} from "react-share";
import "./Modals.scss";
import {
  ShareCardArrow,
  ShareCardBigFont,
  ShareCardDivider,
  ShareCardDividerTwo,
  ShareCardDownloadButton,
  ShareCardFlex,
  ShareCardFlexCenter,
  ShareCardFlexColumn,
  ShareCardFlexEnd,
  ShareCardFlexSpaceBetween,
  ShareCardMainContainer,
  ShareCardQRCode,
  ShareCardROENegative,
  ShareCardROEPositive,
  ShareCardSmallFont,
  ShareCardSpaceship
} from "./SharePosition.styles";

const textStrings = {
  ENTRYPRICE: "Entry Price",
  LASTPRICE: "Last Price",
  DOWNLOAD: "Download",
  SCANQR: "Scan QR code to know more about",
  DENSITY: "DENSITY"
};

const SharePositionModal = ({
  isOpen,
  close,
  symbol,
  getPositionSide,
  getPositionUnrealizedProfit,
  getLeverage,
  getEntryPrice,
  ltp,
  getIsolatedWallet
}) => {
  const ref = useRef(null);
  const contractAsset = symbol;
  const disableConfirm = true;
  const getLeverageVal = getLeverage;
  const getPositionUnrealizedProfitVal = getPositionUnrealizedProfit;
  const getIsolatedWalletVal = getIsolatedWallet;
  const getEntryPriceVal = getEntryPrice;
  const ltpVal = ltp;
  const getPositionSideVal = getPositionSide;
  let ROE;
  if (getPositionSideVal === "LONG") {
    ROE = (
      (getPositionUnrealizedProfitVal / getIsolatedWalletVal) *
      100 *
      1
    ).toFixed(2);
  } else {
    ROE = (
      (getPositionUnrealizedProfitVal / getIsolatedWalletVal) *
      100 *
      1
    ).toFixed(2);
  }
  console.log(getIsolatedWalletVal, getPositionUnrealizedProfitVal, getPositionSideVal, "getIsolatedWalletVal");

  // eslint-disable-next-line no-unused-vars
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
    width: "1024px",
    height: "620px"
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => {
    takeScreenShot(ref.current).then(download);
  };

  return (
    <Modal isOpen={isOpen} close={close} disableConfirm={disableConfirm}>
      <Box component="form" noValidate autoComplete="off">
        <div>
          <div ref={ref}>
            <Grid
              container
              sx={ShareCardMainContainer}
              rowSpacing={1}
              columnSpacing={{ xs: 4, sm: 1, md: 0 }}
            >
              <Grid item xs={6} sm={12}>
                <img
                  style={{ maxWidth: "100px" }}
                  src={densityLogo}
                  alt="logo"
                />
              </Grid>
              <Grid
                item
                xs={3}
                direction="row"
                container
                justifyContent="center"
                alignItems="flex-end"
              >
                <Box sx={ShareCardSpaceship}>
                  <img
                    style={{ maxWidth: "100px" }}
                    src={spaceship}
                    alt="image"
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={ShareCardFlexCenter}>
                  <Typography variant="myVariant" sx={ShareCardBigFont}>
                    {contractAsset}
                  </Typography>
                  <Box sx={ShareCardFlex}>
                    {ROE > 0 && (
                      <>
                        <img style={ShareCardArrow} src={arrow} alt="arrow" />
                        <Typography variant="myVariant2" sx={ShareCardROEPositive}>
                          {ROE}%
                        </Typography>
                      </>
                    )}{" "}
                    {ROE <= 0 && (
                      <>
                        <img
                          style={ShareCardArrow}
                          src={arrowdown}
                          alt="arrow"
                        />
                        <Typography variant="myVariant2" sx={ShareCardROENegative}>
                          {ROE}%
                        </Typography>
                      </>
                    )}
                  </Box>
                  <Box sx={ShareCardFlexSpaceBetween}>
                    <Typography variant="myVariant3">
                      {getPositionSideVal}
                    </Typography>
                    <Divider
                      sx={ShareCardDivider}
                      orientation="vertical"
                      flexItem
                    ></Divider>
                    <Typography variant="myVariant3" color="primary.main">
                      {getLeverageVal}X
                    </Typography>
                  </Box>

                  <Box sx={ShareCardFlexSpaceBetween}>
                    <Box sx={ShareCardFlexColumn}>
                      <Typography variant="myVariant3">
                        {textStrings.ENTRYPRICE}
                      </Typography>
                      <Typography variant="myVariant3" color="primary.main">
                        {getEntryPriceVal}
                      </Typography>
                    </Box>
                    <Divider
                      sx={ShareCardDividerTwo}
                      orientation="vertical"
                      flexItem
                    ></Divider>
                    <Box sx={ShareCardFlexColumn}>
                      <Typography variant="myVariant3">
                        {textStrings.LASTPRICE}
                      </Typography>
                      <Typography variant="myVariant3" color="primary.main">
                        {ltpVal}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={3}
                direction="row"
                container
                justifyContent="center"
                alignItems="center"
              >
                <img style={{ maxWidth: "150px" }} src={coinImg} alt="image" />
              </Grid>
              <Grid
                item
                xs={12}
                direction="row"
                container
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid
                  item
                  xs={12}
                  direction="row"
                  container
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid justifyContent="center" alignItems="center" item xs={6}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItem: "center"
                      }}
                    >
                      <Box sx={ShareCardFlex}>
                        <TwitterShareButton
                          url={"https://app.density.exchange"}
                          title={
                            "Coin :" +
                            contractAsset +
                            "\n" +
                            "Position Side : " +
                            getPositionSideVal +
                            "\n" +
                            "Leverage : " +
                            getLeverageVal +
                            "X" +
                            "\n" +
                            "ROI : " +
                            ROE +
                            "%" +
                            "\n" +
                            "Entry Price : " +
                            getEntryPriceVal +
                            "USDT" +
                            "\n" +
                            "Last Price : " +
                            ltpVal +
                            "USDT" +
                            "\n"
                          }
                          hashtag="#DensityExchange"
                          className="share-btn"
                        >
                          <TwitterIcon />
                        </TwitterShareButton>
                        <Button
                          variant="contained"
                          onClick={downloadScreenshot}
                          sx={ShareCardDownloadButton}
                        >
                          {textStrings.DOWNLOAD}
                        </Button>
                        <WhatsappShareButton
                          url={"https://app.density.exchange"}
                          separator=""
                          title={
                            "Coin :" +
                            contractAsset +
                            "\n" +
                            "Position Side : " +
                            getPositionSideVal +
                            "\n" +
                            "Leverage : " +
                            getLeverageVal +
                            "X" +
                            "\n" +
                            "ROI : " +
                            ROE +
                            "%" +
                            "\n" +
                            "Entry Price : " +
                            getEntryPriceVal +
                            "USDT" +
                            "\n" +
                            "Last Price : " +
                            ltpVal +
                            "USDT" +
                            "\n"
                          }
                          className="share-btn"
                        >
                          <WhatsappIcon />{" "}
                        </WhatsappShareButton>
                      </Box>
                    </div>
                    <Typography variant="myVariant3" sx={ShareCardSmallFont}>
                      {textStrings.SCANQR} &nbsp;
                    </Typography>
                    <Typography
                      variant="myVariant3"
                      color="primary.main"
                      sx={ShareCardSmallFont}
                    >
                      {textStrings.DENSITY}.
                    </Typography>
                  </Grid>
                  <Grid sx={ShareCardFlexEnd} item xs={6}>
                    <Box
                      component="img"
                      sx={ShareCardQRCode}
                      alt="qr code"
                      src={QRCode}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Box sx={ShareCardFlexEnd}>
                <img
                  src={design}
                  alt="design"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%"
                  }}
                />
              </Box>
            </Grid>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

SharePositionModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  getPositionSide: PropTypes.string,
  getLeverage: PropTypes.string,
  getEntryPrice: PropTypes.string,
  ltp: PropTypes.string,
  getIsolatedWallet: PropTypes.string,
  disableConfirm: PropTypes.bool,
  symbol: PropTypes.string,
  getPositionUnrealizedProfit: PropTypes.string
};

export default SharePositionModal;
