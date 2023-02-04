import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator";

export class createUserDto {

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
}