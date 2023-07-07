import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/knex';
import { Users } from 'src/database/entities/Users';
import { RefreshTokens } from 'src/database/entities/RefreshTokens';
import {
  AuthSaveRefreshTokenOutboundPort,
  AuthSaveRefreshTokenOutboundPortInputDto,
  AuthSaveRefreshTokenOutboundPortOutputDto,
} from '../outbound-port/auth.save-refresh-token.outbound-port';
import {
  AuthFindRefreshTokenOutboundPort,
  AuthFindRefreshTokenOutboundPortInputDto,
  AuthFindRefreshTokenOutboundPortOutputDto,
} from '../outbound-port/auth.find-refresh-token.outbound-port';

@Injectable()
export class AuthFindRefreshTokenRepository
  implements AuthFindRefreshTokenOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: AuthFindRefreshTokenOutboundPortInputDto,
  ): Promise<AuthFindRefreshTokenOutboundPortOutputDto> {
    return await this.em.findOne(RefreshTokens, {
      user: params.userId,
    });
  }
}
