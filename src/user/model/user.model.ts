import { IsNumber, IsOptional, IsString } from "class-validator";
import { UserRoles } from "../dto/userModel/user-model";

export class UserModel {
  @IsOptional()
  public id: number;

  @IsOptional()
  public name: string;

  @IsOptional()
  public email: string;

  @IsOptional()
  public mobileNo: string;

  @IsOptional()
  public password: string;

  @IsOptional()
  public hashedPassword: string;

  @IsOptional()
  public createdAt: string;

  @IsOptional()
  public role: UserRoles;
}
