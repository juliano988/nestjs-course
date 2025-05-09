import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { Course } from './entities/courses.entity';
import { Tag } from './entities/tags.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll() {
    return await this.courseRepository.find({ relations: { tags: true } });
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: { tags: true },
    });
    if (!course) {
      throw new NotFoundException(`Course id ${id} not found`);
    }
    return course;
  }

  async create(createCourseDTO: CreateCourseDTO) {
    const tags = await Promise.all(
      createCourseDTO.tags.map((tag) => this.preloadTagByName(tag)),
    );
    const course = this.courseRepository.create({
      ...createCourseDTO,
      tags,
    });
    return await this.courseRepository.save(course);
  }

  async update(id: number, updateCourseDTO: UpdateCourseDTO) {
    const tags = updateCourseDTO.tags?.length
      ? await Promise.all(
          updateCourseDTO.tags.map((tag) => this.preloadTagByName(tag)),
        )
      : [];

    const course = await this.courseRepository.preload({
      ...updateCourseDTO,
      tags,
      id,
    });
    if (!course) {
      throw new NotFoundException(`Course id ${id} not found`);
    }
    return await this.courseRepository.save(course);
  }

  async remove(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id },
    });
    if (!course) {
      throw new NotFoundException(`Course id ${id} not found`);
    }
    return this.courseRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { name } });
    if (tag) {
      return tag;
    }
    return this.tagRepository.create({ name });
  }
}
