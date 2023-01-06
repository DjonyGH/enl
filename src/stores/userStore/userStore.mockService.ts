import { tools } from "utils/tools";
import { ERoleType } from "types/user.types";

import authData from "mocks/auth/data.json";
import { IAuthenticationData } from "types/user.types";

const mockService = {
  async userLogin(
    login: string,
    password: string
  ): Promise<IAuthenticationData | undefined> {
    const data: IAuthenticationData = authData;
    if (login === "fns" && password === "nw3B61ku") {
      data.roles = [ERoleType.Enl, ERoleType.Nr, ERoleType.Fts];
      return tools.emulateSleep().then(() => Promise.resolve(data));
    }
    if (login === "mf" && password === "PXGYIM9L") {
      data.roles = [ERoleType.Nr];
      return tools.emulateSleep().then(() => Promise.resolve(data));
    }
    if (login === "fns0" && password === "EvPdisD2") {
      data.roles = [ERoleType.Enl];
      return tools.emulateSleep().then(() => Promise.resolve(data));
    }
    if (login === "mf0" && password === "8ZLP9VF7") {
      data.roles = [ERoleType.EnlReadOnly];
      return tools.emulateSleep().then(() => Promise.resolve(data));
    }
    if (login === "mf1" && password === "YLCCDY15") {
      data.roles = [ERoleType.EnlReadOnly];
      return tools.emulateSleep().then(() => Promise.resolve(data));
    }
    if (login === "admin" && password === "bztNEbvl") {
      data.roles = [ERoleType.Admin];
      return tools.emulateSleep().then(() => Promise.resolve(data));
    }
    return Promise.resolve(undefined);
  },

  async userLogout(): Promise<void> {
    return tools.emulateSleep().then(() => Promise.resolve());
  },

  async userRefreshToken(): Promise<IAuthenticationData> {
    return tools.emulateSleep().then(() => Promise.resolve(authData));
  },
};

export default mockService;
