import { JoinColumn, OneToOne } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { TimeSheetEntity } from './timesheet.entity';
import { EngineerEntity } from './engineer.entity';

@Entity({ name: 'PROFILE' })
export class ProfileEntity {
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

    @Column({ name: 'ENGINEER_ID', nullable: true })
    public engineerId: number;

    @Column({ name: 'PROJECT_ID', nullable: true })
    public projectId: number;

    @ManyToOne(() => EngineerEntity, { nullable: true })
    @JoinColumn({
        name: 'ENGINEER_ID',
        referencedColumnName: 'id',
    })
    public engineer: EngineerEntity;

    @ManyToOne(() => ProjectEntity, { nullable: true })
    @JoinColumn({
        name: 'PROJECT_ID',
        referencedColumnName: 'id',
    })
    public project: ProjectEntity;

    @OneToOne(() => TimeSheetEntity, timeSheet => timeSheet.profile, {
        cascade: true,
    })
    public timeSheet: TimeSheetEntity;

}
