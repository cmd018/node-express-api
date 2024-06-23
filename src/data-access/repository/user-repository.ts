import { Connection, EntityManager } from 'typeorm';
import { getDatabaseConnection } from './get-database-connection';
import User from '../entity/user';
import {
  UserRegistration,
  UserType,
  UserWithOutPassword,
} from '../../schemas/userSchemas';

class UserRepository {
  private connection: Connection;

  private constructor(connection: Connection) {
    this.connection = connection;
  }

  static async build() {
    const asyncConnection = await getDatabaseConnection();
    return new UserRepository(asyncConnection);
  }

  async transaction<T>(
    transactionalFunction: (entityManager: EntityManager) => Promise<T>,
  ) {
    return this.connection.transaction(transactionalFunction);
  }

  async saveUserRegistration(
    userRegistration: UserRegistration,
  ): Promise<number> {
    const user = await this.connection.getRepository(User).save({
      full_name: userRegistration.fullName,
      password: userRegistration.password,
      email: userRegistration.email,
      user_type: userRegistration.userType,
      created_date: new Date(userRegistration.createdDate),
    });

    return user.id;
  }

  async getUserById(userId: number): Promise<UserWithOutPassword | undefined> {
    const user = await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .select()
      .where('user.id = :userId', { userId })
      .getOne();

    if (!user) return undefined;

    return {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      createdDate: user.created_date.toISOString(),
      userType: user.user_type as UserType,
    };
  }
}

export default UserRepository;
