import React, { useEffect } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { mockAppState } from "./UserTabs/Positions/mocks/PositionRow.mock";
import { Tab, Tabs } from "@mui/material";
import { buttonTabs, tabButton, TABS } from "./UserActivities.style";
import { UA_HEADER } from "./UserActivitiesObjects";
import { Format } from "helpers";
import { fetchAccountInfo } from "redux/actions/User/AccountInfo.ac";
import UserActivities from "./UserActivities";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock("api-server/Api/Futures", () => ({
  ...jest.requireActual("api-server/Api/Futures"),
  openOrdersApi: jest.fn()
}));
jest.mock("react", () => (
  {
    ...jest.requireActual("react"),
    useEffect: jest.fn()
  }
));
const setCurrentView = jest.fn();
const useStateSpy = jest.spyOn(React, "useState");
const currentView = 0;
useStateSpy.mockImplementation(currentView => [currentView, setCurrentView]);

const handleChange = (e) => {
  const attributeValue = e.target.attributes.order.nodeValue;
  e.stopPropagation();
  setCurrentView(Number(attributeValue));
};

describe("Render User Activities Suite", () => {
  // setup
  beforeEach(() => {
    useSelector.mockImplementation(callback => callback(mockAppState));
    useDispatch.mockImplementation(() => () => jest.fn());
  });
  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
  });

  it("activates second tab when clicking on it", async () => {
    render(<Tabs
        TabIndicatorProps={{
          sx: buttonTabs
        }}
        sx={TABS}
        value={currentView}
        onChange={(e) => handleChange(e)}
        aria-label="user-activities"
      >
        {UA_HEADER.map((data, index) => (
          <Tab sx={tabButton} id="userActivitiesTabs" label={Format(data.name)} key={index} order={data.order} />
        ))}
      </Tabs>);
    const tab = screen.getByRole("tab", { name: "Trade History" });
    fireEvent.click(tab);
    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent("Positions(undefined)");
  });

  it("TEST DISPATCH ACTION ON USE_EFFECT", async () => {
    useEffect.mockImplementationOnce(f => f());
    render(<UserActivities />);
    expect(useDispatch(fetchAccountInfo()));
  });
});
