import React from "react";
import { Typography, Box, Divider, Paper } from "@mui/material";
import { lifeTimeTabstyles, paperStyle } from "../Portfolio.styled";
import { sxColorUtility } from "helpers";
import PropTypes from "prop-types";
import { Select } from "../../../components/UI/Select";
import { PORTFOLIO_CONSTANTS } from "../../../frontend-BL/businessHooks/PORTFOLIO/Constants/Portfolio.const";
import { WebViewActiveBlock } from "components/UI/MWebStyles/MWeb.styles";
import CurrentStatusMobile from "../MwebComponents/MwebCurrentStatus/CurrentStatusMobile";
import { BuyingPowerBox, HorizontalDividerStyles, innerBox, LeverageBoxStyles, PortfolioLabelTypography, VerticalDividerStyles, WrapperBox } from "./CurrentStatus.styles";

const CurrentStatus = ({ currentStatus, availableContractsMarginRatio, selectedContractMarginRatio, setSelectedContractForMarginRatio }) => {
  return (
    <>
    {/* Web View Active */}
        <Paper sx={[paperStyle, WebViewActiveBlock]}>
          <Typography sx={PortfolioLabelTypography} variant="h6">
            {PORTFOLIO_CONSTANTS.CURRENT_STATUS_LABEL}
          </Typography>
          <Box
            sx={WrapperBox}
          >
            <Box
              sx={innerBox}
            >
              <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">{PORTFOLIO_CONSTANTS.FREE_MARGIN_LABEL}</Typography>

              <Typography variant="valueText">{((currentStatus.freeMargin && parseFloat(currentStatus.freeMargin).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-")}</Typography>

              <Divider
                sx={HorizontalDividerStyles}
              />
              <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">{PORTFOLIO_CONSTANTS.UNREALIZED_PNL_LABEL}</Typography>
              <Typography variant="valueText" sx={sxColorUtility(parseFloat(currentStatus.unRealizedPnL), {}, PORTFOLIO_CONSTANTS.CURRENT_STATUS_LABEL)}>
              {(currentStatus.unRealizedPnL && parseFloat(currentStatus.unRealizedPnL).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-"}
              </Typography>
            </Box>
            <Divider
              orientation="vertical"
              sx={VerticalDividerStyles}
            />
            <Box
              sx={BuyingPowerBox}
            >
              <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">{PORTFOLIO_CONSTANTS.MAX_BUYING_POWER_LABEL}</Typography>
              <Typography variant="valueText">{((currentStatus.maxBuyingPower && parseFloat(currentStatus.maxBuyingPower).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-")}</Typography>
              <Divider
                sx={HorizontalDividerStyles}
              />
              <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">{PORTFOLIO_CONSTANTS.MARGIN_RATIO_LABEL}</Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
              {availableContractsMarginRatio.length ? <Select values={availableContractsMarginRatio} value={selectedContractMarginRatio} setValue={setSelectedContractForMarginRatio} /> : <Typography variant="valueText">-</Typography>}
              <Typography sx={{ fontSize: "20px", py: 1 }} variant="valueText">{Object.keys(currentStatus).length && (currentStatus.marginRatio[selectedContractMarginRatio] && parseFloat(currentStatus.marginRatio[selectedContractMarginRatio]).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION))}</Typography>
              </Box>
            </Box>
            <Divider
              orientation="vertical"
              sx={VerticalDividerStyles}
            />
            <Box
              sx={LeverageBoxStyles}
            >
              <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">{PORTFOLIO_CONSTANTS.LEVERAGE_AVAILABLE_LABEL}</Typography>
              <Typography variant="valueText">{(currentStatus.maxLeverage && parseFloat(currentStatus.maxLeverage).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-"}</Typography>

              <Divider
                sx={HorizontalDividerStyles}
              />
              <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">{PORTFOLIO_CONSTANTS.OPEN_POSITIONS_LABEL}</Typography>
              <Typography variant="valueText">{(currentStatus.numOpenPositions && parseFloat(currentStatus.numOpenPositions).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-"}</Typography>
            </Box>
          </Box>
        </Paper>
    {/* Mobile View Active */}
    <CurrentStatusMobile currentStatus={currentStatus} availableContractsMarginRatio={availableContractsMarginRatio} selectedContractMarginRatio={selectedContractMarginRatio} setSelectedContractForMarginRatio={setSelectedContractForMarginRatio} />
        </>
  );
};

CurrentStatus.propTypes = {
  currentStatus: PropTypes.object,
  availableContractsMarginRatio: PropTypes.object,
  selectedContractMarginRatio: PropTypes.object,
  setSelectedContractForMarginRatio: PropTypes.object
};

export default React.memo(CurrentStatus);
