import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, TablePagination, Typography } from "@mui/material";
import { TabSection } from "../TabSection";
import { boxStyle, filterLabelTypography, greyTypographyObj, ListBoxStyle, TypographyObj } from "./ListView.styles";
import { USDT } from "components/WatchList/WatchListObject";

function ListView({ columns, rows, rowAction, isColored, select, filterLabel, walletType, title }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TabSection title={title}>
        <Box sx={boxStyle}>
          {select
            ? (
            <>
              <Typography sx={filterLabelTypography} variant="h7">
                {filterLabel}
              </Typography>
              {select}
            </>
              )
            : (
            <></>
              )}
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <>
              {walletType === USDT && (
                <>
                  <Box sx={ListBoxStyle}>
                    <Box>
                      <Box m={0.5}>
                        <Typography sx={TypographyObj}>{row?.income_type}</Typography>
                      </Box>
                      <Box m={0.5}>
                        <Typography sx={greyTypographyObj}>{row?.date}</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Box m={0.5}>
                        <Typography sx={TypographyObj}>{row?.income}</Typography>
                      </Box>
                      <Box m={0.5}>
                        <Typography sx={[greyTypographyObj, { textAlign: "right" }]}>{row?.asset}</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Divider />
                </>
              )}
            </>
          ))}
          <TablePagination
            sx={{ color: "#FCFCFC" }}
            rowsPerPageOptions={[5]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </TabSection>
    </>
  );
}

ListView.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  rowAction: PropTypes.any,
  isColored: PropTypes.bool,
  select: PropTypes.any,
  filterLabel: PropTypes.string,
  walletType: PropTypes.string,
  title: PropTypes.string
};

export default ListView;
