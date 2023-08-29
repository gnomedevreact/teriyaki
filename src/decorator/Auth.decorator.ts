import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

export const Auth = createParamDecorator((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const headers: string = request.headers.authorization;
  const token = headers.split(" ")[1];

  const decoded = jwt.decode(token);

  //@ts-ignore
  const userId = decoded.userId;

  return userId;
});
