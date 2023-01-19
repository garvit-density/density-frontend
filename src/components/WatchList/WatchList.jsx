// React hooks
import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
// MUI
import List from "@mui/material/List";
// import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/Star";
// import Paper from "@mui/material/Paper";
import { ListSubheader, Box } from "@mui/material";
// Components
import WatchListRow from "./WatchListRow";
import { boxSx } from "./WatchListObject";
import { OpenDrawer } from "frontend-BL/redux/actions/Internal/SideMenu.ac";
const WatchList = () => {
  const favouriteSymbols = useSelector((state) => state.favouriteSymbols.favouriteSymbols);
  const dispatch = useDispatch();
  const openDrawer = useCallback(() => {
    dispatch(OpenDrawer());
  }, []);
  return (
    <>
      <Box sx={boxSx}>
        <Grid sx={{ marginLeft: "10px" }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} lg={12} alignItems="center">
            <List
              sx={{ width: "100%", maxWidth: 360 }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader sx={{ background: "#2c2c34", paddingLeft: "25%" }} component="div" id="nested-list-subheader">
                  <StarIcon sx={{ color: "yellow", mb: "-5px", fontSize: "19px" }} onClick={openDrawer} />
                </ListSubheader>
              }
            >
              {favouriteSymbols && favouriteSymbols.length === 0
                ? (
                <>{favouriteSymbols && favouriteSymbols.map((s) => <WatchListRow key={s} symbol={s} />)}</>
                  )
                : (
                <>{favouriteSymbols && favouriteSymbols.map((s) => <WatchListRow key={s} symbol={s} />)}</>
                  )}
            </List>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default memo(WatchList);
