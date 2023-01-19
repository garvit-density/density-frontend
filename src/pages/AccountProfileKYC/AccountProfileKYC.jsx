import * as React from "react";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PersonalInfo from "./AccountTabs/AccountProfile/Personalinfo";
import Account from "./AccountTabs/Accounts/Account";

import { getProfileApi } from "../../frontend-api-service/Api";
import { setProfileDetails } from "../../frontend-BL/redux/actions/User/SetProfile.ac";

import { useDispatch } from "react-redux";

import "./AccountProfileKYC.scss";

export default function LabTabs() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    getProfileApi()
      .then((successResponse) => {
        dispatch(setProfileDetails(successResponse));
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      });
  }, []);

  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const List = [
    { label: "Profile", value: "1" },
    { label: "Bank Account", value: "4" }
  ];

  React.useEffect(() => {
    if (window.localStorage.settingsTabValue) {
      setValue(window.localStorage.settingsTabValue);
      window.localStorage.settingsTabValue = "";
    }
  }, []);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box className="mainTab" sx={{ p: 3 }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" className="TabList">
            {List.map((item) => {
              return <Tab label={item.label} value={item.value} className="Tab" key={item.label} />;
            })}
          </TabList>
        </Box>
        <TabPanel value="1">
          <PersonalInfo />
        </TabPanel>
        <TabPanel value="4">
          <Account />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
