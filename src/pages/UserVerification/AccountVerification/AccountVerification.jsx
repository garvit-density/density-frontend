import { Button, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { KYC_CONSTANTS } from "../KYCVerificationNew/KYCconstant";
import { BACKGROUND_GREY, BOX3RD, BOXUSERPROFILE, BOXUSERPROFILEVALUE, COLOR_DARKGREY, USERPROFILE } from "../KYCVerificationNew/style";

const AccountVerification = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ pt: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
          <Box>
            <Typography variant="SemiBold_28" component={"h3"}>
              Bank Details
            </Typography>{" "}
          </Box>
          <Button sx={{ backgroundColor: "#fff", px: 2, color: "black" }}>Change Bank Account</Button>
        </Box>
        <Grid container>
          <Grid item xs={12}>
            <Box sx={[BOX3RD, BACKGROUND_GREY]}>
              <Grid container justifyContent="flex-end">
                <Grid item xs={1}>
                  <Box sx={USERPROFILE}></Box>
                </Grid>
                <Grid item xs={11} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 3 }}>
                  <Typography>{KYC_CONSTANTS.USERID}</Typography>

                  <Typography>Verified</Typography>
                </Grid>
                <Grid item xs={11}>
                  {" "}
                  <Box sx={{ pl: "26px", pt: "6px", width: { xs: "70%", md: "60%" } }}>
                    <Box sx={[BOXUSERPROFILE, { flexDirection: { lg: "row", md: "row", xs: "column" } }]}>
                      <Box
                        sx={[
                          BOXUSERPROFILEVALUE,
                          {
                            flexDirection: {
                              lg: "column",
                              md: "column",
                              xs: "row"
                            },
                            justifyContent: { xs: "space-between" }
                          }
                        ]}
                      >
                        <Typography variant={"Regular_14"} sx={COLOR_DARKGREY}>
                          User Name
                        </Typography>
                        <Typography variant={"SemiBold_14"}>John Parker</Typography>
                      </Box>
                      <Box
                        sx={[
                          BOXUSERPROFILEVALUE,
                          {
                            flexDirection: {
                              lg: "column",
                              md: "column",
                              xs: "row"
                            },
                            justifyContent: { xs: "space-between" }
                          }
                        ]}
                      >
                        <Typography variant={"Regular_14"} sx={COLOR_DARKGREY}>
                          Account Number
                        </Typography>
                        <Typography variant={"SemiBold_14"}>John Parker</Typography>
                      </Box>
                      <Box
                        sx={[
                          BOXUSERPROFILEVALUE,
                          {
                            flexDirection: {
                              lg: "column",
                              md: "column",
                              xs: "row"
                            },
                            justifyContent: { xs: "space-between" }
                          }
                        ]}
                      >
                        <Typography variant={"Regular_14"} sx={COLOR_DARKGREY}>
                          IFSC Code
                        </Typography>
                        <Typography variant={"SemiBold_14"}>John Parker</Typography>
                      </Box>
                      <Box
                        sx={[
                          BOXUSERPROFILEVALUE,
                          {
                            flexDirection: {
                              lg: "column",
                              md: "column",
                              xs: "row"
                            },
                            justifyContent: { xs: "space-between" }
                          }
                        ]}
                      >
                        <Typography variant={"Regular_14"} sx={COLOR_DARKGREY}>
                          Branch Name
                        </Typography>
                        <Typography variant={"SemiBold_14"}>John Parker</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AccountVerification;
