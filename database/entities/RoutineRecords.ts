import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { Routines } from './Routines';
import { Users } from './Users';

@Entity()
export class RoutineRecords {
  @ManyToOne({ entity: () => Routines, fieldName: 'routine', primary: true })
  routine!: Routines;

  @PrimaryKey({ columnType: 'date' })
  date!: string;
}
