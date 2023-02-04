import { EngineerEntity } from 'src/entities/engineer.entity';
import { JoinColumn, OneToOne } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { ProjectEntity } from './project.entity';
import { TaskSheetEntity } from './taskTimeSheet.entity';

@Entity({ name: 'TIME_SHEET' })
export class TimeSheetEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'NAME', length: 500 })
    public name: string;

    @Column({ name: 'PROJECT_DETAIL', length: 500 })
    public projectDetail: string;

    @Column({ name: 'ASSIGNED_TO', length: 500 })
    public assignedTo: string;

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

    @Column({ name: 'ENGINEER_ID', nullable: true })
    public engineerId: number;

    @ManyToOne(() => EngineerEntity, { nullable: true })
    @JoinColumn({
        name: 'ENGINEER_ID',
        referencedColumnName: 'id',
    })
    public engineer: EngineerEntity;

    @OneToMany(() => TaskSheetEntity, taskSheet => taskSheet.timeSheet, { cascade: true, eager: true, orphanedRowAction: 'delete' })
    public taskSheet: TaskSheetEntity[];
}
