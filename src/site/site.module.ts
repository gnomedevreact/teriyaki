import { Module } from "@nestjs/common";
import { SiteController } from "./site.controller";
import { SiteService } from "./site.service";
import { PrismaService } from "src/PrismaService/prisma.service";

@Module({
  controllers: [SiteController],
  providers: [SiteService, PrismaService],
})
export class SiteModule {}
