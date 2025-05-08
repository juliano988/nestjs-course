import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './courses.entity';

@Injectable()
export class CoursesService {
  private courses: Array<Course> = [
    {
      id: 1,
      name: 'Curso 1',
      description: 'Descrição do curso 1',
      tags: ['tag1', 'tag2'],
    },
    {
      id: 2,
      name: 'Curso 2',
      description: 'Descrição do curso 2',
      tags: ['tag3', 'tag4'],
    },
    {
      id: 3,
      name: 'Curso 3',
      description: 'Descrição do curso 3',
      tags: ['tag5', 'tag6'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    const course = this.courses.find((course) => {
      return course.id === id;
    });
    if (!course) {
      throw new NotFoundException(`Course id ${id} not found`);
    }
    return course;
  }

  create(createCourseDTO: any) {
    this.courses.push(createCourseDTO);
    return createCourseDTO;
  }

  update(id: number, updateCourseDTO: any) {
    const existingCourse = this.findOne(id);
    if (existingCourse) {
      const index = this.courses.findIndex((course) => {
        return course.id === id;
      });
      this.courses.splice(index, 1, { ...updateCourseDTO, id: id });
    }
  }

  remove(id: number) {
    const existingCourse = this.findOne(id);
    if (existingCourse) {
      const index = this.courses.findIndex((course) => {
        return course.id === id;
      });
      this.courses.splice(index, 1);
    }
  }
}
