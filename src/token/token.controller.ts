import { TokenDto } from "./token.dto";
import { TokenService } from "./token.service";
import { Body, Controller, Get, Post } from "@nestjs/common";

@Controller("token")
export class TokenController {
  constructor(private readonly TokenService: TokenService) {}

  @Post()
  async getAccessToken(@Body() dto: TokenDto) {
    return this.TokenService.getAccessToken(dto);
  }
}
