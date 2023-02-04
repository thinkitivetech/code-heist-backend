import { JoinColumn, UpdateDateColumn } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { ProjectEntity } from './project.entity';
import { TeamLeadEntity } from './teamLead.entity';
import { TimeSheetEntity } from './timesheet.entity';

@Entity({ name: 'ENGINEER' })
export class EngineerEntity {
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

    @UpdateDateColumn({ name: 'UPDATED_AT' })
    public updatedAt: Date;

    @Column({ name: 'TEAM_LEAD_ID', nullable: true })
    public teamLeadId: number;

    @ManyToOne(() => TeamLeadEntity, { nullable: true })
    @JoinColumn({
        name: 'TEAM_LEAD_ID',
        referencedColumnName: 'id',
    })
    public teamLead: TeamLeadEntity;

    @OneToMany(() => ProfileEntity, profileDetails => profileDetails.engineer, { cascade: true, eager: true, orphanedRowAction: 'delete' })
    public profileDetails: ProfileEntity[];

    @OneToMany(() => TimeSheetEntity, timeSheetDetails => timeSheetDetails.engineer, { cascade: true, eager: true, orphanedRowAction: 'delete' })
    public timeSheetDetails: TimeSheetEntity[];

    @OneToMany(() => ProjectEntity, projectDetails => projectDetails.teamLead, { cascade: true, eager: true, orphanedRowAction: 'delete' })
    public projectDetails: ProjectEntity[];

}
