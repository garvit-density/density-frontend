const tabButton = {
  color: "text.primary",
  textTransform: "capitalize",
  fontFamily: "Overpass",
  "&.Mui-selected": {
    color: "#fff",
    m: "7px",
    mb: "5px",
    textTransform: "capitalize",
    // marginRight: "7px",
    minHeight: "30px",
    maxHeight: "34px",
    // marginTop: "7px",
    // marginBottom: "5px",
    borderRadius: "0px",
    background: "#666673",
    fontFamily: "Overpass"
  }
};

const buttonTabs = {
  backgroundColor: "background.white",
  textTransform: "none",
  height: "0px"
};
const BoxStyle = { width: "100%", flexDirection: "column" };
const NoKycUserActivitiesBox = { backgroundColor: "background.secondary", flexGrow: 1, justifyContent: "center", mt: "9px" };
const TAB = {
  color: "text.regular",
  textTransform: "capitalize",
  fontFamily: "Overpass",
  "&.Mui-selected": {
    color: "text.regular",
    textTransform: "capitalize",
    margin: "5px 7px",
    borderRadius: "0px",
    background: "#666673",
    fontFamily: "Overpass"
  }
};

const TABS = { backgroundColor: "background.secondary", border: "1px solid #494949" };
const TABSINDICATOR = {
  sx: {
    backgroundColor: "#fff",
    textTransform: "none",
    height: "0px"
  }
};
export { tabButton, buttonTabs, BoxStyle, NoKycUserActivitiesBox, TABS, TAB, TABSINDICATOR };
