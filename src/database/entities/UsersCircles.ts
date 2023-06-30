import { Entity, ManyToOne } from '@mikro-orm/core';
import { CircleRoles } from './CircleRoles';
import { Circles } from './Circles';
import { Users } from './Users';

@Entity()
export class UsersCircles {

  @ManyToOne({ entity: () => Users, fieldName: 'user', onUpdateIntegrity: 'cascade', onDelete: 'cascade', primary: true })
  user!: Users;

  @ManyToOne({ entity: () => Circles, fieldName: 'circle', onUpdateIntegrity: 'cascade', onDelete: 'cascade', primary: true })
  circle!: Circles;

  @ManyToOne({ entity: () => CircleRoles, fieldName: 'role' })
  role!: CircleRoles;

}
