import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { CommunityRecuitment } from './CommunityRecuitment';
import { Users } from './Users';

@Entity()
export class CommunityRecuitmentComments {

  @PrimaryKey({ columnType: 'int8' })
  id!: string;

  @ManyToOne({ entity: () => Users, fieldName: 'user', onUpdateIntegrity: 'cascade' })
  user!: Users;

  @Property({ length: 255 })
  comment!: string;

  @Property({ columnType: 'date' })
  date!: string;

  @Property({ length: 6 })
  time!: Date;

  @ManyToOne({ entity: () => CommunityRecuitment, fieldName: 'recuitment' })
  recuitment!: CommunityRecuitment;

}
