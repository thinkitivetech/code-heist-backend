import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";

@Entity({ name: "SALES" })
export class SalesEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "PROJECT_NAME", length: 500 })
  public salesPersonName: string;

  @Column({ name: "COMPANY_ID" })
  public companyId: number;

  @OneToMany(() => ProjectEntity, (projectDetails) => projectDetails.sales, {
    cascade: true,
    eager: true,
    orphanedRowAction: "delete",
  })
  public project: ProjectEntity[];
}
