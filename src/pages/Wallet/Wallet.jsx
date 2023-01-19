import React, { useState, useEffect } from "react";
import { ToggleContents, ToggleHeader } from "../../components/WalletContent";
import { setProfileDetails } from "../../frontend-BL/redux/actions/User/SetProfile.ac";
import { getProfileApi } from "../../frontend-api-service/Api";
import { useDispatch, useSelector } from "react-redux";
import CustomDialog from "../../components/UI/CustomModals/CustomDialog";
import CustomSnackbar from "../../components/UI/Snackbar/CustomSnackbar";

import PropTypes from "prop-types";
const Wallet = () => {
  const dispatch = useDispatch();
  const [doesErrorExist, setDoesErrorExist] = React.useState(false);
  const globalErrorHandler = useSelector((state) => state.GlobalErrorHandler.errorDirectory);
  const walletScreenRenderBoolean = useSelector((state) => state.walletScreenRender.walletScreenRenderFlag);
  const [kycStatus, setKycstatus] = useState("");
  const [pennydropStatus, setPennydropStatus] = useState("");
  useEffect(() => setDoesErrorExist(true), [globalErrorHandler]);
  useEffect(() => {
    getProfileApi().then((profileDetails) => {
      dispatch(setProfileDetails(profileDetails));
      setKycstatus(profileDetails.data.user.kyc_status);
      setPennydropStatus(profileDetails.data.user.pennydrop_status);
    });
  }, [walletScreenRenderBoolean]);

  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      {globalErrorHandler.map((error) =>
        error.errorUi === "MODAL"
          ? (
          <CustomDialog
            key={error.errorTime}
            isOpenDialog={doesErrorExist}
            handleIsOpenDialog={setDoesErrorExist}
            dialogContent={error.errorMessage}
            dialogActionDefault={error.errorHandlerForReduxStateUpdation}
          />
            )
          : (
          <CustomSnackbar
            key={error.errorTime}
            isSnackbarOpen={doesErrorExist}
            handleIsSnackbarOpen={setDoesErrorExist}
            snackbarTitle={error.errorMessage}
            snackbarActionDefault={error.errorHandlerForReduxStateUpdation}
          />
            )
      )}
      <ToggleHeader kycStatus={kycStatus} pennydropStatus={pennydropStatus} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <ToggleContents currentTab={currentTab} />
    </>
  );
};
Wallet.propTypes = {
  index: PropTypes.number
};

export default Wallet;
