// React and react hooks
import React, { useEffect, useState, useRef } from "react";
import propTypes from "prop-types";
// Mui components
import MenuIcon from "@mui/icons-material/Menu";
// import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { AppBar, Toolbar, IconButton, Typography, Chip, Badge, Grid, Box } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import MenuItem from "@mui/material/MenuItem";
import VerifiedIcon from "@mui/icons-material/Verified";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InfoIcon from "@mui/icons-material/Info";
import AutoModeIcon from "@mui/icons-material/AutoMode";
// React, redux and actions, reducers
import { useDispatch, useSelector } from "react-redux";
// Components and Helper components
import { Logo } from "../Logo";
import { numberWithCommas } from "helpers/commaHelper";
import TutorialStepper from "components/CustomModals/TutorialStepper";
// APIs
import { getProfileApi, getMetaDataApi, postMetaDataApi } from "../../../frontend-api-service/Api";
import { GetAppURL, deploymentEnv } from "../../../frontend-api-service/Base";
// Assets, strings, constants etc.
import { badgeProp, kycTag, menuIcon, onHoverVal } from "./Navbar.style";
import SupportImage from "../../../assets/images/help-desk.png";
// ThirdPartyServices
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { logoutApp, useCheckLoginStatus } from "../../../frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
import { disableFreshChat, enableFreshChat } from "../../../frontend-BL/services/ThirdPartyServices/FreshChat";
import { setFavouriteSymbolFromLocalStorage } from "frontend-BL/redux/actions/User/SetFavouriteSymbol.ac";

const Navbar = () => {
  const { isLoggedIn } = useCheckLoginStatus();
  const [kycstatus, setKycStatus] = useState(false);
  const session = useSessionContext();
  const [isTutorialStepperOpen, setIsTutorialStepperOpen] = useState(window.localStorage.isNewUser);
  const [isSupportChatVisible, setIsSupportChatVisible] = useState(false);
  const supertokensMetadata = useRef({});
  const balanceSettlementCurrency = parseFloat(useSelector((state) => state.availableBalance.availableBalance).toFixed(2));
  const profileDetails = useSelector((state) => state.profile.profileDetails);
  const BASE_URL = "window.location.href = GetAppURL()";
  // Function for displaying wallet balance
  const dispatch = useDispatch();
  function shouldWalletBalanceAndProfileDetailsBeDisplayed() {
    return window.location.href === (GetAppURL() + "/" || GetAppURL());
  }

  // Third party FreshChat : test DataSource
  function toggleIsSupportChatVisible(event) {
    postMetaDataApi(JSON.stringify({ ...supertokensMetadata.current, isSupportChatEnabled: event.target.checked }));
    setIsSupportChatVisible(event.target.checked);
    if (event.target.checked) {
      enableFreshChat(supertokensMetadata.current.restoreId, profileDetails);
    } else {
      disableFreshChat();
    }
  }

  window.fcWidget.on("widget:closed", function (resp) {
    toggleIsSupportChatVisible({ target: { checked: false } });
  });

  async function onLogout() {
    logoutApp();
  }

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setFavouriteSymbolFromLocalStorage());
      getMetaDataApi().then((successResponse) => {
        supertokensMetadata.current = successResponse.data.data;
        setIsSupportChatVisible(supertokensMetadata.current.isSupportChatEnabled);
      });
    }
  }, [isLoggedIn]);
  useEffect(() => {
    if (!session.loading && session.doesSessionExist && session.invalidClaims.length === 0) {
      getProfileApi().then((successResponse) => {
        const loggedInUser = successResponse.data.user;
        if (loggedInUser && loggedInUser.kyc_status) setKycStatus(loggedInUser.kyc_status);
      });
    }
  }, [session.loading]);

  const buildType = import.meta.env.VITE_BUILD_TYPE;
  const KYC_VERIFIED = kycstatus === "verified" && buildType !== deploymentEnv.DEMO;
  const KYC_FAILED = kycstatus === "failed" && buildType !== deploymentEnv.DEMO;
  const KYC_NOT_VERIFIED = kycstatus === "not_verified" && buildType !== deploymentEnv.DEMO;
  const KYC_PENDING = kycstatus === "pending" && buildType !== deploymentEnv.DEMO;
  const WALLET_BALANCE = shouldWalletBalanceAndProfileDetailsBeDisplayed() && (balanceSettlementCurrency ? numberWithCommas(balanceSettlementCurrency) + " " + "USDT" : "0USDT");
  // const LOGGED_IN_STATE = isLoggedIn && !window.location.href.includes("auth");
  // const LOGGED_OUT_STATE = window.location.href.includes("auth");

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar sx={{ background: "#2c2c34" }} position="static">
        <Container maxWidth="xl">
          <Toolbar sx={{ minHeight: "45px !important" }} disableGutters>
            {/* Typography xs = hidden, md = visible */}
            <Typography
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" }
              }}
            >
              <Logo
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" }
                }}
                onClick={() => BASE_URL}
                aria-label="logo"
              />
            </Typography>
            {/* Mobile menu,  Box xs = visible, md = hidden */}
            <Box
              sx={{
                flexGrow: 1,
                maxHeight: "43px",
                display: { xs: "flex", md: "none" }
              }}
            >
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" }
                }}
              >
                <MenuItem
                  onClick={() => {
                    window.location.href = GetAppURL();
                  }}
                >
                  <Typography textAlign="center">Trades</Typography>
                </MenuItem>
                {isLoggedIn && !window.location.href.includes("auth")
                  ? (
                    <Tooltip title={"coming soon"} placement="bottom">
                  <MenuItem
                    // onClick={() => {
                    //   window.location.href = GetAppURL() + "/portfolio";
                    // }}
                  >
                    <Typography textAlign="center">Portfolio</Typography>
                  </MenuItem>
                  </Tooltip>
                    )
                  : (
                      ""
                    )}
                <MenuItem
                  onClick={() => {
                    window.location.href = GetAppURL() + "/marketscreen";
                  }}
                >
                  <Typography textAlign="center">Markets</Typography>
                </MenuItem>
                {isLoggedIn && !window.location.href.includes("auth")
                  ? (
                  <MenuItem onClick={() => setIsTutorialStepperOpen(true)}>
                    <Tooltip title="Click here to get started with some important processes and features" placement="top-start">
                      <Chip label="Take a tour" />
                    </Tooltip>
                  </MenuItem>
                    )
                  : (
                      ""
                    )}
              </Menu>
            </Box>
            {/* Mobile Logo, Box xs = visible, md = hidden */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1
              }}
            >
              <Logo
                onClick={() => {
                  window.location.href = GetAppURL();
                }}
                aria-label="logo"
              />
            </Typography>
            {/* Web, Box xs = hidden, md = visible */}
            <TutorialStepper isOpen={isTutorialStepperOpen} close={() => setIsTutorialStepperOpen(false)} />
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Grid container>
                <Grid item xs={6} sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Button
                    onClick={() => {
                      window.location.href = GetAppURL();
                    }}
                    sx={{ color: "white", display: "block", fontSize: "12px" }}
                  >
                    Trades
                  </Button>
                  {isLoggedIn && !window.location.href.includes("auth")
                    ? (
                      <Tooltip title={"coming soon"} placement="bottom">
                    <Button
                      // onClick={() => {
                      //   window.location.href = GetAppURL() + "/portfolio";
                      // }}
                      sx={{ color: "white", display: "block", fontSize: "12px" }}
                    >
                      Portfolio
                    </Button>
                    </Tooltip>
                      )
                    : (
                        ""
                      )}
                  <Button
                    onClick={() => {
                      window.location.href = GetAppURL() + "/marketscreen";
                    }}
                    sx={{ color: "white", display: "block", fontSize: "12px" }}
                  >
                    Markets
                  </Button>
                  {isLoggedIn && !window.location.href.includes("auth")
                    ? (
                    <Tooltip title="Click here to get started with some important processes and features" placement="top-start">
                      <Chip sx={{ paddingLeft: "0px", paddingRight: "0px", fontSize: "12px" }} onClick={() => setIsTutorialStepperOpen(true)} label="Take a tour" />
                    </Tooltip>
                      )
                    : (
                        ""
                      )}
                  {/* <Badge sx={badgeProp}>
                  <LibraryBooksIcon
                  onClick={() => setIsTutorialStepperOpen(true)} aria-label="wallet" />
                </Badge> */}
                </Grid>
                <Grid justifyContent="flex-end" item xs={6} sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {isLoggedIn && !window.location.href.includes("auth")
                    ? (
                    <Button
                      onClick={() => {
                        window.location.href = GetAppURL() + "/wallet";
                      }}
                      sx={{ mr: 2, color: "white", display: "block", fontSize: "12px" }}
                    >
                      Wallet
                    </Button>
                      )
                    : (
                        ""
                      )}
                  {isLoggedIn && !window.location.href.includes("auth")
                    ? (
                    <FormGroup>
                      <FormControlLabel
                        sx={{ mr: 0, cursor: "pointer" }}
                        control={
                          <>
                            <Tooltip title="Click here to get instant help from support team" placement="bottom" followCursor>
                              <Badge sx={{ mr: 1 }}>
                                <Chip label="Need help?" />
                              </Badge>
                            </Tooltip>
                            <Badge sx={badgeProp}>
                              <Switch checked={isSupportChatVisible} onChange={(event) => toggleIsSupportChatVisible(event)} />
                            </Badge>
                          </>
                        }
                      />
                    </FormGroup>
                      )
                    : (
                    <></>
                      )}
                  {/* {isLoggedIn && !window.location.href.includes("auth") && !window.location.href.includes("wallet") && !window.location.href.includes("accountProfileKYC") && !window.location.href.includes("portfolio") && !window.location.href.includes("marketscreen")
                   ? <Tooltip
                  sx={{
                    ...(process.env.REACT_APP_BUILD_TYPE === deploymentEnv.DEMO && {
                      display: "none"
                    })
                  }}
                title="Click here to go to wallet"
                placement="top-start">
                <Box
                  sx={{
                    display: "flex",
                    ml: 0.5,
                    mr: 0.5
                  }}
                  onClick={() => { window.location.href = GetAppURL() + "/wallet"; }}
                  aria-label="wallet">
                  <Badge sx={badgeProp}>
                    Wallet
                  </Badge>
                </Box>
              </Tooltip>
                   : ""} */}
                </Grid>
              </Grid>
            </Box>
            {/* Avatar starts */}
            {isLoggedIn && !window.location.href.includes("auth")
              ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Go to profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ height: "30px", width: "30px" }} alt={profileDetails.firstName} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Box
                      sx={{
                        display: "flex",
                        ...(buildType === deploymentEnv.DEMO && {
                          display: "none"
                        })
                      }}
                      aria-label="account"
                    >
                      <Typography
                        sx={onHoverVal}
                        onClick={() => {
                          window.location.href = GetAppURL() + "/accountProfileKYC";
                        }}
                        align="justify"
                      >
                        {shouldWalletBalanceAndProfileDetailsBeDisplayed() && profileDetails && profileDetails.firstName}
                      </Typography>
                      {KYC_VERIFIED && (
                        <>
                          <Chip
                            onClick={() => {
                              window.location.href = GetAppURL() + "/accountProfileKYC";
                            }}
                            sx={menuIcon}
                            label="KYC verified"
                          />
                          <VerifiedIcon sx={kycTag} color="success" />
                        </>
                      )}
                      {KYC_FAILED && (
                        <>
                          <Chip sx={menuIcon} onClick={() => (window.location.href = GetAppURL() + "/update-account-details-kyc-initiate")} label="KYC Verification Failed" />
                          <CancelIcon sx={kycTag} />
                        </>
                      )}
                      {KYC_NOT_VERIFIED && (
                        <>
                          <Chip sx={menuIcon} onClick={() => (window.location.href = GetAppURL() + "/update-account-details-kyc-initiate")} label="Start KYC Verification" />
                          <InfoIcon sx={kycTag} />
                        </>
                      )}
                      {KYC_PENDING && (
                        <>
                          <Chip sx={menuIcon} label="KYC Under Processs" />
                          <AutoModeIcon sx={badgeProp} />
                        </>
                      )}
                    </Box>
                  </MenuItem>
                  <MenuItem sx={{ display: { xs: "block", md: "none" } }} onClick={handleCloseUserMenu}>
                    <Box>
                      {isLoggedIn && !window.location.href.includes("auth")
                        ? (
                        <FormGroup>
                          <FormControlLabel
                            sx={{ mr: 0 }}
                            control={
                              <>
                                <Badge sx={badgeProp}>
                                  <img style={{ height: "30px", width: "30px" }} src={SupportImage} />
                                </Badge>
                                <Chip label="Chart now" />
                                <Badge sx={badgeProp}>
                                  <Switch checked={isSupportChatVisible} onChange={(event) => toggleIsSupportChatVisible(event)} />
                                </Badge>
                              </>
                            }
                          />
                        </FormGroup>
                          )
                        : (
                        <></>
                          )}
                    </Box>
                  </MenuItem>
                  <MenuItem
                    sx={{ display: { xs: "block", md: "none" } }}
                    onClick={() => {
                      window.location.href = GetAppURL() + "/wallet";
                    }}
                  >
                    <Badge sx={badgeProp}>
                      <AccountBalanceIcon sx={badgeProp} />
                    </Badge>
                    <Chip sx={onHoverVal} label={WALLET_BALANCE} />
                  </MenuItem>
                  <MenuItem onClick={onLogout}>
                    <Typography onClick={onLogout} textAlign="center">
                      Logout
                    </Typography>
                    <LogoutIcon sx={{ m: 0.4 }} />
                  </MenuItem>
                </Menu>
              </Box>
                )
              : (
                  ""
                )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

Navbar.propTypes = {
  isLoggedIn: propTypes.bool
};

export default Navbar;
