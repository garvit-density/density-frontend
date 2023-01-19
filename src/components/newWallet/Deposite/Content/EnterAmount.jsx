import React from "react";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import IMPS from "../../../../assets/images/Wallet/imps.png";
const WhiteText = { color: "text.primary" };
const ButtonGroups = {
  borderColor: "borderColor.primary",
  ":hover": {
    borderColor: "borderColor.primary",
    backgroundColor: "background.regular"
  }
};
function EnterAmount({ Data, setData }) {
  const handleAccount = (event) => {
    setData({ ...Data, accountNumber: event.target.value });
    console.log(Data);
  };
  const handleDeposit = (event) => {
    setData({ ...Data, depositAmount: event.target.value });
    console.log(Data);
  };
  const handleDepositButton = (amount) => {
    setData({ ...Data, depositAmount: amount });
    console.log(Data);
  };
  return (
    <Box
      sx={{
        // backgroundColor: "red",
        marginTop: "2%",
        marginLeft: "4%",
        marginRight: "4%"
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "1%"
        }}
      >
        <Typography sx={{ color: "text.primary", fontSize: "28px" }}>Enter Amount</Typography>
        <img src={IMPS} alt="imps" />
      </Box>
      <Box sx={{ paddingBottom: "2%" }}>
        <Typography sx={{ color: "text.ultramild" }}>Registered Account Number</Typography>
        <TextField
          variant="filled"
          size="small"
          fullWidth
          inputProps={{ style: { color: "text.primary", paddingTop: "14px", paddingBottom: "14px" } }}
          value={Data.accountNumber}
          onChange={handleAccount}
        >
          {" "}
        </TextField>
      </Box>
      <Box sx={{ paddingBottom: "10px" }}>
        <Typography sx={{ color: "common.white" }}>Entered Deposit Amount</Typography>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              border: "1px solid",
              borderColor: "borderColor.primary",
              height: "56px",
              width: "111px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px"
            }}
          >
            <Avatar sx={{ backgroundColor: "background.white", width: "20px", height: "20px" }}>
              {" "}
              <CurrencyRupeeIcon sx={{ fontSize: "small" }}></CurrencyRupeeIcon>
            </Avatar>

            <Typography sx={{ color: "text.primary" }}>INR</Typography>
          </Box>
          <TextField
            variant="outlined"
            size="medium"
            fullWidth
            placeholder="Enter Deposit Amount"
            InputLabelProps={{
              style: { color: "text.primary" }
            }}
            inputProps={{ style: { color: "text.primary" } }}
            value={Data.depositAmount}
            onChange={handleDeposit}
          >
            {""}
          </TextField>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: "12px" }}>
          <Button variant="outlined" sx={[WhiteText, ButtonGroups]} onClick={() => handleDepositButton(5000)}>
            ₹ 5000
          </Button>
          <Button variant="outlined" sx={[WhiteText, ButtonGroups]} onClick={() => handleDepositButton(2000)}>
            ₹ 2000
          </Button>
          <Button variant="outlined" sx={[WhiteText, ButtonGroups]} onClick={() => handleDepositButton(1000)}>
            ₹ 1000
          </Button>
          <Button variant="outlined" sx={[WhiteText, ButtonGroups]} onClick={() => handleDepositButton(500)}>
            ₹ 500
          </Button>
        </Box>
        <Typography sx={{ py: "10px" }}>Limit : ₹500 - ₹5L</Typography>
      </Box>
    </Box>
  );
}
EnterAmount.propTypes = {
  Data: PropTypes.any,
  setData: PropTypes.object
};
export default EnterAmount;
