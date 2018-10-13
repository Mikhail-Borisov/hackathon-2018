import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Lesson } from './Lesson';


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
    public demoVideoUrl?: string;

    // @Column()
    // public learnTags: string[];

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