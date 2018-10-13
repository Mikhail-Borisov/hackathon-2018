import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { Lesson } from './Lesson';
import { SkillTag } from './Tag';
import { User } from '../../../modules/user/models/User';

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public title: string;

    @Column({ default: false })
    public isPublished: boolean;

    @Column()
    public subTitle?: string;

    @Column()
    public description: string;

    @Column()
    public imageUrl?: string;

    @Column()
    public preivewImage?: string;

    @Column()
    public demoVideoUrl?: string;

    @ManyToMany(() => SkillTag, {
        eager: true,
        cascade: ['insert', 'update', 'remove']
    })
    @JoinTable()
    public skillTags: SkillTag[];

    @ManyToMany(() => User, {
        eager: true,
        cascade: ['update']
    })
    @JoinTable()
    public experts: User[];

    @OneToMany(() => Lesson, lesson => lesson.course, {
        eager: true,
        cascade: ['insert', 'update', 'remove']
    })
    public lessons: Lesson[];
 
    public get lessonsCount(): number {
        return this.lessons.length;
    }

    public get timer(): number {
        return this.lessons
            .map(lesson => lesson.timeToRead)
            .reduce((first, second) => first + second, 0);
    } 
}