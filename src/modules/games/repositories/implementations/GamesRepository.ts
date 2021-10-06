import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const result = await this.repository
      .createQueryBuilder('games').where('games.title ILIKE :title', { title: `%${param}%` }).getMany()
    return result
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const result = await this.repository.query(`select count(*) from games g`); // Complete usando raw query

    return result
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // return await this.repository.createQueryBuilder('games')

    const games = await this.repository.createQueryBuilder('games').innerJoinAndSelect('games.users', 'users').getMany()
    const findUserById = games.filter(item => item.id === id)
    const users = findUserById.map(i => i.users)
    if (!findUserById) {
      throw new Error('erro')
    }
    return users[0]
    // Complete usando query builder
  }
}
