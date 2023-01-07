import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Radio from "@ff/ui-kit/lib/Radio";
import { observer } from "mobx-react";
import { EAuthState } from "types/user.types";

import userStore from "stores/userStore";
import appStore from "stores/appStore";
import useLocalStorage from "hooks/useLocalStorage";

type LoginProps = {
  from: string | undefined;
};

const Login: React.FC<LoginProps> = observer((props) => {
  const [username, setUsername] = useLocalStorage("login", "");
  const [password, setPassword] = useState("");
  const [isPrototype, setIsPrototype] = useState(appStore.isPrototype);
  const [dblClickCount, setDblClickCount] = useState(0);

  const fnRadioChange = (event: {
    target: {
      value: React.SetStateAction<string>;
    };
  }) => {
    const proto = event.target.value === "proto";
    appStore.isPrototype = proto;
    setIsPrototype(proto);
  };

  if (userStore.authState === EAuthState.Login) {
    return (
      <Redirect
        to={{
          pathname: props.from ?? "/",
        }}
      />
    );
  }
  return (
    <>
      <div className="screen-wrapper template-authorization">
        <div className="template-authorization__wrapper">
          <div className="template-authorization__left-block">
            <div className="template-authorization__grid-block flex-column justify-content-center">
              <h1 className="template-authorization__title">
                Налоговые льготы
              </h1>
              <div className="template-authorization__subtitle mt-3">
                Версия {appStore.version}
              </div>
            </div>
            <div className="template-authorization__grid-block">
              <div className="logo-sys logo-sys_fns">
                <figure className="logo-sys__img mt-2 mb-2">
                  <img src="i/logo.svg" alt="logo" />
                </figure>
                <div className="logo-sys__title">
                  <div className="logo-sys__name">
                    Федеральная
                    <br />
                    налоговая служба
                  </div>
                </div>
              </div>
            </div>
          </div>

          {userStore.authState === EAuthState.None && <></>}
          {userStore.authState === EAuthState.Logout && <></>}

          <div className="template-authorization__right-block">
            <div className="authorization-form">
              <h4 className="text-center">Авторизация</h4>
              <form>
                <div className="form-group mt-4">
                  <label className="form-group__label" htmlFor="username">
                    Логин
                  </label>
                  <div className="form-group__wrapper">
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Введите ваш логин"
                      value={username}
                      onDoubleClick={() => setDblClickCount(dblClickCount + 1)}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group mt-4">
                  <label className="form-group__label" htmlFor="password">
                    Пароль
                  </label>
                  <div className="form-group__wrapper">
                    <input
                      id="password"
                      placeholder="Введите ваш пароль"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control"
                    />
                  </div>
                </div>

                <div
                  className="form-group mt-5"
                  style={{ display: dblClickCount > 4 ? "flex" : "none" }}
                >
                  <label className="form-group__label" htmlFor="password">
                    Автономный режим
                  </label>
                  <div style={{ padding: "16px", marginTop: "-21px" }}>
                    <Radio
                      label="Да"
                      name="radio"
                      value="proto"
                      checked={isPrototype}
                      onChange={fnRadioChange}
                    />
                  </div>
                  <div style={{ padding: "16px", marginTop: "-21px" }}>
                    <Radio
                      label="Нет"
                      name="radio"
                      value="api"
                      checked={!isPrototype}
                      onChange={fnRadioChange}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  {userStore.authError && (
                    <div style={{ color: "red" }} className="alert-warning">
                      {userStore.authError}
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <button
                    className="btn btn_large btn_primary w-100"
                    type="button"
                    disabled={username.length === 0 || password.length === 0}
                    onClick={() => userStore.userLogin(username, password)}
                  >
                    Авторизоваться
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Login;
