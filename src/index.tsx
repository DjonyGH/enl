import 'react-app-polyfill/stable';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';
import { Config } from 'types';

import App from './components/App';

require('dotenv').config();

// [PUBLISH] BrowserRouter -> HashRouter
ReactDOM.render(
  <React.StrictMode>
    {
      Config.appConfig.publishMode
        ? (
          <HashRouter>
            <Suspense fallback={<div>Загрузка...</div>}>
              <App />
            </Suspense>
          </HashRouter>
        )
        : (
          <BrowserRouter>
            <Suspense fallback={<div>Загрузка...</div>}>
              <App />
            </Suspense>
          </BrowserRouter>
        )
    }
  </React.StrictMode>,
  document.getElementById('root'),
);

Modal.setAppElement('#root');
