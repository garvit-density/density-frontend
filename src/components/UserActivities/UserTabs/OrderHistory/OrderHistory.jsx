// React, redux
import React, { useState } from "react";

// Mui & theme
import { Table, TableCell, TableContainer, TableFooter, TablePagination, TableRow, Box, Grid, Typography, Tooltip } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// Assets, strings, constants
import { OrderHistorySubHeader } from "../../UserActivitiesObjects";
import { positionSubHeader, singleGridStyle, singleGrid1, tablePaginationStyle, tablePositionCategoryStyle1, tableRowStyle, GRIDHOVER } from "../UserTabs.style";

// Comaponents and helper components
import { epochToDateConvertor, sxColorUtility, truncateString } from "helpers";
import "../../UserActivities.style.js";
import { justifyCenter } from "components/OrderForm/OrderForm.styled";
import { numberWithCommas } from "helpers/commaHelper";
import { useOrderHistory } from "../../../../frontend-BL/businessHooks";
import theme from "assets/Theme/index";
import PropTypes from "prop-types";
const OrderHistory = ({ index }) => {
  if (index !== 2) {
    return null;
  }
  const { allOrderHistoryData, symbolQuoteAsset } = useOrderHistory();

  const [selectedOrderId, setSelectedOrderId] = useState("");
  const NO_ORDER_HISTORY_TEXT = "No orders so far";
  const filteredData = allOrderHistoryData;
  // const allOrdersfilteredData = allOrderHistoryData;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeOID = (data) => {
    navigator.clipboard.writeText(data);
    setSelectedOrderId(data);
  };

  return (
    <Box sx={{ marginLeft: "" }}>
      <Grid container sx={positionSubHeader} spacing={3}>
        {OrderHistorySubHeader.map((headerData, idx) => (
          <Grid key={idx} sx={singleGridStyle} xs={headerData.gridSize}>
            <TableCell sx={tablePositionCategoryStyle1}>{headerData.name}</TableCell>
          </Grid>
        ))}
      </Grid>
      {filteredData.length === 0 && (
        <>
          <Grid sx={justifyCenter} my={2}>
            <Typography variant="p" sx={{ color: theme.palette.common.labelColor }}>
              {NO_ORDER_HISTORY_TEXT}
            </Typography>
            {/* <Typography variant="p" sx={{ color: "#BDBDBD" }}>{NO_ORDER_HISTORY_TEXT}</Typography> */}
          </Grid>
        </>
      )}
      {(rowsPerPage > 0 ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredData).map((rowData, index) => (
        <Grid container key={rowData.orderId} sx={GRIDHOVER}>
          <Grid sx={singleGrid1} xs={1.5}>
            <Typography sx={tablePositionCategoryStyle1}>{epochToDateConvertor(rowData.updateTime)}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1.25} justifyContent="flex-start" alignItems="center" container>
            <Grid sx={tablePositionCategoryStyle1} justifyContent="flex-start" alignItems="center" item xs={9}>
              {truncateString(rowData.orderId, 8)}
            </Grid>
            <Grid justifyContent="flex-start" alignItems="center" item xs={3}>
              <div style={{ marginTop: "3px" }}>
                {selectedOrderId !== rowData.orderId && (
                  <Tooltip title="click here to copy orderID" placement="top">
                    <ContentCopyIcon sx={{ color: "text.primary" }} onClick={() => handleChangeOID(rowData.orderId)} />
                  </Tooltip>
                )}
                {selectedOrderId === rowData.orderId && (
                  <Tooltip title="OrderID copied" placement="top">
                    <DoneAllIcon sx={{ color: "text.primary" }} />
                  </Tooltip>
                )}
              </div>
            </Grid>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>{rowData.symbol}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            {rowData.type === "TAKE_PROFIT_LIMIT" ? <Typography sx={tableRowStyle}>{"TP_LIMIT"}</Typography> : ""}
            {rowData.type === "TAKE_PROFIT_MARKET" ? <Typography sx={tableRowStyle}>{"TP_MARKET"}</Typography> : <Typography sx={tableRowStyle}>{rowData.type}</Typography>}
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={sxColorUtility(rowData.side, tableRowStyle, "openOrders")}>{rowData.side}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>{numberWithCommas(rowData.avgPrice)}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1.3125}>
            <Typography sx={tablePositionCategoryStyle1}>{numberWithCommas(rowData.price)}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1.3125}>
            <Typography sx={tablePositionCategoryStyle1}>
              {numberWithCommas(rowData.executedQty)} {rowData.symbol.split("USDT")[0]}
            </Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1.3125}>
            <Typography sx={tablePositionCategoryStyle1}>
              {numberWithCommas(rowData.cumQuote)} {symbolQuoteAsset}
            </Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1.3125}>
            <Typography sx={tablePositionCategoryStyle1}>{rowData.status}</Typography>
          </Grid>
        </Grid>
      ))}
      <TableContainer>
        {/* <DateFilterBar /> */}
        <Table>
          <TableFooter>
            <TableRow id="tablePagination">
              <TablePagination
                sx={tablePaginationStyle}
                id="tablePaginationCell"
                labelRowsPerPage="Results per view"
                rowsPerPageOptions={[5, 10, 20, { label: "All", value: -1 }]}
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};
OrderHistory.propTypes = {
  index: PropTypes.number
};
export default OrderHistory;
