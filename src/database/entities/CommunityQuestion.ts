import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Users } from './Users';

@Entity()
export class CommunityQuestion {

  @PrimaryKey({ columnType: 'int8' })
  id!: string;

  @ManyToOne({ entity: () => Users, fieldName: 'user', onUpdateIntegrity: 'cascade' })
  user!: Users;

  @Property({ length: 255 })
  title!: string;

  @Property({ length: 255 })
  content!: string;

  @Property({ columnType: 'date' })
  date!: string;

  @Property({ length: 6 })
  time!: Date;

}
