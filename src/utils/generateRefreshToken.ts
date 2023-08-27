import * as jwt from "jsonwebtoken";

export const generateRefreshToken = (userId: string) => {
  const refreshToken = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  return { refreshToken };
};
