import React, { useEffect, useMemo, useRef, useState } from "react";
import WalletIcon from "../../assets/images/Wallet.svg";
import WorkIcon from "../../assets/images/Work.svg";
import OrderIcon from "../../assets/images/Order.svg";
import LogoutIcon from "../../assets/images/logOut.svg";
import PropTypes from "prop-types";
import { Tab, Tabs, Box } from "@mui/material";
import MPosition from "../UserActivities/UserTabs/Positions/mposition/index";
import MOpenOrder from "../UserActivities/UserTabs/mOrders/index";
import { Wallet } from "pages/Wallet";
import { BINANCE_WS_CONNECT, BINANCE_WS_DISCONNECT, DENSITY_WS_CONNECT, DENSITY_WS_DISCONNECT, OPEN_ORDERS_FETCH_SUCCESS } from "../../frontend-BL/redux/constants/Constants";
import internetConnectionStatus from "hooks/internetConnectionStatus";
import { openOrdersApi } from "../../frontend-api-service/Api";
import { fetchAccountInfo } from "../../frontend-BL/redux/actions/User/AccountInfo.ac";
import { useDispatch, useSelector } from "react-redux";
import { getTradableCoins } from "../../frontend-BL/redux/actions/Futures/GetTradableCoins.ac";
import MProfile from "../UserActivities/UserTabs/mOrders/mProfile";
import { bottomFixed } from "components/UserActivities/UserTabs/style";
const mHome = () => {
  const [currentView, setCurrentView] = useState(0);
  const TABSINDEX = useMemo(() => currentView, [currentView]);
  const dispatch = useDispatch();
  const { isOnline } = internetConnectionStatus();
  let isOpenOrdersApiCalled = false;
  let openOrdersFromServer = [];
  let symbolsFromServer = useSelector((state) => state.tradablesymbolList.tradablesymbolList);
  symbolsFromServer = symbolsFromServer && symbolsFromServer.map((symbol) => symbol.symbol);
  if (symbolsFromServer.length > 0 && !isOpenOrdersApiCalled) fetchOpenOrders();

  const isExitLimitMarketModalOpen = useRef(false);
  const exitWithLimitOrMarket = useRef("");
  const densityWsStatus = useSelector((state) => state.wsConnection.density.opened);
  const binanceWsStatus = useSelector((state) => state.wsConnection.binance.opened);

  useEffect(() => {
    if (isOnline && !densityWsStatus) return dispatch(DENSITY_WS_CONNECT);

    if (!isOnline) return dispatch(DENSITY_WS_DISCONNECT);
    return () => {
      return dispatch(DENSITY_WS_DISCONNECT);
    };
  }, [isOnline, densityWsStatus, window.screen.width]);

  useEffect(() => {
    dispatch(fetchAccountInfo());
    dispatch(getTradableCoins());
  }, []);

  useEffect(() => {
    if (isOnline && !binanceWsStatus) dispatch({ type: BINANCE_WS_CONNECT });
    if (!isOnline) dispatch({ type: BINANCE_WS_DISCONNECT });
    return () => dispatch({ type: BINANCE_WS_CONNECT });
  }, [isOnline]);

  useEffect(() => {
    fetchOpenOrders();
  }, []);

  function fetchOpenOrders() {
    isOpenOrdersApiCalled = true;
    symbolsFromServer &&
      symbolsFromServer.forEach((symbol) => {
        openOrdersApi(symbol)
          .then((successResponse) => {
            console.log({ successResponse });
            openOrdersFromServer = [...openOrdersFromServer, ...successResponse.data];
            dispatch({
              type: OPEN_ORDERS_FETCH_SUCCESS,
              payload: openOrdersFromServer
            });
          })
          .catch((errorResponse) => {
            console.log(errorResponse);
          });
      });
  }
  const ToggleView = () => {
    switch (TABSINDEX) {
      case 1:
        return <MOpenOrder index={TABSINDEX} />;
      case 2:
        return <Wallet index={TABSINDEX} />;
      case 3:
        return <MProfile index={TABSINDEX} />;

      default:
        return <MPosition index={TABSINDEX} isExitLimitMarketModalOpen={isExitLimitMarketModalOpen} exitWithLimitOrMarket={exitWithLimitOrMarket} />;
    }
  };

  ToggleView.propTypes = {
    current: PropTypes.number
  };

  const handleChange = (e) => {
    const attributeValue = Number(e.target.attributes.order.nodeValue);
    e.stopPropagation();
    setCurrentView(attributeValue);
  };

  return (
    <Box sx={{ width: "100%", p: 1 }}>
      <Box>{ToggleView()}</Box>
      <Box sx={[bottomFixed]}>
        <Tabs
          centered
          textColor="text.ultramild"
          selectionFollowsFocus
          value={currentView}
          aria-label="Tabs where each tab needs to be selected manually"
          sx={{ display: "flex", justifyContent: "space-between" }}
          onChange={(e) => handleChange(e)}
        >
          <Tab sx={{ fontSize: "Medium_11" }} icon={<img src={WorkIcon} />} label="Positions" order={0} />
          <Tab sx={{ fontSize: "Medium_11" }} icon={<img src={OrderIcon} />} label="Orders" order={1} />
          <Tab sx={{ fontSize: "Medium_11" }} icon={<img src={WalletIcon} />} label="Wallet" order={2} />
          <Tab sx={{ fontSize: "Medium_11" }} icon={<img src={LogoutIcon} />} label="Profile" order={3} />
        </Tabs>
      </Box>
    </Box>
  );
};

export default mHome;
