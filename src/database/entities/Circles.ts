import { Collection, Entity, ManyToMany, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { Hashtags } from './Hashtags';
import { Users } from './Users';

@Entity()
export class Circles {

  [OptionalProps]?: 'isOpen' | 'members';

  @PrimaryKey({ columnType: 'int8' })
  id!: string;

  @Property({ length: 20 })
  name!: string;

  @Property({ length: 200, nullable: true })
  description?: string;

  @Property({ length: 255, nullable: true })
  profileImg?: string;

  @ManyToOne({ entity: () => Users, fieldName: 'owner', onUpdateIntegrity: 'cascade', onDelete: 'set null' })
  owner!: Users;

  @Property({ columnType: 'date' })
  creationDate!: string;

  @Property({ nullable: true })
  rules?: string;

  @Property({ default: true })
  isOpen: boolean = true;

  @Property({ columnType: 'int8', defaultRaw: `1` })
  members!: string;

  @ManyToMany({ entity: () => Hashtags, joinColumn: 'circle', inverseJoinColumn: 'hashtag' })
  hashtags = new Collection<Hashtags>(this);

}
