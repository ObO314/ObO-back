import { Entity, ManyToOne } from '@mikro-orm/core';
import { Circles } from './Circles';
import { Users } from './Users';

@Entity()
export class CircleApplication {
  @ManyToOne({
    entity: () => Circles,
    fieldName: 'circle',
    onUpdateIntegrity: 'cascade',
    primary: true,
  })
  circle!: Circles;

  @ManyToOne({
    entity: () => Users,
    fieldName: 'user',
    onUpdateIntegrity: 'cascade',
    primary: true,
  })
  user!: Users;
}
