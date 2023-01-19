import React from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { ThemeProvider as Emotion10ThemeProvider } from '@emotion/react';
import theme from "../src/assets/Theme/index";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
export const decorators = [
    (Story) => (
      <Emotion10ThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
            <Story />
        </ThemeProvider>
      // </Emotion10ThemeProvider>
    ),
  ];
