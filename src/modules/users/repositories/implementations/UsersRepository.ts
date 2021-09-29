import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined> {

    const user = await this.repository.findOneOrFail(user_id, { relations: ["games"] })
    return user

  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {

    const user = await this.repository.query('select * from users u order by first_name'); // Complete usando raw query
    return user
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const user = await this.repository.query(`SELECT * FROM USERS WHERE FIRST_NAME ILIKE $1 AND LAST_NAME ILIKE $2`, [first_name, last_name]) // Complete usando raw query
    console.log('user', user)
    return user
  }
}
