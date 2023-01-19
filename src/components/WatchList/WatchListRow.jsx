// React hooks
import React, { memo } from "react";
import PropTypes from "prop-types";
// MUI
import { Box, ListItemIcon, MenuItem } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useWatchListRowData } from "../../frontend-BL/businessHooks";

// import StarIcon from "@mui/icons-material/Star";
// import { symbolImage } from "./WatchListObject";
// Components and helper components
// import { sxColorUtility } from "helpers";

const LightTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 13
  }
}));

const WatchListRow = (props) => {
  const { symbol } = props;
  const {
    // displayPercentage,
    symbolLogo,
    percentage,
    // handleFavClick,
    onBoxClick
  } = useWatchListRowData({ symbol });

  return (
    <>
      <Box
        onClick={() => onBoxClick()}
        sx={{
          marginBottom: "3px"
        }}
      >
        <LightTooltip title={symbol + "  " + Number(percentage) + "%"} placement="right" followCursor>
          <MenuItem sx={{ paddingLeft: "5px", paddingRight: "2px", justifyContent: "center" }} value={symbol}>
            {/* <ListItemIcon>
          <StarIcon sx={{ color: theme.palette.common.fav }} onClick={handleFavClick}/>
        </ListItemIcon> */}
            <ListItemIcon>
              <img
                style={
                  percentage > 0
                    ? { border: "3px solid #29B57E", borderRadius: "50%", width: "27px", height: "27px", marginLeft: "10%", cursor: "pointer" }
                    : percentage === 0
                      ? { border: "3px solid #ffffff", borderRadius: "50%", width: "27px", height: "27px", marginLeft: "10%", cursor: "pointer" }
                      : { border: "3px solid #F46151", borderRadius: "50%", width: "27px", height: "27px", marginLeft: "10%", cursor: "pointer" }
                }
                // style={{ border: percentage > 0 ? "3px solid #29B57E" : "3px solid #F46151", borderRadius: "50%", width: "27px", height: "27px" }}
                src={symbolLogo}
                alt={symbol}
              />
            </ListItemIcon>
            {/* <ListItemText
          primary={symbol.toLowerCase()}
          primaryTypographyProps={symbolText}/> */}
            {/* <ListItemText
          primary={displayPercentage}
          primaryTypographyProps={sxColorUtility(Number(percentage), TypographyPercentChange)}/> */}
          </MenuItem>
        </LightTooltip>
      </Box>
    </>
  );
};

WatchListRow.propTypes = {
  symbol: PropTypes.string
};

export default memo(WatchListRow);
