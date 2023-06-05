import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Users } from './Users';

@Entity()
export class CommunityRecuitmentComments {

  @PrimaryKey({ columnType: 'int8' })
  commentId!: string;

  @ManyToOne({ entity: () => Users, fieldName: 'user_id', onUpdateIntegrity: 'cascade' })
  userId!: Users;

  @Property({ length: 255 })
  comment!: string;

  @Property({ columnType: 'date' })
  date!: string;

  @Property({ length: 6 })
  time!: Date;

}
