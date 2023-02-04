import { JoinColumn, OneToOne } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { ManagerEntity } from './manager.entity';
import { ProfileEntity } from './profile.entity';
import { TeamLeadEntity } from './teamLead.entity';
import { TimeSheetEntity } from './timesheet.entity';
import { EngineerEntity } from './engineer.entity';
import { ProjectEntity } from './project.entity';

@Entity({ name: 'SALES' })
export class SalesEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'PROJECT_NAME', length: 500 })
  public salesPersonName: string;

  @Column({ name: 'COMPANY_ID' })
  public companyId: number;

  @OneToMany(() => ProjectEntity, projectDetails => projectDetails.sales, { cascade: true, eager: true, orphanedRowAction: 'delete' })
  public project: ProjectEntity[];

}
