import { JoinColumn, OneToOne } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { ManagerEntity } from '../../manager/entity/manager.entity';
import { ProjectEntity } from './project.entity';
import { TimeSheetEntity } from '../../time-sheet/entity/timesheet.entity';
import { EngineeringEntity } from 'src/engineer/enitity/engineering.entity';

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

    @ManyToOne(() => EngineeringEntity, { nullable: true })
    @JoinColumn({
        name: 'ENGINEER_ID',
        referencedColumnName: 'id',
    })
    public engineer: EngineeringEntity;

    @ManyToOne(() => ProjectEntity, { nullable: true })
    @JoinColumn({
        name: 'PROJECT_ID',
        referencedColumnName: 'id',
    })
    public profile: ProjectEntity;

    @OneToOne(() => TimeSheetEntity, timeSheet => timeSheet.profile , {
        cascade: true,
    })
    public timeSheet: TimeSheetEntity;

}
