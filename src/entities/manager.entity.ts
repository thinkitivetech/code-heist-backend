import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { ProjectEntity } from "./project.entity";
import { TeamLeadEntity } from "./teamLead.entity";
import { TimeSheetEntity } from "./timesheet.entity";

@Entity({ name: "MANAGER" })
export class ManagerEntity {
  @PrimaryGeneratedColumn({ name: "ID" })
  public id: number;

  @Column({ name: "NAME", length: 500 })
  public name: string;

  @Column({ name: "MOBILE_NO", length: 500 })
  public mobileNo: string;

  @Column({ name: "MAIL", length: 500 })
  public mail: string;

  @Column({ name: "UPDATED_DETAIL", nullable: true })
  public updatedDetail: string;

  @CreateDateColumn({ name: "CREATED_AT" })
  public createdAt: Date;

  @CreateDateColumn({ name: "UPDATED_AT" })
  public updatedAt: Date;

  @OneToMany(() => ProjectEntity, (project) => project.manger, {
    cascade: true,
    eager: true,
    orphanedRowAction: "delete",
  })
  public projectDetails: ProjectEntity[];

  @OneToMany(() => TeamLeadEntity, (teamLead) => teamLead.manger, {
    cascade: true,
    eager: true,
    orphanedRowAction: "delete",
  })
  public teamLeadDetails: TeamLeadEntity[];

  @OneToMany(
    () => TimeSheetEntity,
    (timeSheetDetails) => timeSheetDetails.manager,
    { cascade: true, eager: true, orphanedRowAction: "delete" }
  )
  public timeSheetDetails: TimeSheetEntity[];
}
