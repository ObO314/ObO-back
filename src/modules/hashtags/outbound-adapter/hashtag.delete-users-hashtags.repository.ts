import { EntityManager } from '@mikro-orm/knex';
import {
  HashtagDeleteUsersHashtagsOutboundPort,
  HashtagDeleteUsersHashtagsOutboundPortInputDto,
  HashtagDeleteUsersHashtagsOutboundPortOutputDto,
} from '../outbound-port/hashtag.delete-users-hashtags.outbound-port';
import { UsersHashtags } from 'src/database/entities/usersHashtags';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashtagDeleteUsersHashtagsRepository
  implements HashtagDeleteUsersHashtagsOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: HashtagDeleteUsersHashtagsOutboundPortInputDto,
  ): Promise<HashtagDeleteUsersHashtagsOutboundPortOutputDto> {
    const toDeleteUserHashtag = await this.em.findOne(UsersHashtags, params);
    await this.em.removeAndFlush(toDeleteUserHashtag);
    return { hashtagId: toDeleteUserHashtag.hashtag.id };
  }
}
