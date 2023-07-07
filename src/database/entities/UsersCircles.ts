import { Entity, ManyToOne, OptionalProps } from '@mikro-orm/core';
import { CircleGrades } from './CircleGrades';
import { Circles } from './Circles';
import { Users } from './Users';

@Entity()
export class UsersCircles {

  [OptionalProps]?: 'grade';

  @ManyToOne({ entity: () => Users, fieldName: 'user', onUpdateIntegrity: 'cascade', onDelete: 'cascade', primary: true })
  user!: Users;

  @ManyToOne({ entity: () => Circles, fieldName: 'circle', onUpdateIntegrity: 'cascade', onDelete: 'cascade', primary: true })
  circle!: Circles;

  @ManyToOne({ entity: () => CircleGrades, fieldName: 'grade', defaultRaw: `3` })
  grade!: CircleGrades;

}
