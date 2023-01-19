import { Box, Divider, Paper, Typography } from "@mui/material";
import { mobileViewActiveBlock } from "components/UI/MWebStyles/MWeb.styles";
import { Select } from "components/UI/Select";
import { sxColorUtility } from "helpers";
import React from "react";
import { lifeTimeTabstyles, paperStyle } from "../../Portfolio.styled";
import PropTypes from "prop-types";
import { PORTFOLIO_CONSTANTS } from "frontend-BL/businessHooks/PORTFOLIO/Constants/Portfolio.const";
import { CurrentStatusMobileLeverageBoxStyles, innerBoxStyle, marginAuto, maxBuyingPowerBox, mHorizontalDividerStyles, MobileWrapperBoxStyle, mVerticalDividerStyles, mVerticalDividerStyles2, mVerticalDividerStyles3, selectBoxTypography } from "./CurrentStatusMobile.styles";
import { PortfolioLabelTypography } from "../../CurrentStatus/CurrentStatus.styles";

const CurrentStatusMobile = ({ currentStatus, availableContractsMarginRatio, selectedContractMarginRatio, setSelectedContractForMarginRatio }) => (
    <Paper sx={[paperStyle, mobileViewActiveBlock]}>
    <Typography sx={PortfolioLabelTypography} variant="h6">
      {PORTFOLIO_CONSTANTS.CURRENT_STATUS_LABEL}
    </Typography>
    <Box sx={MobileWrapperBoxStyle}>
            <Box sx={marginAuto}>
        <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">{PORTFOLIO_CONSTANTS.FREE_MARGIN_LABEL}</Typography>
        <Typography variant="valueText">{((currentStatus.freeMargin && parseFloat(currentStatus.freeMargin).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-")}</Typography>
        <Divider
          sx={mHorizontalDividerStyles}
        />
          </Box>
          <Divider
          orientation="vertical"
          sx={mVerticalDividerStyles}
          />
          <Divider
              sx={mHorizontalDividerStyles}/>
            <Box sx={innerBoxStyle}>
        <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">{PORTFOLIO_CONSTANTS.UNREALIZED_PNL_LABEL}</Typography>
        <Typography variant="valueText" sx={sxColorUtility(parseFloat(currentStatus.unRealizedPnL), {}, PORTFOLIO_CONSTANTS.CURRENT_STATUS_LABEL)}>
        {(currentStatus.unRealizedPnL && parseFloat(currentStatus.unRealizedPnL).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-"}
        </Typography>
        <Divider
              sx={mHorizontalDividerStyles}/>
      </Box>
      </Box>
      <Box
          sx={maxBuyingPowerBox}
          >
      <Box sx={marginAuto}>
        <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">{PORTFOLIO_CONSTANTS.MAX_BUYING_POWER_LABEL}</Typography>
        <Typography variant="valueText">{((currentStatus.maxBuyingPower && parseFloat(currentStatus.maxBuyingPower).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-")}</Typography>
        <Divider
          sx={mHorizontalDividerStyles}
        />
          </Box>
          <Divider
        orientation="vertical"
        sx={mVerticalDividerStyles2}
      />
      <Box sx={marginAuto}>
      <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">{PORTFOLIO_CONSTANTS.MARGIN_RATIO_LABEL}</Typography>
        <Box>
        {availableContractsMarginRatio.length ? <Box sx={selectBoxTypography}><Select values={availableContractsMarginRatio} value={selectedContractMarginRatio} setValue={setSelectedContractForMarginRatio} /> </Box> : <Typography variant="valueText">-</Typography>}
        <Typography sx={{ fontSize: "16px" }} variant="valueText">{Object.keys(currentStatus).length && (currentStatus.marginRatio[selectedContractMarginRatio] && parseFloat(currentStatus.marginRatio[selectedContractMarginRatio]).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION))}</Typography>
        </Box>
        <Divider
              sx={mHorizontalDividerStyles}/>
          </Box>
          </Box>
      <Box
          sx={CurrentStatusMobileLeverageBoxStyles}
          >
            <Box sx={marginAuto}>
        <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">{PORTFOLIO_CONSTANTS.LEVERAGE_AVAILABLE_LABEL}</Typography>
        <Typography variant="valueText">{(currentStatus.maxLeverage && parseFloat(currentStatus.maxLeverage).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-"}</Typography>
  </Box>
  <Divider
          orientation="vertical"
          sx={mVerticalDividerStyles3}
          />
          <Box sx={innerBoxStyle}>
        <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">{PORTFOLIO_CONSTANTS.OPEN_POSITIONS_LABEL}</Typography>
        <Typography variant="valueText">{(currentStatus.numOpenPositions && parseFloat(currentStatus.numOpenPositions).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-"}</Typography>
        </Box>
      </Box>
  </Paper>
);

CurrentStatusMobile.propTypes = {
  currentStatus: PropTypes.object,
  availableContractsMarginRatio: PropTypes.object,
  selectedContractMarginRatio: PropTypes.object,
  setSelectedContractForMarginRatio: PropTypes.object
};

export default React.memo(CurrentStatusMobile);
