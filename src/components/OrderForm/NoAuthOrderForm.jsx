import { Box, Button, Container } from "@mui/material";
import React from "react";
import {
  justifyCenter,
  Login2TradeBtn,
  noAuthContainer
} from "./OrderForm.styled";
import padlock_img from "../../assets/images/Padlock.svg";
import { GetAppURL } from "../../frontend-api-service/Base";
import { redirectToAuth } from "supertokens-auth-react";

const notLoggedInTypography = {
  color: "white",
  textAlign: "center",
  paddingLeft: "20px",
  paddingRight: "20px",
  marginBottom: "5px"
};

function NoAuthOrderForm() {
  return (
    <>
      <form id="orderFormScreen">
        <Container id="orderForm" sx={noAuthContainer} maxWidth="xs">
          <Box sx={{ marginTop: "40%", paddingTop: "auto" }}>
            <div style={justifyCenter}>
              <img src={padlock_img} />
            </div>
            <div style={justifyCenter}>
              <a
                href={GetAppURL() + "/auth"}
                style={{ color: "white", textDecoration: "none" }}
              >
                <Button sx={Login2TradeBtn}>Login to Trade</Button>
              </a>
            </div>
            <p style={notLoggedInTypography}>
              {" "}
              Not Registered Yet? <br />
              <a
                onClick={() =>
                  redirectToAuth({ show: "signup", redirectBack: true })
                }
                style={{
                  color: "#E2FF6F",
                  textDecoration: "none",
                  cursor: "pointer"
                }}
              >
                Create new Account
              </a>{" "}
            </p>
          </Box>
        </Container>
      </form>
    </>
  );
}

export default NoAuthOrderForm;
