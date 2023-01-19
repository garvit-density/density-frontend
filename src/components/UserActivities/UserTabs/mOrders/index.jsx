import React, { memo, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Tab, Tabs, Box } from "@mui/material";
import OpenOrders from "./mOpenOrder";
import OrderHistory from "./mOrderHistory";
import TradeHistory from "./mTradeHistory";
import { FONT14 } from "../style";

const mOpenOrder = (props) => {
  const { index } = props;
  if (index !== 1) {
    return () => null;
  }
  const [currentView, setCurrentView] = useState(0);
  const TABSINDEX = useMemo(() => currentView, [currentView]);

  const ToggleView = () => {
    switch (TABSINDEX) {
      case 1:
        return <OrderHistory index={TABSINDEX} />;
      case 2:
        return <TradeHistory index={TABSINDEX} />;
      default:
        return <OpenOrders index={TABSINDEX} />;
    }
  };

  ToggleView.propTypes = {
    current: PropTypes.number
  };
  const handleChange2 = (e) => {
    const attributeValue = e.target.attributes.order.nodeValue;
    e.stopPropagation();
    setCurrentView(Number(attributeValue));
  };

  return (
    <>
      <Grid item xs={12}>
        <Tabs
          selectionFollowsFocus
          textColor="text.ultramild"
          value={currentView}
          aria-label="Tabs where each tab needs to be selected manually"
          sx={{ display: "flex", justifyContent: "space-between" }}
          onChange={(e) => handleChange2(e)}
        >
          <Tab sx={FONT14} label="Open Orders" order={0} />
          <Tab sx={FONT14} label="Order History" order={1} />
          <Tab sx={FONT14} label="Trade History" order={2} />
        </Tabs>
      </Grid>
      <Box sx={{ mt: 4 }}>{ToggleView()}</Box>
    </>
  );
};
mOpenOrder.propTypes = {
  index: PropTypes.number
};
export default memo(mOpenOrder);
