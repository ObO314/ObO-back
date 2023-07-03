import { Entity, ManyToOne, OptionalProps } from '@mikro-orm/core';
import { CircleRoles } from './CircleRoles';
import { Circles } from './Circles';
import { Users } from './Users';

@Entity()
export class UsersCircles {

  [OptionalProps]?: 'role';

  @ManyToOne({ entity: () => Users, fieldName: 'user', onUpdateIntegrity: 'cascade', onDelete: 'cascade', primary: true })
  user!: Users;

  @ManyToOne({ entity: () => Circles, fieldName: 'circle', onUpdateIntegrity: 'cascade', onDelete: 'cascade', primary: true })
  circle!: Circles;

  @ManyToOne({ entity: () => CircleRoles, fieldName: 'role', defaultRaw: `3` })
  role!: CircleRoles;

}
