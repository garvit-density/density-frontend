/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { getProfileApi } from "../../frontend-api-service/Api/Futures";

import { initiateKYCApi } from "../../frontend-api-service/Api/KYCHelpers";

import * as onfidoSdk from "onfido-sdk-ui";
import "./KYCCapture.scss";

function KYCCapture() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const onfidoSdkController = useRef({});

  useEffect(() => {
    const rootElementForOnfidoMount = document.createElement("div");
    rootElementForOnfidoMount.setAttribute("id", "onfidoRoot");
    const rootElement = document.getElementById("root");
    rootElement.appendChild(rootElementForOnfidoMount);

    initiateKYCApi()
      .then((successResponse) => {
        setToken(successResponse.data);
      })
      .catch((errorResponse) => {
        alert(errorResponse);
      });

    getProfileApi()
      .then((successResponse) => {
        if (successResponse.data.user.kyc_status === "pending" || successResponse.data.user.kyc_status === "success") {
          navigate("/");
        }
      })
      .catch((erroResponse) => {
        alert(erroResponse);
      });
    return () => {
      onfidoSdkController.current.tearDown();
    };
  }, []);

  useEffect(() => {
    if (token) {
      onfidoSdkController.current = onfidoSdk.init({
        token: token.sdkToken,
        containerId: "onfidoRoot",
        workflowRunId: token.workflowRunId,
        onComplete: () => {
          window.localStorage.isSuccessKYCModalOpen = true;
          navigate("/update-account-details-kyc-initiate");
        },
        onError: () => navigate("/update-account-details-kyc-initiate"),
        onUserExit: () => navigate("/update-account-details-kyc-initiate"),
        onModalRequestClose: () => navigate("/update-account-details-kyc-initiate"),
        language: {
          locale: "en_US",
          phrases: {
            doc_select: { button_passport: "PAN Card", button_id: "Aadhar Card" },
            doc_submit: {
              title_id_back: "Submit Aadhar Card (back)",
              title_id_front: "Submit Aadhar Card (front)",
              title_passport: "Submit PAN Card (front)"
            },
            doc_video_capture: {
              header_passport: "While holding your PAN Card, keep the front of the card within the frame"
            },
            photo_upload: {
              body_passport: "Upload PAN Card front from your computer"
            },
            upload_guide: {
              title: "Upload PAN Card front page"
            }
          },
          mobilePhrases: {
            photo_upload: {
              body_passport: "Take a photo of your PAN Card front"
            },
            upload_guide: {
              title: "Proceed to submit PAN Card image"
            }
          }
        }
      });
    }
  }, [token]);

  return <></>;
}

export default KYCCapture;
