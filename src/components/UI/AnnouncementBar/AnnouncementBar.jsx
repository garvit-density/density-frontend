import { Box } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import typography from "assets/Theme/typography";

const AnnouncementBar = (props) => {
  const { barText } = props;

  const AnnouncementbarContainerStyles =
  { position: "absolute", zIndex: 1200, background: "#666673", width: "100%", height: "2%", marginBottom: "1%", color: "#ffffff", textAlign: "center" };
  const AnnouncementBarTextStyle = typography.Regular_12;

  return (
    <Box sx={AnnouncementbarContainerStyles}>
      <Box sx={AnnouncementBarTextStyle}>
      {barText}
      </Box>
    </Box>
  );
};

AnnouncementBar.propTypes = {
  barText: PropTypes.string
};

export default AnnouncementBar;
