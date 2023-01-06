import { ERoleType } from "types/user.types";

import { IAuthenticationData } from "types/user.types";
import http from "utils/http";
import { tools } from "utils/tools";

const service = {
  async userLogin(
    login: string,
    password: string
  ): Promise<IAuthenticationData> {
    const resultPromise = http.post<IAuthenticationData>(
      "",
      "user/auth",
      tools.codeTitlePairsFromObject({
        login,
        password,
      })
    );

    const data = await http.processServerResult<
      IAuthenticationData,
      IAuthenticationData
    >(resultPromise);

    if (!data.roles.length) {
      if (login === "fns") {
        data.roles = [ERoleType.Enl, ERoleType.Nr];
      }
      if (login === "mf") {
        data.roles = [ERoleType.Nr];
      }
      if (login === "fns0") {
        data.roles = [ERoleType.Enl];
      }
      if (login === "mf0" || login === "mf1") {
        data.roles = [ERoleType.EnlReadOnly];
      }
    }
    return data;
  },

  async userLogout(accessToken: string, refreshToken: string): Promise<void> {
    const resultPromise = http.post<void>(
      accessToken,
      "user/logout",
      tools.codeTitlePairsFromObject({
        refreshToken,
      })
    );
    return http.processServerResult(resultPromise);
  },

  async userRefreshToken(jwt: string): Promise<IAuthenticationData> {
    const resultPromise = http.get<IAuthenticationData>(
      jwt,
      "user/refresh",
      []
    );
    return http.processServerResult(resultPromise);
  },
};

export default service;
