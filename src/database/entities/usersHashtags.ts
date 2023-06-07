import { Entity, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { Users } from './Users';
import { Hashtags } from './Hashtags';

@Entity()
export class UsersHashtags {
  @ManyToOne({
    entity: () => Users,
    fieldName: 'user_id',
    onUpdateIntegrity: 'cascade',
    primary: true,
  })
  userId!: Users;

  @ManyToOne({
    entity: () => Hashtags,
    fieldName: 'hashtag_id',
    onUpdateIntegrity: 'cascade',
    primary: true,
  })
  hashtagId!: Hashtags;
}
