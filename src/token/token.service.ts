import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { generateAccessToken } from "src/utils/generateAccessToken";

@Injectable()
export class TokenService {
  async getAccessToken(refreshToken: string) {
    const decoded = jwt.decode(refreshToken);

    //@ts-ignore
    const accessToken = generateAccessToken(decoded.id);

    return { accessToken };
  }
}
