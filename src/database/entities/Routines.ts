import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Users } from './Users';

@Entity()
export class Routines {

  @PrimaryKey({ columnType: 'int8' })
  id!: string;

  @ManyToOne({ entity: () => Users, fieldName: 'user', onUpdateIntegrity: 'cascade' })
  user!: Users;

  @Property({ length: 50 })
  name!: string;

  @Property({ length: 200 })
  description!: string;

  @Property({ columnType: 'timetz', length: 6 })
  startTime!: unknown;

  @Property({ columnType: 'timetz', length: 6 })
  endTime!: unknown;

}
