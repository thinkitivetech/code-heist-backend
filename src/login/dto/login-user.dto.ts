import { IsEnum, IsOptional, IsString } from "@nestjs/class-validator";
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";
import userMessages from "src/lib/constant/messages/userMessages";
import { passwordRegex } from "src/lib/constant/regex";
import { UserRoles } from "src/user/dto/userModel/user-model";

export class LoginDetails {
    @IsEmail({}, { message: userMessages.invalidEmail })
    public email: string;

    @IsString()
    @IsNotEmpty({ message: userMessages.requiredPassword })
    @MinLength(8, { message: userMessages.invalidPassword })
    @MaxLength(20, { message: userMessages.maxPassword })
    @Matches(passwordRegex, { message: userMessages.invalidPassword })
    public password: string;

    @IsOptional()
    @IsEnum(UserRoles)
    public userRole: UserRoles
}

export class LoginResponse {
    @IsEmail({}, { message: userMessages.invalidEmail })
    public email: string;

    @IsOptional()
    @IsEnum(UserRoles)
    public userRole: UserRoles
}