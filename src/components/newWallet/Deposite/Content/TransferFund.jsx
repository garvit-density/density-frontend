import React from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const handleCopy = (txt) => {
  navigator.clipboard.writeText(txt);
};
function TransferFund() {
  return (
    <Box
      sx={{
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
        <Typography sx={{ color: "#FFFFFF" }}>Transfer Fund to this Bank Account</Typography>
        {/* <img src={require("../assets/imps.png")} alt="imps" /> */}
      </Box>
      <Box>
        {" "}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ color: "#FFFFFF" }}>Beneficiary Entity</Typography>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ color: "#FFFFFF" }}>PAGARPAY INDIA PRIVATE LIMITED</Typography>
            <Button startIcon={<ContentCopyIcon sx={{ color: "white" }}></ContentCopyIcon>} onClick={() => handleCopy("PAGARPAY INDIA PRIVATE LIMITED")}></Button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ color: "#FFFFFF" }}>Baneficiary Account Number</Typography>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ color: "#FFFFFF" }}>0937480SBXHBA2E12E</Typography>
            <Button startIcon={<ContentCopyIcon sx={{ color: "white" }}></ContentCopyIcon>} onClick={() => handleCopy("0937480SBXHBA2E12E")}></Button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ color: "#FFFFFF" }}>Baneficiary IFSC Number </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ color: "#FFFFFF" }}>ESFB0003031</Typography>
            <Button startIcon={<ContentCopyIcon sx={{ color: "white" }}></ContentCopyIcon>} onClick={() => handleCopy("ESFB0003031")}></Button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ color: "#FFFFFF" }}>Bank Account Type </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ color: "#FFFFFF" }}>CURRENT</Typography>
            <Button startIcon={<ContentCopyIcon sx={{ color: "white" }}></ContentCopyIcon>} onClick={() => handleCopy("CURRENT")}></Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TransferFund;
