import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { CommunityAnonymous } from './CommunityAnonymous';

@Entity()
export class CommunityAnonymousComments {

  @PrimaryKey({ columnType: 'int8' })
  commentId!: string;

  @ManyToOne({ entity: () => CommunityAnonymous, fieldName: 'anopost_id' })
  anopostId!: CommunityAnonymous;

  @Property({ columnType: 'int8' })
  userId!: string;

  @Property()
  comment!: string;

  @Property({ columnType: 'date' })
  date!: string;

  @Property({ length: 6 })
  time!: Date;

}
