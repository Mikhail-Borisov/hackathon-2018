import { Course } from '../models/Course';
import { Lesson } from '../models/Lesson';
import { Material } from '../models/Material';
import { classToPlain } from 'class-transformer';

export class CourseView {
    public static render(course: Course) {
        const courseData = {
            timer: course.timer,
            lessonsCount: course.lessonsCount
        };
        course.lessons = course.lessons.map(CourseView.renderLesson) as any;
        return Object.assign(classToPlain(course), courseData);
    }

    public static renderLesson(lesson: Lesson) {
        const lessonData = {
            materialsCount: lesson.materialsCount,
            timeToRead: lesson.timeToRead
        };
        lesson.materials = lesson.materials.map(CourseView.renderMaterial) as any;
        return Object.assign(classToPlain(lesson), lessonData);
    }

    public static renderMaterial(material: Material) {
        const materialData = {
            timeToRead: material.timeToRead
        };
        return Object.assign(classToPlain(material), materialData);
    }

    
}