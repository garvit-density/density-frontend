/* eslint-disable no-unused-vars */
import React from "react";
import { TableData } from "../UI/TableData";
import { TabSection } from "../UI/TabSection";

// eslint-disable-next-line react/prop-types
const HistoryTable = ({ title, rows, filterLabel, columns, isColored, filterValue, setFilterValue, select }) => (
  <TabSection title={ title }>
    <TableData filterLabel={filterLabel} filterValue={filterValue} setFilterValue={setFilterValue} select={select} isColored={isColored} columns={ columns } rows={ rows } />
  </TabSection>
);

export default HistoryTable;
