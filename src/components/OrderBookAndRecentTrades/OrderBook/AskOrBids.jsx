/* eslint-disable react/prop-types */
import React from "react";

import { Grid, Button, Tab, Typography } from "@mui/material";

import { TabList } from "@mui/lab";

import { all_ask_bids, TabListSx } from "./OrderBook.style";

import { ORDERBOOK_CONSTANTS } from "../../../frontend-BL/businessHooks/ORDER_BOOK/Constants/OrderBook.const";

const AskOrBidBtn = { minWidth: "fit-content", marginRight: "40px", padding: "0" };
const AskOrbids = ({ asksOrBids }) => {
  return (
        <Grid container >
            <Grid
              container item
              direction="row"
              alignItems="space-between">
              <TabList sx={TabListSx} id="tablist1">
                <Tab
                sx={{
                  textAlign: "center"
                }}
                TabIndicatorProps={{
                  sx: {
                    background: "orange",
                    height: "0px"
                  }
                }}
                  value={ORDERBOOK_CONSTANTS.ALL_ASKS_BIDS.ALL}
                  component={() => (
                    <Button onClick={() => asksOrBids.current = ("ALL")} style={{ ...AskOrBidBtn, disableUnderline: true } }>
                      <Typography sx={all_ask_bids}>
                      {ORDERBOOK_CONSTANTS.ALL_ASKS_BIDS.ALL}
                      </Typography>
                    </Button>
                  )}
                />
                <Tab
                  value={ORDERBOOK_CONSTANTS.ALL_ASKS_BIDS.ASKS}
                  component={() => (
                    <Button onClick={() => asksOrBids.current = ("ASKS")} style={AskOrBidBtn}>
                      <Typography sx={all_ask_bids}>
                      {ORDERBOOK_CONSTANTS.ALL_ASKS_BIDS.ASKS}
                      </Typography>
                    </Button>
                  )}
                />
                <Tab
                  value={ORDERBOOK_CONSTANTS.ALL_ASKS_BIDS.BIDS}
                  component={() => (
                    <Button onClick={() => asksOrBids.current = ("BIDS")} style={AskOrBidBtn}>
                    <Typography sx={all_ask_bids} InputProps= {{ disableUnderline: true }}>
                    {ORDERBOOK_CONSTANTS.ALL_ASKS_BIDS.BIDS}
                      </Typography>
                    </Button>
                  )}
                />
              </TabList>
            </Grid>
          </Grid>
  );
};

export default React.memo(AskOrbids);
