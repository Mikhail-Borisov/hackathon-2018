import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Material } from './Material';
import { Course } from './Course';

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public courseId: number;

    @Column()
    public orderNumber: number;

    @Column()
    public title: string;

    @Column()
    public subTitle?: string;

    @Column()
    public promoImageUrl?: string;

    @ManyToOne(() => Course, course => course.lessons)
    public course: Course;

    @OneToMany(() => Material, material => material.lesson, {
        eager: true,
        cascade: ['insert', 'update', 'remove']
    })
    public materials: Material[];

    public get materialsCount(): number {
        return this.materials.length;
    }

    public get timeToRead(): number {
        return this.materials
            .map(material => material.timeToRead)
            .reduce((first, second) => first + second, 0);
    } 
}