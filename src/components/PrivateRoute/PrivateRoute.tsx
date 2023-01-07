import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import classNames from "classnames";
import appStore from "stores/appStore";
import userStore from "stores/userStore";
import { EAuthState, ERoleType } from "types/user.types";
import Menu from "components/Menu";
import { observer } from "mobx-react";

interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<RouteProps>;
}

const PrivateRoute: React.FC<IProps> = (props) => {
  const { component: Component, ...rest } = props;

  const { authData } = userStore;

  const enlRole = !!(authData && authData.roles?.includes(ERoleType.Enl));
  const enlReadOnlyRole = !!(
    authData && authData.roles?.includes(ERoleType.EnlReadOnly)
  );
  const nrRole = !!(authData && authData.roles?.includes(ERoleType.Nr));
  const ftsRole = !!(authData && authData.roles?.includes(ERoleType.Fts));
  // const noRole = authData?.roles?.length === 0;
  const adminRole = !!(authData && authData.roles?.includes(ERoleType.Admin));

  const cnMax = appStore.isTableMaximized
    ? classNames("screen-wrapper", "template-common", "template-common_max")
    : classNames("screen-wrapper", "template-common");

  const cnMainMax = appStore.isMenuCollapsed
    ? classNames("template-common__main")
    : classNames("template-common__main", "template-common__main_max");

  return (
    <Route
      {...rest}
      render={(props) =>
        userStore.authState === EAuthState.Login ? (
          <div className={cnMax}>
            <div className="template-common__container">
              <Menu
                enlEnabled={enlRole}
                enlReadOnlyEnabled={enlReadOnlyRole}
                nrEnabled={nrRole}
                ftsEnabled={ftsRole}
                adminEnabled={adminRole}
              />
              <main className={cnMainMax}>{<Component {...props} />}</main>
            </div>
            {/* <RefUpdater isActive={refLoaded} /> */}
          </div>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default observer(PrivateRoute);
