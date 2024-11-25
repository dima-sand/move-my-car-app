

export enum CookieNames {
  access_token = 'access_token',
  refresh_token = 'refresh_token',
};

export interface ITokens {
  access_token: string;
  refresh_token: string;
}