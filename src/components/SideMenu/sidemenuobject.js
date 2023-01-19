const sidemenuHeader = {
  // bgcolor: "background.secondary"
  padding: "20px 10px"
};

const sideMenuBox = {
  // maxWidth: 350,
  height: "100%",
  bgcolor: "background.secondary"
};

const Typography = {
  fontWeight: 300,
  fontSize: "12px"
};

const drawerStyleSx = {
  border: 1,
  borderStyle: "solid",
  borderColor: "borderColor.secondary",
  "&::-webkit-scrollbar": {
    width: "0.4em"
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)"
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,.1)",
    outline: "1px solid slategrey"
  },
  "& .MuiPaper-root": {
    top: 0,
    // backgroundColor: "background.secondary",
    maxWidth: "330px",
    width: "100%",
    height: "100vh",
    border: 1,
    borderStyle: "solid",
    borderRadius: "0px",
    borderColor: "background.secondary"
  }
};

const tabHeader = {
  display: "flex",
  // margin: "8px",
  padding: "0px"
  // bgcolor: "background.secondary",
  // color: "background.whitemild"
};

const drawer = {
  opacity: 8,
  backdropFilter: "blur(2px)"
};

const menu = { height: "100%", "&:hover": { backgroundColor: "background.regular" } };
const listSubHeader = {
  padding: "5px 15px"
  // margin: "5px",
  // display: "flex",
  // bgcolor: "background.secondary"
  // border: "1px",
  // borderStyle: "solid",
  // borderColor: "#333333"
  // borderRadius: "0px",
  // color: "#FCFCFC",
  // alignContent: "center",
  // textAlign: "left"
};

const fav = {
  fontSize: "13px",
  fontFamily: "Overpass",
  lineHeight: 2.5,
  color: "text.whitegrey"
};
const SymbolLogo = { height: "20px", width: "20px", margin: "0px 10px" };
export { sidemenuHeader, SymbolLogo, menu, fav, listSubHeader, sideMenuBox, tabHeader, drawerStyleSx, drawer, Typography };
