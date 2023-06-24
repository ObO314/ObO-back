import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Routines } from './Routines';

@Entity()
export class RoutineHistories {

  @ManyToOne({ entity: () => Routines, fieldName: 'routine', primary: true })
  routine!: Routines;

  @PrimaryKey({ length: 6 })
  updatedTime!: Date;

  @Property({ columnType: 'timetz', length: 6 })
  startTime!: unknown;

  @Property({ columnType: 'timetz', length: 6 })
  endTime!: unknown;

  @Property({ columnType: 'date', nullable: true })
  inactiveDate?: string;

}
