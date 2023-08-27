import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { SiteModule } from "./site/site.module";
import { TokenModule } from "./token/token.module";
import { StripeModule } from "@golevelup/nestjs-stripe";
import { StripeWebhookController } from "./stripe/stripe.controller";

@Module({
  imports: [UserModule, SiteModule, TokenModule],
  controllers: [AppController, StripeWebhookController],
  providers: [AppService],
})
export class AppModule {}
