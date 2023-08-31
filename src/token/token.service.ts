import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { generateAccessToken } from "src/utils/generateAccessToken";
import { TokenDto } from "./token.dto";

@Injectable()
export class TokenService {
  async getAccessToken(dto: TokenDto) {
    const decoded = jwt.decode(dto.refreshToken);

    //@ts-ignore
    const accessToken = generateAccessToken(decoded.userId);

    return accessToken;
  }
}
