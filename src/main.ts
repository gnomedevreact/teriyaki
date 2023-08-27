import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { AuthGuard } from "./Guards/auth.guard";
import { PrismaService } from "./PrismaService/prisma.service";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api");
  app.useGlobalGuards(new AuthGuard(new PrismaService()));
  await app.listen(5000);
}
bootstrap();
