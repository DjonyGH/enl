export const appConfig = {
  isDefaultMock:
    process.env.REACT_APP_DEFAULT_MOCK === "1" ||
    process.env.REACT_APP_DEFAULT_MOCK === "true" ||
    !process.env.REACT_APP_DEFAULT_MOCK,
  version: process.env.REACT_APP_VERSION,
  mockTimeout: 1000,
  baseUrl: process.env.PUBLIC_URL,
  baseApiUrl:
    process.env.REACT_APP_API_URL ??
    "http://127.0.0.1:8082/enl-api-site-v1/api/",
  baseMockApiUrl: "http://localhost:3000/mocks/",
  publishMode: true,
  exportLimitRowsPerPage: 3000,
};
