import * as React from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import CancelIcon from "@mui/icons-material/Cancel";
import { Grid, Container } from "@mui/material";

import AlertIcon from "../../../assets/images/alert.svg";
const style = {
  position: "relative",
  top: "30%",
  width: "70%",
  margin: "auto",
  backgroundColor: "background.mild",
  boxShadow: 24,
  p: 2
};

export default function BasicmModal(props) {
  const { title, symbolName, close, icon } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {icon
        ? (
        <>
        <CancelIcon onClick={handleOpen} />
        </>
          )
        : (
        <>
          {" "}
          <Button fullWidth onClick={handleOpen} sx={{ color: "text.dark", backgroundColor: "background.white", borderRadius: "0px" }}>
            {title ?? "open Model"}
          </Button>
        </>
          )}

      <Modal open={open} onClose={handleClose}>
        <Container sx={style}>
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            <Grid item xs={6} sx={{ textAlign: "center" }}>
              <img src={AlertIcon} />
            </Grid>
            <Grid item xs={11}>
              <Typography sx={{ fontSize: "", textAlign: "center" }} variant="h6" component="h2">
                You are about to close the Position for {symbolName}. Are you sure you want to exit ?
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Button onClick={handleClose} fullWidth sx={{ border: "1px solid", borderColor: "#fff", color: "#fff", p: 1, px: 3 }}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Button onClick={() => close()} fullWidth sx={{ backgroundColor: "#fff", color: "black", p: 1, px: 3, "&:hover": { backgroundColor: "#fff" } }}>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Modal>
    </>
  );
}
BasicmModal.propTypes = {
  title: PropTypes.string,
  symbolName: PropTypes.string,
  children: PropTypes.object,
  close: PropTypes.func,
  closeValue: PropTypes.string,
  icon: PropTypes.object
};
