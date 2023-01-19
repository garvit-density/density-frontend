import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography, Box } from "@mui/material";
import React, { memo } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ACCODIAN, ACCODIANHEADER, ACCORDIANGRIDITEM, ACCORDIANGRIDITEMHEADING, BORDER, ERROR, EXPANDICON, FONT12, FONT13, SECTIONHEIGHT, SUCCESS } from "../style";
import PropTypes from "prop-types";
import { useOrderHistory } from "frontend-BL/businessHooks";
import { PRICE, EXECUTED, NOORDERHISTORY, AMOUNT, AVERAGE } from "./mMagicString";
const mOrderHistory = (props) => {
  const { allOrderHistoryData } = useOrderHistory();

  const { index } = props;
  if (index !== 1) {
    return () => null;
  }

  const showOrderHistoryData = () => {
    if (allOrderHistoryData.length > 0) {
      return allOrderHistoryData.map((item, index) => {
        return (
          <>
            <Grid key={index} item xs={12}>
              <Accordion sx={ACCODIAN}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={EXPANDICON} />} sx={BORDER}>
                  <Box sx={ACCODIANHEADER}>
                    <Box sx={ACCORDIANGRIDITEM}>
                      <Typography sx={[{ backgroundColor: item.side === "SELL" ? [ERROR] : [SUCCESS] }, { px: 1.5, my: 1, fontSize: "Medium_11" }]} variant="h6">
                        {item.side}
                      </Typography>
                      <Typography variant={"Bold_16_21"} component={"h6"}>
                        {item.symbol} |{" "}
                        <span>
                          {" "}
                          {new Date(item.time).getDay()} {new Date(item.time).toLocaleString("default", { month: "long" }).slice(0, 3)}
                        </span>
                        <span> {new Date(item.time).getHours() + ":" + new Date(item.time).getMinutes()}</span>
                      </Typography>
                    </Box>
                    <Box sx={[{ mr: 1, display: "flex", flexDirection: "column", alignItems: "flex-end" }, FONT13]}>
                      <Box sx={{ backgroundColor: "#4A4A4A", px: 1.3, py: 0.3, my: 1 }}>{item.status}</Box>
                      <Box> {item.type} </Box>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={3} sx={ACCORDIANGRIDITEM}>
                      <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                        {AVERAGE}
                      </Typography>

                      <Typography varient="h5" sx={FONT12}>
                        {item.avgPrice}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} sx={ACCORDIANGRIDITEM}>
                      <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                        {PRICE}
                      </Typography>
                      <Typography varient="h5" sx={FONT12}>
                        {item.price}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} sx={ACCORDIANGRIDITEM}>
                      <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                        {EXECUTED}
                      </Typography>
                      <Typography varient="h5" sx={FONT12}>
                        {item.executedQty}
                      </Typography>
                    </Grid>{" "}
                    <Grid item xs={3} sx={ACCORDIANGRIDITEM}>
                      <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                        {AMOUNT}
                      </Typography>
                      <Typography varient="h5" sx={FONT12}>
                        {item.executedQty}
                      </Typography>
                    </Grid>{" "}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </>
        );
      });
    } else {
      <Grid item>
        {" "}
        <Typography variant="h5" sx={{ fontSize: "Regular_14" }}>
          {" "}
          {NOORDERHISTORY}
        </Typography>
      </Grid>;
    }
  };

  return (
    <>
      <Box sx={SECTIONHEIGHT}>
        <Grid container gap="10px">
          {showOrderHistoryData()}
        </Grid>
      </Box>
    </>
  );
};
mOrderHistory.propTypes = {
  index: PropTypes.number
};
export default memo(mOrderHistory);
