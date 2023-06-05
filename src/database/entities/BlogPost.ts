import { Entity, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { Users } from './Users';

@Entity()
export class BlogPost {

  [OptionalProps]?: 'views';

  @PrimaryKey({ columnType: 'int8' })
  postId!: string;

  @ManyToOne({ entity: () => Users, fieldName: 'user_id', onUpdateIntegrity: 'cascade' })
  userId!: Users;

  @Property({ length: 100 })
  title!: string;

  @Property({ length: 255 })
  content!: string;

  @Property()
  hashtag!: string[];

  @Property({ columnType: 'date' })
  date!: string;

  @Property({ length: 6 })
  time!: Date;

  @Property({ columnType: 'int8', default: '0' })
  views!: string;

}
