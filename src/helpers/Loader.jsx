import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

const Loader = (props) => {
  const { customObject } = props;
  const loaderObject = {
    width: "30%",
    margin: "auto"
  };
  return (
        <Box sx={customObject || loaderObject }>
          <LinearProgress />
        </Box>
  );
};

Loader.propTypes = {
  customObject: PropTypes.object
};

export default Loader;
