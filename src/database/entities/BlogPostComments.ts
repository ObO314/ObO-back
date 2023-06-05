import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { BlogPost } from './BlogPost';
import { Users } from './Users';

@Entity()
export class BlogPostComments {

  @PrimaryKey({ columnType: 'int8' })
  commentId!: string;

  @ManyToOne({ entity: () => BlogPost, fieldName: 'post_id', onUpdateIntegrity: 'cascade' })
  postId!: BlogPost;

  @ManyToOne({ entity: () => Users, fieldName: 'user_id', onUpdateIntegrity: 'cascade' })
  userId!: Users;

  @Property({ length: 255 })
  comment!: string;

  @Property({ columnType: 'date' })
  date!: string;

  @Property({ length: 6 })
  time!: Date;

}
