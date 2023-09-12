import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import { PrismaService } from "src/PrismaService/prisma.service";

let isEmail = false;
let succeeded = false;
let email = "";
let isRetry = false;

@Controller("stripe-webhook")
export class StripeWebhookController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(200)
  async handleStripeWebhook(@Body() event): Promise<any> {
    console.log(event.data.object.amount);
    if (!isEmail && event.data.object.customer_email) {
      email = event.data.object.customer_email;
      isEmail = true;
    }

    if (!succeeded && event.type === "payment_intent.succeeded") {
      succeeded = true;
    }

    if (isEmail && succeeded && !isRetry) {
      isRetry = true;
      console.log("ok");
      console.log(email);

      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      console.log(user);

      await this.prisma.site.create({
        data: {
          price: 112,
          tariff: "Start",
          userId: user.id,
          active: true,
        },
      });

      email = "";
      succeeded = false;
      isEmail = false;
      isRetry = false;
    } else if (event.type === "payment_intent.payment_failed") {
    }

    return { received: true };
  }
}
