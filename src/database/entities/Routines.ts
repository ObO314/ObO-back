import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Users } from './Users';

@Entity()
export class Routines {

  @PrimaryKey({ columnType: 'int8' })
  routineId!: string;

  @ManyToOne({ entity: () => Users, fieldName: 'user_id' })
  userId!: Users;

  @Property({ length: 50 })
  name!: string;

  @Property({ length: 200 })
  description!: string;

  @Property({ length: 6 })
  startTime!: Date;

  @Property({ length: 6 })
  endTime!: Date;

}
