import { IsNumber, IsOptional, IsString } from "class-validator";
import { UserRoles } from "../dto/userModel/user-model";

export class UserModel {
  @IsNumber()
  @IsOptional()
  public id: number;

  @IsString()
  @IsOptional()
  public name: string;

  @IsString()
  @IsOptional()
  public email: string;

  @IsString()
  @IsOptional()
  public mobileNo: string;

  @IsString()
  @IsOptional()
  public password: string;

  @IsString()
  @IsOptional()
  public hashedPassword: string;

  @IsString()
  @IsOptional()
  public createdAt: string;

  @IsString()
  @IsOptional()
  public role: UserRoles;
}
