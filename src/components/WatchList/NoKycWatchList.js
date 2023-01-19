
import { Box, Typography } from "@mui/material";
import { GetAppURL } from "api-server/Base";
import React from "react";
import no_login_svg from "../../../../assets/images/no_login_svg.svg";
import { justifyCenter } from "../OrderForm/OrderForm.styled";
import { NoAuthWatchlist } from "./WatchListObject";

function NoKycWatchList() {
  const CONSTANTS = {
    NO_DATA: "No data currently.",
    VIEW_DATA: "to view your data",
    COMPLETE_KYC: "Complete KYC to trade"

  };
  return (
        <>
            <Box
                sx={NoAuthWatchlist}>
                <Box sx={{ justifyContent: "center", display: "block" }}>
                    <Box sx={justifyCenter}>
                        <img style={{ width: "130px", marginTop: "9%" }} src={no_login_svg} />
                    </Box>
                    <Typography sx={{ color: "white", textAlign: "center", paddingLeft: "20px", paddingRight: "20px", marginTop: "15px" }}>{CONSTANTS.NO_DATA} <br />
                        <a href={GetAppURL() + "/update-account-details-kyc-initiate"} style={{ color: "#e2ff6f", textDecoration: "none" }}>{CONSTANTS.COMPLETE_KYC}</a> {CONSTANTS.VIEW_DATA}</Typography>
                </Box>
            </Box>
        </>
  );
}

export default NoKycWatchList;
