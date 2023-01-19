import { Box } from "@mui/material";
import React from "react";
import { mobileViewActiveBlock } from "../../../../UI/MWebStyles/MWeb.styles";
import { TabSection } from "../../../../UI/TabSection";
import { TabStatistic } from "../../../../UI/TabStatistic";
import PropTypes from "prop-types";
import { TABS_CONSTANTS } from "frontend-BL/businessHooks/WALLET/Constants/Tabs.const";

const FuturesTabSectionMobile = ({ totalMarginBalance, freeMarginBalance, realisedPnl24h }) => (<Box sx={mobileViewActiveBlock}>
    <TabSection>
      <Box pb={2}>
            <TabStatistic {...{
              name: TABS_CONSTANTS.MARGIN_BALANCE_LABEL,
              value: totalMarginBalance && Math.trunc(totalMarginBalance * 100) / 100,
              sourceComponent: TABS_CONSTANTS.FUTURES_WALLET
            }} />
  </Box>
  <Box pb={2}>
            <TabStatistic {...{
              name: TABS_CONSTANTS.FREE_MARGIN_LABEL,
              value: freeMarginBalance && Math.trunc(freeMarginBalance * 100) / 100,
              sourceComponent: TABS_CONSTANTS.FUTURES_WALLET
            }} />
            </Box>
            <Box>
            <TabStatistic {...{
              name: TABS_CONSTANTS.REALIZED_PNL_LABEL,
              value: realisedPnl24h && Math.trunc(realisedPnl24h * 100) / 100,
              colorIndicator: true,
              sourceComponent: TABS_CONSTANTS.FUTURES_WALLET
            }} />
            </Box>
      </TabSection>
    </Box>);

FuturesTabSectionMobile.propTypes = {
  totalMarginBalance: PropTypes.any,
  realisedPnl24h: PropTypes.any,
  freeMarginBalance: PropTypes.any

};

export default FuturesTabSectionMobile;
