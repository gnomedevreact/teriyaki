import { Auth } from "src/decorator/Auth.decorator";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";
import { Body, Controller, Get, Post } from "@nestjs/common";

@Controller("user")
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.UserService.getAllUsers();
  }

  @Get("account")
  async getUser(@Auth() userId: string) {
    return this.UserService.getUser(userId);
  }

  @Post("register")
  async registerUser(@Body() dto: UserDto) {
    return this.UserService.registerUser(dto);
  }

  @Post("login")
  async loginUser(@Body() dto: UserDto) {
    return this.UserService.loginUser(dto);
  }
}
