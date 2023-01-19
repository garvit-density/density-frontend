import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { UA_HEADER } from "./UserActivitiesObjects";
import { Assets, OpenOrders, OrderHistory, Positions, TradeHistory, TransactionHistory } from "./UserTabs";
import PropTypes from "prop-types";
import { Format } from "../../helpers/String";
import { useDispatch, useSelector } from "react-redux";
import { DENSITY_WS_CONNECT, DENSITY_WS_DISCONNECT, OPEN_ORDERS_FETCH_SUCCESS } from "../../frontend-BL/redux/constants/Constants";
import internetConnectionStatus from "hooks/internetConnectionStatus";

import { buttonTabs, tabButton, BoxStyle, TABS } from "./UserActivities.style.js";

import { openOrdersApi } from "../../frontend-api-service/Api";
import { fetchAccountInfo } from "../../frontend-BL/redux/actions/User/AccountInfo.ac";

let isOpenOrdersApiCalled = false;

const UserActivities = () => {
  let openOrdersFromServer = [];
  let symbolsFromServer = useSelector((state) => state.tradablesymbolList.tradablesymbolList);
  symbolsFromServer = symbolsFromServer && symbolsFromServer.map((symbol) => symbol.symbol);
  if (symbolsFromServer.length > 0 && !isOpenOrdersApiCalled) fetchOpenOrders();

  const densityWsStatus = useSelector((state) => state.wsConnection.density.opened);
  const allPositionsData = useSelector((state) => state.activePositions.currentPositions);

  const openPositions = useMemo(() => {
    if (allPositionsData !== undefined) {
      return allPositionsData.filter((item) => Number(item.positionAmt) !== 0).length;
    }
  }, [JSON.stringify(allPositionsData)]);

  const openOrdersApiData = useSelector((state) => state.futures.openOrders);
  const openOrdersSocketData = useSelector((state) => state.OpenOrdersStream.OpenOrdersStream);
  const openOrdersCount = openOrdersApiData.length + openOrdersSocketData.length;

  const dispatch = useDispatch();
  const [currentView, setCurrentView] = useState(0);
  const TABSINDEX = useMemo(() => currentView, [currentView]);
  const { isOnline } = internetConnectionStatus();

  const positionsCount = useMemo(() => openPositions, [openPositions]);

  useEffect(() => {
    if (isOnline && !densityWsStatus) return dispatch(DENSITY_WS_CONNECT);

    if (!isOnline) return dispatch(DENSITY_WS_DISCONNECT);

    return () => {
      return dispatch(DENSITY_WS_DISCONNECT);
    };
  }, [isOnline, densityWsStatus]);

  useEffect(() => {
    dispatch(fetchAccountInfo());
  }, []);

  function fetchOpenOrders() {
    isOpenOrdersApiCalled = true;
    symbolsFromServer &&
      symbolsFromServer.forEach((symbol) => {
        openOrdersApi(symbol)
          .then((successResponse) => {
            openOrdersFromServer = [...openOrdersFromServer, ...successResponse.data];
            dispatch({
              type: OPEN_ORDERS_FETCH_SUCCESS,
              payload: openOrdersFromServer
            });
          })
          .catch((errorResponse) => {
            // alert(errorResponse);
          });
      });
  }

  const ToggleView = () => {
    switch (TABSINDEX) {
      case 1:
        return <OpenOrders index={TABSINDEX} />;
      case 2:
        return <OrderHistory index={TABSINDEX} />;
      case 3:
        return <TradeHistory index={TABSINDEX} />;
      case 4:
        return <TransactionHistory index={TABSINDEX} />;
      case 5:
        return <Assets index={TABSINDEX} />;
      default:
        return <Positions index={TABSINDEX} />;
    }
  };

  ToggleView.propTypes = {
    current: PropTypes.number
  };

  const handleChange = (e) => {
    const attributeValue = e.target.attributes.order.nodeValue;
    e.stopPropagation();
    setCurrentView(Number(attributeValue));
  };

  return (
    <>
      <Box>
        <Box sx={BoxStyle}>
          <Box>
            <Tabs
              TabIndicatorProps={{
                sx: buttonTabs
              }}
              sx={TABS}
              value={currentView}
              onChange={(e) => handleChange(e)}
              aria-label="user-activities"
            >
              {UA_HEADER.map((data, index) => (
                <Tab sx={tabButton} id="userActivitiesTabs" label={Format(data.name, positionsCount, openOrdersCount)} key={index} order={data.order} />
              ))}
            </Tabs>
          </Box>
          <Box>{ToggleView()}</Box>
        </Box>
      </Box>
    </>
  );
};

export default UserActivities;
