import { EntityManager } from '@mikro-orm/knex';
import { UsersHashtags } from 'src/database/entities/usersHashtags';
import {
  HashtagCreateUsersHashTagsOutboundPort,
  HashtagCreateUsersHashTagsOutboundPortInputDto,
  HashtagCreateUsersHashTagsOutboundPortOutputDto,
} from '../outbound-port/hashtag.create-users-hashtags.outbound-port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashtagCreateUsersHashtagsRepository
  implements HashtagCreateUsersHashTagsOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: HashtagCreateUsersHashTagsOutboundPortInputDto,
  ): Promise<HashtagCreateUsersHashTagsOutboundPortOutputDto> {
    const newUserHashtag = this.em.create(UsersHashtags, params);
    await this.em.persistAndFlush(newUserHashtag);
    return newUserHashtag;
  }
}
