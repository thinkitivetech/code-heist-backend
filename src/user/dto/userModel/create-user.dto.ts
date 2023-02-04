import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { UserRoles } from "./user-model";

export class CreateUserDto {
  @IsNotEmpty()
  public name: string;
  @IsNotEmpty()
  public email: string;
  @IsNotEmpty()
  public mobileNo: number;
  @IsStrongPassword()
  @IsNotEmpty()
  public password: string;
  @IsOptional()
  public hashedPassword: string;
  @IsEnum(UserRoles)
  public role: UserRoles;
}

export class UserRequestDto {
  @IsOptional()
  public page: number;
  @IsOptional()
  public limit: number;
  @IsOptional()
  public name: string;
  @IsOptional()
  public email: string;
  @IsOptional()
  public mobileNo: number;
}
