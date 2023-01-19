import { Button, Grid, Box } from "@mui/material";
import AccountProfileKYC from "../../../../pages/AccountProfileKYC/AccountProfileKYC";
import React from "react";
import { logoutApp } from "../../../../frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
import { SECTIONHEIGHT } from "../style";
import PropTypes from "prop-types";
const MProfile = ({ index }) => {
  if (index !== 3) {
    return () => null;
  }
  return (
    <>
      <Grid container justifyContent="flex-end" gap="20px">
        <Grid item>
          <Button onClick={() => logoutApp()}>Log Out</Button>
        </Grid>
        <Box sx={SECTIONHEIGHT}>
          <Grid item>
            <AccountProfileKYC />
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
MProfile.propTypes = {
  index: PropTypes.number
};
export default MProfile;
