import { EntityManager } from '@mikro-orm/knex';
import {
  HashtagCreateOutboundPort,
  HashtagCreateOutboundPortInputDto,
  HashtagCreateOutboundPortOutputDto,
} from '../outbound-port/hashtag.create.outbound-port';
import { Hashtags } from 'src/database/entities/Hashtags';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashtagCreateRepository implements HashtagCreateOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: HashtagCreateOutboundPortInputDto,
  ): Promise<HashtagCreateOutboundPortOutputDto> {
    const newHashtag = this.em.create(Hashtags, params);
    await this.em.persistAndFlush(newHashtag);
    return newHashtag;
  }
}
