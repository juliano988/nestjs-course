import { DataSource } from 'typeorm';
import { dataSourceOptions } from './database.module';
import { CreateCoursesTable1746798732622 } from 'src/migrations/1746798732622-CreateCoursesTable';
import { CreateTagsTable1746811964429 } from 'src/migrations/1746811964429-CreateTagsTable';
import { CreateCoursesTagsTable1746813453546 } from 'src/migrations/1746813453546-CreateCoursesTagsTable';
import { AddCoursesIdToCoursesTagsTable1746814427774 } from 'src/migrations/1746814427774-AddCoursesIdToCoursesTagsTable';
import { AddTagsIdToCoursesTagsTable1746816156928 } from 'src/migrations/1746816156928-AddTagsIdToCoursesTagsTable';

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1746798732622,
    CreateTagsTable1746811964429,
    CreateCoursesTagsTable1746813453546,
    AddCoursesIdToCoursesTagsTable1746814427774,
    AddTagsIdToCoursesTagsTable1746816156928,
  ],
});
