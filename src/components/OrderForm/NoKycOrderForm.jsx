import { Box, Button, Container } from "@mui/material";
import React from "react";
import { justifyCenter, Login2TradeBtn, noAuthContainer } from "./OrderForm.styled";
import padlock_img from "../../assets/images/Padlock.svg";
import { GetAppURL } from "../../frontend-api-service/Base";

function NoKycOrderForm() {
  return (
        <>
          <form id="orderFormScreen">
            <Container id="orderForm"
            sx={noAuthContainer} maxWidth="xs">
              <Box sx={{ marginTop: "40%", paddingTop: "auto" }}>
                <div style={justifyCenter}>
                    <img src={padlock_img} />
                </div>
                <div style={justifyCenter}>
                    <a href={GetAppURL() + "/update-account-details-kyc-initiate"} style={{ color: "white", textDecoration: "none" }}>
                        <Button sx={Login2TradeBtn}>Complete KYC to Trade</Button>
                    </a>
                </div>
            </Box>
            </Container>
            </form>
        </>
  );
}

export default NoKycOrderForm;
