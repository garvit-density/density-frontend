// Mui
import { Button, TableCell, Tooltip, Box, Grid, Typography } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { epochToDateConvertor, sxColorUtility, truncateString } from "helpers";
import { numberWithCommas } from "helpers/commaHelper";
// React, redux, hooks
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBAL_ERROR_REMOVE, GLOBAL_ERROR_ADD, ORDER_CREATION_SUCESS, ORDER_CREATION_FAIL } from "../../../frontend-BL/redux/constants/Constants";
// Assets, strings, constants
import { OpenOrderSubHeader } from "../UserActivitiesObjects";
import { CLOSE_POSITIONS_SX, positionSubHeader, singleGridStyle, singleGrid1, tableRowStyle, tablePositionCategoryStyle1, tablePositionCategoryStyle2 } from "./UserTabs.style";
// Apis
import { cancelOrderApi } from "../../../frontend-api-service/Api";
import { justifyCenter } from "components/OrderForm/OrderForm.styled";
import { availableBalanceAction } from "../../../frontend-BL/redux/actions/User/AvailableBalance.ac";
import PropTypes from "prop-types";
const OpenOrders = ({ index }) => {
  if (index !== 1) {
    return null;
  }

  const dispatch = useDispatch();
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const openOrdersApiData = useSelector((state) => state.futures.openOrders);
  const openOrdersSocketData = useSelector((state) => state.OpenOrdersStream.OpenOrdersStream);
  const CANCEL = "Cancel";

  const NO_OPEN_ORDERS_TEXT = "No open orders currently";

  const trueFalseMap = useCallback((val) => {
    return val === false ? "No" : "Yes";
  }, []);

  function closeOrder(orderId, symbol) {
    cancelOrderApi(symbol, orderId)
      .then((successResponse) => {
        dispatch(availableBalanceAction());
        dispatch({
          type: GLOBAL_ERROR_ADD,
          payload: {
            src: ORDER_CREATION_SUCESS,
            errorMessage: "Your order has been cancelled successfully",
            errorCode: successResponse.status,
            errorUi: "SNACKBAR",
            dialogType: "success",
            errorHandlerForReduxStateUpdation: () => dispatch({ type: GLOBAL_ERROR_REMOVE, payload: { src: ORDER_CREATION_SUCESS } })
          }
        });
      })
      .catch((errorResponse) => {
        dispatch({
          type: GLOBAL_ERROR_ADD,
          payload: {
            src: ORDER_CREATION_FAIL,
            errorMessage: "Order could not be cancelled. We apologize!",
            errorCode: errorResponse.response.status,
            errorUi: "SNACKBAR",
            dialogType: "failure",
            errorHandlerForReduxStateUpdation: () => dispatch({ type: GLOBAL_ERROR_REMOVE, payload: { src: ORDER_CREATION_FAIL } })
          }
        });
      });
  }

  const handleChange = (data) => {
    navigator.clipboard.writeText(data);
    setSelectedOrderId(data);
  };

  const restApiData = useMemo(
    () =>
      openOrdersApiData !== undefined &&
      openOrdersApiData.map((rowData, _) => (
        <Grid container key={rowData.orderId}
            sx={{
              backgroundColor: "background.secondary",
              "&:hover": {
                backgroundColor: "background.regular"
              }
            }}>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>{epochToDateConvertor(rowData.time)}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1} justifyContent="flex-start" alignItems="center" container>
            <Grid sx={tablePositionCategoryStyle1} justifyContent="flex-start" alignItems="center" item xs={9}>
              {truncateString(rowData.orderId, 8)}
            </Grid>
            <Grid justifyContent="flex-start" alignItems="center" item xs={3}>
              <div style={{ marginTop: "3px" }}>
                {selectedOrderId !== rowData.orderId && (
                  <Tooltip title="click here to copy orderID" placement="top">
                    <ContentCopyIcon sx={{ color: "text.primary" }} onClick={() => handleChange(rowData.orderId)} />
                  </Tooltip>
                )}
                {selectedOrderId === rowData.orderId && (
                  <Tooltip title="OrderID copied" placement="top">
                    <DoneAllIcon sx={{ color: "text.primary" }} />
                  </Tooltip>
                )}
              </div>
            </Grid>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>{rowData.symbol}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            {rowData.type === "TAKE_PROFIT_MARKET" ? <Typography sx={tableRowStyle}>{"TP_MARKET"}</Typography> : <Typography sx={tableRowStyle}>{rowData.type}</Typography>}
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={sxColorUtility(rowData.side, tableRowStyle, "openOrders")}>{rowData.side}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>{numberWithCommas(Number(rowData.price))}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>
              {numberWithCommas(Number(rowData.origQty))} {rowData.symbol.split("USDT")[0]}
            </Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            {/* <Typography sx={tablePositionCategoryStyle1}>{"--"}</Typography> */}
            <Typography sx={tablePositionCategoryStyle1}>{(rowData.origQty * rowData.price).toFixed(2)}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>{numberWithCommas(Number(rowData.executedQty))}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>{trueFalseMap(rowData.reduceOnly)}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>{Number(rowData.stopPrice) ? rowData.stopPrice : "-"}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <TableCell sx={tablePositionCategoryStyle2}>
              <Button
                sx={CLOSE_POSITIONS_SX}
                variant="contained"
                onClick={() => {
                  closeOrder(rowData.orderId, rowData.symbol);
                }}
              >
                {CANCEL}
              </Button>
            </TableCell>
          </Grid>
        </Grid>
      )),
    [openOrdersApiData, selectedOrderId]
  );

  const webSocketData = useMemo(
    () =>
      openOrdersSocketData !== undefined &&
      openOrdersSocketData.map((rowData, _) => (
        <Grid
          container
          key={rowData.i}
          sx={{
            "&:hover": {
              background: "#2c2c34"
            }
          }}
        >
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>{epochToDateConvertor(rowData.T)}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1} justifyContent="flex-start" alignItems="center" container>
            <Grid justifyContent="flex-start" alignItems="center" item xs={9}>
              <Typography sx={tablePositionCategoryStyle1}>{truncateString(rowData.i, 8)}</Typography>
            </Grid>
            <Grid justifyContent="flex-start" alignItems="center" item xs={3}>
              <div style={{ marginTop: "3px" }}>
                {selectedOrderId !== rowData.orderId && (
                  <Tooltip title="click here to copy orderID" placement="top">
                    <ContentCopyIcon onClick={() => handleChange(rowData.orderId)} />
                  </Tooltip>
                )}
                {selectedOrderId === rowData.orderId && (
                  <Tooltip title="OrderID copied" placement="top">
                    <DoneAllIcon />
                  </Tooltip>
                )}
              </div>
            </Grid>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>{rowData.s}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>{rowData.o}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={sxColorUtility(rowData.S, tableRowStyle, "openOrders")}>{rowData.S}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>{numberWithCommas(Number(rowData.p))}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>{numberWithCommas(Number(rowData.q))}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>{"--"}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>{numberWithCommas(Number(rowData.l))}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>{trueFalseMap(rowData.R)}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <Typography sx={tablePositionCategoryStyle1}>{Number(rowData.sp) ? rowData.sp : "-"}</Typography>
          </Grid>
          <Grid sx={singleGrid1} xs={1}>
            <TableCell sx={tablePositionCategoryStyle2}>
              <Button
                sx={CLOSE_POSITIONS_SX}
                variant="contained"
                onClick={() => {
                  closeOrder(rowData.i, rowData.s);
                }}
              >
                {CANCEL}
              </Button>
            </TableCell>
          </Grid>
        </Grid>
      )),
    [openOrdersSocketData, selectedOrderId]
  );

  return (
    <Box sx={{ marginLeft: "" }}>
      <Grid container sx={positionSubHeader} spacing={3}>
        {OpenOrderSubHeader.map((headerData, i) => (
          <Grid key={i} sx={singleGridStyle} xs={headerData.gridSize}>
            <TableCell sx={tablePositionCategoryStyle1}>
              {headerData.name}
              {/* {headerData.icon === true
                  ? <Tooltip title={"Cancel all open orders"} placement="top">
                  <CancelIcon sx={closebutton} />
                </Tooltip>
                  : null
                } */}
            </TableCell>
          </Grid>
        ))}
      </Grid>
      {openOrdersApiData.length === 0 && openOrdersSocketData.length === 0 && (
        <>
          <Grid sx={justifyCenter} my={2}>
            <Typography variant="p" sx={{ color: "#BDBDBD" }}>
              {NO_OPEN_ORDERS_TEXT}
            </Typography>
          </Grid>
        </>
      )}
      {restApiData}
      {webSocketData}
    </Box>
  );
};
OpenOrders.propTypes = {
  index: PropTypes.number
};

export default OpenOrders;
