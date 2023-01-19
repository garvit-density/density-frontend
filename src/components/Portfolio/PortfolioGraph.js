/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Tooltip } from "@mui/material/node";
import axiosWithApiServer from "api-server/Utils/hooks/axiosHelpers/axiosWithApiServer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import "./PortfolioGraph.css";

export const data = [
  ["Date", "Positive", "Negative"],
  [new Date(2018, 3, 20), 10, null],
  [new Date(2018, 3, 21), 5, null],
  [new Date(2018, 3, 22), 0, 0],
  [new Date(2018, 3, 23), null, -5],
  [new Date(2018, 3, 24), null, -10],
  [new Date(2018, 3, 25), null, -5],
  [new Date(2018, 3, 26), 0, 0],
  [new Date(2018, 3, 27), 10, null],
  [new Date(2018, 3, 28), 5, null],
  [new Date(2018, 3, 29), 0, 0]
];

const realizedPnlObj = [["Date", "Positive", "Negative"]];
let userTradesApiObj = [];

export const options = {
  curveType: "function",
  series: [{ color: "#2FDAAF" }, { color: "#F46151" }],
  backgroundColor: {
    fill: "#010101",
    opacity: 100
  },
  chartArea: {
    width: "90%",
    height: "75%",
    lineWidth: 15

  },
  hAxis: { gridlines: { color: "#010101" } },
  vAxis: { gridlines: { color: "#010101" } },
  legend: "none"
};

function PortfolioGraph() {
  const [chart, setChart] = useState(false);
  useEffect(() => {
    const axiosWithApiServerPromise = axiosWithApiServer({
      method: "get",
      url: "/fapi/v1/userTrades"
    });
    axiosWithApiServerPromise
      .then((response) => {
        userTradesApiObj = response.data;
        userTradesApiObj.forEach((obj1) => {
          if (obj1.realizedPnl.charAt(0) === "-") {
            realizedPnlObj.push([new Date(obj1.time), null, parseInt(obj1.realizedPnl)]);
          } else {
            realizedPnlObj.push([new Date(obj1.time), parseInt(obj1.realizedPnl), null]);
          }
        });
        setChart(true);
      }).catch((e) => {
        console.error(e);
      });
  }, []);

  return (

    <>
      {chart &&
        <Chart
          chartType="AreaChart"
          background="transparent"
          height="420px"
          width={"100%"}
          data={realizedPnlObj}
          options={options}
          style={{ background: "black" }}
        />
      }
    </>
  );
}

export default PortfolioGraph;
