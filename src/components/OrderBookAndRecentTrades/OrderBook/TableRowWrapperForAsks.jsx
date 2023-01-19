/* eslint-disable react/prop-types */
import React from "react";

// import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { GradientPercentGenerator, CalculateAmount } from "./OrderBookHelpers";
import { numberWithCommas } from "helpers/commaHelper";

import { tableRowWrapper, typography_table_body, typography_table_body_loss } from "./OrderBook.style";

import { ORDERBOOK_CONSTANTS } from "../../../frontend-BL/businessHooks/ORDER_BOOK/Constants/OrderBook.const";
import { Grid, Typography } from "@mui/material";

const TableRowWrapperForAsks = ({ index, setLimitPriceFromOrderBook, items, asks_final_obj, count }) => {
  return (
        <>
          <TableRow
            key={index}
            className="pointer"
            onClick={() => setLimitPriceFromOrderBook(items.a)}
            sx={{
              ...tableRowWrapper,
              backgroundSize: `${GradientPercentGenerator(asks_final_obj.current.slice(0, count).reverse(), index, "asks")}%`
            }}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center">
                  <Grid item xs={4} md={4} lg={4}>
                    <Typography sx={typography_table_body_loss}>{items && items.a}</Typography>
                  </Grid>
                  <Grid item xs={4} md={4} lg={4}>
                     <Typography sx={typography_table_body}>{numberWithCommas(parseFloat((items && items.b) * (items && items.a)).toFixed(ORDERBOOK_CONSTANTS.SETTLEMENT_CURRENCY_PRECISION))}</Typography>
                  </Grid>
                  <Grid item xs={4} md={4} lg={4}>
                    <Typography sx={typography_table_body}>{numberWithCommas(CalculateAmount(asks_final_obj.current.slice(0, count).reverse(), index, "asks"))}</Typography>
                  </Grid>
              </Grid>
          </TableRow>
        </>
  );
};

export default React.memo(TableRowWrapperForAsks);
