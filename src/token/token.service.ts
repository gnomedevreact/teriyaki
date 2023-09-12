import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { generateAccessToken } from "src/utils/generateAccessToken";
import { TokenDto } from "./token.dto";

@Injectable()
export class TokenService {
  async getAccessToken(dto: TokenDto) {
    try {
      jwt.verify(dto.refreshToken, process.env.SECRET_KEY);
    } catch (err) {
      throw new UnauthorizedException();
    }

    const decoded = jwt.decode(dto.refreshToken);

    //@ts-ignore
    const accessToken = generateAccessToken(decoded.userId);

    return accessToken;
  }
}
