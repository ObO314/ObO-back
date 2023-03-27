import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Hashtags {

  [OptionalProps]?: 'mentions';

  @PrimaryKey({ length: 20 })
  hashtag!: string;

  @Property({ columnType: 'int8', defaultRaw: `0` })
  mentions!: string;

}
