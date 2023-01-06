import React from "react";
import { Route, Switch } from "react-router-dom";
import { tool } from "utils/tools";
import "@ff/ui-kit/lib/styles/fns.theme.css";
import PrivateRoute from "components/PrivateRoute";
import PreloaderSuspense from "components/PreloaderSuspense/PreloaderSuspense";

const NotFound = React.lazy(() => import("components/routes/NotFound"));
const Proto = React.lazy(() => import("components/routes/Proto"));
const PdfReport = React.lazy(() => import("components/routes/PdfReport"));
const Login = React.lazy(() => import("components/routes/Login"));

const App: React.FC = () => {
  tool.bodyClassDisable();

  return (
    <PreloaderSuspense>
      <Switch>
        <PrivateRoute exact path="/p:part" component={Proto} />
        <PrivateRoute exact path="/p:part/:guid" component={Proto} />
        <PrivateRoute
          exact
          path="/p:part/:guid/report/:subpart"
          component={Proto}
        />
        <PrivateRoute
          exact
          path="/p:part/:inn/info/:subpart"
          component={Proto}
        />
        <PrivateRoute exact path="/p:part/:guid/:stage" component={Proto} />
        <PrivateRoute exact path="/report/:guid" component={PdfReport} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/:mode" component={Proto} />
        <PrivateRoute exact path="/" component={Proto} />
        <Route path="*" component={NotFound} />
      </Switch>
    </PreloaderSuspense>
  );
};

export default App;
