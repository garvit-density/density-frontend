import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfileApi, getMetaDataApi, postMetaDataApi } from "../../frontend-api-service/Api/Futures";
import { getUserWatchList } from "../../frontend-BL/redux/actions/User/GetWatchList.ac";
import { setProfileDetails } from "../../frontend-BL/redux/actions/User/SetProfile.ac";

function InitializeValuesForRedux() {
  const dispatch = useDispatch();

  useEffect(() => {
    getProfileApi().then((successResponseForFetchProfileFetails) => {
      dispatch(setProfileDetails(successResponseForFetchProfileFetails));
      const userDetails = successResponseForFetchProfileFetails.data.user;
      getMetaDataApi().then((successResponse) => {
        if (successResponse.data.data.isSupportChatEnabled) {
          window.fcWidget.init({
            token: "ae0cd8cb-5669-4691-bcf6-ce6f3408b61c",
            host: "https://density-help.freshchat.com",
            externalId: userDetails.email, // user’s id unique to your system,
            restoreId: successResponse.data.data.restoreId,
            firstName: userDetails.firstName, // user’s first name
            lastName: userDetails.lastName, // user’s last name
            phone: userDetails.mobile_number,
            email: userDetails.email // user’s email address
          });
        }
        window.fcWidget.on("widget:loaded", function (resp) {
          window.fcWidget.open();
        });
      });
    });
    window.fcWidget.on("user:created", function (resp) {
      const restoreIdFromServer = resp.data && resp.data.restoreId;
      if (resp.data.restoreId) {
        getMetaDataApi().then((successResponse) => {
          postMetaDataApi(JSON.stringify({ ...successResponse.data.data, restoreId: restoreIdFromServer }));
        });
      }
    });

    dispatch(getUserWatchList());
  }, []);

  // unneccecary useEffect Call
  // useEffect(() => {
  // }, []);
  return <React.Fragment />;
}
// TODO: Convert into a custom hook
export default InitializeValuesForRedux;
