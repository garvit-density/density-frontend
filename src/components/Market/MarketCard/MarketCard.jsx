
import { Grid, Typography } from "@mui/material";
import React, { useRef } from "react";
import { typoGraphy_Heading, typoGraphy_Text, root, gain_btn, typoGraphy_volume_metric, typoGraphy_volume_value, loss_btn } from "./MarketCardStyles";
import "./MarketCard.css";
import NavigateToTradeScreenWithSelectedSymbol from "helpers/NavigateToTradeScreenWithSelectedSymbol";
import { SymbolPrecisionHelper } from "helpers";
import { numberWithCommas } from "helpers/commaHelper";
import { getCurrencyUrl } from "helpers/CurrencyLogo";
// To do : proper sanity checks for the data coming from props
function MarketCard(props) {
  const data_parser = props;
  const data = data_parser.data;
  const CardHeaderText = useRef(null);
  const {
    setDecimalPrecision
  } = SymbolPrecisionHelper(data.symbol.toUpperCase());
  const logoUrl = data.symbol.slice(0, -4).toLowerCase();

  return (
    <>
      <Grid
        onClick={() => NavigateToTradeScreenWithSelectedSymbol(data.symbol)}
        variant="outlined"
        sx={
          root
        }
        id="card"
        xs={12}
        container>
        <Grid item xs={12}>
            <Typography
              sx={typoGraphy_Heading}>
              {CardHeaderText.current}
            </Typography>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={9} sx={{ display: "flex" }}>
              <img
              src={getCurrencyUrl(logoUrl)}
              alt="eth"
              style={{ width: "22px" }} />
              <Typography
                pl={2}
                sx={typoGraphy_Text}
                gutterBottom>
                {data.symbol?.toUpperCase()}
              </Typography>
          </Grid>
          <Grid item xs={3} sx={
                parseFloat(data.percentage) >= 0 ? gain_btn : loss_btn}>
            {setDecimalPrecision(data.percentage)} %
          </Grid>
          <Grid xs={12}>
            <Typography
              sx={{ ...typoGraphy_Text, ...(data.colorIndicator > 0 ? { color: "trade.primary" } : { color: "trade.secondary" }) }}
              gutterBottom>
              {"$"}{setDecimalPrecision(data.lp)}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container mt={2} xs={12}>
              <Grid item>
                  <Typography sx={typoGraphy_volume_metric}>{"24h Volume (USDT) : "}</Typography>
              </Grid>
              <Grid item>
                  <Typography sx={typoGraphy_volume_value} ml={1}>{numberWithCommas(data.vol)}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </Grid>
    </>
  );
}

export default MarketCard;
