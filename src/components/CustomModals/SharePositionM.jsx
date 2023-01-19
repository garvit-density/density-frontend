import React, { useRef } from "react";
import PropTypes from "prop-types";
import Drawer from "@mui/material/SwipeableDrawer";
import { Box, Typography, Divider, Grid } from "@mui/material";
import { useScreenshot, createFileName } from "use-react-screenshot";
import densityLogo from "assets/images/logo.svg";
import arrow from "assets/images/arrow.svg";
import arrowdown from "assets/images/arrowdown.svg";
import coinImg from "assets/images/img.svg";
import QRCode from "assets/images/QRCode.svg";
import design from "assets/images/design.svg";
import { TwitterShareButton, WhatsappShareButton, WhatsappIcon, TwitterIcon } from "react-share";
import {
  ShareCardArrow,
  ShareCardBigFont,
  ShareCardContM,
  ShareCardDivider,
  ShareCardDividerTwo,
  ShareCardFlex,
  ShareCardFlexCenter,
  ShareCardFlexColumn,
  ShareCardFlexEnd,
  ShareCardFlexSpaceAroundM,
  ShareCardFlexSpaceBetweenM,
  ShareCardMainContainerM,
  ShareCardQRCodeM,
  ShareCardROEPositive,
  ShareCardROENegative,
  ShareCardSmallFont
} from "./SharePosition.styles";
import downloadIcon from "assets/images/downloadIcon.svg";

const textStrings = {
  SHAREMESSAGE: "Share with your friends",
  ENTRYPRICE: "Entry Price",
  LASTPRICE: "Last Price",
  DOWNLOAD: "Download",
  SCANQR: "Scan QR code to know more about",
  DENSITY: "DENSITY"
};

const SharePositionM = ({ isOpen, close, symbol, getPositionSide, getPositionUnrealizedProfit, getLeverage, getEntryPrice, ltp, getIsolatedWallet }) => {
  const ref = useRef(null);
  const contractAsset = symbol;
  const getLeverageVal = getLeverage;
  const getEntryPriceVal = getEntryPrice;
  const ltpVal = ltp;
  const getPositionSideVal = getPositionSide;
  const getPositionUnrealizedProfitVal = getPositionUnrealizedProfit;
  const getIsolatedWalletVal = getIsolatedWallet;
  // eslint-disable-next-line no-unused-vars
  // const [canShare, setCanShare] = React.useState(null);

  // useEffect(() => {
  //   setCanShare(navigator.share);
  // }, []);

  let ROE;
  if (getPositionSideVal === "LONG") {
    ROE = ((getPositionUnrealizedProfitVal / getIsolatedWalletVal) * 100 * 1).toFixed(2);
    console.log("roi", ROE);
  } else {
    ROE = ((getPositionUnrealizedProfitVal / getIsolatedWalletVal) * 100 * -1).toFixed(2);
    console.log("roi", ROE);
  }

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
    <div>
      <Drawer anchor="bottom" open={isOpen} onClose={close}>
        <Grid container sx={ShareCardMainContainerM}>
          <Grid item xs={12}>
            <Typography variant="myVariant" display="block">
              {textStrings.SHAREMESSAGE}
            </Typography>
          </Grid>
          <div ref={ref}>
            <Grid container sx={ShareCardContM} rowSpacing={3}>
              <Grid item xs={6} sm={12}>
                <img style={{ maxWidth: "100px" }} src={densityLogo} alt="logo" />
              </Grid>
              <Grid item xs={12}>
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
                        <img style={ShareCardArrow} src={arrowdown} alt="arrow" />
                        <Typography variant="myVariant2" sx={ShareCardROENegative}>
                          {ROE}%
                        </Typography>
                      </>
                    )}
                  </Box>
                  <Box sx={ShareCardFlexSpaceBetweenM}>
                    <Typography variant="myVariant3">{getPositionSideVal}</Typography>
                    <Divider sx={ShareCardDivider} orientation="vertical" flexItem></Divider>
                    <Typography variant="myVariant3" color="primary.main">
                      {getLeverageVal}X
                    </Typography>
                  </Box>

                  <Box sx={ShareCardFlexSpaceBetweenM}>
                    <Box sx={ShareCardFlexColumn}>
                      <Typography variant="myVariant3">{textStrings.ENTRYPRICE}</Typography>
                      <Typography variant="myVariant3" color="primary.main">
                        {getEntryPriceVal}
                      </Typography>
                    </Box>
                    <Divider sx={ShareCardDividerTwo} orientation="vertical" flexItem></Divider>
                    <Box sx={ShareCardFlexColumn}>
                      <Typography variant="myVariant3">{textStrings.LASTPRICE}</Typography>
                      <Typography variant="myVariant3" color="primary.main">
                        {ltpVal}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={3} direction="row" container justifyContent="center" alignItems="center" position="absolute" right="0" bottom="20vh">
                <img style={{ maxWidth: "15vw" }} src={coinImg} alt="image" />
              </Grid>
              <Grid item xs={12} direction="row" container justifyContent="flex-start" alignItems="center" marginTop="3vh">
                <Grid item xs={12} direction="row" container justifyContent="flex-start" alignItems="center">
                  <Typography variant="myVariant3" sx={ShareCardSmallFont}>
                    {textStrings.SCANQR} &nbsp;
                  </Typography>
                  <Typography variant="myVariant3" color="primary.main" sx={ShareCardSmallFont}>
                    {textStrings.DENSITY}.
                  </Typography>
                </Grid>
                <Grid item xs={12} direction="row" container justifyContent="flex-start" alignItems="center">
                  <Box component="img" sx={ShareCardQRCodeM} alt="qr code" src={QRCode} />
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
          <Grid item xs={12} sx={ShareCardFlexSpaceAroundM}>
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
            <Box sx={ShareCardFlexColumn} onClick={downloadScreenshot}>
              <img src={downloadIcon} alt="whatsapp" />
              <Typography variant="myVariant3" sx={ShareCardSmallFont}>
                {textStrings.DOWNLOAD}
              </Typography>
            </Box>
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
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
};

SharePositionM.propTypes = {
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

export default SharePositionM;
