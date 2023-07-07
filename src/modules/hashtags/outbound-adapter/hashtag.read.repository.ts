import { EntityManager } from '@mikro-orm/knex';
import { Hashtags } from 'src/database/entities/Hashtags';
import {
  HashtagReadOutboundPort,
  HashtagReadOutboundPortInputDto,
  HashtagReadOutboundPortOutputDto,
} from '../outbound-port/hashtag.read.outbound-port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashtagReadRepository implements HashtagReadOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: HashtagReadOutboundPortInputDto,
  ): Promise<HashtagReadOutboundPortOutputDto> {
    return await this.em.findOne(Hashtags, { hashtagName: params.hashtag });
  }
}
