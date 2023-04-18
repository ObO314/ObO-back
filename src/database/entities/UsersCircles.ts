// import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
// import { Circles } from './Circles';
// import { Users } from './Users';

// @Entity()
// export class UsersCircles {

//   @ManyToOne({ entity: () => Users, fieldName: 'user_id', nullable: true })
//   userId?: Users;

//   @ManyToOne({ entity: () => Circles, fieldName: 'circle_id', nullable: true })
//   circleId?: Circles;
// }

import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { Users } from './Users';
import { Circles } from './Circles';

@Entity()
export class UsersCircles {
  @PrimaryKey({ type: 'number' })
  user_id!: number;

  @PrimaryKey({ type: 'number' })
  circle_id!: number;

  @ManyToOne(() => Users, { fieldName: 'user_id', nullable: true })
  user?: Users;

  @ManyToOne(() => Circles, { fieldName: 'circle_id', nullable: true })
  circle?: Circles;
}
