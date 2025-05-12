import 'dotenv/config';

import { DataSource, DataSourceOptions } from 'typeorm';
import { CreateCoursesTable1746798732622 } from 'src/migrations/1746798732622-CreateCoursesTable';
import { CreateTagsTable1746811964429 } from 'src/migrations/1746811964429-CreateTagsTable';
import { CreateCoursesTagsTable1746813453546 } from 'src/migrations/1746813453546-CreateCoursesTagsTable';
import { AddCoursesIdToCoursesTagsTable1746814427774 } from 'src/migrations/1746814427774-AddCoursesIdToCoursesTagsTable';
import { AddTagsIdToCoursesTagsTable1746816156928 } from 'src/migrations/1746816156928-AddTagsIdToCoursesTagsTable';
import { UpdateRelationTableName1747073158993 } from 'src/migrations/1747073158993-UpdateRelationTableName';
import { UpdateTagTableName1747073840810 } from 'src/migrations/1747073840810-UpdateTagTableName';
import { Course } from 'src/courses/entities/courses.entity';
import { Tag } from 'src/courses/entities/tags.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Course, Tag],
  synchronize: false,
};

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1746798732622,
    CreateTagsTable1746811964429,
    CreateCoursesTagsTable1746813453546,
    AddCoursesIdToCoursesTagsTable1746814427774,
    AddTagsIdToCoursesTagsTable1746816156928,
    UpdateRelationTableName1747073158993,
    UpdateTagTableName1747073840810,
  ],
});
