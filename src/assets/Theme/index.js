import { createTheme } from "@mui/material";
import { palette, palletAddOns } from "./palette";
import typography from "./typography";

let theme = createTheme({
  palette,
  typography
});

theme = createTheme(theme, palletAddOns);

export default theme;
