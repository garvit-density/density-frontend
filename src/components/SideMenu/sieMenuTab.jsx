import { Tab, Tabs } from "@mui/material";
import React, { memo, useCallback, useMemo } from "react";
import StarIcon from "@mui/icons-material/Star";
import { MENU_CONSTANTS } from "./style";

const SideMenuTab = (props) => {
  const { parentRef } = props;
  const handleChange = useCallback((event, newValue) => {
    parentRef.setter(newValue);
  }, []);
  const sideMenuStyleSx = {
    marginBottom: "5px",
    fontSize: "8px",
    backgroundColor: "background.regular",
    borderRadius: "0px",
    height: "20px",
    "& .MuiTabs-scrollButtons.Mui-disabled": {
      opacity: 0.5
    },
    "& .Mui-selected": {
      backgroundColor: "background.secondary",
      border: 1,
      borderStyle: "solid",
      borderColor: "background.darkcharcol",
      borderRadius: "0px",
      fontFamily: "Overpass",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "12px"
    }
  };

  const TabBar = useMemo(
    () => (
      <Tabs
        value={parentRef.getter}
        onChange={handleChange}
        sx={sideMenuStyleSx}
        color="background.whitemild"
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{
          sx: { color: "background.whitemild" }
        }}
        aria-label="favourite assets"
      >
        <Tab
          value="FAV"
          sx={{
            color: "background.whitemild",
            width: "8px"
          }}
          icon={<StarIcon />}
        />
        <Tab
          value="ALL"
          sx={{
            color: "background.whitemild"
          }}
          label={MENU_CONSTANTS.ALL}
        />
      </Tabs>
    ),
    [parentRef]
  );

  return TabBar;
};

export default memo(SideMenuTab);
