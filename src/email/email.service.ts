import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/PrismaService/prisma.service";
import * as nodemailer from "nodemailer";
import { EmailDto } from "./dto/email.dto";

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private prisma: PrismaService) {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "teriyakisites@gmail.com",
        pass: "evdnsshdkhsbarej",
      },
    });
  }

  async sendEmail(dto: EmailDto) {
    const isUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (isUser) throw new ConflictException("User already exists");

    const random = (Math.floor(Math.random() * (210000 - 110000 + 1)) + 110000)
      .toString()
      .split("")
      .reverse()
      .join("");

    try {
      const mailOptions = {
        from: "teriyakisites@gmail.com",
        to: dto.email,
        subject: "Verification Code.",
        text: `Your verification code is ${random}`,
      };

      const info = await this.transporter.sendMail(mailOptions);
      return { email: dto.email, code: random };
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
}
