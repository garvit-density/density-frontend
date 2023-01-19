import React from "react";

import TableHead from "@mui/material/TableHead";

import { ORDERBOOK_CONSTANTS } from "../../../frontend-BL/businessHooks/ORDER_BOOK/Constants/OrderBook.const";
import { Grid, Tooltip, Typography } from "@mui/material";
import { Amount_Order_book, Size_Order_book } from "assets/strings/tooltip.string";
import { typography_table_head } from "./OrderBook.style";

const TableHeadWrapperForAsksBids = () => {
  return (
    <>
         <Grid container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center">
           <Grid item xs={4} md={4} lg={4}>
                <Typography sx={typography_table_head}>
                    {ORDERBOOK_CONSTANTS.PRICE}({ORDERBOOK_CONSTANTS.SETTLEMENT_CURRENCY_TYPE})
                </Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
                <Tooltip title={Size_Order_book} placement="top">
                    <Typography sx={typography_table_head}>
                        {ORDERBOOK_CONSTANTS.SIZE}({ORDERBOOK_CONSTANTS.SETTLEMENT_CURRENCY_TYPE})
                    </Typography>
                </Tooltip>
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
            <Tooltip title={Amount_Order_book} placement="top">
                <Typography sx={typography_table_head}>
                    {ORDERBOOK_CONSTANTS.SUM}({ORDERBOOK_CONSTANTS.SETTLEMENT_CURRENCY_TYPE})
                </Typography>
                </Tooltip>
            </Grid>
        </Grid>
        <TableHead>
        </TableHead>
    </>
  );
};

export default React.memo(TableHeadWrapperForAsksBids);
