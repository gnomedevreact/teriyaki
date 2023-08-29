import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import { PrismaService } from "src/PrismaService/prisma.service";
import { Auth } from "src/decorator/Auth.decorator";

@Controller("stripe-webhook")
export class StripeWebhookController {
  private isEmail = false;
  private email = "";

  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(200)
  async handleStripeWebhook(@Body() event): Promise<any> {
    if (!this.isEmail && event.data.object.customer_details.email) {
      this.email = event.data.object.customer_details.email;
    }

    if (this.email) {
      this.isEmail = true;
    }

    if (event.type === "payment_intent.succeeded") {
      const user = await this.prisma.user.findUnique({
        where: {
          email: this.email,
        },
      });
      await this.prisma.site.create({
        data: {
          price: event.data.object.amount,
          tariff: "Start",
          userId: user.id,
        },
      });
    } else if (event.type === "payment_intent.payment_failed") {
    }

    return { received: true };
  }
}
