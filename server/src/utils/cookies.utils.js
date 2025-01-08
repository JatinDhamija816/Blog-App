import {
  JWT_ACCESS_TOKEN_EXPIRATION_MS,
  JWT_REFRESH_TOKEN_EXPIRATION_MS,
} from "../config/constants";

export const setAuthCookies = (res, accessToken, refreshToken) => {
  const accessExpiresAt = new Date(
    Date.now() + Number(JWT_ACCESS_TOKEN_EXPIRATION_MS)
  );

  const refreshExpiresAt = new Date(
    Date.now() + Number(JWT_REFRESH_TOKEN_EXPIRATION_MS)
  );

  const isProduction = process.env.NODE_ENV === "production";
  const sameSite = isProduction ? "None" : "Lax";

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    path: "/",
    sameSite: sameSite,
    expires: accessExpiresAt,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    path: "/",
    sameSite: sameSite,
    expires: refreshExpiresAt,
  });
};
