import React from "react";
import CustomSnackbar from "components/modals/CustomModals/CustomSnackbar";
// import

export default {
  title: "UI/SnackBar",
  component: CustomSnackbar,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  },
  args: {
    snackbarTitle: "SnackBar",
    snackbarActionName: "Click Me",
    snackbarContext: () => {},
    snackbarType: "success",
    isSnackbarOpen: true,
    handleIsSnackbarOpen: () => {},
    snackbarActionDefault: () => {}
  }
};

const snackBarProps = {
  snackbarTitle: {
    success: "Success",
    fail: "Fail",
    info: "Information",
    warn: "Warning"
  },
  snackbarActionName: "TEST",
  snackbarType: {
    success: "success",
    fail: "failure",
    info: "information",
    warn: "warning"
  },
  isSnackbarOpen: true
};

const SnackBar = (args) => <CustomSnackbar {...args}/>;

export const success = SnackBar.bind({});
success.args = {
  snackbarTitle: snackBarProps.snackbarTitle.success,
  snackbarActionName: snackBarProps.snackbarActionName,
  snackbarType: snackBarProps.snackbarType.success
};

export const fail = SnackBar.bind({});
fail.args = {
  snackbarTitle: snackBarProps.snackbarTitle.fail,
  snackbarActionName: snackBarProps.snackbarActionName,
  snackbarType: snackBarProps.snackbarType.fail
};

export const info = SnackBar.bind({});
info.args = {
  snackbarTitle: snackBarProps.snackbarTitle.info,
  snackbarActionName: snackBarProps.snackbarActionName,
  snackbarType: snackBarProps.snackbarType.info
};

export const warning = SnackBar.bind({});
warning.args = {
  snackbarTitle: snackBarProps.snackbarTitle.warn,
  snackbarActionName: snackBarProps.snackbarActionName,
  snackbarType: snackBarProps.snackbarType.warn
};
