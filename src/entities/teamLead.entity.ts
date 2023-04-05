import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EngineerEntity } from "./engineer.entity";
import { ManagerEntity } from "./manager.entity";
import { ProjectEntity } from "./project.entity";
import { TimeSheetEntity } from "./timesheet.entity";

@Entity({ name: "TEAM_LEAD" })
export class TeamLeadEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "NAME", length: 500 })
  public name: string;

  @Column({ name: "MOBILE_NO", length: 500 })
  public mobileNo: string;

  @Column({ name: "MAIL", length: 500 })
  public mail: string;

  @CreateDateColumn({ name: "CREATED_AT" })
  public createdAt: Date;

  @CreateDateColumn({ name: "UPDATED_AT" })
  public updatedAt: Date;

  @Column({ name: "MANAGER_ID", nullable: true })
  public managerId: number;

  @ManyToOne(() => ManagerEntity, { nullable: true })
  @JoinColumn({
    name: "MANAGER_ID",
    referencedColumnName: "id",
  })
  public manger: ManagerEntity;

  @OneToMany(() => EngineerEntity, (engineer) => engineer.teamLead, {
    cascade: true,
    eager: true,
    orphanedRowAction: "delete",
  })
  public engineerDetails: EngineerEntity[];

  @OneToMany(() => ProjectEntity, (projectDetails) => projectDetails.teamLead, {
    cascade: true,
    eager: true,
    orphanedRowAction: "delete",
  })
  public projectDetails: ProjectEntity[];

  @OneToMany(
    () => TimeSheetEntity,
    (timeSheetDetails) => timeSheetDetails.teamLead,
    { cascade: true, eager: true, orphanedRowAction: "delete" }
  )
  public timeSheetDetails: TimeSheetEntity[];
}
