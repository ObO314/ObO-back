import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Circles } from './Circles';
import { Users } from './Users';

@Entity()
export class CommunityRecuitment {

  @PrimaryKey({ columnType: 'int8' })
  recuritmentId!: string;

  @ManyToOne({ entity: () => Users, fieldName: 'user_id', onUpdateIntegrity: 'cascade' })
  userId!: Users;

  @ManyToOne({ entity: () => Circles, fieldName: 'circle_id', onUpdateIntegrity: 'cascade' })
  circleId!: Circles;

  @Property({ length: 255 })
  title!: string;

  @Property({ length: 255 })
  content!: string;

  @Property({ columnType: 'date' })
  date!: string;

  @Property({ length: 6 })
  time!: Date;

}
