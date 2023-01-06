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
