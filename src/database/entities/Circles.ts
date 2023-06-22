import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Users } from './Users';

@Entity()
export class Circles {

  @PrimaryKey({ columnType: 'int8' })
  id!: string;

  @Property({ length: 20 })
  name!: string;

  @Property({ length: 200, nullable: true })
  description?: string;

  @Property({ length: 255, nullable: true })
  profileImg?: string;

  @ManyToOne({ entity: () => Users, fieldName: 'owner', onUpdateIntegrity: 'cascade', onDelete: 'set null', nullable: true })
  owner?: Users;

}
