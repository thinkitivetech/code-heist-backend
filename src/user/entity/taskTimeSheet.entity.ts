import { JoinColumn, OneToOne } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { TimeSheetEntity } from './timesheet.entity';

@Entity({ name: 'TASK_SHEET' })
export class TaskSheetEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'TASK', type: 'longtext' })
    public task: string;

    @Column({ name: 'HOURS', length: 500 })
    public hours: string;

    @Column({ name: 'NOTES', type: 'longtext' })
    public notes: string;

    @Column({ name: 'EdITED_BY', length: 500 })
    public editedBy: string;

    @Column({ name: 'PROFILE', length: 500 })
    public profile: string;

    @Column({ name: 'STATUS', length: 500 })
    public status: string;

    @CreateDateColumn({ name: 'CREATED_AT' })
    public createdAt: Date;

    @CreateDateColumn({ name: 'UPDATED_AT' })
    public updatedAt: Date;

    @ManyToOne(() => TimeSheetEntity, { nullable: true })
    @JoinColumn({
        name: 'TIME_SHEET_ID',
        referencedColumnName: 'id',
    })
    public timeSheet: TimeSheetEntity;
}
