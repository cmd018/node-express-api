import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class CreateTwSchema1719162045445 implements MigrationInterface {
  // eslint-disable-next-line class-methods-use-this
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = 'password';

    await queryRunner.query(
      `DO $$ BEGIN IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'tw_rw') THEN CREATE ROLE tw_rw WITH LOGIN PASSWORD '${password}' INHERIT; END IF; END $$`,
    );
    await queryRunner.query('GRANT USAGE ON SCHEMA tw TO tw_rw');

    await queryRunner.query(
      `CREATE TABLE tw.user (
          id integer GENERATED ALWAYS AS IDENTITY,
          full_name varchar(100) not null,
          password text not null,
          email text not null,
          user_type varchar(50) not null,
          created_date timestamp with time zone not null,
          PRIMARY KEY(id)
      )`,
    );
    await queryRunner.query(
      'GRANT SELECT, INSERT ON ALL TABLES IN SCHEMA tw TO tw_rw',
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE tw.user');
    await queryRunner.query(
      'REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA tw FROM tw_rw',
    );
    await queryRunner.query('REVOKE USAGE ON SCHEMA tw FROM tw_rw');
    await queryRunner.query('DROP ROLE tw_rw');
  }
}
