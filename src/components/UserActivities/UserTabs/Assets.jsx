import { Table, TableCell, TableContainer, TableFooter, TablePagination, Box, Grid, TableRow, Typography, LinearProgress } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { AssetSubheader } from "../UserActivitiesObjects";
import { positionSubHeader, tradeDateFilter, singleGridStyle, singleGrid1, tablePaginationStyle, tablePositionCategoryStyle1 } from "./UserTabs.style";
import { justifyCenter } from "components/OrderForm/OrderForm.styled";
import { numberWithCommas } from "helpers/commaHelper";
import { getCurrencyUrl } from "helpers/CurrencyLogo";
import PropTypes from "prop-types";
const Assets = ({ index }) => {
  if (index !== 5) {
    return null;
  }
  const NO_ASSET_TEXT = "You don't have any assets currently";
  const assetData = useSelector((state) => state.futures.accountInfo.assets);
  const symbolLogo = useMemo(() => getCurrencyUrl("usdt").toLowerCase());

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const symbolImage = {
    width: "16px",
    marginRight: "7px",
    marginBottom: "-3px"
  };

  const loader = () => (
    <TableContainer>
      <LinearProgress />
    </TableContainer>
  );

  const assetTableData = () => (
    <Box sx={{ marginLeft: "" }}>
      <Grid sx={tradeDateFilter} spacing={3}>
        <Grid container direction="row" justifyContent="flex-start" alignItems="center" xs>
          {/* <DateFilterBar /> */}
        </Grid>
      </Grid>
      <Grid container sx={positionSubHeader} spacing={3}>
        {AssetSubheader.map((headerData, idx) => (
          <Grid key={idx} sx={singleGridStyle} xs={headerData.gridSize}>
            <TableCell sx={tablePositionCategoryStyle1}>{headerData.name}</TableCell>
          </Grid>
        ))}
      </Grid>
      {assetData.length === 0 && (
        <>
          <Grid sx={justifyCenter} my={2}>
            <Typography variant="p" sx={{ color: "#BDBDBD" }}>
              {NO_ASSET_TEXT}
            </Typography>
          </Grid>
        </>
      )}
      {(rowsPerPage > 0 ? assetData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : assetData).map((rowData, index) => (
        <Grid
          container
          key={index}
          sx={{
            "&:hover": {
              background: "#2c2c34"
            }
          }}
        >
          <Grid sx={singleGrid1} xs={2.4}>
            <Typography sx={tablePositionCategoryStyle1}>
              <img style={symbolImage} src={symbolLogo} alt={"tether"} />
              {rowData.asset}
            </Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={2.4}>
            <Typography sx={tablePositionCategoryStyle1}>{numberWithCommas(rowData.walletBalance)}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={2.4}>
            <Typography sx={tablePositionCategoryStyle1}>{numberWithCommas(rowData.unrealizedProfit)}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={2.4}>
            <Typography sx={tablePositionCategoryStyle1}>{numberWithCommas(rowData.marginBalance)}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={2.4}>
            <Typography sx={tablePositionCategoryStyle1}>{numberWithCommas(rowData.availableBalance)}</Typography>
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
                count={assetData.length}
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

  return assetData === undefined ? loader() : assetTableData();
};

Assets.propTypes = {
  index: PropTypes.number
};
export default Assets;
