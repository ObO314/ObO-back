import { Entity, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { Routines } from './Routines';

@Entity()
export class RoutinesCompleted {

  [OptionalProps]?: 'completed';

  @ManyToOne({ entity: () => Routines, fieldName: 'routine_id', primary: true })
  routineId!: Routines;

  @PrimaryKey({ columnType: 'date' })
  date!: string;

  @Property({ default: false })
  completed: boolean = false;

}
