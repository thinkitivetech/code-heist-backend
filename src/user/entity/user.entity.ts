import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
