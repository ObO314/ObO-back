import { UsersHashtags } from 'src/database/entities/usersHashtags';
import { EntityManager } from '@mikro-orm/knex';
import {
  HashtagsUserCreateOutboundPort,
  HashtagsUserCreateOutboundPortInputDto,
  HashtagsUserCreateOutboundPortOutputDto,
} from '../outbound-port/hashtags.user-create.outbound-port';
import { Hashtags } from 'src/database/entities/Hashtags';
import { map, pipe, tap, toArray, toAsync } from '@fxts/core';
import { Users } from 'src/database/entities/Users';
import {
  HashtagsUserReadOutboundPort,
  HashtagsUserReadOutboundPortInputDto,
  HashtagsUserReadOutboundPortOutputDto,
} from '../outbound-port/hashtags.user-read.outbound-port';
import {
  HashtagsUserDeleteOutboundPort,
  HashtagsUserDeleteOutboundPortInputDto,
  HashtagsUserDeleteOutboundPortOutputDto,
} from '../outbound-port/hashtags.user-delete.outbound-port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashtagsUserRepository
  implements
    HashtagsUserCreateOutboundPort,
    HashtagsUserReadOutboundPort,
    HashtagsUserDeleteOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async create(
    params: HashtagsUserCreateOutboundPortInputDto,
  ): Promise<HashtagsUserCreateOutboundPortOutputDto> {
    //
    const userId = await this.em.findOne(Users, { userId: params.userId });

    const hashtagId =
      (await this.em.findOne(Hashtags, { hashtagName: params.hashtag })) ||
      this.em.create(Hashtags, { hashtagName: params.hashtag });

    await this.em.persistAndFlush(hashtagId);

    await this.em.upsert(Hashtags, {
      hashtagId: hashtagId.hashtagId,
      mentions: String(BigInt(hashtagId.mentions) + 1n),
    });

    const userHashtag =
      (await this.em.findOne(UsersHashtags, { userId, hashtagId })) ||
      this.em.create(UsersHashtags, { userId, hashtagId });

    await this.em.persistAndFlush(userHashtag);

    return {
      hashtagId: hashtagId.hashtagId,
      hashtagName: hashtagId.hashtagName,
      mentions: hashtagId.mentions,
    };
  }

  async read(
    params: HashtagsUserReadOutboundPortInputDto,
  ): Promise<HashtagsUserReadOutboundPortOutputDto> {
    return {
      hashtags: await pipe(
        params,
        (params) => this.em.findOne(Users, { userId: params.userId }),
        (userId) => this.em.find(UsersHashtags, { userId: userId }),
        (userhashtag) => this.em.populate(userhashtag, ['hashtagId']),
        map((userHashtag) => userHashtag.hashtagId),
        toArray,
      ),
    };
  }

  async delete(
    params: HashtagsUserDeleteOutboundPortInputDto,
  ): Promise<HashtagsUserDeleteOutboundPortOutputDto> {
    return await pipe(
      params,
      async (params) => {
        return {
          userId: await this.em.findOne(Users, { userId: params.userId }),
          hashtagId: await this.em.findOne(Hashtags, {
            hashtagName: params.hashtag,
          }),
        };
      },

      tap(async (params) => {
        const descHashtag = await this.em.upsert(Hashtags, {
          hashtagId: params.hashtagId.hashtagId,
          mentions: String(BigInt(params.hashtagId.mentions) - 1n),
        });
        await this.em.persistAndFlush(descHashtag);
      }),
      async (params) => {
        const rmHashtag = await this.em.findOne(UsersHashtags, { ...params });
        await this.em.removeAndFlush(rmHashtag);
        return params.hashtagId;
      },
    );
  }
}
