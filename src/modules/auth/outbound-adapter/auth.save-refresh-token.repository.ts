import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/knex';
import { Users } from 'src/database/entities/Users';
import { RefreshTokens } from 'src/database/entities/RefreshTokens';
import {
  AuthSaveRefreshTokenOutboundPort,
  AuthSaveRefreshTokenOutboundPortInputDto,
  AuthSaveRefreshTokenOutboundPortOutputDto,
} from '../outbound-port/auth.save-refresh-token.outbound-port';

@Injectable()
export class AuthSaveRefreshTokenRepository
  implements AuthSaveRefreshTokenOutboundPort
{
  constructor(private readonly em: EntityManager) {}
  async execute(
    params: AuthSaveRefreshTokenOutboundPortInputDto,
  ): Promise<AuthSaveRefreshTokenOutboundPortOutputDto> {
    const newUserToken = this.em.create(RefreshTokens, params);
    await this.em.persistAndFlush(newUserToken);
    return newUserToken;
  }
}
