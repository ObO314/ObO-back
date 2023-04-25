import { EntityRepository } from '@mikro-orm/knex';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as StrategyLOCAL } from 'passport-local';
import { Users } from 'src/database/entities/Users';

export class LocalStrategy extends PassportStrategy(StrategyLOCAL) {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: EntityRepository<Users>,
  ) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.find({ email, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
