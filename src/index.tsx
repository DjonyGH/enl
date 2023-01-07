import "react-app-polyfill/stable";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { HashRouter, BrowserRouter } from "react-router-dom";
import Modal from "react-modal";

import App from "./App";
import { appConfig } from "configs/app.config";

require("dotenv").config();

ReactDOM.render(
  <React.StrictMode>
    {appConfig.publishMode ? (
      <HashRouter>
        <Suspense fallback={<div>Загрузка...</div>}>
          <App />
        </Suspense>
      </HashRouter>
    ) : (
      <BrowserRouter>
        <Suspense fallback={<div>Загрузка...</div>}>
          <App />
        </Suspense>
      </BrowserRouter>
    )}
  </React.StrictMode>,
  document.getElementById("root")
);

Modal.setAppElement("#root");
