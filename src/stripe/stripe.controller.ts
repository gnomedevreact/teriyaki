import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import { PrismaService } from "src/PrismaService/prisma.service";

let isEmail = false;
let succeeded = false;
let email = "";
let isRetry = false;
let amount = 0;

@Controller("stripe-webhook")
export class StripeWebhookController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(200)
  async handleStripeWebhook(@Body() event): Promise<any> {
    if (!isEmail && event.data.object.customer_email) {
      email = event.data.object.customer_email;
      isEmail = true;
    }

    if (!amount && event.data.object.amount) {
      amount = event.data.object.amount / 100;
    }

    if (!succeeded && event.type === "payment_intent.succeeded") {
      succeeded = true;
    }

    if (isEmail && succeeded && !isRetry) {
      isRetry = true;

      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          sites: true,
        },
      });

      if (amount > 100) {
        await this.prisma.site.create({
          data: {
            price: amount,
            tariff: amount > 300 ? "Multi-Page" : "Landing",
            userId: user.id,
            active: false,
          },
        });
      } else {
        if (user.sites && user.sites.length > 0) {
          await this.prisma.site.update({
            where: {
              id: user.sites[0].id,
            },
            data: {
              active: true,
            },
          });
        } else {
          await this.prisma.site.create({
            data: {
              price: amount,
              tariff: "Subscription",
              userId: user.id,
              active: true,
            },
          });
        }
      }

      email = "";
      succeeded = false;
      isEmail = false;
      isRetry = false;
      amount = 0;
    } else if (event.type === "payment_intent.payment_failed") {
    }

    return { received: true };
  }
}
