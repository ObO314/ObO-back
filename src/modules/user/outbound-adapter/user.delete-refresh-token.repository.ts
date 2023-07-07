import { Injectable } from '@nestjs/common';
import {
  UserDeleteRefreshTokenOutboundPort,
  UserDeleteRefreshTokenOutboundPortInputDto,
  UserDeleteRefreshTokenOutboundPortOutputDto,
} from '../outbound-port/user.delete-refresh-token.outbound-port';
import { EntityManager } from '@mikro-orm/knex';
import { RefreshTokens } from 'src/database/entities/RefreshTokens';

@Injectable()
export class UserDeleteRefreshTokenRepository
  implements UserDeleteRefreshTokenOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: UserDeleteRefreshTokenOutboundPortInputDto,
  ): Promise<UserDeleteRefreshTokenOutboundPortOutputDto> {
    const toDeleteRefreshToken = await this.em.findOne(RefreshTokens, {
      user: params.userId,
    });
    await this.em.removeAndFlush(toDeleteRefreshToken);
    return params;
  }
}
