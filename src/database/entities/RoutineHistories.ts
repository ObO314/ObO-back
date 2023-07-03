import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Routines } from './Routines';
import { Users } from './Users';

@Entity()
export class RoutineHistories {

  @ManyToOne({ entity: () => Routines, fieldName: 'routine', primary: true })
  routine!: Routines;

  @PrimaryKey({ columnType: 'date' })
  updatedAt!: string;

  @Property({ columnType: 'time', length: 6 })
  startTime!: string;

  @Property({ columnType: 'time', length: 6 })
  endTime!: string;

  @ManyToOne({ entity: () => Users, fieldName: 'user' })
  user!: Users;

  @Property()
  isActive!: boolean;

}
