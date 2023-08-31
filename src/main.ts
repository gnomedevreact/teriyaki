import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { AuthGuard } from "./Guards/auth.guard";
import { PrismaService } from "./PrismaService/prisma.service";

dotenv.config();

async function bootstrap() {
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api");
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  });
  app.useGlobalGuards(new AuthGuard(new PrismaService()));
  await app.listen(port);
}
bootstrap();
