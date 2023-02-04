import { JoinColumn, OneToOne } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { ManagerEntity } from '../../manager/entity/manager.entity';
import { ProfileEntity } from '../../user/entity/profile.entity';
import { TeamLeadEntity } from '../../team-lead/entity/teamLead.entity';
import { TimeSheetEntity } from '../../time-sheet/entity/timesheet.entity';
import { EngineeringEntity } from 'src/engineer/enitity/engineering.entity';

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

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @ManyToOne(() => ManagerEntity, { nullable: true })
  @JoinColumn({
    name: 'MANAGER_ID',
    referencedColumnName: 'id',
  })
  public manger: ManagerEntity;

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

  @ManyToOne(() => EngineeringEntity, { nullable: true })
  @JoinColumn({
    name: 'ENGINEER_ID',
    referencedColumnName: 'id',
  })
  public engineerDetails: EngineeringEntity;

  @OneToMany(() => ProfileEntity, profileDetails => profileDetails.profile, { cascade: true, eager: true, orphanedRowAction: 'delete' })
  public profileDetails: ProfileEntity[];

}
