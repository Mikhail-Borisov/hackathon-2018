// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity()
// export class Material {
//     @PrimaryGeneratedColumn()
//     public id!: number;

//     @Column()
//     public lessonId: number;

//     @Column()
//     public orderNumber: number;

//     @Column()
//     public title: string;
    
//     @Column()
//     public type: string;

//     @Column()
//     public subTitle?: string;

//     @Column()
//     public content: string;

//     // @ManyToOne(() => Lesson, lesson => lesson.materials)
//     // public lesson: Lesson;

//     // public get timeToRead(): number {
//     //     return readTimeGenerator.generate(this.content);
//     // } 
// }