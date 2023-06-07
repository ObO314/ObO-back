import { Entity, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { Users } from './Users';
import { Circles } from './Circles';

@Entity()
export class UsersCircles {
  @ManyToOne({
    entity: () => Users,
    fieldName: 'user_id',
    onUpdateIntegrity: 'cascade',
    primary: true,
  })
  userId!: Users;

  @ManyToOne({
    entity: () => Circles,
    fieldName: 'ciecle_id',
    onUpdateIntegrity: 'cascade',
    primary: true,
  })
  circleId!: Circles;
}
