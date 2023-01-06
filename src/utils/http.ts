import axios, { AxiosRequestConfig } from "axios";
import { appConfig } from "configs/app.config";
import _ from "lodash";
import { IServerResult, TCodeTitlePair } from "types/common.types";

const getApiUrl = (mode: string, isPrototype = false): string => {
  if (isPrototype) {
    return `${appConfig.baseMockApiUrl + mode}.json`;
  }
  return appConfig.baseApiUrl + mode;
};

const createServerResult = <TServerResult>(
  serverResult: IServerResult<TServerResult>
): IServerResult<TServerResult> => ({
  ...serverResult,
});

const createServerResultError = (
  nameError: string,
  textError: string
): IServerResult<undefined> => ({
  timestamp: new Date().toISOString(),
  apiMethod: "",
  result: undefined,
  nameError,
  textError,
});

const http = {
  get<TResult>(
    jwt: string,
    method: string,
    args: TCodeTitlePair[]
  ): Promise<IServerResult<TResult | undefined>> {
    const url = getApiUrl(method); // `http://localhost:5002/api/v1/${method}`
    const requestConfig: AxiosRequestConfig = {
      params: _.fromPairs(args.map((v) => [v.code, v.title])),
      headers: !jwt
        ? {}
        : {
            Authorization: `Bearer ${jwt}`,
          },
    };
    return axios
      .get<IServerResult<TResult>>(`${url}`, requestConfig)
      .then((response) => {
        const { data } = response;
        if (data && !("result" in data)) {
          console.warn(data);
          return createServerResultError(
            "-1",
            "no [result] field in the response"
          );
        }
        if (
          "errorCode" in data &&
          data.nameError !== undefined &&
          data.nameError !== null
        ) {
          console.warn(data);
          return createServerResultError(data.nameError, data.textError ?? "-");
        }
        return createServerResult<TResult>(data);
      })
      .catch((err) => {
        console.warn(err);
        return createServerResultError("-1", err.message);
      });
  },

  post<TResult>(
    jwt: string,
    method: string,
    args: TCodeTitlePair[]
  ): Promise<IServerResult<TResult | undefined>> {
    const url = getApiUrl(method); // `http://localhost:5002/api/v1/${method}`
    const requestConfig: AxiosRequestConfig = {
      headers: !jwt
        ? {}
        : {
            Authorization: `Bearer ${jwt}`,
          },
    };
    return axios
      .post<IServerResult<TResult>>(
        `${url}`,
        _.fromPairs(args.map((v) => [v.code, v.title])),
        requestConfig
      )
      .then((response) => {
        const { data } = response;
        if (data && !("result" in data)) {
          console.warn(data);
          return createServerResultError(
            "-1",
            "no [result] field in the response"
          );
        }
        if (
          "errorCode" in data &&
          data.nameError !== undefined &&
          data.nameError !== null
        ) {
          console.warn(data);
          return createServerResultError(data.nameError, data.textError ?? "-");
        }
        return createServerResult<TResult>(data);
      })
      .catch((err) => {
        console.warn(err);
        return createServerResultError("-1", err.message);
      });
  },

  upload(
    jwt: string,
    method: string,
    formData: FormData
  ): Promise<IServerResult<string | undefined>> {
    const url = getApiUrl(method); // `http://localhost:5002/api/v1/${method}`
    const requestConfig: AxiosRequestConfig = {
      headers: !jwt
        ? {}
        : {
            Authorization: `Bearer ${jwt}`,
          },
    };
    return axios
      .post<IServerResult<string>>(`${url}`, formData, requestConfig)
      .then((response) => {
        const { data } = response;
        if (data && !("result" in data)) {
          console.warn(data);
          return createServerResultError(
            "-1",
            "no [result] field in the response"
          );
        }
        if (
          "errorCode" in data &&
          data.nameError !== undefined &&
          data.nameError !== null
        ) {
          console.warn(data);
          return createServerResultError(data.nameError, data.textError ?? "-");
        }
        return createServerResult<string>(data);
      })
      .catch((err) => {
        console.warn(err);
        return createServerResultError("-1", err.message);
      });
  },

  download(jwt: string, method: string): Promise<Blob | undefined> {
    const url = getApiUrl(method); // `http://localhost:5002/api/v1/${method}`
    const requestConfig: AxiosRequestConfig = {
      headers: !jwt
        ? {}
        : {
            Authorization: `Bearer ${jwt}`,
          },
      responseType: "blob",
    };
    return axios
      .get<Blob>(`${url}`, requestConfig)
      .then((response) => {
        if (response.data) {
          return response.data;
        }
        console.warn(response);
        return undefined;
      })
      .catch((err) => {
        console.warn(err);
        return undefined;
      });
  },

  // метод обработки результата с REST-сервиса
  processServerResult<TServerType, TResultType>(
    resultPromise: Promise<IServerResult<TServerType | undefined>>
  ): Promise<TResultType> {
    return resultPromise
      .then((response: IServerResult<TServerType | undefined>): TResultType => {
        if (response.nameError || !response.result) {
          const err = new Error(
            `${response.nameError} / ${response.textError}`
          );
          console.error(err);
          throw err;
        }
        return response.result as TResultType;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  },
};

export default http;
