import { Entity, ManyToOne } from '@mikro-orm/core';
import { Hashtags } from './Hashtags';
import { Circles } from './Circles';

@Entity()
export class CirclesHashtags {
  @ManyToOne({
    entity: () => Circles,
    fieldName: 'circle',
    onUpdateIntegrity: 'cascade',
    primary: true,
  })
  circle!: Circles;

  @ManyToOne({
    entity: () => Hashtags,
    fieldName: 'hashtag',
    onUpdateIntegrity: 'cascade',
    primary: true,
  })
  hashtag!: Hashtags;
}
