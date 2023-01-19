import React, { useEffect } from "react";
// import components

import OrderForm from "../../components/OrderForm/OrderForm";
import TradingViewChart from "../../components/TradingViewChart/TradingViewChart";
import { useDispatch, useSelector } from "react-redux";
import WatchList from "../../components/WatchList/WatchList";
import MarketSegment from "components/MarketSegment/MarketSegment";
import "./TradeScreen.scss";
// import OrderBookAndRecentTradesContainer from "components/OrderBookAndRecentTrades/OrderBookAndRecentTradesContainer";
import { UserActivities } from "components/UserActivities";
import { BINANCE_WS_CONNECT, BINANCE_WS_DISCONNECT } from "../../frontend-BL/redux/constants/Constants";
import internetConnectionStatus from "hooks/internetConnectionStatus";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { getTradableCoins } from "../../frontend-BL/redux/actions/Futures/GetTradableCoins.ac";
import { Box, Grid } from "@mui/material";
// import { getProfileApi } from "api-server/Api";
import NoKycUserActivities from "components/UserActivities/NoKycUserActivities";
// import { deploymentEnv } from "api-server/Base";
import CustomDialog from "components/UI/CustomModals/CustomDialog";
import CustomSnackbar from "components/UI/Snackbar/CustomSnackbar";
// import NoAuthWatchList from "components/WatchList/NoAuthWatchList";
import NoAuthOrderForm from "components/OrderForm/NoAuthOrderForm";
import NoAuthUserActivities from "components/UserActivities/NoAuthUserActivities";
// import NoKycOrderForm from "components/OrderForm/NoKycOrderForm";
import { checkLoadingStatus, useCheckLoginStatus } from "../../frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
import { deploymentEnv } from "frontend-api-service/Base";
import Loader from "helpers/Loader";
import NoKycOrderForm from "components/OrderForm/NoKycOrderForm";
// import { useMarketSegmentData } from "frontend-BL/businessHooks";
const buildType = import.meta.env.VITE_BUILD_TYPE;
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.1),
  textAlign: "center",
  color: theme.palette.text.secondary
}));
const KYCSTATUS = ["not_verified", "pending", "failed"];
function TradeScreen() {
  const { isOnline } = internetConnectionStatus();
  const { isLoggedIn, isLoading } = useCheckLoginStatus();
  const binanceWsStatus = useSelector((state) => state.wsConnection.binance.opened);
  const kycstatus = useSelector((state) => state.profile.profileDetails.kyc_status);
  const AggTradeStatus = useSelector((state) => state.AggTradeStatus.AggTradeStatus);
  const dispatch = useDispatch();
  const [doesErrorExist, setDoesErrorExist] = React.useState(false);
  // const [kycstatus, setKycStatus] = useState("not_verified");
  const globalErrorHandler = useSelector((state) => state.GlobalErrorHandler.errorDirectory);
  if (checkLoadingStatus()) return null;
  useEffect(() => setDoesErrorExist(true), [globalErrorHandler]);

  useEffect(() => {
    if (isOnline && !binanceWsStatus) dispatch({ type: BINANCE_WS_CONNECT });
    if (!isOnline) dispatch({ type: BINANCE_WS_DISCONNECT });
    return () => dispatch({ type: BINANCE_WS_CONNECT });
  }, [isOnline]);

  useEffect(() => {
    dispatch(getTradableCoins());
  }, []);
  const SHOWORDERFORM = () => {
    if (isLoading) {
      if (isLoggedIn) {
        if (kycstatus === "verified") {
          if (AggTradeStatus) {
            return <OrderForm />;
          } else {
            return (
              <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Loader />
              </Box>
            );
          }
        } else if (KYCSTATUS.includes(kycstatus)) {
          return <NoKycOrderForm />;
        }
      } else {
        return <NoAuthOrderForm />;
      }
    } else {
      return (
        <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Loader />
        </Box>
      );
    }
  };
  const SHOWUSERACTIVITIES = () => {
    if (isLoading) {
      if (isLoggedIn) {
        if (kycstatus === "verified") {
          return <UserActivities />;
        } else if (KYCSTATUS.includes(kycstatus)) {
          return <NoKycUserActivities />;
        }
      } else {
        return <NoAuthUserActivities />;
      }
    } else {
      return (
        <Box sx={{ height: "100%", minHeight: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Loader />
        </Box>
      );
    }
  };
  return (
    <>
      {globalErrorHandler.map((error) =>
        error.errorUi === "MODAL"
          ? (
          <CustomDialog
            key={error.errorTime}
            isOpenDialog={doesErrorExist}
            handleIsOpenDialog={setDoesErrorExist}
            dialogContent={error.errorMessage}
            dialogActionDefault={error.errorHandlerForReduxStateUpdation}
          />
            )
          : (
          <CustomSnackbar
            key={error.errorTime}
            snackbarType={error.errorDialogType}
            isSnackbarOpen={doesErrorExist}
            handleIsSnackbarOpen={setDoesErrorExist}
            snackbarTitle={error.errorMessage}
            snackbarActionDefault={error.errorHandlerForReduxStateUpdation}
          />
            )
      )}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0.1}>
          <Grid container sx={{ margin: "1px" }}>
            <Grid container item xs={12} lg={9.5}>
              <Grid sx={{ height: "60px" }} item xs={12}>
                <Item>
                  <MarketSegment />
                </Item>
              </Grid>
              <Grid container>
                <Grid item xs={0.5}>
                  <Item>
                    <WatchList />
                  </Item>
                </Grid>
                <Grid item xs={11.5}>
                  <Item>
                    <TradingViewChart id="tvChart" />
                  </Item>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={2.5}>
              <Grid item xs sx={{ height: "100%" }}>
                {buildType !== deploymentEnv.DEMO && (
                  <>
                    {/* {isLoggedIn === true && kycstatus === "verified" ? (
                      <OrderForm />
                    ) : isLoggedIn === true && (kycstatus === "not_verified" || kycstatus === "pending" || kycstatus === "failed") ? (
                      <NoKycOrderForm />
                    ) : (
                      <NoAuthOrderForm />
                    )} */}

                    {SHOWORDERFORM()}
                  </>
                )}
                {/* {buildType === deploymentEnv.DEMO && <Item>{isLoggedIn === true ? <OrderForm /> : <NoAuthOrderForm />}</Item>} */}
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{ padding: 0, margin: 0 }} container>
            <Grid spacing={1} xs={12} lg={12}>
              {buildType !== deploymentEnv.DEMO && (
                <Item>
                  <Box>{SHOWUSERACTIVITIES()}</Box>
                  {/* {isLoggedIn === true && kycstatus === "verified" ? (
                    <UserActivities />
                  ) : isLoggedIn === true && (kycstatus === "not_verified" || kycstatus === "pending" || kycstatus === "failed") ? (
                    <NoKycUserActivities />
                  ) : (
                    <NoAuthUserActivities />
                  )} */}
                </Item>
              )}
              {/* {buildType === deploymentEnv.DEMO && <Item>{isLoggedIn === true ? <UserActivities /> : <NoAuthUserActivities />}</Item>} */}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default TradeScreen;
