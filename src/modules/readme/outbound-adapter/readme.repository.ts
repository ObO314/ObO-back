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
    const em = this.em;
    const user = em.getReference(Users, params.userId);
    const readme = await this.em.findOne(Readme, { user });

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
    const em = this.em;
    const user = em.getReference(Users, params.userId);
    const editedReadme = {
      user: user,
      title: params.title,
      content: params.content,
    };
    await this.em.upsert(Readme, editedReadme);

    const result = await em.findOne(Readme, {
      user: editedReadme.user,
    });

    return { title: result.title, content: result.content };
  }

  async delete(
    params: ReadmeDeleteOutboundPortInputDto,
  ): Promise<ReadmeDeleteOutboundPortOutputDto> {
    const em = this.em;
    const user = em.getReference(Users, params.userId);
    const toDeleteReadme = await this.em.findOne(Readme, { user });

    await this.em.removeAndFlush(toDeleteReadme);

    return {
      title: toDeleteReadme.title,
      content: toDeleteReadme.content,
    };
  }
}
