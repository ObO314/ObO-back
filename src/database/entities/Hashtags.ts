import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Hashtags {

  [OptionalProps]?: 'mentions';

  @PrimaryKey({ columnType: 'int8' })
  id!: string;

  @Property()
  hashtagName!: string;

  @Property({ columnType: 'int8', defaultRaw: `0` })
  mentions!: string;

}
