import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { Users } from './Users';

@Entity()
export class Readme {
  @OneToOne({ entity: () => Users, fieldName: 'user_id', primary: true })
  userId!: Users;

  @Property({ nullable: true })
  title!: string;

  @Property({ nullable: true })
  content!: string;
}
