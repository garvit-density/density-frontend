import TradeScreen from "pages/TradeScreen/TradeScreen";
import AccountProfileKYC from "../pages/AccountProfileKYC/AccountProfileKYC";
import AddDetailsAndKYC from "../pages/AddDetailsAndKYC/AddDetailsAndKYC";
import ServerDownHelper from "../pages/ErrorHandlerAuxiliary/ServerDownHelper";
import InternetDownHelper from "../pages/ErrorHandlerAuxiliary/InternetDownHelper";
import RouteNotFoundHelper from "../pages/ErrorHandlerAuxiliary/RouteNotFoundHelper";
import JavascriptCodeBreakHelper from "../pages/ErrorHandlerAuxiliary/JavascriptCodeBreakHelper";
import KYCCapture from "../pages/KYCCapture/KYCCapture";
import MarketScreen from "../pages/Market/MarketScreen";
import SecondFactor from "../pages/SecondFactorAuthentication/SecondFactorAuthentication";
import { Wallet } from "pages/Wallet";
import ProtectedRoute from "../helpers/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
// import Portfolio from "../pages/Portfolio/Portfolio";
import KYCUserRegistration from "../pages/KYCUserRegistration/KYCUserRegistration";
import { Layout } from "../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import WorkUnderDevelopement from "../pages/WorkUnderProgress/WorkUnderProgress";

import { BrowserView, MobileView } from "react-device-detect";
import MobileVersion from "../pages/mobileView/index";
import OrderBookAndRecentTradesContainer from "../components/OrderBookAndRecentTrades/OrderBookAndRecentTradesContainer";
import * as routerConfig from "react-router-dom";
import { getProfileApi } from "frontend-api-service/Api";
import { useCheckLoginStatus } from "frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
import InitializeValuesForRedux from "hooks/InitializeValuesForRedux/InitializeValuesForRedux";
import { deploymentEnv } from "frontend-api-service/Base";
import KYCVerificationNew from "pages/UserVerification/KYCVerificationNew/KYCVerificationNew";
import UserVerification from "pages/UserVerification/UserVerification";
import AccountVerification from "pages/UserVerification/AccountVerification/AccountVerification";
// import KYCVerificationNew from "pages/UserVerification/KYCVerificationNew/KYCVerificationNew.jsx";
// import UserVerification from "pages/UserVerification/UserVerification";
// import AccountVerification from "pages/UserVerification/AccountVerification/AccountVerification";

export default function AppRouter() {
  const buildType = import.meta.env.VITE_BUILD_TYPE;
  const { isLoggedIn } = useCheckLoginStatus();
  const [kycStatus, setKycStatus] = useState(false);
  useEffect(() => {
    getProfileApi().then((successResponse) => {
      const loggedInUser = successResponse.data.user;
      if (loggedInUser && loggedInUser.kyc_status) {
        setKycStatus(loggedInUser.kyc_status);
      }
    });
  }, []);

  return (
    <>
      {isLoggedIn ? <InitializeValuesForRedux /> : <React.Fragment />}
      <Router>
        <BrowserView>
          <Layout>
            <Routes>
              {/* This renders the login UI on the /auth route */}
              {getSuperTokensRoutesForReactRouterDom(routerConfig)}
              <Route
                exact
                path="/"
                element={
                  <ProtectedRoute requireAuth={false}>
                    <TradeScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/second-factor"
                element={
                  <SessionAuth>
                    <SecondFactor />
                  </SessionAuth>
                }
              />
              {buildType !== deploymentEnv.DEMO && !(kycStatus === "pending" || kycStatus === "verified") && (
                <Route
                  exact
                  path="/kyc-capture"
                  element={
                    <ProtectedRoute>
                      <KYCCapture />
                    </ProtectedRoute>
                  }
                />
              )}
              <Route
                exact
                path="/marketscreen"
                element={
                  <ProtectedRoute requireAuth={false}>
                    <MarketScreen isLoggedIn={true} />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/orderbook/:symbol"
                element={
                  <ProtectedRoute requireAuth={false}>
                    <OrderBookAndRecentTradesContainer isLoggedIn={true} />
                  </ProtectedRoute>
                }
              />
              {buildType !== deploymentEnv.DEMO && (
                <Route
                  exact
                  path="/accountProfileKYC"
                  element={
                    <ProtectedRoute>
                      <AccountProfileKYC />
                    </ProtectedRoute>
                  }
                />
              )}
              {buildType !== deploymentEnv.DEMO && (
                <Route
                  exact
                  path="/wallet"
                  element={
                    <ProtectedRoute>
                      <Wallet />
                    </ProtectedRoute>
                  }
                />
              )}
              <Route
                exact
                path="/accountProfileKYC"
                element={
                  <ProtectedRoute>
                    <AccountProfileKYC />
                  </ProtectedRoute>
                }
              />
              {buildType !== deploymentEnv.DEMO && (
                <Route
                  exact
                  path="/wallet"
                  element={
                    <ProtectedRoute>
                      <Wallet />
                    </ProtectedRoute>
                  }
                />
              )}
              {/* <Route
                  exact
                  path="/portfolio"
                  element={
                    <ProtectedRoute>
                      <Portfolio />
                    </ProtectedRoute>
                  }
                /> */}
              <Route
                exact
                path="/workunderdevelopment"
                element={
                  <ProtectedRoute>
                    <WorkUnderDevelopement />
                  </ProtectedRoute>
                }
              />
              {buildType !== deploymentEnv.DEMO && (
                <Route
                  exact
                  path="/update-account-details-kyc-initiate"
                  element={
                    <ProtectedRoute>
                      <AddDetailsAndKYC />
                    </ProtectedRoute>
                  }
                />
              )}
              <Route
                exact
                path="/server-down-helper"
                element={
                  <ProtectedRoute>
                    <ServerDownHelper />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/enter-basic-details"
                element={
                  <ProtectedRoute>
                    {/* Components that require to be protected by authentication */}
                    <KYCUserRegistration />
                  </ProtectedRoute>
                }
              />

              <Route
                exact
                path="/internet-down-helper"
                element={
                  <ProtectedRoute>
                    <InternetDownHelper />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/javascript-break-helper"
                element={
                  <ProtectedRoute>
                    <JavascriptCodeBreakHelper />
                  </ProtectedRoute>
                }
              />
              {/*
              <Route
                exact
                path="/kycverification-new"
                element={
                  <ProtectedRoute requireAuth={false}>
                    <KYCVerificationNew isLoggedIn={true} />
                  </ProtectedRoute>
                }
              />
                       <Route
                exact
                path="/UserVerification"
                element={
                  <ProtectedRoute requireAuth={false}>
                    <UserVerification isLoggedIn={true} />
                  </ProtectedRoute>
                }
              /> */}
              <Route
                exact
                path="/workunderdevelopment"
                element={
                  <ProtectedRoute>
                    <WorkUnderDevelopement />
                  </ProtectedRoute>
                }
              />
              {buildType !== deploymentEnv.DEMO && (
                <Route
                  exact
                  path="/update-account-details-kyc-initiate"
                  element={
                    <ProtectedRoute>
                      <AddDetailsAndKYC />
                    </ProtectedRoute>
                  }
                />
              )}
              <Route
                exact
                path="/server-down-helper"
                element={
                  <ProtectedRoute>
                    <ServerDownHelper />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/enter-basic-details"
                element={
                  <ProtectedRoute>
                    {/* Components that require to be protected by authentication */}
                    <KYCUserRegistration />
                  </ProtectedRoute>
                }
              />

              <Route
                exact
                path="/internet-down-helper"
                element={
                  <ProtectedRoute>
                    <InternetDownHelper />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/javascript-break-helper"
                element={
                  <ProtectedRoute>
                    <JavascriptCodeBreakHelper />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/UserVerification"
                element={
                  <ProtectedRoute requireAuth={false}>
                    <UserVerification isLoggedIn={true} />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/UserVerification/kyc"
                element={
                  <ProtectedRoute requireAuth={false}>
                    <KYCVerificationNew isLoggedIn={true} />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/UserVerification/account"
                element={
                  <ProtectedRoute requireAuth={false}>
                    <AccountVerification isLoggedIn={true} />
                  </ProtectedRoute>
                }
              />
              <Route exact path="*" element={<RouteNotFoundHelper />} />
            </Routes>
          </Layout>
        </BrowserView>
        <MobileView>
          <Routes>
            {getSuperTokensRoutesForReactRouterDom(routerConfig)}
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute>
                  <MobileVersion />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/second-factor"
              element={
                <SessionAuth>
                  <SecondFactor />
                </SessionAuth>
              }
            />
            {buildType !== deploymentEnv.DEMO && (
              <Route
                exact
                path="/update-account-details-kyc-initiate"
                element={
                  <ProtectedRoute>
                    <AddDetailsAndKYC />
                  </ProtectedRoute>
                }
              />
            )}
            <Route
              exact
              path="/enter-basic-details"
              element={
                <ProtectedRoute>
                  {/* Components that require to be protected by authentication */}
                  <KYCUserRegistration />
                </ProtectedRoute>
              }
            />
            {buildType !== deploymentEnv.DEMO && !(kycStatus === "pending" || kycStatus === "verified") && (
              <Route
                exact
                path="/kyc-capture"
                element={
                  <ProtectedRoute>
                    <KYCCapture />
                  </ProtectedRoute>
                }
              />
            )}
            <Route exact path="*" element={<RouteNotFoundHelper />} />
          </Routes>
        </MobileView>
      </Router>
    </>
  );
}
