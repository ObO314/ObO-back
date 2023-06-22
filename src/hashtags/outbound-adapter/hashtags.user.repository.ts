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
    // 유저와 해시태그 간의 관계를 만듬
    params: HashtagsUserCreateOutboundPortInputDto,
  ): Promise<HashtagsUserCreateOutboundPortOutputDto> {
    //
    const em = this.em;
    const user = em.getReference(Users, params.userId);
    const hashtagName = params.hashtag.replace(/\s/g, '').toUpperCase();
    const hashtagId =
      (await this.em.findOne(Hashtags, { hashtagName })) ||
      this.em.create(Hashtags, { hashtagName });
    await this.em.persistAndFlush(hashtagId);
    await this.em.upsert(Hashtags, {
      id: hashtagId.id,
      mentions: String(BigInt(hashtagId.mentions) + 1n),
    });

    const userHashtag =
      (await this.em.findOne(UsersHashtags, {
        user: user.id,
        hashtag: hashtagId.id,
      })) || this.em.create(UsersHashtags, { user, hashtag: hashtagId });

    await this.em.persistAndFlush(userHashtag);

    return {
      hashtagId: hashtagId.id,
      hashtagName: hashtagId.hashtagName,
      mentions: hashtagId.mentions,
    };
  }

  async read(
    // 유저와 관계된 해시태그들을 불러옴
    params: HashtagsUserReadOutboundPortInputDto,
  ): Promise<HashtagsUserReadOutboundPortOutputDto> {
    const em = this.em;
    return await pipe(
      params,
      (params) => em.getReference(Users, params.userId),
      (user) => this.em.find(UsersHashtags, { user }),
      (userhashtag) => this.em.populate(userhashtag, ['hashtag']),
      map((userHashtag) => userHashtag.hashtag),
      toArray,
    );
  }

  async delete(
    // 유저와 해시태그의 관계를 삭제함.
    params: HashtagsUserDeleteOutboundPortInputDto,
  ): Promise<HashtagsUserDeleteOutboundPortOutputDto> {
    const em = this.em;
    return await pipe(
      params,
      async (params) => {
        return {
          user: em.getReference(Users, params.userId),
          hashtag: await this.em.findOne(Hashtags, {
            hashtagName: params.hashtag,
          }),
        };
      },
      tap(async (params) => {
        const descHashtag = await this.em.upsert(Hashtags, {
          id: params.hashtag.id,
          mentions: String(BigInt(params.hashtag.mentions) - 1n),
        });
        await this.em.persistAndFlush(descHashtag);
      }),
      async (params) => {
        const rmHashtag = await this.em.findOne(UsersHashtags, { ...params });
        await this.em.removeAndFlush(rmHashtag);
        return { hashtagId: params.hashtag.id };
      },
    );
  }
}
