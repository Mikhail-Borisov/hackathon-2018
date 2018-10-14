import '../../bootstrap';
import { initDbContainer } from '../../components/ioc/initDbContainer';
import { getRepository } from 'typeorm';
import { Course } from '../../modules/course/models/Course';
import { plainToClass } from 'class-transformer';
import { Lesson } from '../../modules/course/models/Lesson';
import { Material } from '../../modules/course/models/Material';
const data: Course = require('../../../fixtures/courses');

void initDbContainer().then(async() => {
    const repository = getRepository(Course);
    const course = plainToClass(Course, data);
    course.lessons = data.lessons.map(plainLesson => {
        const lesson = plainToClass(Lesson, plainLesson);
        lesson.materials = lesson.materials.map(plainMaterial => plainToClass(Material, plainMaterial));
        return lesson;
    });
    await repository.save(course);
});