import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { KYC_CONSTANTS } from "./KYCconstant";
import { USERCARD, IMGCARD, BUTTON_KYC, VERIFIED_KYC } from "./style";
import AdharImg from "assets/images/KycVerification/Adhar.svg";
import Pan from "assets/images/KycVerification/Pan.svg";
import Selfie from "assets/images/KycVerification/Selfie.svg";
import verified from "assets/images/KycVerification/verified.svg";
import failed from "assets/images/KycVerification/failed.svg";

export default function cards({ item, key, isVerified, isFailed, isDisabled, inProgress }) {
  const { name } = item;
  return (
    <>
      <Grid item md={5.5} lg={3.5} xs={12}>
        <Box key={key} sx={[USERCARD, { p: 2, width: "100%" }]}>
          <Grid container gap="30px" justifyContent={"center"}>
            <Grid item xs={12}>
              <Typography component={"h2"} variant={"Regular_12_KYC"}>
                {name}
              </Typography>
            </Grid>
            <Grid item xs={8} position="relative">
              {name === "Aadhar Verification" && (
                <Box sx={[IMGCARD, { px: 2, py: 4 }]}>
                  <img src={AdharImg} style={{ width: "100%" }} />
                </Box>
              )}
              {name === "PAN Verification" && (
                <Box sx={[IMGCARD, { px: 2, py: 4 }]}>
                  <img src={Pan} style={{ width: "100%" }} />
                </Box>
              )}
              {name === "Selfie Verification" && (
                <Box sx={[IMGCARD, { px: 2, py: 4 }]}>
                  <img src={Selfie} style={{ width: "63%" }} />
                </Box>
              )}

              {isVerified && (
                <Box sx={VERIFIED_KYC}>
                  <img src={verified} />
                </Box>
              )}
              {isFailed && (
                <Box sx={VERIFIED_KYC}>
                  <img src={failed} />
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              {!isVerified && !isFailed && !inProgress && (
                <Button fullWidth disabled={isDisabled} sx={BUTTON_KYC}>
                  {KYC_CONSTANTS.START}
                </Button>
              )}
              {isFailed && !inProgress && (
                <Button fullWidth sx={{ color: "#000", backgroundColor: "text.primary" }}>
                  {KYC_CONSTANTS.FAILED}
                </Button>
              )}
              {inProgress && (
                <Typography component={"h2"} variant={"Regular_12_KYC"} color="primary">
                  {KYC_CONSTANTS.INPROGRESS}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
}
