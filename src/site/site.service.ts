import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/PrismaService/prisma.service";
import { SiteDto } from "./dto/SiteDto";

@Injectable()
export class SiteService {
  constructor(private prisma: PrismaService) {}

  async createSiteObject(dto: SiteDto, userId: string) {
    const siteObject = await this.prisma.site.create({
      data: {
        price: dto.price,
        tariff: dto.tariff,
        userId,
      },
    });
  }
}
