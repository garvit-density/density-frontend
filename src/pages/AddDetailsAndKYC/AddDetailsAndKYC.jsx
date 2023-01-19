/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import Arrow from "../../assets/images/arrow";

import { addDetailsKYCInitiateCard } from "./AddDetailsAndKYC.style";

import { useNavigate } from "react-router-dom";

import { getProfileApi } from "../../frontend-api-service/Api";

import checkMarkSVG from "../../assets/images/green-checkmark-icon.svg";
import cancelIconSVG from "../../assets/images/cancel-icon.svg";
import progressIconSVG from "../../assets/images/settings.png";

import ConfirmKYCModal from "components/CustomModals/ConfirmKYCModal";

import CompletedKYCModal from "components/CustomModals/CompletedKYCModal";

function AddDetailsAndKYC() {
  const navigate = useNavigate();
  const [kycStatus, setKycStatus] = useState(false);
  const [isUserDetailsAdded, setIsUserDetailsAdded] = useState(false);
  const userDetails = useRef({});

  const [isConfirmKYCModalOpen, setIsConfirmKYCModalOpen] = useState(false);

  const [isSuccessKYCModalOpen, setIsSuccessKYCModalOpen] = useState(false);

  useEffect(() => {
    setIsSuccessKYCModalOpen(window.localStorage.isSuccessKYCModalOpen);
    window.localStorage.isSuccessKYCModalOpen = false;
  }, []);

  useEffect(() => {
    getProfileApi()
      .then((successResponse) => {
        const loggedInUser = successResponse.data.user;
        userDetails.current = loggedInUser;
        if (loggedInUser && loggedInUser.dob && loggedInUser.firstName && loggedInUser.lastName && loggedInUser.panNumber && loggedInUser.nameAsPerPAN) setIsUserDetailsAdded(true);
        if (loggedInUser && loggedInUser.kyc_status) setKycStatus(loggedInUser.kyc_status);
      })
      .catch(() => {
        navigate("/");
      });
  }
  , []);

  return (
    <>
        <Box sx={addDetailsKYCInitiateCard} className="security">
            <CompletedKYCModal isOpen={isSuccessKYCModalOpen} close={() => setIsSuccessKYCModalOpen(false)} formValues={[{ key: "KYCSuccess", value: "Your documents have been submitted. Please wait while we verify your documents" }]}/>
            <Box className="securityInner">
            <h1 className="securityTitle">Complete KYC Verification</h1>
            <Box>
                <Box className="passwordreset">
                <p>{kycStatus === "failed" ? "Please verify your details before you submit the documents!" : kycStatus === "pending" ? "We are currently verifying the details you provided. We will get back to you soon!" : kycStatus === "verified" ? "Your records are matched. Keep hustling!" : "Enter your personal details"}</p>
                {(kycStatus === "verified") && <div className="centre-align">
                    <img src={checkMarkSVG} width="20px" height="20px" />
                </div>}
                {(kycStatus === "pending") && <div className="centre-align">
                    <img src={progressIconSVG} width="20px" height="20px" />
                </div>}
                {(kycStatus === "failed" || kycStatus === "not_verified") && <div className="pointer centre-align" onClick={() => navigate("/enter-basic-details")}>
                    <Arrow />
                </div>}
                </Box>
                {isUserDetailsAdded === false && <Box className="passwordreset">
                <p>Finish previous step to initiate KYC</p>
                </Box>
                }
                {isUserDetailsAdded === true && <Box className="passwordreset">
                <p>{kycStatus === "failed" ? "Your verification has failed. Please try again!" : kycStatus === "pending" ? "Your documents are being processed. Please hold on tight!" : kycStatus === "verified" ? "We have successfully verified your documents. Happy Trading!" : "Submit your documents"}</p>
                {kycStatus === "not_verified" && <div className="pointer centre-align" onClick={() => setIsConfirmKYCModalOpen(true)}>
                    <Arrow />
                </div>}
                {kycStatus === "verified" && <div className="centre-align">
                    <img src={checkMarkSVG} width="15px" height="15px" />
                </div>}
                {kycStatus === "failed" && <div className="pointer centre-align" onClick={() => setIsConfirmKYCModalOpen(true)}>
                    <img src={cancelIconSVG} width="20px" height="20px" />
                </div>}
                {kycStatus === "pending" && <div className="centre-align">
                    <img src={progressIconSVG} width="20px" height="20px" />
                </div>}
                </Box>}
                <ConfirmKYCModal isOpen={isConfirmKYCModalOpen} close={() => setIsConfirmKYCModalOpen(false)} userDetailsProfile={userDetails.current} handleSubmit={() => navigate("/kyc-capture")}/>
            </Box>
            </Box>
        </Box>
    </>);
};

export default AddDetailsAndKYC;
