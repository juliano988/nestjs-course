import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTagTableName1747073840810 implements MigrationInterface {
  name = 'UpdateTagTableName1747073840810';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "courses_tags_tags" ("coursesId" uuid NOT NULL, "tagsId" uuid NOT NULL, CONSTRAINT "PK_002f62ec2f0a22dc90ee3f25d4b" PRIMARY KEY ("coursesId", "tagsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d8199628c7f99576bdc8737f7a" ON "courses_tags_tags" ("coursesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3a8605a1a1aef4816d6ef49fc5" ON "courses_tags_tags" ("tagsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "tags" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses_tags_tags" ADD CONSTRAINT "FK_d8199628c7f99576bdc8737f7ae" FOREIGN KEY ("coursesId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses_tags_tags" ADD CONSTRAINT "FK_3a8605a1a1aef4816d6ef49fc57" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses_tags_tags" DROP CONSTRAINT "FK_3a8605a1a1aef4816d6ef49fc57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses_tags_tags" DROP CONSTRAINT "FK_d8199628c7f99576bdc8737f7ae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3a8605a1a1aef4816d6ef49fc5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d8199628c7f99576bdc8737f7a"`,
    );
    await queryRunner.query(`DROP TABLE "courses_tags_tags"`);
  }
}
