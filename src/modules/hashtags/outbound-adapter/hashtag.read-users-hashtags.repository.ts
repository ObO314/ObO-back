import { EntityManager } from '@mikro-orm/knex';
import {
  HashtagReadUsersHashtagsOutboundPort,
  HashtagReadUsersHashtagsOutboundPortInputDto,
  HashtagReadUsersHashtagsOutboundPortOutputDto,
} from '../outbound-port/hashtag.read-users-hashtags.outbound-port';
import { map, pipe, toArray } from '@fxts/core';
import { UsersHashtags } from 'src/database/entities/usersHashtags';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashtagReadUsersHashtagsRepository
  implements HashtagReadUsersHashtagsOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: HashtagReadUsersHashtagsOutboundPortInputDto,
  ): Promise<HashtagReadUsersHashtagsOutboundPortOutputDto> {
    return await pipe(
      params,
      (params) =>
        this.em.find(
          UsersHashtags,
          { user: params.userId },
          { populate: ['hashtag'] },
        ),
      map((userHashtag) => userHashtag.hashtag),
      toArray,
    );
  }
}
