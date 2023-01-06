import { action, makeObservable, observable } from "mobx";

import service from "./userStore.service";
import appStore from "../appStore";
import mockService from "./userStore.mockService";
import { EAuthState, ERoleType, IAuthenticationData } from "types/user.types";
import { tools } from "utils/tools";

const storagePrefix = "apiUserStore_";
const storageParams = {
  storageParamUser: `${storagePrefix}user`,
  storageParamAuthData: `${storagePrefix}authData`,
};

const ekpUser: IAuthenticationData = {
  fioUser: "Пользователь ЕКП",
  rankUser: "сотрудник ФНС",
  nickNameUser: "",
  emailUser: "",
  accessToken: "1",
  expiresIn: 36000,
  refreshToken: "2",
  refreshExpiresIn: 1800,
  tokenType: "",
  sessionState: "",
  notBeforePolicy: 0,
  scope: "",
  roles: [ERoleType.Enl, ERoleType.Nr],
};

class UserStore {
  authData: IAuthenticationData | null = null;

  authError: string | undefined;

  authState: EAuthState = tools.isEkp() ? EAuthState.Login : EAuthState.None;

  constructor() {
    makeObservable(this, {
      authData: observable,
      authError: observable,
      authState: observable,
      setAuthData: action,
      setAuthError: action,
      setAuthState: action,
    });
    const authData = localStorage.getItem(storageParams.storageParamAuthData);
    if (authData) {
      try {
        // TODO: VSA: force check auth token by service before acquiring
        this.setAuthData(JSON.parse(authData));
        this.setAuthState(EAuthState.Login);
      } catch {
        this.setAuthData(null);
      }
    }
    if (tools.isEkp()) {
      const data: IAuthenticationData = ekpUser;
      this.setAuthData(data);
    }
  }

  async doAfterAuth<TResult>(
    fn: (authData: IAuthenticationData) => Promise<TResult>,
    defaultValue: TResult
  ): Promise<TResult> {
    return this.checkAndRefreshToken().then((authState: EAuthState) => {
      if (authState !== EAuthState.Login) return Promise.resolve(defaultValue);
      if (!this.authData) return Promise.resolve(defaultValue);
      return fn(this.authData);
    });
  }

  async userLogin(
    login: string,
    password: string
  ): Promise<IAuthenticationData | undefined> {
    this.setAuthState(EAuthState.Pending);
    let servicePromise;
    if (!appStore.isPrototype && appStore.featureFlags.user) {
      servicePromise = service.userLogin(login, password);
    } else {
      servicePromise = mockService.userLogin(login, password);
    }
    return servicePromise
      .then((data) => {
        if (!data) {
          this.setAuthData(null);
          this.setAuthError("Неверные учетные данные");
          return undefined;
        }
        this.setAuthData(data);
        this.setAuthState(EAuthState.Login);
        return data;
      })
      .catch((error) => {
        this.setAuthError(error.message);
        return undefined;
      });
  }

  async userLogout(): Promise<void> {
    const accessToken = this.authData?.accessToken;
    const refreshToken = this.authData?.refreshToken;
    sessionStorage.removeItem("mode");
    if (this.authState !== EAuthState.Login || !accessToken || !refreshToken) {
      return Promise.resolve();
    }
    this.setAuthState(EAuthState.Pending);
    let servicePromise;
    if (!appStore.isPrototype && appStore.featureFlags.user) {
      servicePromise = service.userLogout(accessToken, refreshToken);
    } else {
      servicePromise = mockService.userLogout();
    }
    return servicePromise
      .then(() => {
        this.setAuthState(EAuthState.Logout);
      })
      .catch((error) => {
        this.setAuthError(error.message);
      });
  }

  async checkAndRefreshToken(): Promise<EAuthState> {
    const refreshToken = this.authData?.refreshToken;
    if (this.authState !== EAuthState.Login || !refreshToken) {
      return Promise.resolve(this.authState);
    }
    const expired = false; // TODO: this.user?.jwtExpired
    if (!expired) {
      return Promise.resolve(this.authState);
    }
    this.setAuthState(EAuthState.Pending);
    let servicePromise;
    if (!appStore.isPrototype && appStore.featureFlags.user) {
      servicePromise = service.userRefreshToken(refreshToken);
    } else {
      servicePromise = mockService.userRefreshToken();
    }
    return servicePromise
      .then((authData) => {
        this.setAuthData(authData);
        this.setAuthState(EAuthState.Login);
        return Promise.resolve(EAuthState.Login);
      })
      .catch((error) => {
        this.setAuthError(error.message);
        return Promise.resolve(EAuthState.Failed);
      });
  }

  setAuthData(authData: IAuthenticationData | null) {
    if (authData === this.authData) return;
    this.authData = authData;
    if (authData != null) {
      localStorage.setItem(
        storageParams.storageParamAuthData,
        JSON.stringify(authData)
      );
    } else {
      localStorage.setItem(storageParams.storageParamAuthData, "");
    }
  }

  setAuthState(authState: EAuthState) {
    this.authState = authState;
    this.authError = "";
    if (authState === EAuthState.Logout || authState === EAuthState.Failed) {
      this.setAuthData(null);
    }
  }

  setAuthError(error: string) {
    this.setAuthState(EAuthState.Failed);
    this.authError = error;
  }
}

export default new UserStore();
