import * as jwt from "jsonwebtoken";

export const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};
