import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoles } from '../dto/userModel/user-model';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'name', length: 500, })
  public name: string;

  @Column({ name: 'email' })
  public email: string;

  @Column('int', { name: 'mobileNo' })
  public mobileNo: number;

  @Column({ name: 'hashedPassword' })
  public hashedPassword: string;

  @Column({ name: 'createdAt' })
  public createdAt: Date

  @Column({ name: 'role' })
  public role: string
}