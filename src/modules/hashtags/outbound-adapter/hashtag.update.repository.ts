import { EntityManager } from '@mikro-orm/knex';
import { Hashtags } from 'src/database/entities/Hashtags';
import {
  HashtagUpdateOutboundPort,
  HashtagUpdateOutboundPortInputDto,
  HashtagUpdateOutboundPortOutputDto,
} from '../outbound-port/hashtag.update.outbound-port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashtagUpdateRepository implements HashtagUpdateOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: HashtagUpdateOutboundPortInputDto,
  ): Promise<HashtagUpdateOutboundPortOutputDto> {
    const updatedHashtag = await this.em.upsert(Hashtags, params);
    await this.em.flush();
    return {
      ...updatedHashtag,
      hashtagId: updatedHashtag.id,
    };
  }
}
