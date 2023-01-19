/* eslint-disable no-unused-vars */
import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import MuiAlert from "@mui/material/Alert";
import "./CustomSnackbar.scss";
import typography from "assets/Theme/typography";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert ref={ref} variant="filled" {...props} />;
});

CustomSnackbar.propTypes = {
  snackbarTitle: PropTypes.string,
  snackbarActionName: PropTypes.string,
  snackbarActionHandler: PropTypes.func,
  snackbarContext: PropTypes.object,
  snackbarType: PropTypes.string,
  isSnackbarOpen: PropTypes.bool.isRequired,
  handleIsSnackbarOpen: PropTypes.func.isRequired,
  snackbarActionDefault: PropTypes.func.isRequired
};

CustomSnackbar.defaultProps = {
  snackbarTitle: "Error! Please Try again",
  snackbarActionName: "Close",
  snackbarContext: {},
  snackbarType: "default",
  isSnackbarOpen: false
};

const SnackbarBtnStyle = { color: "text.primary", marginLeft: "3rem", textTransform: "capitalize", border: "1px solid", borderColor: "text.primary" };
export default function CustomSnackbar({ snackbarTitle, snackbarActionName, snackbarActionHandler, snackbarContext, snackbarType, isSnackbarOpen, handleIsSnackbarOpen, snackbarActionDefault }) {
  const [snackStyle, setSnackStyle] = React.useState("");

  // const Icon = variantIcon[snackStyle];
  React.useEffect(() => {
    if (snackbarType === "success") {
      setSnackStyle("success");
    } else if (snackbarType === "failure") {
      setSnackStyle("error");
    } else if (snackbarType === "information") {
      setSnackStyle("info");
    } else if (snackbarType === "warning") {
      setSnackStyle("warning");
    } else {
      setSnackStyle("info");
    }
  }, [isSnackbarOpen]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    handleIsSnackbarOpen(false);
    snackbarActionDefault();
  };

  if (!snackbarActionHandler) {
    snackbarActionHandler = handleClose;
  }

  const handleSnackbarClose = () => {
    snackbarActionHandler();
    handleIsSnackbarOpen(false);
    snackbarActionDefault();
  };

  const action = (
    <React.Fragment>
      <Button size="small" onClick={handleClose}>
        {snackbarActionName}
      </Button>
      <IconButton size="small" aria-label="close" sx={{ color: "text.primary" }} onClick={handleSnackbarClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isSnackbarOpen} autoHideDuration={2000} onClose={handleClose} action={action}>
        <Alert id="alert" severity={snackStyle} sx={{ ...typography.Regular_12, width: "30rem", m: "auto", color: "text.primary" }}>
          {""}
          {snackbarTitle}
          <Button size="small" onClick={handleSnackbarClose} sx={SnackbarBtnStyle}>
            {snackbarActionName}
          </Button>
          <IconButton size="small" aria-label="close" sx={{ color: "text.primary", ml: "10px" }} onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Alert>
      </Snackbar>
    </div>
  );
}
