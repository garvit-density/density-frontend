import { Box, Grid, Link, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { UA_HEADER } from "./UserActivitiesObjects";
import PropTypes from "prop-types";
import { Format } from "../../helpers/String";
import { NoKycUserActivitiesBox, TAB, TABS, TABSINDICATOR } from "./UserActivities.style.js";
import no_login_svg from "../../assets/images/no_login_svg.svg";
import { GetAppURL } from "../../frontend-api-service/Base";

const img_style = {
  width: "130px"
};

const noPositionData = {
  fontFamily: "Overpass",
  paddingBottom: "15px",
  marginBottom: "10px"
};
const NODATA = " No data currently.";
const CompleteKYC = "Complete KYC";
const ViewData = "to view your data";
const NoKycUserActivities = () => {
  const [currentView, setCurrentView] = useState(0);
  const ToggleView = ({ current }) => {
    return (
      <Box sx={NoKycUserActivitiesBox}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <img style={img_style} src={no_login_svg} />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={noPositionData}>
              {NODATA}
              <Link href={GetAppURL() + "/update-account-details-kyc-initiate"} sx={{ color: "text.main", textDecoration: "none" }}>
                {CompleteKYC}
              </Link>
              {ViewData}
            </Typography>
          </Grid>
        </Grid>
        {/* {current === 6 && <Transfer />} */}
      </Box>
    );
  };

  ToggleView.propTypes = {
    current: PropTypes.number
  };

  const handleChange = (e) => {
    const attributeValue = e.target.attributes.order.nodeValue;
    e.stopPropagation();
    setCurrentView(Number(attributeValue));
  };

  const BoxStyle = { border: "0.25px solid #4F4F4F" };

  return (
    <>
      <Box sx={BoxStyle}>
        <Box>
          <Tabs TabIndicatorProps={TABSINDICATOR} sx={TABS} value={currentView} onChange={(e) => handleChange(e)} aria-label="user-activities">
            {UA_HEADER.map((data, index) => (
              <Tab sx={TAB} id="userActivitiesTabs" label={Format(data.name, 0, 0)} key={index} order={data.order} />
            ))}
          </Tabs>
        </Box>
        <Box>
          <ToggleView current={currentView} />
        </Box>
      </Box>
    </>
  );
};

export default NoKycUserActivities;
