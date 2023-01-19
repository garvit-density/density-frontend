import { Box, Container, Grid, Typography } from "@mui/material";
import { GetAppURL } from "api-server/Base";
import React from "react";
import { LOGIN, marginRatioContainerWrapper, MarginRatioInnerBox, notLoggedInTypography, NO_DATA_CURRENTLY, RECENT_TRADES, TO_VIEW_DATA } from "./NoAuthRecentTradesList.styled";

function NoAuthRecentTradesList() {
  return (
    <>
    <Container id="marginRatioContainer" sx={marginRatioContainerWrapper} maxWidth="xs">
    <Box sx={MarginRatioInnerBox}>
    <Grid item id="marginRatioLabel">
<Typography variant="p" color="white">
{RECENT_TRADES}
</Typography>
</Grid>
      <p style={notLoggedInTypography}>{NO_DATA_CURRENTLY} <br />
        <a href={GetAppURL() + "/auth"} style={{ color: "background.success.secondary" }}>{LOGIN}</a> {TO_VIEW_DATA} </p>
    </Box>
    </Container>
    </>
  );
}

export default NoAuthRecentTradesList;
