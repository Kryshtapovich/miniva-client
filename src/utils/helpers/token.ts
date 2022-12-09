import decode from 'jwt-decode';

export const isTokenExpired = (token: string) => {
  const { exp } = decode<{ id: number; exp: number }>(token);
  return Date.now() >= exp * 1e3;
};
