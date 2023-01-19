import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const LabelInfo = ({ label, value, isCopiedToClipboard }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      gap: 1,
      mt: "0.3rem"
    }}>
    <Typography variant="body2">
      {label}
    </Typography>
    {isCopiedToClipboard
      ? <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      gap: 1
    }}>
      <Typography sx={{ textAlign: "right" }} variant="body2">{value}</Typography>
      <IconButton sx={{ color: "#FFF", paddingTop: "0px" }} onClick={() => navigator.clipboard.writeText(value)}>
        <ContentCopyIcon sx={{ fontSize: "18px" }}/>
      </IconButton>
    </Box>
      : <Typography variant="body2">{value}</Typography>}
  </Box>
);

LabelInfo.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  isCopiedToClipboard: PropTypes.bool
};

export default LabelInfo;
