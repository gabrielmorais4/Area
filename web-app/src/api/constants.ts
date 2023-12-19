export const API_URL = (process.env.NEXT_PUBLIC_API_URL as string) + '/api';
export const API_URL_OAUTH =
  (process.env.NEXT_PUBLIC_API_URL as string) + '/oauth';

export type Token = {
  token: string;
};
