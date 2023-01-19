/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import AppWrapper from "./routes/AppWrapper";
import SentryMain from "./frontend-BL/services/ThirdPartyServices/Sentry";
import SuperTokensMain from "./frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokens";
import { internetUpAuxiliary, internetDownAuxiliary, onVisibilityChange } from "./helpers/ApplicationDownAuxiliary";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import theme from "./assets/Theme/index";
import "./App.scss";

function App() {
  // Check for internet status UP or Down and javascript code break
  useEffect(() => {
    if (!window.onoffline) window.onoffline = internetDownAuxiliary;
    if (!window.ononline) window.ononline = internetUpAuxiliary;
    // if (!window.onerror) window.onerror = javascriptCodeBreakHelper;
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (document.visibilityState === "hidden") {
      const intervalID = setInterval(() => window.location.reload(), 1000 * 60 * 15);
      window.localStorage.intervalID = intervalID;
    }
    return () => {
      if (window.navigator.onLine) {
        window.onoffline = null;
        window.onoffline = null;
        window.onerror = null;
        document.removeEventListener("visibilitychange", onVisibilityChange);
      };
    };
  }, []);
  // End of check for internet status UP or Down and javascript code break

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <SentryMain/>
            <SuperTokensMain/>
            <AppWrapper />
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
