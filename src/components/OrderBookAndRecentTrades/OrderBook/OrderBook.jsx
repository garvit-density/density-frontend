import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../helpers/Loader";

// Mui components
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Table, TableBody, TableContainer } from "@mui/material";

// components imported
// import LTPAndMPCounter from "./LTPAndMPCounter";
import AskOrbids from "./AskOrBids";
import TableRowWrapperForAsks from "./TableRowWrapperForAsks";
import TableRowWrapperForBids from "./TableRowWrapperForBids";
import TableHeadWrapperForAsksBids from "./TableHeadWrapperForAsksBids";

import "../OrderBook.css";
import { useDepthStream } from "../../../frontend-BL/businessHooks";

import { ORDERBOOK_CONSTANTS } from "../../../frontend-BL/businessHooks/ORDER_BOOK/Constants/OrderBook.const";

const OrderBookTableContainer = { overflowX: "hidden", height: "680px", overflowY: "scroll" };
const OverFlowXHiden = { overflowX: "hidden" };

export default function OrderBook() {
  const asksOrBids = useRef(ORDERBOOK_CONSTANTS.ALL_ASKS_BIDS.ALL);
  const getSelectSymbol = useSelector((state) => state.selectSymbol.selectedSymbol);
  const setLimitPriceFromOrderBook = useSelector((state) => state.orderFormHelper.limitPriceHandler);

  const { asks_final_obj, bids_final_obj, isloading } = useDepthStream(getSelectSymbol);

  return (
    <>
      <TabContext value={asksOrBids.current}>
        <AskOrbids asksOrBids={asksOrBids} />

        {isloading.current
          ? (
          <Box sx={{ p: 3 }}>
            <Loader />
          </Box>
            )
          : (
          <>
            <TabPanel value={ORDERBOOK_CONSTANTS.ALL_ASKS_BIDS.ALL}>
              <TableHeadWrapperForAsksBids />
              <TableContainer id="table_orderbook">
                <Table aria-label="simple table" stickyHeader>
                  <TableBody>
                    {asks_final_obj.current
                      .slice(0, ORDERBOOK_CONSTANTS.ASKS_BIDS_COUNT)
                      .reverse()
                      .map((items, index) => {
                        return (
                          <TableRowWrapperForAsks
                            count={ORDERBOOK_CONSTANTS.ASKS_BIDS_COUNT}
                            index={index}
                            setLimitPriceFromOrderBook={setLimitPriceFromOrderBook}
                            items={items}
                            asks_final_obj={asks_final_obj}
                            key={index}
                          />
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer sx={OrderBookTableContainer} id="table_orderbook">
                <Table aria-label="simple table" sx={OverFlowXHiden}>
                  <TableBody>
                    {bids_final_obj.current.slice(0, ORDERBOOK_CONSTANTS.ASKS_BIDS_COUNT).map((items, index) => {
                      return (
                        <TableRowWrapperForBids
                          count={ORDERBOOK_CONSTANTS.ASKS_BIDS_COUNT}
                          index={index}
                          setLimitPriceFromOrderBook={setLimitPriceFromOrderBook}
                          items={items}
                          bids_final_obj={bids_final_obj}
                          key={index}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={ORDERBOOK_CONSTANTS.ALL_ASKS_BIDS.ASKS} sx={{ m: "0", p: "0" }}>
              <TableContainer sx={OrderBookTableContainer} id="table_orderbook">
                <Table aria-label="simple table" sx={OverFlowXHiden} stickyHeader>
                  <TableHeadWrapperForAsksBids />
                  <TableBody>
                    {asks_final_obj.current
                      .slice(0, ORDERBOOK_CONSTANTS.ASKS_BIDS_ONLY_COUNT)
                      .reverse()
                      .map((items, index) => {
                        return (
                          <TableRowWrapperForAsks
                            count={ORDERBOOK_CONSTANTS.ASKS_BIDS_ONLY_COUNT}
                            index={index}
                            setLimitPriceFromOrderBook={setLimitPriceFromOrderBook}
                            items={items}
                            asks_final_obj={asks_final_obj}
                            key={index}
                          />
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={ORDERBOOK_CONSTANTS.ALL_ASKS_BIDS.BIDS} sx={{ m: "0", p: "0" }}>
              <TableContainer sx={OrderBookTableContainer} id="table_orderbook">
                <Table aria-label="simple table" sx={OverFlowXHiden}>
                  <TableHeadWrapperForAsksBids />
                  <TableBody>
                    {bids_final_obj.current.slice(0, ORDERBOOK_CONSTANTS.ASKS_BIDS_ONLY_COUNT).map((items, index) => {
                      return (
                        <TableRowWrapperForBids
                          count={ORDERBOOK_CONSTANTS.ASKS_BIDS_ONLY_COUNT}
                          index={index}
                          setLimitPriceFromOrderBook={setLimitPriceFromOrderBook}
                          items={items}
                          bids_final_obj={bids_final_obj}
                          key={index}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </>
            )}
      </TabContext>
    </>
  );
}
