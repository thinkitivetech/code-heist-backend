import { JoinColumn } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { EngineeringEntity } from './engineering.entity';
import { ManagerEntity } from './manager.entity';
import { ProjectEntity } from './project.entity';

@Entity({ name: 'TEAM_LEAD' })
export class TeamLeadEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'NAME', length: 500 })
    public name: string;

    @Column({ name: 'MOBILE_NO', length: 500 })
    public mobileNo: string;

    @Column({ name: 'MAIL', length: 500 })
    public mail: string;

    @CreateDateColumn({ name: 'CREATED_AT' })
    public createdAt: Date;

    @CreateDateColumn({ name: 'UPDATED_AT' })
    public updatedAt: Date;

    @ManyToOne(() => ManagerEntity, { nullable: true })
    @JoinColumn({
        name: 'MANAGER_ID',
        referencedColumnName: 'id',
    })
    public manger: ManagerEntity;

    @OneToMany(() => EngineeringEntity, engineer => engineer.teamLead, { cascade: true, eager: true, orphanedRowAction: 'delete' })
    public engineerDetails: EngineeringEntity[];

    @OneToMany(() => ProjectEntity, projectDetails => projectDetails.teamLead, { cascade: true, eager: true, orphanedRowAction: 'delete' })
    public projectDetails: ProjectEntity[];

}
