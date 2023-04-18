import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Users } from './Users';

@Entity()
export class Circles {

  @PrimaryKey({ columnType: 'int8' })
  circleId!: string;

  @Property({ length: 20 })
  name!: string;

  @Property({ length: 200, nullable: true })
  description?: string;

  @Property({ nullable: true })
  profileImg?: string;

  @ManyToOne({ entity: () => Users, fieldName: 'owner', nullable: true })
  owner?: Users;

}
