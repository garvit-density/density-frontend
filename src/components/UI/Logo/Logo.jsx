import React from "react";

const Logo = () => {
  return (
    <div style={{
      textAlign: "center",
      display: "flex",
      maxWidth: "150px"
    }}>
        <img style={{ width: "70%", marginTop: "5px" }} src="https://density-uploads-dev.s3.ap-south-1.amazonaws.com/assets/logoneon.png" alt="density" />
        <span style={{ fontSize: "11px", color: "#ffffff", marginTop: "18%", textDecoration: "none" }}>BETA</span>
    </div>
  );
};

export default Logo;
