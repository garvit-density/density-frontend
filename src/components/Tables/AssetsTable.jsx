/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Box, Button } from "@mui/material";
import { TableData } from "../UI/TableData";
import { TabSection } from "../UI/TabSection";
import { BuyModal, SellModal } from "../CustomModals";
import { WebViewActiveBlock } from "components/UI/MWebStyles/MWeb.styles";
const ButtonStyle = { textTransform: "none", fontSize: "16px", fontWeight: "500", fontFamily: "'Overpass',sans-serif", letterSpacing: "0", color: "#FCFCFC" };
const AssetsTab = ({ title, columns, rows, selectedWalletFromTabs, buy, setBuy, sell, setSell }) => (
  <TabSection className="tableTitle" title={ title } mx={2} sx={WebViewActiveBlock}>
    <TableData
      columns={columns}
      rows={rows}
      rowAction={
        <Box
          sx={{
            display: "flex",
            gap: 2
          }}
        >
          {selectedWalletFromTabs === "SPOT" && [<Button key="Buy" sx={ButtonStyle}>Buy</Button>,
          <Button key="Deposit" sx={ButtonStyle}>Sell</Button>]}
          {/* {selectedWalletFromTabs === "FUTURES" && <Button key="Transfer" onClick={() => setTransfer(true)} sx={ButtonStyle}>Transfer</Button>} */}
          {selectedWalletFromTabs === "FUTURES" && [<Button key="Buy" onClick={() => setBuy(true)} sx={ButtonStyle}>Buy</Button>,
            <Button key="Sell" onClick={() => setSell(true)} sx={ButtonStyle}>Sell</Button>]}
          {/* <TransferModal isOpen={transfer} close={() => setTransfer(false)} /> */}
          <BuyModal isOpen={buy} close={() => setBuy(false)} />
          <SellModal isOpen={sell} close={() => setSell(false)} />
        </Box>
      }
    />
  </TabSection>
);

export default AssetsTab;
