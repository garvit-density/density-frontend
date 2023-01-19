
import React from "react";
import { Table, TableContainer, Box, Grid, Typography } from "@mui/material";
import { typography_table_head, typography_table_body, typography_table_body_profit, typography_table_body_loss } from "../OrderBook/OrderBook.style";

import "../OrderBook.css";
import { useTradesData } from "../../../frontend-BL/businessHooks";
import Loader from "../../../helpers/Loader";
import { USER_TRADES } from "../../../frontend-BL/businessHooks/RECENT_TRADES/Constants/Trades.const";
import { useSelector } from "react-redux";

function Trades() {
  const getSelectSymbol = useSelector((state) => state.selectSymbol.selectedSymbol);
  const {
    settlementCurrencyType,
    tradesObject,
    isloading,
    getTime
  } = useTradesData(getSelectSymbol);

  return (
    <Box>
      <TableContainer id="tradesContainer" sx={{ overflowX: "hidden" }}>
        <Table aria-label="simple table" stickyHeader>
          {isloading.current
            ? <Box sx={{ p: 3 }}><Loader/></Box>
            : <>
            <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ marginTop: "28px" }}>
        <Grid item xs={4} md={4} lg={4}>
          <Typography sx={typography_table_head}>{USER_TRADES.price}({settlementCurrencyType})</Typography>
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
          <Typography sx={typography_table_head}>{USER_TRADES.size}({settlementCurrencyType})</Typography>
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
          <Typography sx={typography_table_head}>{USER_TRADES.time}</Typography>
        </Grid>
      </Grid>
            {tradesObject.current.map((item, index) => {
              return (
                <>
                <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center">
                  <Grid item xs={4} md={4} lg={4}>
                    <Typography sx={(item && item.ltp) > (tradesObject.current[index - 1] && tradesObject.current[index - 1].ltp) ? typography_table_body_profit : typography_table_body_loss}>{(item && item.ltp)}</Typography>
                  </Grid>
                  <Grid item xs={4} md={4} lg={4}>
                     <Typography sx={typography_table_body}>{parseFloat((item && item.quantity) * (item && item.ltp)).toFixed(3)}</Typography>
                  </Grid>
                  <Grid item xs={4} md={4} lg={4}>
                    <Typography sx={typography_table_body}>{getTime(item && item.time)}</Typography>
                  </Grid>
              </Grid>
                </>
              );
            })}
          </>}
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Trades;
