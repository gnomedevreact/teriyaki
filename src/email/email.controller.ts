import { Body, Controller, Post } from "@nestjs/common";
import { EmailService } from "./email.service";
import { EmailDto } from "./dto/email.dto";

@Controller("email")
export class EmailController {
  constructor(private readonly EmailService: EmailService) {}

  @Post("send")
  async sendEmail(@Body() dto: EmailDto) {
    return this.EmailService.sendEmail(dto);
  }
}
