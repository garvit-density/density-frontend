import React from "react";
import { TabStatistic } from "components/UI/TabStatistic";
import { Typography, Box, Divider } from "@mui/material";
import { lifeTimeTabstyles } from "./Portfolio.styled";
import PropTypes from "prop-types";
import { PORTFOLIO_CONSTANTS } from "../../frontend-BL/businessHooks/PORTFOLIO/Constants/Portfolio.const";
import { PortfolioLabelTypography } from "./CurrentStatus/CurrentStatus.styles";

const PortfolioStatisticsLifetime = ({ portfolioStatisticsLifetime }) => {
  return (
          <Box sx={lifeTimeTabstyles.header}>
              <Typography sx={PortfolioLabelTypography} variant="h6">
                {PORTFOLIO_CONSTANTS.DASHBOARD_LABEL_LIFETIME}
              </Typography>
              <Box sx={lifeTimeTabstyles.headerTop}>
                <TabStatistic {...{
                  name: PORTFOLIO_CONSTANTS.PORFIT_LOSS_LABEL,
                  value: ((portfolioStatisticsLifetime.realizedPnL && parseFloat(portfolioStatisticsLifetime.realizedPnL).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-"),
                  colorIndicator: true,
                  sourceComponent: PORTFOLIO_CONSTANTS.PORTFOLIO_LABEL
                }} />
              </Box>
            <Divider flexItem />
            <Box sx={lifeTimeTabstyles.headerBtm}>
              <TabStatistic {...{
                name: PORTFOLIO_CONSTANTS.MARGIN_USED_LABEL,
                sourceComponent: PORTFOLIO_CONSTANTS.PORTFOLIO_LABEL,
                value: ((portfolioStatisticsLifetime.marginUsed && parseFloat(portfolioStatisticsLifetime.marginUsed).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-")
              }} />
              <Divider orientation="vertical" />
              <TabStatistic {...{
                name: PORTFOLIO_CONSTANTS.VOLUME_TRADED_LABEL,
                sourceComponent: PORTFOLIO_CONSTANTS.PORTFOLIO_LABEL,
                value: ((portfolioStatisticsLifetime.volumeTraded && parseFloat(portfolioStatisticsLifetime.volumeTraded).toFixed(PORTFOLIO_CONSTANTS.DECIMAL_PRECISION)) || "-")
              }} />
            </Box>
        </Box>
  );
};

PortfolioStatisticsLifetime.propTypes = {
  portfolioStatisticsLifetime: PropTypes.object
};

export default React.memo(PortfolioStatisticsLifetime);
