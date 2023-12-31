import * as jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string) => {
  const accessToken = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "1m",
  });

  return { accessToken };
};
