import { Card, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import keyVerificationCardLogo from "../../assets/images/userVerification/keyVerificationCard.svg";
import BankVerificationCardLogo from "../../assets/images/userVerification/bankVerification.svg";
import { Link } from "react-router-dom";

const UserVerification = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ py: 2 }}>
          <header>
            <Box>
              <Typography varient="Medium_28">User Verification</Typography>
            </Box>
          </header>
        </Box>

        <Box>
          <section>
            <Grid container justifyContent="space-between" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item md={5.9} xs={12}>
                <Card sx={{ backgroundColor: "background.primary", display: "flex", justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, p: "30px" }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "240px", width: "100%" }}>
                    <img src={keyVerificationCardLogo} alt="keyVerificationCardLogo" />
                    <Box>
                      <Typography>Bank Verification</Typography>
                      <Typography>Not Initiated</Typography>
                    </Box>
                  </Box>
                  <Link style={{ color: "black", backgroundColor: "#fff", padding: "5px 30px", textDecoration: "none" }} to="/UserVerification/kyc">
                    View
                  </Link>
                </Card>
              </Grid>
              <Grid item md={5.9} xs={12}>
                <Card sx={{ backgroundColor: "background.primary", display: "flex", justifyContent: "space-between", alignItems: "center", p: "30px" }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "240px", width: "100%" }}>
                    <img src={BankVerificationCardLogo} alt="keyVerificationCardLogo" />
                    <Box>
                      <Typography>Bank Verification</Typography>
                      <Typography>Not Initiated</Typography>
                    </Box>
                  </Box>
                  <Link style={{ color: "black", backgroundColor: "#fff", padding: "5px 30px", textDecoration: "none" }} to="/UserVerification/account">
                    View
                  </Link>
                </Card>
              </Grid>
            </Grid>
          </section>
        </Box>
      </Container>
    </>
  );
};

export default UserVerification;
