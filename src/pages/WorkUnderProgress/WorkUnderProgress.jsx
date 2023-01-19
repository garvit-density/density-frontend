/* eslint-disable no-unused-vars */
import React from "react";
import { Grid, Typography } from "@mui/material";
import Logo from "../../components/UI/Logo/Logo";
import Loader from "helpers/Loader";

const textStrings = {
  WORKUNDERPROGRESS: "We are progressively working on mobile and tablet screen friendly designs, for better experience please switch to laptop/desktop version."
};

function WorkUnderDevelopement() {
  // const screentypemsg = {
  //   color: "text.primary",
  //   textAlign: "center"
  // };
  return (
    <>
      <Loader />
      {/* <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "100vh",
          backgroundColor: "background.ultradark",
          justifyContent: "center",
          padding: "20%"
        }}
      >
        <Grid item xs={12}>
          <Logo />
          <Typography sx={screentypemsg}>
            {textStrings.WORKUNDERPROGRESS}
          </Typography>
        </Grid>
      </Grid> */}
    </>
  );
}

export default WorkUnderDevelopement;
