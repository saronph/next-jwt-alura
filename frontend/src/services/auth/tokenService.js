import nookies from "nookies";

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";
const ONE_YEAR = 60 * 60 * 24 * 365;

export const tokenService = {
  save(accessToken, ctx = null) {
    // localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    nookies.set(ctx, ACCESS_TOKEN_KEY, accessToken, {
      maxAge: ONE_YEAR,
      path: "/",
    });
  },
  get(ctx = null) {
    const cookies = nookies.get(ctx);
    return cookies[ACCESS_TOKEN_KEY];
    // return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  delete(ctx = null) {
    // localStorage.removeItem(ACCESS_TOKEN_KEY, accessToken);
    nookies.destroy(ctx, ACCESS_TOKEN_KEY);
  },
};
