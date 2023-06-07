import {
  Collection,
  Entity,
  ManyToMany,
  OptionalProps,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { UsersHashtags } from './usersHashtags';

@Entity()
export class Hashtags {
  @PrimaryKey({ columnType: 'int8' })
  hashtagId!: string;

  @Property()
  hashtagName!: string;

  @Property({ columnType: 'int8', defaultRaw: `0` })
  mentions!: string;
}
