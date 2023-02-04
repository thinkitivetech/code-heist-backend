import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { UserRoles } from "./user-model";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    public name: string;
    @IsNotEmpty()
    @IsEmail()
    public email: string;
    @IsNotEmpty()
    @IsNumber()
    public mobileNo: number;
    @IsStrongPassword()
    @IsNotEmpty()
    public password: string;
    @IsString()
    @IsOptional()
    public hashedPassword: string;
    @IsEnum(UserRoles)
    public role: UserRoles
}

export class UserRequestDto {

    @IsOptional()
    public page: number;
    @IsOptional()
    public limit: number;
    @IsString()
    @IsOptional()
    public name: string;
    @IsEmail()
    @IsOptional()
    public email: string;
    @IsNumber()
    @IsOptional()
    public mobileNo: number;

}
