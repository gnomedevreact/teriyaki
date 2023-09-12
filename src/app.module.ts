import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { SiteModule } from "./site/site.module";
import { TokenModule } from "./token/token.module";
import { StripeModule } from "@golevelup/nestjs-stripe";
import { StripeWebhookController } from "./stripe/stripe.controller";
import { PrismaService } from "./PrismaService/prisma.service";
import { EmailModule } from './email/email.module';

@Module({
  imports: [UserModule, SiteModule, TokenModule, EmailModule],
  controllers: [AppController, StripeWebhookController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
