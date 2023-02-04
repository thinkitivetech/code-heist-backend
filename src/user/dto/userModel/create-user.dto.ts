import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator";

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
