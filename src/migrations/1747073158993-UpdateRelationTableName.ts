import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRelationTableName1747073158993
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses_tags_tags" RENAME TO "courses_tags_tag"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses_tags_tag" RENAME TO "courses_tags_tags"`,
    );
  }
}
