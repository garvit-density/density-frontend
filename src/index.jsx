import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./frontend-BL/redux/store/configureStore";

import { SuperTokensWrapper } from "supertokens-auth-react";
// import configureStore from "./redux/store/configureStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SuperTokensWrapper>
    <Provider store={configureStore}>
      <App />
    </Provider>
  </SuperTokensWrapper>
);
