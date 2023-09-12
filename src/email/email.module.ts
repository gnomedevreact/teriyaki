import { Module } from "@nestjs/common";
import { EmailController } from "./email.controller";
import { EmailService } from "./email.service";
import { PrismaService } from "src/PrismaService/prisma.service";

@Module({
  controllers: [EmailController],
  providers: [EmailService, PrismaService],
})
export class EmailModule {}
