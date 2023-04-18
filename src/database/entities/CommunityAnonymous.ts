import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Users } from './Users';

@Entity()
export class CommunityAnonymous {

  @PrimaryKey({ columnType: 'int8' })
  anopostId!: string;

  @ManyToOne({ entity: () => Users, fieldName: 'user_id' })
  userId!: Users;

  @Property({ length: 100 })
  title!: string;

  @Property()
  content!: string;

  @Property({ columnType: 'date' })
  date!: string;

  @Property({ length: 6 })
  time!: Date;

}
