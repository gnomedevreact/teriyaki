import { TokenService } from "./token.service";
import { Body, Controller, Get } from "@nestjs/common";

@Controller("token")
export class TokenController {
  constructor(private readonly TokenService: TokenService) {}

  @Get()
  async getAccessToken(@Body() refreshToken: string) {
    return this.TokenService.getAccessToken(refreshToken);
  }
}
