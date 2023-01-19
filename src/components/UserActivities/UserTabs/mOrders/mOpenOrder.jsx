import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from "@mui/material";
// import BasicmModal from "components/UI/mModal";
import React, { memo, useCallback, useMemo } from "react";
import { ACCODIAN, ACCODIANHEADER, ACCORDIANGRIDITEM, ACCORDIANGRIDITEMHEADING, BORDER, ERROR, EXPANDICON, FONT12, FONT13, SECTIONHEIGHT, SUCCESS } from "../style";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import BasicmModal from "../../../UI/mModal/index";
import { numberWithCommas } from "helpers/commaHelper";
import PropTypes from "prop-types";
import { cancelOrderApi } from "../../../../frontend-api-service/Api";
import { availableBalanceAction } from "../../../../frontend-BL/redux/actions/User/AvailableBalance.ac";
import { GLOBAL_ERROR_ADD, GLOBAL_ERROR_REMOVE, ORDER_CREATION_FAIL, ORDER_CREATION_SUCESS } from "../../../../frontend-BL/redux/constants/Constants";
import { FILLED, NOOPENORDERS, ORDERID, PRICE, REDUCEONLY, SIZEINCONTRACT, SIZEINUSDT, TRIGGERPRICE } from "./mMagicString";
const mOpenOrder = (props) => {
  const dispatch = useDispatch();
  const { index } = props;
  if (index !== 0) {
    return () => null;
  }

  const openOrdersApiData = useSelector((state) => state.futures.openOrders);
  const openOrdersSocketData = useSelector((state) => state.OpenOrdersStream.OpenOrdersStream);
  const trueFalseMap = useCallback((val) => {
    return val === false ? "No" : "Yes";
  }, []);

  const closeOrder = (orderId, symbol) => {
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
  };
  const showOpenOrderData = useMemo(() => {
    if (openOrdersApiData.length > 0 || openOrdersSocketData.length > 0) {
      return openOrdersApiData.map((item, index) => {
        return (
          <>
            <Grid item xs={12}>
              <Accordion sx={ACCODIAN}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={EXPANDICON} />}>
                  <Box sx={ACCODIANHEADER}>
                    <Box sx={ACCORDIANGRIDITEM}>
                      <Typography sx={[{ backgroundColor: item.side === "SELL" ? [ERROR] : [SUCCESS] }, { px: 1.5, my: 1, fontSize: "Medium_11" }]} variant="h6">
                        {item.side}
                      </Typography>
                      <Typography variant={"Bold_16_21"} component={"h6"}>
                        {item.symbol}
                      </Typography>
                      <Typography variant={"Bold_14_21"} sx={{ color: "text.ultramild" }} component={"p"}>
                        <span>
                          {" "}
                          {new Date(item.time).getDay()} {new Date(item.time).toLocaleString("default", { month: "long" }).slice(0, 3)}
                        </span>
                        <span> {new Date(item.time).getHours() + ":" + new Date(item.time).getMinutes()}</span>
                      </Typography>
                    </Box>
                    <Box sx={[{ mr: 1 }, FONT13]}>
                      <Box sx={{ backgroundColor: "#4A4A4A", px: 1.3, py: 0.3, my: 1, fontSize: "Medium_11" }}>
                        {numberWithCommas(item.executedQty)} {FILLED}
                      </Box>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={BORDER}>
                  <Grid container spacing={2}>
                    <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                      <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                        {SIZEINCONTRACT}
                      </Typography>

                      <Typography varient="h5" sx={FONT12}>
                        {item.origQty}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                      <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                        {PRICE}
                      </Typography>
                      <Typography varient="h5" sx={FONT12}>
                        {item.price}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                      <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                        {REDUCEONLY}
                      </Typography>
                      <Typography varient="h5" sx={FONT12}>
                        {trueFalseMap(item.reduceOnly)}
                      </Typography>
                    </Grid>{" "}
                    <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                      <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                        {SIZEINUSDT}
                      </Typography>
                      <Typography varient="h5" sx={FONT12}>
                        {(item.origQty * item.price).toFixed(2)}
                      </Typography>
                    </Grid>{" "}
                    <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                      <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                        {TRIGGERPRICE}
                      </Typography>
                      <Typography varient="h5" sx={FONT12}>
                        {Number(item.stopPrice) ? item.stopPrice : "-"}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                      <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                        {ORDERID}
                      </Typography>
                      <Typography varient="h5" sx={FONT12}>
                        {item.orderId}
                      </Typography>
                    </Grid>{" "}
                    <Grid item xs={12} sx={ACCORDIANGRIDITEM}>
                      <BasicmModal title="Cancel Order" close={() => closeOrder(item.orderId, item.symbol)} />
                    </Grid>{" "}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </>
        );
      });
    } else {
      return (
        <Grid item>
          {" "}
          <Typography variant="h5" sx={{ fontSize: "Regular_14" }}>
            {" "}
            {NOOPENORDERS}
          </Typography>
        </Grid>
      );
    }
  });
  const webSocketData = useMemo(
    () =>
      openOrdersSocketData !== undefined &&
      openOrdersSocketData.map((item, _) => (
        <>
          <Grid item xs={12}>
            <Accordion sx={ACCODIAN}>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={EXPANDICON} />}>
                <Box sx={ACCODIANHEADER}>
                  <Box sx={ACCORDIANGRIDITEM}>
                    <Typography sx={[{ backgroundColor: item.side === "SELL" ? [ERROR] : [SUCCESS] }, { px: 1.5, my: 1, fontSize: "Medium_11" }]} variant="h6">
                      {item.S}
                    </Typography>
                    <Typography variant={"Bold_16_21"} component={"h6"}>
                      {item.s}
                    </Typography>
                    <Typography variant={"Bold_14_21"} sx={{ color: "text.ultramild" }} component={"p"}>
                      <span>
                        {" "}
                        {new Date(item.T).getDay()} {new Date(item.T).toLocaleString("default", { month: "long" }).slice(0, 3)}
                      </span>
                      <span> {new Date(item.T).getHours() + ":" + new Date(item.T).getMinutes()}</span>
                    </Typography>
                  </Box>
                  <Box sx={[{ mr: 1 }, FONT13]}>
                    <Box sx={{ backgroundColor: "#4A4A4A", px: 1.3, py: 0.3, my: 1 }}>
                      {numberWithCommas(item.l)} {FILLED}
                    </Box>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                    <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                      {SIZEINCONTRACT}
                    </Typography>

                    <Typography varient="h5" sx={FONT12}>
                      {item.q}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                    <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                      {PRICE}
                    </Typography>
                    <Typography varient="h5" sx={FONT12}>
                      {item.p}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                    <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                      {REDUCEONLY}
                    </Typography>
                    <Typography varient="h5" sx={FONT12}>
                      {trueFalseMap(item.R)}
                    </Typography>
                  </Grid>{" "}
                  <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                    <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                      {SIZEINUSDT}
                    </Typography>
                    <Typography varient="h5" sx={FONT12}>
                      {(item.q * item.p).toFixed(2)}
                    </Typography>
                  </Grid>{" "}
                  <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                    <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                      {TRIGGERPRICE}
                    </Typography>
                    <Typography varient="h5" sx={FONT12}>
                      {Number(item.sp) ? item.sp : "-"}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                    <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                      {ORDERID}
                    </Typography>
                    <Typography varient="h5" sx={FONT12}>
                      {item.i}
                    </Typography>
                  </Grid>{" "}
                  <Grid item xs={12} sx={ACCORDIANGRIDITEM}>
                    <BasicmModal title="Cancel Order" close={() => closeOrder(item.orderId, item.symbol)} />
                  </Grid>{" "}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </>
      )),
    [openOrdersSocketData]
  );
  return (
    <Box sx={SECTIONHEIGHT}>
      <Grid container gap="10px">
        {showOpenOrderData}
        {webSocketData}
      </Grid>
    </Box>
  );
};
mOpenOrder.propTypes = {
  index: PropTypes.number
};
export default memo(mOpenOrder);
