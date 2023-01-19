/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Typography
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TabSection } from "components/UI/TabSection";
import { TabStatistic } from "components/UI/TabStatistic";
import { BuyModal, SellModal } from "components/CustomModals";
import theme from "assets/Theme/index";
import { TABS_CONSTANTS } from "frontend-BL/businessHooks/WALLET/Constants/Tabs.const";

const btnContainedMobile = {
  background: theme.palette.DENSITY_BLACK,
  color: "#FFFFFF",
  fontSize: "10px",
  border: "1px solid #D9D9D9",
  "&:hover": {
    background: `#FFFFFF`,
    color: "#383840"
  },
  borderRadius: "0px",
  width: "100%"
};

function MwebAccordion({
  title,
  columns,
  rows,
  selectedWalletFromTabs,
  buy,
  setBuy,
  sell,
  setSell
}) {
  return (
    <>
      <TabSection className="tableTitle" title={title}>
        {rows &&
          rows.map((asset, index) => (
            <Accordion
              sx={{ background: "transparent", border: "1px solid #4A4A4A" }}
              key={index}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "80%",
                    p: 1
                  }}
                >
                  <Box sx={{ display: "flex", mr: 2 }}>
                    <Box>
                      <Avatar
                        src={
                          "https://static-dev.density.exchange/icons/" +
                          asset.asset.toLowerCase() +
                          ".svg"
                        }
                        sx={{ width: 30, height: 30 }}
                      />
                    </Box>
                    <Box>
                      <Typography sx={{ p: 0.8 }}>{asset?.asset}</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography sx={{ p: 0.8 }}>
                      {asset.marginBalance &&
                        Math.trunc(asset.marginBalance * 100) / 100}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box pb={2}>
                  <TabStatistic
                    {...{
                      name: TABS_CONSTANTS.ASSETS_HISTORY_COLUMNS_LABEL[2],
                      value:
                        asset.unrealizedProfit &&
                        Math.trunc(asset.unrealizedProfit * 100) / 100,
                      colorIndicator: true,
                      sourceComponent: TABS_CONSTANTS.FUTURES_WALLET
                    }}
                  />
                </Box>
                <Box pb={2}>
                  <TabStatistic
                    {...{
                      name: TABS_CONSTANTS.ASSETS_HISTORY_COLUMNS_LABEL[3],
                      value:
                        asset.availableBalance &&
                        Math.trunc(asset.availableBalance * 100) / 100,
                      sourceComponent: TABS_CONSTANTS.FUTURES_WALLET
                    }}
                  />
                </Box>
                <Box>
                  <TabStatistic
                    {...{
                      name: TABS_CONSTANTS.ASSETS_HISTORY_COLUMNS_LABEL[4],
                      value:
                        asset.maxWithdrawAmount &&
                        Math.trunc(asset.maxWithdrawAmount * 100) / 100,
                      sourceComponent: TABS_CONSTANTS.FUTURES_WALLET
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    my: 2
                  }}
                >
                  {selectedWalletFromTabs === "SPOT" && [
                    <Button key="Buy" sx={btnContainedMobile}>
                      Buy
                    </Button>,
                    <Button key="Deposit" sx={btnContainedMobile}>
                      Sell
                    </Button>
                  ]}
                  {/* {selectedWalletFromTabs === "FUTURES" && <Button key="Transfer" onClick={() => setTransfer(true)} sx={ButtonStyle}>Transfer</Button>} */}
                  {selectedWalletFromTabs === "FUTURES" && [
                    <Button
                      key="Buy"
                      onClick={() => setBuy(true)}
                      sx={btnContainedMobile}
                    >
                      Buy
                    </Button>,
                    <Button
                      key="Sell"
                      onClick={() => setSell(true)}
                      sx={btnContainedMobile}
                    >
                      Sell
                    </Button>
                  ]}
                  {/* <TransferModal isOpen={transfer} close={() => setTransfer(false)} /> */}
                  <BuyModal isOpen={buy} close={() => setBuy(false)} />
                  <SellModal isOpen={sell} close={() => setSell(false)} />
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
      </TabSection>
    </>
  );
}

export default MwebAccordion;
