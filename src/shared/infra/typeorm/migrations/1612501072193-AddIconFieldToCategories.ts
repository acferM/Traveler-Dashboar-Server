import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddIconFieldToCategories1612501072193
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'categories',
      new TableColumn({
        name: 'icon',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('categories', 'icon');
  }
}
