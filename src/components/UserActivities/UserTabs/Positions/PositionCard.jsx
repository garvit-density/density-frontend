import React, { useRef } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BasicmModal from "../../../UI/mModal/index";
import { BORDER, FONT12, FONT13, ACCORDIANGRIDITEM, ACCORDIANGRIDITEMHEADING, ACCODIANHEADER, EXPANDICON, ERROR, SUCCESS, ACCODIAN } from "./../style";
import { usePositionCalculations } from "frontend-BL/businessHooks";
import SharePositionModalM from "../../../CustomModals/SharePositionM";
import PropTypes from "prop-types";
import { ENTRYPRICE, LIQUDATIONPRICE, MARGINRATIO, MARGINUSED, SIZEINCONTRACT, SIZEINUSDT } from "../mOrders/mMagicString";
import AddMarginModalm from "components/CustomModals/AddMarginModal/addMarginModelm";
const PositionCard = ({ symbol }) => {
  const addMargin = useRef(false);
  const {
    ltp,
    getLeverage,
    getPositionSize,
    symbolWithBaseAsset,
    getPositionSide,
    getEntryPrice,
    getPositionMarginRatio,
    getIsolatedWallet,
    getPositionUnrealizedProfit,
    calculateLiquidationPrice,
    pnlWithBaseAsset,
    closePositions
  } = usePositionCalculations({ symbol });
  const ClosePositionButton = () => {
    if (ltp !== undefined && ltp.length > 0) {
      closePositions(getPositionSide);
    }
  };
  const sharePosition = useRef(false);

  return (
    <>
      <Grid item xs={12}>
        <Accordion sx={ACCODIAN}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={EXPANDICON} />} sx={BORDER}>
            <Box sx={ACCODIANHEADER}>
              {" "}
              <Box sx={ACCORDIANGRIDITEM}>
                <Typography
                  sx={[getPositionSide === "SHORT" ? { backgroundColor: ERROR, px: 1.5, my: 1, fontSize: "1rem" } : { backgroundColor: SUCCESS, px: 1.5, my: 1, fontSize: "1rem" }]}
                  variant="h6"
                >
                  {getPositionSide}
                </Typography>
                <Typography sx={{ fontSize: "16px" }} variant="h6">
                  {symbol} | <span>{getLeverage} x</span>
                </Typography>
              </Box>
              <Box sx={[{ mr: 2 }, FONT13]}>
                <Box sx={{ display: "flex", minWidth: "95px", justifyContent: "space-between" }}>
                  <Box sx={[{ color: "#8B8B97" }]}>PnL</Box>{" "}
                  <Box sx={[getPositionUnrealizedProfit.toFixed(4) > 0 ? { color: "background.success.primary" } : { color: "background.error.primary" }]}>
                    {pnlWithBaseAsset(getPositionUnrealizedProfit)}
                  </Box>
                </Box>
                <Box sx={{ display: "flex", minWidth: "95px", justifyContent: "space-between" }}>
                  <Box sx={{ color: "#8B8B97", fontSize: "13px", mr: 1 }}> Ltp </Box> <Box sx={{ fontSize: "13px" }}> {ltp} </Box>
                </Box>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={BORDER}>
            <Grid container spacing={2}>
              <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                  {SIZEINCONTRACT}
                </Typography>
                <Typography varient="h5" sx={FONT12}>
                  {symbolWithBaseAsset}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                  {ENTRYPRICE}
                </Typography>
                <Typography varient="h5" sx={FONT12}>
                  {getEntryPrice}
                </Typography>
              </Grid>{" "}
              <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                  {LIQUDATIONPRICE}
                </Typography>
                <Typography varient="h5" sx={FONT12}>
                  {" "}
                  {calculateLiquidationPrice}
                </Typography>
              </Grid>{" "}
              <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                  {SIZEINUSDT}
                </Typography>
                <Typography varient="h5" sx={FONT12}>
                  {getPositionSize.toFixed(4)}
                </Typography>
              </Grid>{" "}
              <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                  {MARGINRATIO}
                </Typography>

                <Typography varient="h5" sx={FONT12}>
                  {getPositionMarginRatio.toFixed(4)}%
                </Typography>
              </Grid>{" "}
              <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                <Box sx={{ display: "flex", width: "80px", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                    {MARGINUSED}
                  </Typography>
                  <AddCircleIcon
                    sx={{ width: "0.85rem" }}
                    onClick={() => {
                      if (ltp !== undefined && ltp.length > 0) {
                        addMargin.current = true;
                      }
                    }}
                  />
                </Box>

                <Typography varient="h5" sx={FONT12}>
                  {getIsolatedWallet}
                </Typography>
              </Grid>
              <Grid item xs={10} sx={ACCORDIANGRIDITEM}>
                <BasicmModal title="Close Position" close={ClosePositionButton} symbolName={symbol} closeValue={getPositionSide} />
              </Grid>
              <Grid item xs={2} sx={[ACCORDIANGRIDITEM, { justifyContent: "center" }]}>
                <ShareIcon
                  onClick={() => {
                    if (ltp !== undefined && ltp.length > 0) {
                      sharePosition.current = true;
                    }
                  }}
                  sx={{ color: "background.ultramild" }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      {addMargin.current && <AddMarginModalm isOpen={addMargin.current} close={() => (addMargin.current = false)} symbol={symbol} />}
      {sharePosition.current && (
        <SharePositionModalM
          getIsolatedWallet={getIsolatedWallet}
          getPositionUnrealizedProfit={getPositionUnrealizedProfit}
          isOpen={sharePosition.current}
          close={() => (sharePosition.current = false)}
          symbol={symbol}
          getPositionSide={getPositionSide}
          getLeverage={getLeverage}
          getEntryPrice={getEntryPrice}
          ltp={ltp}
        />
      )}
    </>
  );
};
PositionCard.propTypes = {
  symbol: PropTypes.string,
  Key: PropTypes.string
};

export default PositionCard;
