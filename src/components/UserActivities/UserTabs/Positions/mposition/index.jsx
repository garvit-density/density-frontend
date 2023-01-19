import React, { memo, useMemo } from "react";
import { Box, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { BORDER, BORDERBOTTOM, ERROR, FONT14, SECTIONHEIGHT, SUCCESS, BoxStyle } from "../../style";
import PositionCard from "../PositionCard";
import { POSITION, TOTAL } from "../../mOrders/mMagicString";
import PropTypes from "prop-types";

const header = { display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between", flexDirection: "row" };
const SearchIconStyle = { color: "primary.main", width: "2.5rem", height: "100%" };
const mPosition = ({ index }) => {
  if (index !== 0) {
    return () => null;
  }
  const allPositionsData = useSelector((state) => state.activePositions.currentPositions);
  const currentPositionData = useSelector((state) => state.currentPositions.currentPositions);
  const combinedPnl = useMemo(() => {
    let pnl = 0;
    if (currentPositionData.length === 0) return "--";
    currentPositionData.forEach((data) => {
      pnl = (Number(data.unPnl) + Number(pnl)).toFixed(4);
    });
    return isNaN(pnl) ? "--" : `${pnl} USDT`;
  }, [currentPositionData, currentPositionData.length]);

  const activePositions = useMemo(() => {
    if (allPositionsData.length > 0) {
      return allPositionsData.map((item) => <PositionCard key={item.sym} symbol={item.sym} />);
    } else {
      return (
        <Grid>
          <Typography variant="h5" sx={{ fontSize: "Regular_14", color: "text.secondary" }}>
            No {POSITION}
          </Typography>
        </Grid>
      );
    }
  }, [allPositionsData.length]);
  return (
    <>
      {" "}
      <Grid container gap="20px">
        <Grid item xs={12}>
          <Box sx={header}>
            <Box sx={BORDERBOTTOM}>
              <Typography variant="h4" sx={{ fontSize: "Bold_22_20" }}>
                {POSITION}
              </Typography>
            </Box>

            <SearchIcon sx={SearchIconStyle} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={[BoxStyle, BORDER, { p: 2, backgroundColor: "background.mild", textAlign: "center" }]}>
            <Typography sx={FONT14}>{TOTAL}</Typography>
            <Typography sx={[Number(combinedPnl.split(" ")[0]) > 0 ? { color: SUCCESS } : { color: ERROR }, { fontSize: "Regular_16" }]}>{combinedPnl}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={SECTIONHEIGHT}>
            <Grid container gap="10px">
              {activePositions}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
mPosition.propTypes = {
  index: PropTypes.number
};
export default memo(mPosition);
