import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Users } from './Users';
import { RoutineRecords } from './RoutineRecords';
import { RoutineHistories } from './RoutineHistories';

@Entity()
export class Routines {
  @PrimaryKey({ columnType: 'int8' })
  id!: string;

  @ManyToOne({
    entity: () => Users,
    fieldName: 'user',
    onUpdateIntegrity: 'cascade',
  })
  user!: Users;

  @Property({ length: 50 })
  name!: string;

  @Property({ length: 200 })
  description!: string;

  @OneToMany(() => RoutineRecords, (routineRecords) => routineRecords.routine)
  routineRecords = new Collection<RoutineRecords>(this);

  @OneToMany(
    () => RoutineHistories,
    (routineHistories) => routineHistories.routine,
  )
  routineHistories = new Collection<RoutineHistories>(this);
}
