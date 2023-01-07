import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
// import { tool } from "utils/tools";
import "@ff/ui-kit/lib/styles/fns.theme.css";
import PrivateRoute from "components/PrivateRoute";
import Preloader from "components/Preloader";
import { PrivateRoutes } from "routes";
import { TPrivateRouteValue } from "types/routes.types.ts";

const NotFound = React.lazy(() => import("pages/NotFound"));
const Login = React.lazy(() => import("pages/Login"));

const App: React.FC = () => {
  // tool.bodyClassDisable();

  return (
    <Suspense fallback={<Preloader />}>
      <Switch>
        <Route exact path="/login" component={Login} />

        {(Object.values(PrivateRoutes) as TPrivateRouteValue[]).map(
          (privateRoute) => (
            <PrivateRoute
              key={privateRoute.path}
              exact
              path={privateRoute.path}
              component={privateRoute.component}
            />
          )
        )}

        <Route path="*" component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default App;
