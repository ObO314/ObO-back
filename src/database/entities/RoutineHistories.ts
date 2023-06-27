import { Entity, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { Routines } from './Routines';
import { Users } from './Users';

@Entity()
export class RoutineHistories {

  [OptionalProps]?: 'isActive';

  @ManyToOne({ entity: () => Routines, fieldName: 'routine', primary: true })
  routine!: Routines;

  @PrimaryKey({ columnType: 'date' })
  updatedAt!: string;

  @Property({ columnType: 'timetz', length: 6 })
  startTime!: unknown;

  @Property({ columnType: 'timetz', length: 6 })
  endTime!: unknown;

  @ManyToOne({ entity: () => Users, fieldName: 'user' })
  user!: Users;

  @Property({ default: true })
  isActive: boolean = true;

}
