import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Amplify from "aws-amplify";

Amplify.configure({
  Auth: {
    region: "ap-southeast-2",
    userPoolId: "ap-southeast-2_kg6bP9r0e",
    identityPoolId: "ap-southeast-2:31f460e6-c223-4304-a8ea-37175394ec9d",
    userPoolWebClientId: "4mqrt9fb1m7brrnmlivoj1of7",
    mandatorySignIn: false,
  },
});

const myAppConfig = {
  aws_appsync_graphqlEndpoint:
    "https://wbta2gfyy5dgnfadlm4itzk5za.appsync-api.ap-southeast-2.amazonaws.com/graphql",
  aws_appsync_region: "ap-southeast-2",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
};

Amplify.configure(myAppConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
