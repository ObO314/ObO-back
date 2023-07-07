import { Injectable } from '@nestjs/common';
import {
  ReadmeReadOutboundPort,
  ReadmeReadOutboundPortInputDto,
  ReadmeReadOutboundPortOutputDto,
} from '../outbound-port/readme.read.outbound-port';
import { EntityManager } from '@mikro-orm/knex';
import { Readme } from 'src/database/entities/Readme';

@Injectable()
export class ReadmeReadRepository implements ReadmeReadOutboundPort {
  constructor(private readonly em: EntityManager) {}
  async execute(
    params: ReadmeReadOutboundPortInputDto,
  ): Promise<ReadmeReadOutboundPortOutputDto> {
    const readme = await this.em.findOne(Readme, { user: params.userId });

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
}
