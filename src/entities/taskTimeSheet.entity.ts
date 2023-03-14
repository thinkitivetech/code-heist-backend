import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TimeSheetEntity } from "./timesheet.entity";

@Entity({ name: "TASK_SHEET" })
export class TaskSheetEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "TASK", type: "longtext" })
  public task: string;

  @Column({ name: "MINUTES", nullable: true })
  public minutes: number;

  @Column({ name: "NOTES", type: "longtext" })
  public notes: string;

  @Column({ name: "Edited_By", length: 500 })
  public editedBy: string;

  @Column({ name: "PROFILE", length: 500 })
  public profile: string;

  @Column({ name: "STATUS", length: 500 })
  public status: string;

  @CreateDateColumn({ name: "CREATED_AT" })
  public createdAt: Date;

  @CreateDateColumn({ name: "UPDATED_AT" })
  public updatedAt: Date;

  @Column({ name: "TIME_SHEET_ID", nullable: true })
  public timeSheetId: number;

  @ManyToOne(() => TimeSheetEntity, { nullable: true })
  @JoinColumn({
    name: "TIME_SHEET_ID",
    referencedColumnName: "id",
  })
  public timeSheet: TimeSheetEntity;
}
