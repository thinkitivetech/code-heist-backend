import { IsEnum, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";
import userMessages from "../../lib/constant/messages/userMessages";
import { passwordRegex } from "../../lib/constant/regex";
import { UserRoles } from "../../user/dto/userModel/user-model";

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
    public userRole: UserRoles;
}

export class LoginResponse {
    @IsEmail({}, { message: userMessages.invalidEmail })
    public email: string;

    @IsOptional()
    @IsEnum(UserRoles)
    public userRole: UserRoles;

    @IsNumber()
    public userId: number;
}