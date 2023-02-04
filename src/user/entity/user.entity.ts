import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoles } from '../dto/userModel/user-model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'name', length: 500 , })
  public name: string;

  @Column({ name: 'email'})
  public email: string;

  @Column('int',{ name: 'mobile_no'})
  public mobileNo: number;

  @Column({ name: 'password'})
  public password: string;

  @Column({ name: 'hashedPassword'})
  public hashedPassword: string;

  @Column({name: 'created_at'})
  public createdAt: string

  @Column({ name: 'USER_ROLE', enum: UserRoles})
  public userRole: UserRoles
}
