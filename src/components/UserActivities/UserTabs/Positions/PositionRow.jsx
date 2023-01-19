import React, { useMemo, memo, useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
// Mui
import { Grid, TableCell, Tooltip, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShareIcon from "@mui/icons-material/Share";
// import ExitLimitMarketModal from "../../../CustomModals/ExitLimitMarketModal";
import CancelIcon from "@mui/icons-material/Cancel";

// Assets ans styles
import { EXIT_LIMIT, EXIT_MARKET } from "../../UserActivitiesObjects";
import { positionSymbol, addmarginiconstyle, closebutton, singleGrid, singleGrid1, tablePositionCategoryStyle1, tablePositionCategoryStyle2, exitMarketLimitStyle } from "../UserTabs.style";
import { useDispatch } from "react-redux";
// Components and helper components
import { sxColorUtility, SymbolPrecisionHelper } from "helpers";
import { selectedSymbol } from "../../../../frontend-BL/redux/actions/Internal/SetSelectedSymbol.ac";
import SharePositionModal from "../../../CustomModals/SharePosition";
import SharePositionModalM from "../../../CustomModals/SharePositionM";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseModal from "components/CustomModals/CloseModal";

import { Box } from "@mui/system";
import { usePositionCalculations } from "../../../../frontend-BL/businessHooks";
import AddMarginModal from "components/CustomModals/AddMarginModal/AddMarginModal";
import ExitLimitMarketModal from "components/CustomModals/ExitLimitMarketModal";

const PositionRow = (props) => {
  const addMargin = useRef(false);
  const sharePosition = useRef(false);
  // const closePosition = useRef(false);
  const [closePosition, setClosePosition] = useState(false);
  const dispatch = useDispatch();
  const mobile = useMediaQuery("(max-width:600px)");
  const { symbol, Key } = props;
  const [IsExitLimitMarketModalOpen, setIsExitLimitMarketModalOpen] = useState({ isOpen: false, exitWithLimitOrMarket: "" });
  const SETISMARKETLIMITMARKETMODALOPEN = useCallback(
    (data) => {
      setIsExitLimitMarketModalOpen(data);
    },
    [IsExitLimitMarketModalOpen]
  );
  const ClosePositionButton = () => {
    closePositions(getPositionSide);
    setClosePosition(false);
  };
  const {
    ltp,
    getLeverage,
    getPositionSize,
    symbolWithBaseAsset,
    getPositionSide,
    getEntryPrice,
    markPrice,
    getLiquidationPrice,
    getPositionMarginRatio,
    getIsolatedWallet,
    getPositionUnrealizedProfit,
    calculateLiquidationPrice,
    percentage,
    closePositions,
    pnlWithBaseAsset,
    getPositionAmount,
    symbolBaseAsset
  } = usePositionCalculations({ symbol });
  const { setDecimalPrecision, defaultlimiter } = SymbolPrecisionHelper(symbol);
  const PositionRowData = useMemo(
    () => (
      <Box key={Key}>
        <Grid
          container
          sx={{
            textAlign: "center",
            backgroundColor: "background.secondary",
            "&:hover": {
              backgroundColor: "background.regular"
            }
          }}
        >
          <Grid sx={singleGrid1} xs={1.3}>
            <Typography onClick={() => dispatch(selectedSymbol(symbol.toLowerCase()))} sx={positionSymbol}>
              {symbol}
            </Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={0.5}>
            <Typography sx={sxColorUtility(getPositionSide, tablePositionCategoryStyle1)}>{getPositionSide}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>{symbolWithBaseAsset}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1.1}>
            <Typography sx={tablePositionCategoryStyle1}>{defaultlimiter(getPositionSize)}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={0.6}>
            <Typography sx={tablePositionCategoryStyle1}>{defaultlimiter(getLeverage)}X</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1.1}>
            <Typography sx={tablePositionCategoryStyle1}>{setDecimalPrecision(getEntryPrice)}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>{calculateLiquidationPrice}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={0.9}>
            <Typography sx={tablePositionCategoryStyle1}>{setDecimalPrecision(ltp)}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>{percentage(defaultlimiter(getPositionMarginRatio))}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1.1}>
            <Grid container>
              <Grid xs={8}>
                <Typography sx={tablePositionCategoryStyle1}>{defaultlimiter(getIsolatedWallet)}</Typography>
              </Grid>
              <Grid xs={4}>
                <Typography sx={tablePositionCategoryStyle1}>
                  <AddCircleIcon
                    onClick={() => {
                      if (ltp !== undefined && ltp.length > 0) {
                        addMargin.current = true;
                      }
                    }}
                    sx={addmarginiconstyle}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={singleGrid} xs={1.2}>
            <Grid container>
              <Grid xs={8}>
                <Typography sx={sxColorUtility(getPositionUnrealizedProfit, tablePositionCategoryStyle1)}>{pnlWithBaseAsset(getPositionUnrealizedProfit)}</Typography>
              </Grid>
              <Grid xs={4}>
                <Typography sx={tablePositionCategoryStyle1}>
                  <ShareIcon
                    onClick={() => {
                      if (ltp !== undefined && ltp.length > 0) {
                        sharePosition.current = true;
                      }
                    }}
                    sx={addmarginiconstyle}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={singleGrid} xs={1.2}>
            <Grid container justifyContent="center" alignItems="center">
              <Grid xs={5}>
                <Typography
                  onClick={() => {
                    if (ltp !== undefined && ltp.length > 0) {
                      SETISMARKETLIMITMARKETMODALOPEN({ ...IsExitLimitMarketModalOpen, exitWithLimitOrMarket: "MARKET", isOpen: true });
                    }
                    // exitWithLimitOrMarket.current = "MARKET";
                    // isExitLimitMarketModalOpen.current = true;
                  }}
                  sx={exitMarketLimitStyle}
                >
                  {EXIT_MARKET}
                </Typography>
              </Grid>
              <Grid xs={4}>
                <Typography
                  onClick={() => {
                    if (ltp !== undefined && ltp.length > 0) {
                      SETISMARKETLIMITMARKETMODALOPEN({ ...IsExitLimitMarketModalOpen, exitWithLimitOrMarket: "LIMIT", isOpen: true });
                    }
                  }}
                  sx={exitMarketLimitStyle}
                >
                  {EXIT_LIMIT}
                </Typography>
              </Grid>
              <Grid xs={3}>
                <TableCell sx={tablePositionCategoryStyle2}>
                  <Tooltip title={"Close position at market price"} placement="top">
                    <CancelIcon
                      sx={closebutton}
                      onClick={() => {
                        if (ltp !== undefined && ltp.length > 0) {
                          setClosePosition(true);
                        }
                      }}
                    />
                  </Tooltip>
                </TableCell>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {closePosition && <CloseModal isOpen={closePosition} close={() => setClosePosition(false)} positionEntry={ClosePositionButton} symbol={symbol} />}
        {sharePosition.current && mobile && (
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

        {sharePosition.current && !mobile && (
          <SharePositionModal
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

        <ExitLimitMarketModal
          isOpen={IsExitLimitMarketModalOpen.isOpen}
          close={() => SETISMARKETLIMITMARKETMODALOPEN({ ...IsExitLimitMarketModalOpen, isOpen: false })}
          secondaryAction={() => SETISMARKETLIMITMARKETMODALOPEN({ ...IsExitLimitMarketModalOpen, isOpen: false })}
          orderType={IsExitLimitMarketModalOpen.exitWithLimitOrMarket}
          positionEntry={{ getPositionAmount, getPositionSide, getEntryPrice, ltp, symbolBaseAsset }}
          symbol={symbol}
        />

        {addMargin.current && <AddMarginModal isOpen={addMargin.current} close={() => (addMargin.current = false)} symbol={symbol} />}
      </Box>
    ),
    [ltp, getLeverage, getPositionSize, symbolWithBaseAsset, getPositionSide, getEntryPrice, markPrice, getLiquidationPrice, getPositionMarginRatio, getIsolatedWallet, getPositionUnrealizedProfit]
  );

  return PositionRowData;
};

PositionRow.propTypes = {
  symbol: PropTypes.string,
  Key: PropTypes.string
};

export default memo(PositionRow);
