export interface IAuthenticationData {
  fioUser: string;
  rankUser: string;
  nickNameUser: string;
  emailUser: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshExpiresIn: number;
  tokenType: string;
  sessionState: string;
  notBeforePolicy: number;
  scope: string;
  roles: number[];
}

export enum ERoleType {
  Enl = 1,
  Nr = 2,
  EnlReadOnly = 3,
  Fts = 4,
  Admin = 5,
}

export enum EAuthState {
  None = 0,
  Pending = 1,
  Failed = 2,
  Login = 3,
  Logout = 4,
}
