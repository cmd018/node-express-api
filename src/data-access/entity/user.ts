import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

  @Column({ type: 'varchar' })
    full_name: string;

  @Column({ type: 'varchar' })
    password: string;

  @Column({ type: 'varchar' })
    email: string;

  @Column({ type: 'varchar' })
    user_type: string;

  @Column({ type: 'timestamp with time zone' })
    created_date: Date;
}

export default User;
