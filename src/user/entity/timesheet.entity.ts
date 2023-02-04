import { JoinColumn, OneToOne } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { EngineeringEntity } from './engineering.entity';
import { ManagerEntity } from './manager.entity';
import { ProfileEntity } from './profile.entity';
import { ProjectEntity } from './project.entity';
import { TaskSheetEntity } from './taskTimeSheet.entity';

@Entity({ name: 'TIME_SHEET' })
export class TimeSheetEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'NAME', length: 500 })
    public name: string;

    @Column({ name: 'PROJECTS', length: 500 })
    public projects: string;

    @Column({ name: 'ASSIGNED_TO', length: 500 })
    public assignedTO: string;

    @Column({ name: 'STATUS', length: 500 })
    public status: string;

    @CreateDateColumn({ name: 'CREATED_AT' })
    public createdAt: Date;

    @CreateDateColumn({ name: 'UPDATED_AT' })
    public updatedAt: Date;

    @OneToOne(() => ProjectEntity, project => project.timeSheet)
    public project: ProjectEntity;

    @OneToOne(() => ProfileEntity, profile => profile.timeSheet)
    public profile: ProfileEntity;

    @ManyToOne(() => EngineeringEntity, { nullable: true })
    @JoinColumn({
        name: 'ENGINEER_ID',
        referencedColumnName: 'id',
    })
    public engineer: EngineeringEntity;

    @OneToMany(() => TaskSheetEntity, taskDetails => taskDetails.timeSheet, { cascade: true, eager: true, orphanedRowAction: 'delete' })
    public taskDetails: TaskSheetEntity[];
}
