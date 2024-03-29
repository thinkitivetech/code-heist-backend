import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { HttpError } from "routing-controllers";
import { CreateUserDto } from "src/user/dto/userModel/create-user.dto";

@Injectable()
export class SignUpInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const userDetails = context.switchToHttp().getRequest().body;
    await hash(userDetails)
      .then(() => {
        console.log(`Password hashed successfully`);
      })
      .catch((err) => {
        console.log(err);
      });
    return next.handle().pipe();
  }
}

export const hash = (createUserDto: CreateUserDto) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(createUserDto.password, 10, function (err, hash) {
      if (err) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `Unable to hash the password`
        );
      } else {
        resolve(hash);
        createUserDto.hashedPassword = hash;
      }
    });
  });
};
