import { Box, Divider, Paper, Typography } from "@mui/material";
import { mobileViewActiveBlock } from "components/UI/MWebStyles/MWeb.styles";
import { sxColorUtility } from "helpers";
import React from "react";
import { lifeTimeTabstyles, paperStyle } from "../../Portfolio.styled";
import PropTypes from "prop-types";
import { PORTFOLIO_CONSTANTS } from "frontend-BL/businessHooks/PORTFOLIO/Constants/Portfolio.const";
import { PortfolioLabelTypography } from "../../CurrentStatus/CurrentStatus.styles";
import { marginAuto } from "../MwebCurrentStatus/CurrentStatusMobile.styles";
import { MarginUsedBoxStyle, MwebLastDayDividerStyle, MwebLastDayDividerStyle_2, MwebLastDayVerticalDividerStyle, MwebLastDayWrapperBox, MwebMarginUsedDividerStyle, MwebTotalTradesBoxStyles, MwebTotalTradesDividerStyles } from "./MwebPortfolioStatisticsLastDay.styles";

const MwebPortfolioStatisticsLastDay = ({ portfolioStatisticsLastDay }) => (
  <Paper sx={[paperStyle, mobileViewActiveBlock]}>
    <Typography sx={PortfolioLabelTypography} variant="h6">
      {PORTFOLIO_CONSTANTS.DASHBOARD_LABEL_24H}
    </Typography>
    <Box sx={MwebLastDayWrapperBox}>
      <Box sx={marginAuto}>
        <Typography sx={lifeTimeTabstyles.headerTop}>{PORTFOLIO_CONSTANTS.REALIZED_PNL_LABEL}</Typography>
        <Typography sx={sxColorUtility(parseFloat(portfolioStatisticsLastDay.realizedPnL), {}, PORTFOLIO_CONSTANTS.REALIZED_PNL_LABEL)} variant="valueText" display={"inline"}>
          {(portfolioStatisticsLastDay.realizedPnL && parseFloat(portfolioStatisticsLastDay.realizedPnL).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-"}
        </Typography>
        <Divider sx={MwebLastDayDividerStyle} />
      </Box>
      <Divider orientation="vertical" sx={MwebLastDayVerticalDividerStyle} />
      <Divider sx={MwebLastDayDividerStyle_2} />
      <Box sx={marginAuto}>
        <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">
          {PORTFOLIO_CONSTANTS.VOLUME_TRADED_LABEL}
        </Typography>
        <Typography variant="valueText" display={"inline"}>
          {(portfolioStatisticsLastDay.volumeTraded && parseFloat(portfolioStatisticsLastDay.volumeTraded).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-"}
        </Typography>
        <Divider sx={MwebLastDayDividerStyle} />
      </Box>
    </Box>

    <Box sx={MarginUsedBoxStyle}>
      <Box sx={marginAuto}>
        <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">
          {PORTFOLIO_CONSTANTS.MARGIN_USED_LABEL}
        </Typography>
        <Typography variant="valueText">
          {(portfolioStatisticsLastDay.marginUsed && parseFloat(portfolioStatisticsLastDay.marginUsed).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-"}
        </Typography>

        <Divider sx={MwebLastDayDividerStyle} />
      </Box>
      <Divider orientation="vertical" sx={MwebMarginUsedDividerStyle} />
      <Box sx={{ margin: "auto", px: 1 }}>
        <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">
          {PORTFOLIO_CONSTANTS.MOST_TRADED_ASSET_LABEL}
        </Typography>
        <Typography variant="valueText">{portfolioStatisticsLastDay.mostTradedAsset || "-"}</Typography>
        <Divider sx={MwebLastDayDividerStyle} />
      </Box>
    </Box>
    <Box sx={MwebTotalTradesBoxStyles}>
      <Box sx={marginAuto}>
        <Typography sx={[lifeTimeTabstyles.headerTop, { textAlign: "center" }]} variant="highlightedText">
          {PORTFOLIO_CONSTANTS.TOTAL_TRADES_LABEL}
        </Typography>
        <Typography variant="valueText">
          {(portfolioStatisticsLastDay.totalTrades && parseFloat(portfolioStatisticsLastDay.totalTrades).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-"}
        </Typography>
      </Box>

      <Divider orientation="vertical" sx={MwebTotalTradesDividerStyles} />
      <Box sx={marginAuto}>
        <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">
          {PORTFOLIO_CONSTANTS.FEES_PAID_LABEL}
        </Typography>
        <Typography variant="valueText">{(portfolioStatisticsLastDay.feesPaid && parseFloat(portfolioStatisticsLastDay.feesPaid).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-"}</Typography>
      </Box>
    </Box>
  </Paper>
);

MwebPortfolioStatisticsLastDay.propTypes = {
  portfolioStatisticsLastDay: PropTypes.object
};

export default React.memo(MwebPortfolioStatisticsLastDay);
