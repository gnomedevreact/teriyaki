import { Controller, Post, Body, HttpCode } from "@nestjs/common";

@Controller("stripe-webhook")
export class StripeWebhookController {
  @Post()
  @HttpCode(200)
  async handleStripeWebhook(@Body() event): Promise<any> {
    // Обработка события от Stripe
    if (event.type === "payment_intent.succeeded") {
      // Обработка успешной оплаты
      console.log("Платеж успешно завершен:");
    } else if (event.type === "payment_intent.payment_failed") {
      // Обработка неуспешной оплаты
      console.log("Платеж неуспешен:");
    }

    return { received: true };
  }
}
