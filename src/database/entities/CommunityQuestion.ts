import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Users } from './Users';

@Entity()
export class CommunityQuestion {

  @PrimaryKey({ columnType: 'int8' })
  questionId!: string;

  @ManyToOne({ entity: () => Users, fieldName: 'user_id', onUpdateIntegrity: 'cascade' })
  userId!: Users;

  @Property({ length: 255 })
  title!: string;

  @Property({ length: 255 })
  content!: string;

  @Property({ columnType: 'date' })
  date!: string;

  @Property({ length: 6 })
  time!: Date;

}
