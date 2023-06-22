import { Entity, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { Users } from './Users';
import { Hashtags } from './Hashtags';

@Entity()
export class UsersHashtags {
  @ManyToOne({
    entity: () => Users,
    fieldName: 'user',
    onUpdateIntegrity: 'cascade',
    primary: true,
  })
  user!: Users;

  @ManyToOne({
    entity: () => Hashtags,
    fieldName: 'hashtag',
    onUpdateIntegrity: 'cascade',
    primary: true,
  })
  hashtag!: Hashtags;
}
