import React from "react";

import { Typography, Box, Divider, Paper } from "@mui/material";

import { lifeTimeTabstyles, paperStyle } from "../Portfolio.styled";

import { sxColorUtility } from "helpers";

import PropTypes from "prop-types";

import { PORTFOLIO_CONSTANTS } from "../../../frontend-BL/businessHooks/PORTFOLIO/Constants/Portfolio.const";
import { WebViewActiveBlock } from "components/UI/MWebStyles/MWeb.styles";
import MwebPortfolioStatisticsLastDay from "../MwebComponents/MwebPortfolioStatisticsLastDay/MwebPortfolioStatisticsLastDay";
import { PortfolioLabelTypography } from "../CurrentStatus/CurrentStatus.styles";
import { LastDayDividerStyle, LastDayVerticalDividerStyle, LastDayWrapperStyle, PnLBoxStyle } from "./PortfolioStatisticsLastDay.styles";

const PortfolioStatisticsLastDay = ({ portfolioStatisticsLastDay }) => {
  return (
    <>
    {/* Web View */}
          <Paper sx={[paperStyle, WebViewActiveBlock]}>
            <Typography sx={PortfolioLabelTypography} variant="h6">
                {PORTFOLIO_CONSTANTS.DASHBOARD_LABEL_24H}
            </Typography>
            <Box
                sx={LastDayWrapperStyle}>
                <Box
                sx={PnLBoxStyle}>
                <Typography sx={lifeTimeTabstyles.headerTop} >{PORTFOLIO_CONSTANTS.REALIZED_PNL_LABEL}</Typography>
                <Typography sx={sxColorUtility(parseFloat(portfolioStatisticsLastDay.realizedPnL), {}, PORTFOLIO_CONSTANTS.REALIZED_PNL_LABEL)} variant="valueText" display={"inline"}>
                    {(portfolioStatisticsLastDay.realizedPnL && parseFloat(portfolioStatisticsLastDay.realizedPnL).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-"}
                </Typography>
                <Divider
                    sx={LastDayDividerStyle}/>
                <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">{PORTFOLIO_CONSTANTS.VOLUME_TRADED_LABEL}</Typography>
                <Typography variant="valueText" display={"inline"}>
                    {(portfolioStatisticsLastDay.volumeTraded && parseFloat(portfolioStatisticsLastDay.volumeTraded).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-"}
                </Typography>
                </Box>
                <Divider
                orientation="vertical"
                sx={LastDayVerticalDividerStyle}
                />
                <Box
                sx={PnLBoxStyle}
                >
                <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">{PORTFOLIO_CONSTANTS.MARGIN_USED_LABEL}</Typography>
                <Typography variant="valueText">{(portfolioStatisticsLastDay.marginUsed && parseFloat(portfolioStatisticsLastDay.marginUsed).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-"}</Typography>

                <Divider
                    sx={LastDayDividerStyle}
                />
                <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">{PORTFOLIO_CONSTANTS.MOST_TRADED_ASSET_LABEL}</Typography>
                <Typography variant="valueText">{(portfolioStatisticsLastDay.mostTradedAsset) || "-"}</Typography>
                </Box>
                <Divider
                orientation="vertical"
                sx={LastDayVerticalDividerStyle}
                />
                <Box
                sx={PnLBoxStyle}
                >
                <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">{PORTFOLIO_CONSTANTS.TOTAL_TRADES_LABEL}</Typography>
                <Typography variant="valueText">{(portfolioStatisticsLastDay.totalTrades && parseFloat(portfolioStatisticsLastDay.totalTrades).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-"}</Typography>
                <Divider sx={LastDayDividerStyle} />
                <Typography sx={lifeTimeTabstyles.headerTop} variant="highlightedText">{PORTFOLIO_CONSTANTS.FEES_PAID_LABEL}</Typography>
                <Typography variant="valueText">{(portfolioStatisticsLastDay.feesPaid && parseFloat(portfolioStatisticsLastDay.feesPaid).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-"}</Typography>
                </Box>
            </Box>
            </Paper>

            {/* Mobile View */}
            <MwebPortfolioStatisticsLastDay portfolioStatisticsLastDay={portfolioStatisticsLastDay} />
            </>
  );
};

PortfolioStatisticsLastDay.propTypes = {
  portfolioStatisticsLastDay: PropTypes.object
};

export default React.memo(PortfolioStatisticsLastDay);
