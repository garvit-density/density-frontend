
// react core components
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// actions
import { selectedSymbol } from "../../frontend-BL/redux/actions/Internal/SetSelectedSymbol.ac";
// mui components
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import IconButton from "@mui/material/IconButton";
import { Box, Grid } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SideMenuRow from "./sideMenuRow";
import SideMenuTab from "./sieMenuTab";
import { sidemenuHeader, sideMenuBox, fav, drawerStyleSx, listSubHeader, tabHeader, drawer } from "./sidemenuobject";
import { ICONSIZE, MENU_CONSTANTS, SIDEMENUBUTTON } from "./style";
import { SetSelectedSymbolHelper } from "helpers/SetSelectedSymbolHelper";
import { CloseDrawer, OpenDrawer } from "frontend-BL/redux/actions/Internal/SideMenu.ac";
const SideMenu = () => {
  const [selectedCoin, setSelectedCoin] = useState(SetSelectedSymbolHelper());
  const [tabText, setTabText] = useState("ALL");
  const orderByDsc = useRef("");
  const orderByValue = useRef("");
  const dispatch = useDispatch();

  const openDrawer = useCallback(() => {
    dispatch(OpenDrawer());
  }, []);

  const closeDrawer = useCallback(() => {
    dispatch(CloseDrawer());
  }, []);

  const activeSymbols = useSelector((state) => state.activeSymbolData.activeSymbols);
  const isFavouriteSymbol = useSelector((state) => state.favouriteSymbols.favouriteSymbols);
  const selectedSymbolFromReducer = useSelector((state) => state.selectSymbol && state.selectSymbol.selectedSymbol);
  const drawerState = useSelector((state) => state.DrawerState.DrawerState);

  const contractType = "PERPETUAL";

  useEffect(() => {
    setSelectedCoin(selectedSymbolFromReducer.toUpperCase());
  }, [selectedSymbolFromReducer]);

  useEffect(() => {
    dispatch(selectedSymbol(selectedCoin));
  }, [dispatch]);

  const sortOrder = useMemo(() => {
    if (orderByDsc.current) {
      return activeSymbols.sort((a, b) => b[orderByValue.current] - a[orderByValue.current]);
    } else if (orderByDsc.current === false) {
      return activeSymbols.sort((a, b) => a[orderByValue.current] - b[orderByValue.current]);
    } else {
      return activeSymbols;
    }
  }, [orderByValue.current, orderByDsc.current, activeSymbols]);

  const filteredSymbolList = sortOrder;

  const handleSort = useCallback(
    (value) => {
      orderByValue.current = value;
      if (orderByDsc.current) {
        orderByDsc.current = false;
      } else {
        orderByDsc.current = true;
      }
    },
    [orderByValue.current, orderByDsc.current]
  );
  const smRowSymbolRef = selectedCoin;

  const sideMenuRow = useMemo(
    () =>
      tabText === "ALL"
        ? (
            filteredSymbolList.map((data) => (
          <SideMenuRow name="ALL" key={data.symbol} symbol={data.symbol} percentage={data.percentage} lp={data.lp} cb={closeDrawer} sRef={smRowSymbolRef} sRefSet={setSelectedCoin} />
            ))
          )
        : filteredSymbolList.filter((f) => isFavouriteSymbol.some((item) => item === f.symbol)).length > 0
          ? (
              filteredSymbolList
                .filter((f) => isFavouriteSymbol.some((item) => item === f.symbol))
                .map((data) => <SideMenuRow name="FAV" key={data.symbol} symbol={data.symbol} percentage={data.percentage} lp={data.lp} cb={closeDrawer} sRef={smRowSymbolRef} />)
            )
          : (
        <Box sx={{ m: 2 }}>
          <Typography>No Selected Symbols</Typography>
        </Box>
            ),
    [filteredSymbolList, tabText]
  );

  const SideMenuContainer = useMemo(
    () => (
      <>
        <Box sx={sideMenuBox}>
          <Box>
            <Typography component="h5" variant={"SemiBold_14"} sx={[sidemenuHeader, {}]}>
              {MENU_CONSTANTS.SELECT_MARKET}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={tabHeader}>
                {filteredSymbolList
                  ? (
                  <SideMenuTab
                    parentRef={{
                      getter: tabText,
                      setter: setTabText
                    }}
                  />
                    )
                  : null}
              </Box>
              <Box sx={listSubHeader}>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                  <Grid item xs={2}>
                    <ListItemText component={"p"} primary={MENU_CONSTANTS.FAV} primaryTypographyProps={fav} />
                  </Grid>
                  <Grid item xs={4}>
                    <ListItemText component={"p"} primary={MENU_CONSTANTS.SYMBOLS} primaryTypographyProps={fav} />
                  </Grid>
                  <Grid item xs={2}>
                    <ListItemText component={"p"} primary={MENU_CONSTANTS.PRICE} primaryTypographyProps={fav} />
                  </Grid>
                  <Grid xs={1.5}>
                    <IconButton sx={[ICONSIZE]} onClick={() => handleSort("lp")}>
                      <UnfoldMoreIcon sx={{ color: "text.primary" }}></UnfoldMoreIcon>
                    </IconButton>
                  </Grid>
                  <Grid item xs={2}>
                    <ListItemText primary={MENU_CONSTANTS.HR24} primaryTypographyProps={fav} />
                  </Grid>
                  <Grid item xs={0.5}>
                    <IconButton sx={[ICONSIZE]} onClick={() => handleSort("percentage")}>
                      <UnfoldMoreIcon sx={{ color: "background.white" }}></UnfoldMoreIcon>
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>

          <Box sx={{ height: "70%", overflow: "auto" }}>{sideMenuRow}</Box>
        </Box>
      </>
    ),
    [filteredSymbolList, sideMenuRow, orderByDsc.current, orderByValue.current]
  );

  const renderDrawer = useMemo(
    () => (
      <Drawer BackdropProps={{ style: drawer }} transitionDuration={300} sx={drawerStyleSx} anchor={"left"} open={drawerState} onChange={openDrawer} onClose={closeDrawer}>
        {SideMenuContainer}
      </Drawer>
    ),
    [SideMenuContainer, drawerState]
  );

  const SideMenuInfo = useMemo(
    () => (
      <React.Fragment>
        <Button sx={SIDEMENUBUTTON} onClick={openDrawer}>
          <div style={{ display: "inline-block" }}>
            <Typography
              component={"h2"}
              variant={"SemiBold_20"}
              sx={{
                color: "background.white"
              }}
            >
              {selectedCoin}
            </Typography>
            <Typography
              component={"h3"}
              variant={"SemiBold_11"}
              sx={{
                color: "text.darkliver"
              }}
            >
              {contractType}
            </Typography>
          </div>
          <KeyboardArrowDownIcon sx={{ color: "background.white" }}></KeyboardArrowDownIcon>
        </Button>
        {renderDrawer}
      </React.Fragment>
    ),
    [selectedCoin, renderDrawer]
  );

  return SideMenuInfo;
};

export default memo(SideMenu);
