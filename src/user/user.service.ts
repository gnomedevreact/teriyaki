import {
  ConflictException,
  Injectable,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { PrismaService } from "src/PrismaService/prisma.service";
import { UserDto } from "./dto/user.dto";
import * as argon2 from "argon2";
import { generateTokens } from "src/utils/generateTokens";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return await this.prisma.user.findMany({
      include: {
        sites: true,
      },
    });
  }

  async getUser(userId: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        sites: true,
      },
    });
  }

  async registerUser(dto: UserDto) {
    const isUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    console.log(isUser);

    if (isUser) throw new ConflictException("User already exists");

    const password = await argon2.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password,
          isAdmin: false,
        },
        include: {
          sites: true,
        },
      });

      const { accessToken, refreshToken } = generateTokens(user.id);

      return { user, accessToken, refreshToken };
    } catch (error) {
      throw new Error(error);
    }
  }

  async loginUser(dto: UserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      include: {
        sites: true,
      },
    });

    if (!user) throw new ConflictException("User doesnt exist");

    const isValidPassword = await argon2.verify(user.password, dto.password);

    if (isValidPassword) {
      const { accessToken, refreshToken } = generateTokens(user.id);

      return { user, accessToken, refreshToken };
    } else {
      throw new HttpException(
        "Password or Email is invalid",
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
