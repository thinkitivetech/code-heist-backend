import { CallHandler, ExecutionContext, ForbiddenException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { HttpError, UnauthorizedError } from "routing-controllers";
import { JwtPayload } from "jsonwebtoken";
import { UserRoles } from "src/user/dto/userModel/user-model";


@Injectable()
export class UserRoleValidator implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
        const options = {} as any;

        options.secretOrKey = process.env.JWT_SECRET_KEY;
        const jwtToken = context.switchToHttp().getRequest().headers['authorization'].split('.')[1]
        const payloadBuffer = Buffer.from(jwtToken, 'base64');
        const updatedJwtPayload: JwtPayload = JSON.parse(payloadBuffer.toString()) as JwtPayload;
        if (updatedJwtPayload.userRole !== UserRoles.MANAGER) {
            throw new ForbiddenException(`Following operation is not allowed to user`);
        }
        return next.handle().pipe()
    }
}
