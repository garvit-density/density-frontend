import React, { memo, useMemo, useState } from "react";
// Assets, Strings and constants
import { PositionHeader } from "../../UserActivitiesObjects";
import { unRealisedTotalPnL, positionSubHeader, closebutton, tablePositionCategoryStyle1, singleGridStyle, tablePositionCategoryStyle2 } from "../UserTabs.style";
// Mui
import { Box, Grid, TableCell, Tooltip, Typography } from "@mui/material";
// Redux
import { useSelector } from "react-redux";
// Components and helper components
import PositionRow from "./PositionRow";
import CancelIcon from "@mui/icons-material/Cancel";
import { closeAllActivePositions } from "../../../../frontend-api-service/Api";
import { justifyCenter } from "components/OrderForm/OrderForm.styled";
import PropTypes from "prop-types";
import typography from "assets/Theme/typography";
import CloseAllModal from "components/CustomModals/CloseAllModal";

const Positions = ({ index }) => {
  if (index !== 0) {
    return null;
  }
  const [closeAllPosition, setCloseAllPosition] = useState(false);
  const limiter = (n) => Number(Number(n).toFixed(3));
  const allPositionsData = useSelector((state) => state.activePositions.currentPositions);
  const currentPositionData = useSelector((state) => state.currentPositions.currentPositions);
  const NO_POSITIONS_TEXT = "No active positions yet";
  const openPositions = useMemo(() => {
    if (allPositionsData !== undefined && allPositionsData.length > 0) {
      return allPositionsData;
    } else return [];
  }, [allPositionsData.length]);
  const combinedPnl = useMemo(() => {
    let pnl = 0;
    if (currentPositionData.length === 0) return "--";
    currentPositionData.forEach((data) => {
      pnl = limiter(limiter(data.unPnl) + limiter(pnl));
    });
    return isNaN(pnl) ? "--" : `${pnl} USDT`;
  }, [currentPositionData, currentPositionData.length]);

  const renderActivePositions = useMemo(() => {
    return openPositions.map((data) => <PositionRow key="1" symbol={data.sym} />);
  }, [openPositions]);

  const TableRows = useMemo(() => renderActivePositions, [JSON.stringify(openPositions)]);
  const CloseAllPositionButton = () => {
    closeAllActivePositions().then((res) => {
      if (res.status === 200) {
        setCloseAllPosition(false);
      }
    });
  };
  return (
    <Box sx={{ marginLeft: "" }}>
      <Grid container sx={positionSubHeader} spacing={3}>
        {PositionHeader.map((headerData, i) => (
          <Grid key={i} sx={singleGridStyle} xs={headerData.gridSize}>
            <Tooltip title={headerData.tooltip} placement="top">
              <TableCell sx={tablePositionCategoryStyle1}>{headerData.name}</TableCell>
            </Tooltip>
          </Grid>
        ))}
        <Grid sx={singleGridStyle} xs={1.2}>
          <Grid container>
            <Grid xs={8}>
              <TableCell sx={tablePositionCategoryStyle2}>
                <Typography
                  sx={{
                    ...unRealisedTotalPnL,
                    ...(parseFloat(combinedPnl) > 0 ? { color: "background.success.primary" } : parseFloat(combinedPnl) === 0 ? { color: "text.primary" } : { color: "#F46151" })
                  }}
                >
                  {combinedPnl}
                </Typography>
              </TableCell>
            </Grid>
            <Grid xs={4}>
              <TableCell
                sx={tablePositionCategoryStyle2}
                onClick={() => {
                  if (combinedPnl !== "--") {
                    setCloseAllPosition(true);
                  }
                }}
              >
                <Tooltip title={"Close all position at market price"} placement="top">
                  <CancelIcon sx={closebutton} />
                </Tooltip>
              </TableCell>
            </Grid>
          </Grid>
        </Grid>
        {closeAllPosition && <CloseAllModal close={() => setCloseAllPosition(false)} isOpen={closeAllPosition} positionEntry={CloseAllPositionButton} />}
      </Grid>
      {allPositionsData.length === 0 && (
        <>
          <Grid sx={justifyCenter} my={2}>
            <Typography sx={{ color: "#BDBDBD", ...typography.Regular_16 }}>{NO_POSITIONS_TEXT}</Typography>
          </Grid>
        </>
      )}
      {TableRows}
    </Box>
  );
};

Positions.propTypes = {
  index: PropTypes.number,
  isExitLimitMarketModalOpen: PropTypes.object,
  exitWithLimitOrMarket: PropTypes.object
};

export default memo(Positions);
