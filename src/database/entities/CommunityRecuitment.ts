import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Circles } from './Circles';
import { Users } from './Users';

@Entity()
export class CommunityRecuitment {

  @PrimaryKey({ columnType: 'int8' })
  recuritmentId!: string;

  @ManyToOne({ entity: () => Users, fieldName: 'user_id' })
  userId!: Users;

  @ManyToOne({ entity: () => Circles, fieldName: 'circle_id' })
  circleId!: Circles;

  @Property()
  title!: string;

  @Property()
  content!: string;

  @Property({ columnType: 'date' })
  date!: string;

  @Property({ length: 6 })
  time!: Date;

}
