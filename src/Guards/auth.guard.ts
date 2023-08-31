import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { PrismaService } from "src/PrismaService/prisma.service";

export class AuthGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const headers: string = request.headers.authorization;
    const excludedPaths = [
      "/api/user/register",
      "/api/user/login",
      "/api/token",
      "/api/stripe-webhook",
    ];

    if (excludedPaths.includes(request.path)) {
      return true;
    }

    if (headers && headers.startsWith("Bearer")) {
      const token = headers.split(" ")[1];

      if (!token) throw new UnauthorizedException();

      try {
        const v = jwt.verify(token, process.env.SECRET_KEY);
        console.log(v);
      } catch (err) {
        console.log(err);
        throw new UnauthorizedException();
      }

      const decoded = jwt.decode(token);

      const user = await this.prisma.user.findUnique({
        where: {
          //@ts-ignore
          id: decoded.userId,
        },
      });

      if (user) {
        return true;
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
