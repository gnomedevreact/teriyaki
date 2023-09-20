import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/PrismaService/prisma.service";
import { ChatDto } from "./dto/chat.dto";

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async getChat(chatId: string) {
    return await this.prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        messages: true,
      },
    });
  }

  async sendMessage(dto: ChatDto, userId: string) {
    await this.prisma.message.create({
      data: {
        to: dto.toId,
        from: userId,
        message: dto.message,
        chat: {
          connect: {
            id: dto.chatId,
          },
        },
      },
    });
  }
}
