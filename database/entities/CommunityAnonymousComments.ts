import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { CommunityAnonymous } from './CommunityAnonymous';

@Entity()
export class CommunityAnonymousComments {

  @PrimaryKey({ columnType: 'int8' })
  id!: string;

  @ManyToOne({ entity: () => CommunityAnonymous, fieldName: 'anopost', onUpdateIntegrity: 'cascade' })
  anopost!: CommunityAnonymous;

  @Property({ columnType: 'int8' })
  user!: string;

  @Property({ length: 255 })
  comment!: string;

  @Property({ columnType: 'date' })
  date!: string;

  @Property({ length: 6 })
  time!: Date;

}
