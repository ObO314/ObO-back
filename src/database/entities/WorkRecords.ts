import { Entity, ManyToOne } from '@mikro-orm/core';
import { Circles } from './Circles';
import { Users } from './Users';
import { Works } from './Works';

@Entity()
export class WorkRecords {
  @ManyToOne({ entity: () => Works, fieldName: 'work', primary: true })
  work!: Works;

  @ManyToOne({ entity: () => Users, fieldName: 'user', primary: true })
  user!: Users;

  @ManyToOne({ entity: () => Circles, fieldName: 'circle' })
  circle!: Circles;
}
