import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import { initSentry } from "./util/SentryUtil";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import config from "./cognito/UserPool";
import { AmplifyProvider } from "@aws-amplify/ui-react";

initSentry();

const container = document.getElementById("root")!;
const root = createRoot(container);

//configuring cognito user pool
Amplify.configure(config);

root.render(
  <React.StrictMode>
    <AmplifyProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </AmplifyProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
