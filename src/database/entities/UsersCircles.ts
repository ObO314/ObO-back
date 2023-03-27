import { Entity, ManyToOne } from '@mikro-orm/core';
import { Circles } from './Circles';
import { Users } from './Users';

@Entity()
export class UsersCircles {

  @ManyToOne({ entity: () => Users, fieldName: 'user_id', nullable: true })
  userId?: Users;

  @ManyToOne({ entity: () => Circles, fieldName: 'circle_id', nullable: true })
  circleId?: Circles;

}
