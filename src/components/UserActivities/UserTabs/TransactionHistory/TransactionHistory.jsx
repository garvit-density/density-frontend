import { Box, Grid, TableRow, Typography, Table, TableCell, TableContainer, TableFooter, TablePagination } from "@mui/material";
import { DateFilterBar } from "components/UI/DateFilterBar";
import { epochToDateConvertor } from "helpers";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TransactionHistorySubHeader } from "../../UserActivitiesObjects";
import { positionSubHeader, tradeDateFilter, singleGridStyle, singleGrid1, tablePaginationStyle, tablePositionCategoryStyle1, GRIDHOVER } from "../UserTabs.style";
import { justifyCenter } from "components/OrderForm/OrderForm.styled";
import { numberWithCommas } from "helpers/commaHelper";
import { useTransactionHistory } from "../../../../frontend-BL/businessHooks";

import PropTypes from "prop-types";
const TransactionHistory = ({ index }) => {
  if (index !== 4) {
    return null;
  }
  const { transHistoryData } = useTransactionHistory();
  const NO_TRANSACTION_HISTORY_TEXT = "No Transactions executed yet";
  const { from, to } = useSelector((state) => state.dateSelection);
  const filteredData = transHistoryData.filter((item) => item.time >= from && item.time <= to);
  filteredData.reverse();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ marginLeft: "" }}>
      <Grid sx={tradeDateFilter} container spacing={3}>
        <Grid container direction="row" justifyContent="flex-start" alignItems="center" xs>
          <DateFilterBar />
        </Grid>
      </Grid>
      <Grid container sx={positionSubHeader} spacing={3}>
        {TransactionHistorySubHeader.map((headerData, idx) => (
          <Grid key={idx} sx={singleGridStyle} xs={headerData.gridSize}>
            <TableCell sx={tablePositionCategoryStyle1}>{headerData.name}</TableCell>
          </Grid>
        ))}
      </Grid>
      {filteredData.length === 0 && (
        <>
          <Grid sx={justifyCenter} my={2}>
            <Typography variant="p" sx={{ color: "#BDBDBD" }}>
              {NO_TRANSACTION_HISTORY_TEXT}
            </Typography>
          </Grid>
        </>
      )}
      {(rowsPerPage > 0 ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredData).map((rowData, index) => (
        <Grid container key={index} sx={GRIDHOVER}>
          <Grid sx={singleGrid1} xs={2.4}>
            <Typography sx={tablePositionCategoryStyle1}>{epochToDateConvertor(rowData.time)}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={2.4}>
            <Typography sx={tablePositionCategoryStyle1}>{rowData.incomeType}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={2.4}>
            <Typography sx={tablePositionCategoryStyle1}>{numberWithCommas(rowData.income)}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={2.4}>
            <Typography sx={tablePositionCategoryStyle1}>{rowData.asset}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={2.4}>
            <Typography sx={tablePositionCategoryStyle1}>{rowData.symbol}</Typography>
          </Grid>
        </Grid>
      ))}
      <TableContainer>
        <Table>
          <TableFooter>
            <TableRow>
              <TablePagination
                sx={tablePaginationStyle}
                id="tablePagination"
                labelRowsPerPage="Results per view"
                rowsPerPageOptions={[5, 10, 20, { label: "All", value: -1 }]}
                colSpan={3}
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
TransactionHistory.propTypes = {
  index: PropTypes.number
};
export default TransactionHistory;
