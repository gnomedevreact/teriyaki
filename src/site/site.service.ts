// site.service.ts

import { Injectable } from "@nestjs/common";
import * as cron from "node-cron";
import { PrismaService } from "src/PrismaService/prisma.service";

@Injectable()
export class SiteService {
  constructor(private prisma: PrismaService) {
    cron.schedule("0 0 * * *", () => {
      this.updateSiteStatus();
    });
  }

  async updateSiteStatus() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const inactiveSites = await this.prisma.site.findMany({
      where: {
        createdAt: {
          lt: oneMonthAgo,
        },
        active: true,
      },
    });

    const updatePromises: Promise<any>[] = [];

    inactiveSites.forEach(async (site) => {
      const updatePromise = this.prisma.site.update({
        where: { id: site.id },
        data: { active: false },
      });

      updatePromises.push(updatePromise);
    });

    const results = await Promise.allSettled(updatePromises);

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`Updated site with ID ${inactiveSites[index].id}`);
      } else {
        console.error(
          `Failed to update site with ID ${inactiveSites[index].id}: ${result.reason}`
        );
      }
    });

    console.log(`Deactivated ${inactiveSites.length} sites.`);
  }
}
