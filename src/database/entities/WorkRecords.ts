import { Entity, ManyToOne } from '@mikro-orm/core';
import { Circles } from './Circles';
import { Users } from './Users';
import { Works } from './Works';

@Entity()
export class WorkRecords {

  @ManyToOne({ entity: () => Works, fieldName: 'work' })
  work!: Works;

  @ManyToOne({ entity: () => Users, fieldName: 'user' })
  user!: Users;

  @ManyToOne({ entity: () => Circles, fieldName: 'circle' })
  circle!: Circles;

}
