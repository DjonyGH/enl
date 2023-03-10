import { RouteProps } from "react-router-dom";

export type TPrivateRouteValue = {
  exact?: boolean;
  path: string;
  component: React.ComponentType<RouteProps>;
};

export type TPrivateRoutes = Record<string, TPrivateRouteValue>;
