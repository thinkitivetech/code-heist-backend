import { JoinColumn, OneToOne } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { ManagerEntity } from './manager.entity';
import { ProfileEntity } from './profile.entity';
import { TeamLeadEntity } from './teamLead.entity';
import { TimeSheetEntity } from './timesheet.entity';
import { EngineerEntity } from './engineer.entity';
import { SalesEntity } from './sales.entity';

@Entity({ name: 'PROJECT' })
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'PROJECT_NAME', length: 500 })
  public projectName: string;

  @Column({ name: 'STATUS' })
  public status: string;

  @Column('simple-json', { name: 'ASSIGNED_TO', nullable: true })
  public assignedToDetails: { manger: string; teamLead: string, engineer: string };

  @Column({ name: 'CLIENT_NAME' })
  public clientName: string;

  @CreateDateColumn({ name: 'CREATED_AT' })
  public createdAt: Date;

  @CreateDateColumn({ name: 'UPDATED_AT' })
  public updatedAt: Date;

  @Column({ name: 'ENGINEER_ID',  nullable: true  })
  public engineerId: number;

  @Column({ name: 'TEAM_LEAD_ID', nullable: true  })
  public teamLeadId: number;

  @Column({ name: 'MANAGER_ID', nullable: true  })
  public managerId: number;

  @ManyToOne(() => ManagerEntity, { nullable: true })
  @JoinColumn({
    name: 'MANAGER_ID',
    referencedColumnName: 'id',
  })
  public manger: ManagerEntity;

  @Column({ name: 'SALES_ID', nullable: true  })
  public salesId: number;

  @Column({ name: 'COMPANY_ID', nullable: true  })
  public companyId: number;

  @ManyToOne(() => SalesEntity, { nullable: true })
  @JoinColumn({
    name: 'SALES_ID',
    referencedColumnName: 'id',
  })
  public sales: SalesEntity;

  @OneToOne(() => TimeSheetEntity, timeSheet => timeSheet.project, {
    cascade: true,
  })
  public timeSheet: TimeSheetEntity;

  @ManyToOne(() => TeamLeadEntity, { nullable: true })
  @JoinColumn({
    name: 'TEAM_LEAD_ID',
    referencedColumnName: 'id',
  })
  public teamLead: TeamLeadEntity;

  @ManyToOne(() => EngineerEntity, { nullable: true })
  @JoinColumn({
    name: 'ENGINEER_ID',
    referencedColumnName: 'id',
  })
  public engineerDetails: EngineerEntity;

  @OneToMany(() => ProfileEntity, profileDetails => profileDetails.project, { cascade: true, eager: true, orphanedRowAction: 'delete' })
  public profileDetails: ProfileEntity[];

}
