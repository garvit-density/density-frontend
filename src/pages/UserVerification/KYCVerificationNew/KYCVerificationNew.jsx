import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import { BOX3RD, USERPROFILE, BOXUSERPROFILE, BOXUSERPROFILEVALUE, STEPPERBOX, BACKGROUND_GREY, COLOR_DARKGREY } from "./style";
import UserVerificationCards from "./UserVerificationCards";
import Stepper from "./Stepper";
import { KYC_CONSTANTS, REQUIRED_DOCUMENTS, USER_DATA } from "./KYCconstant";

export default function KYCVerificationNew() {
  const showUserVerificationCards = () => {
    return REQUIRED_DOCUMENTS.map((item, index) => {
      return <UserVerificationCards item={item} key={index} isVerified={false} isFailed={false} isDisabled={false} inProgress={false} />;
    });
  };

  return (
    <Container maxWidth="xl" sx={{ p: 2 }}>
      <Box>
        <Typography component={"h2"} variant={"SemiBold_28_KYC"}>
          {KYC_CONSTANTS.KYC_VERIFICATION}
        </Typography>
      </Box>
      <Grid container gap={"30px"} justifyContent="space-between">
        <Grid item xs={12} sx={{ backgroundColor: "background.secondary" }}>
          <Box sx={[BOX3RD, BACKGROUND_GREY]}>
            <Box sx={USERPROFILE}></Box>
            <Box sx={{ pl: "26px", pt: "6px", width: { xs: "70%", md: "60%" } }}>
              <Typography>{KYC_CONSTANTS.USERID}</Typography>
              <Box sx={[BOXUSERPROFILE, { flexDirection: { lg: "row", md: "row", xs: "column" } }]}>
                {USER_DATA?.map((item) => (
                  <>
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
                        {item?.name}
                      </Typography>
                      <Typography variant={"SemiBold_14"}>{item?.value}</Typography>
                    </Box>
                  </>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item display={"flex"} lg={3.7} xs={12} sx={{ backgroundColor: "background.secondary" }}>
          <Box sx={[STEPPERBOX, BACKGROUND_GREY]}>
            <Typography component={"h2"} variant={"SemiBold_18_KYC"}>
              {KYC_CONSTANTS.STATUS}
            </Typography>
            <Typography component={"p"} variant={"Regular_12_KYC"} sx={COLOR_DARKGREY}>
              {KYC_CONSTANTS.WE_WOULD_REQUIRE_KYC_CHECK}
            </Typography>
            <Stepper level={1} />
          </Box>
        </Grid>
        <Grid item lg={8} sx={{ backgroundColor: "background.secondary" }}>
          <Grid container gap="30px" sx={[{ p: 2 }, { justifyContent: { md: "flex-start", lg: "center" } }, BACKGROUND_GREY]}>
            <Grid item md={11.3}>
              <Box display="flex" flexDirection="column">
                <Typography component={"h2"} variant={"SemiBold_18_KYC"}>
                  {KYC_CONSTANTS.VERIFY_YOUR_IDENTITY}
                </Typography>
                <Typography component={"p"} variant={"Regular_12_KYC"} sx={COLOR_DARKGREY}>
                  {KYC_CONSTANTS.WE_WOULD_REQUIRE_KYC_CHECK}
                </Typography>
              </Box>
            </Grid>
            {showUserVerificationCards()}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
