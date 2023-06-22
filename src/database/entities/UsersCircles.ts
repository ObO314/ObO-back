import { Entity, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { Users } from './Users';
import { Circles } from './Circles';

@Entity()
export class UsersCircles {
  @ManyToOne({
    entity: () => Users,
    fieldName: 'id',
    onUpdateIntegrity: 'cascade',
    primary: true,
  })
  user!: Users;

  @ManyToOne({
    entity: () => Circles,
    fieldName: 'id',
    onUpdateIntegrity: 'cascade',
    primary: true,
  })
  circle!: Circles;
}
