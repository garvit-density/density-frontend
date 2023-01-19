// React
import React from "react";
import Navbar from "../UI/Navbar/Navbar";
import PropTypes from "prop-types";
// Components and helper components
import { AnnouncementBar } from "components/UI/AnnouncementBar";
// MUI
import { Grid } from "@mui/material";
// Api and environment
import { deploymentEnv } from "../../frontend-api-service/Base";
// third party
import { checkLoadingStatus } from "../../frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
// Assets, strings, constants, images, styles
import { noticeBar } from "assets/strings/constants";

export const Layout = ({ children }) => {
  const renderAnnouncementBar = () => {
    if (import.meta.env.VITE_BUILD_TYPE === deploymentEnv.DEMO) {
      return (
      <Grid item xs={12} sx={{ marginTop: "5px", marginBottom: "0.8%" }}>
        <AnnouncementBar barText={noticeBar}/>
      </Grid>
      );
    }
  };

  if (checkLoadingStatus()) return null;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      {renderAnnouncementBar()}
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

Layout.propTypes = {
  children: PropTypes.element
};

export default Layout;
