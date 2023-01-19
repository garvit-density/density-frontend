import { Box } from "@mui/material";
import { mobileViewActiveBlock } from "components/UI/MWebStyles/MWeb.styles";
import { TabStatistic } from "components/UI/TabStatistic";
import React from "react";
import PropTypes from "prop-types";
import { TABS_CONSTANTS } from "frontend-BL/businessHooks/WALLET/Constants/Tabs.const";

const FiatTabStatMobile = ({ fiatbalance }) => (
    <Box sx={[mobileViewActiveBlock, {
      display: "block",
      gap: 12
    }]}>
      <TabStatistic {...{ name: TABS_CONSTANTS.TOTAL_BALANCE_LABEL, value: fiatbalance, sourceComponent: TABS_CONSTANTS.FIAT_WALLET }} />
    </Box>
);

FiatTabStatMobile.propTypes = {
  fiatbalance: PropTypes.any
};
export default FiatTabStatMobile;
