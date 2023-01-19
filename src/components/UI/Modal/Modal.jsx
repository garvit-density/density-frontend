import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";

import { Box, IconButton } from "@mui/material";
import Close from "@mui/icons-material/Close";

import { MODAL_CONSTANTS } from "./Modal.const";

const styles = {
  btnContained: {
    background: "#FCFCFC",
    fontSize: "14px",
    color: "#000000",
    // borderRadius: "0px",
    textTransform: "none",
    "&:hover": {
      background: "#FCFCFC"
    }
  }
};

const Modal = ({
  isOpen,
  stylesContainer,
  disableConfirm,
  childrenActionOutsideDialogContainer,
  close,
  title,
  actionText,
  action,
  children,
  secondaryAction,
  secondaryActionTitle,
  isSecondaryActionVisible
}) => {
  return (
    <Dialog
      PaperProps={{
        sx: {
          ...{
            border: "1px solid #4F4F4F",
            background: "#2c2c34",
            width: "94vw",
            px: 5,
            color: "white",
            paddingLeft: "5px",
            paddingRight: "5px"
          },
          ...stylesContainer
        }
      }}
      open={isOpen === true || isOpen === "true"}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {disableConfirm === true
        ? (
        <Box sx={{ textAlign: "right" }}>
          <IconButton sx={{ color: "#FFF" }} onClick={close}>
            <Close />
          </IconButton>
        </Box>
          )
        : (
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            textAlign: "center",
            fontSize: "20px",
            color: "#FCFCFC",
            fontFamily: "'Overpass',sans-serif"
          }}
        >
          <Box display="flex" alignItems="center">
            <Box flexGrow={1} sx={{ paddingLeft: "6%" }}>
              {title}
            </Box>
            <Box>
              <IconButton sx={{ color: "#FFF" }} onClick={close}>
                <Close />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
          )}
      <DialogContent>{children}</DialogContent>
      {disableConfirm === true
        ? (
            ""
          )
        : (
        <DialogActions sx={{ px: 3, pb: 3 }}>
          {!childrenActionOutsideDialogContainer
            ? (
            <React.Fragment>
              {secondaryAction && isSecondaryActionVisible
                ? (
                <Button sx={styles.btnContained} variant="contained" size="large" onClick={secondaryAction} fullWidth>
                  {secondaryActionTitle}
                </Button>
                  )
                : (
                <React.Fragment></React.Fragment>
                  )}
              <Button sx={styles.btnContained} variant="contained" data-testid="modalActionButton" size="large" onClick={action || close} fullWidth>
                {actionText || MODAL_CONSTANTS.CONFIRM_LABEL}
              </Button>
            </React.Fragment>
              )
            : (
                childrenActionOutsideDialogContainer
              )}
        </DialogActions>
          )}
    </Dialog>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.any,
  title: PropTypes.string,
  actionText: PropTypes.string,
  action: PropTypes.any,
  children: PropTypes.any,
  modalValues: PropTypes.any,
  secondaryActionTitle: PropTypes.string,
  secondaryAction: PropTypes.func,
  disableConfirm: PropTypes.bool,
  isSecondaryActionVisible: PropTypes.bool,
  childrenActionOutsideDialogContainer: PropTypes.any,
  stylesContainer: PropTypes.object
};

export default Modal;
