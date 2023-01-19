/* eslint-disable react/prop-types */
import React from "react";
import { Grid, Box } from "@mui/material";
import "./MarketTable.css";
import { data_grid, dataGridContainer, gridContent } from "./MarketTableStyles.js";
import MarketCard from "../MarketCard/MarketCard";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./MarketTableColumns";
import { useMarketTableData } from "../../../frontend-BL/businessHooks";

function MarketTable() {
  const { cardData, rows, page, setPage, setRowsPerPage } = useMarketTableData();
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
   <Box sx={{ flexGrow: 1 }}>
    <Grid
        spacing={1}
        direction="row"
        justifyContent="flex-start"
        py={2}
        px={2}
        container
        sx={dataGridContainer}>
        {cardData.current.length > 0 &&
          cardData.current.map((data, index) => {
            return (
            <>
              <Grid
                  justifyContent="center"
                  spacing={2}
                  xs={4}
                  my={1}
                  sx={gridContent}>
                    <MarketCard key={index} data={data} index={index} />
              </Grid>
            </>);
          })}
      <Grid container item>
      {cardData.current.length === 3 &&
        <Grid sx={data_grid}>
          <DataGrid
            sx={dataGridContainer}
            rows={rows}
            columns={columns}
            rowsPerPageOptions={[15]}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}/>
        </Grid>}
      </Grid>
    </Grid>
   </Box>
  );
}

export default MarketTable;
