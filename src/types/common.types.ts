export type TCodeTitlePair = {
  code: string;
  title: string;
};

export interface IServerResult<T> {
  timestamp: string;
  nameError: string | null;
  textError: string | null;
  apiMethod: string | null;
  result: T;
}

export enum EAppMode {
  NrMode = "nr",
  EnlMode = "enl",
  FtsMode = "fts",
  AdminMode = "users",
}

export enum EMenuGroups {
  Enl = "enl",
  Nr = "nr",
  Fts = "fts",
}

export interface IMenuGroupsValue {
  visible: boolean;
  items: IMenuItem[];
}

export interface IMenuItem {
  title: string;
  path: string;
  image: string;
  isActive: boolean;
}

export type TMenu = Record<EMenuGroups, IMenuGroupsValue>;
