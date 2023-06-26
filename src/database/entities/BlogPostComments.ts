import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { BlogPost } from './BlogPost';
import { Users } from './Users';

@Entity()
export class BlogPostComments {

  @PrimaryKey({ columnType: 'int8' })
  id!: string;

  @ManyToOne({ entity: () => BlogPost, fieldName: 'post', onUpdateIntegrity: 'cascade' })
  post!: BlogPost;

  @ManyToOne({ entity: () => Users, fieldName: 'user', onUpdateIntegrity: 'cascade' })
  user!: Users;

  @Property({ length: 255 })
  comment!: string;

  @Property({ columnType: 'date' })
  date!: string;

  @Property({ length: 6 })
  time!: Date;

}
