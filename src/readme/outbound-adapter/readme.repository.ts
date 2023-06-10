import { Injectable } from '@nestjs/common';
import {
  ReadmeReadOutboundPort,
  ReadmeReadOutboundPortInputDto,
  ReadmeReadOutboundPortOutputDto,
} from '../outbound-port/readme.read.outbound-port';
import {
  ReadmeUpdateOutboundPort,
  ReadmeUpdateOutboundPortInputDto,
  ReadmeUpdateOutboundPortOutputDto,
} from '../outbound-port/readme.update.outbound-port';
import { EntityManager } from '@mikro-orm/knex';
import { Users } from 'src/database/entities/Users';
import { Readme } from 'src/database/entities/Readme';
import {
  ReadmeDeleteOutboundPort,
  ReadmeDeleteOutboundPortInputDto,
  ReadmeDeleteOutboundPortOutputDto,
} from '../outbound-port/readme.delete.outbound-port';

@Injectable()
export class ReadmeRepository
  implements
    ReadmeReadOutboundPort,
    ReadmeUpdateOutboundPort,
    ReadmeDeleteOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async read(
    params: ReadmeReadOutboundPortInputDto,
  ): Promise<ReadmeReadOutboundPortOutputDto> {
    //
    const user = await this.em.findOne(Users, params);
    const readme = await this.em.findOne(Readme, { userId: user });

    if (!readme) {
      return {
        // default readme
        title: '작성한 리드미가 없습니다.',
        content: '나를 보여줄 수 있는 리드미를 작성해 주세요!',
      };
    } else {
      return {
        title: readme.title,
        content: readme.content,
      };
    }
  }

  async update(
    params: ReadmeUpdateOutboundPortInputDto,
  ): Promise<ReadmeUpdateOutboundPortOutputDto> {
    const user = await this.em.findOne(Users, { userId: params.userId });

    const editedReadme = {
      userId: user,
      title: params.title,
      content: params.content,
    };
    this.em.upsert(Readme, editedReadme); //upsert는 있으면 업데이트하고 없으면 삽입함.
    this.em.flush();

    return editedReadme;
  }

  async delete(
    params: ReadmeDeleteOutboundPortInputDto,
  ): Promise<ReadmeDeleteOutboundPortOutputDto> {
    const user = await this.em.findOne(Users, { userId: params.userId });

    const toDeleteReadme = await this.em.findOne(Readme, { userId: user });

    await this.em.removeAndFlush(toDeleteReadme);

    return toDeleteReadme;
  }
}