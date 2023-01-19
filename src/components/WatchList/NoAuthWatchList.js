import { Box, Typography } from "@mui/material";
import { GetAppURL } from "../../frontend-api-service/Base";
import React from "react";
import no_login_svg from "../../assets/images/no_login_svg.svg";
import { justifyCenter } from "../OrderForm/OrderForm.styled";
import { NoAuthWatchlist } from "./WatchListObject";
import { Link } from "react-router-dom";
const NODATA = " No data currently.";
const Login = "Login";
const ViewData = "to view your data";
function NoAuthWatchList() {
  return (
    <>
      <Box sx={NoAuthWatchlist}>
        <Box sx={{ justifyContent: "center", display: "block" }}>
          <div style={justifyCenter}>
            <img style={{ width: "130px", marginTop: "9%" }} src={no_login_svg} />
          </div>
          <Typography sx={{ color: "white", textAlign: "center", paddingLeft: "20px", paddingRight: "20px", marginTop: "15px" }}>
            {" "}
            {NODATA} <br />
            <Link href={GetAppURL() + "/auth"} style={{ color: "text.main", textDecoration: "none" }}>
              {Login}
            </Link>{" "}
            {ViewData}{" "}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default NoAuthWatchList;
