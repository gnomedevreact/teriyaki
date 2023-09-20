import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatDto } from "./dto/chat.dto";
import { Auth } from "src/decorator/Auth.decorator";

@Controller("chat")
export class ChatController {
  constructor(private readonly ChatService: ChatService) {}

  @Get("get/:id")
  async getChat(@Param("id") id: string) {
    return this.ChatService.getChat(id);
  }

  @Post("message")
  async sendMessage(@Body() dto: ChatDto, @Auth() userId: string) {
    return this.ChatService.sendMessage(dto, userId);
  }
}
