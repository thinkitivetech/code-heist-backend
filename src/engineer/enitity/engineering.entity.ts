import { TeamLeadEntity } from 'src/team-lead/entity/teamLead.entity';
import { TimeSheetEntity } from 'src/time-sheet/entity/timesheet.entity';
import { ProfileEntity } from 'src/user/entity/profile.entity';
import { ProjectEntity } from 'src/user/entity/project.entity';
import { JoinColumn } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';

@Entity({ name: 'ENGINEER' })
export class EngineeringEntity {
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

    @ManyToOne(() => TeamLeadEntity, { nullable: true })
    @JoinColumn({
        name: 'TEAM_LEAD_ID',
        referencedColumnName: 'id',
    })
    public teamLead: TeamLeadEntity;

    @OneToMany(() => ProfileEntity, profileDetails => profileDetails.engineer , { cascade: true, eager: true, orphanedRowAction: 'delete' })
    public profileDetails: ProfileEntity[];

    @OneToMany(() => TimeSheetEntity, timeSheetDetails => timeSheetDetails.engineer, { cascade: true, eager: true, orphanedRowAction: 'delete' })
    public timeSheetDetails: TimeSheetEntity[];

    @OneToMany(() => ProjectEntity, projectDetails => projectDetails.teamLead, { cascade: true, eager: true, orphanedRowAction: 'delete' })
    public projectDetails: ProjectEntity[];

}
