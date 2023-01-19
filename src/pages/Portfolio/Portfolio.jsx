import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import { useFetchPortfolioStatistics } from "../../frontend-BL/businessHooks";
import PortfolioStatisticsLifetime from "./PortfolioStatisticsLifetime";
import PortfolioStatisticsLastDay from "./PortfolioStatisticsLastDay/PortfolioStatisticsLastDay";
import CurrentStatus from "./CurrentStatus/CurrentStatus";

const Portfolio = () => {
  const [selectedContractMarginRatio, setSelectedContractForMarginRatio] = useState("");
  const { portfolioStatisticsLifetime, portfolioStatisticsLastDay, currentStatus, availableContractsMarginRatio } = useFetchPortfolioStatistics({ setSelectedContractForMarginRatio });

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 12 }}>
          <Grid item xs={12} sm={12} md={12}>
            <PortfolioStatisticsLifetime portfolioStatisticsLifetime={portfolioStatisticsLifetime} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <PortfolioStatisticsLastDay portfolioStatisticsLastDay={portfolioStatisticsLastDay} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CurrentStatus currentStatus={currentStatus} availableContractsMarginRatio={availableContractsMarginRatio} selectedContractMarginRatio={selectedContractMarginRatio} setSelectedContractForMarginRatio={setSelectedContractForMarginRatio}/>
          </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default Portfolio;
