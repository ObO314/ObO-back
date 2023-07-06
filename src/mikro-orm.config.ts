import { Options } from '@mikro-orm/core';
import { Users } from './database/entities/Users';
import { Todos } from './database/entities/Todos';
import { Routines } from './database/entities/Routines';
import { Circles } from './database/entities/Circles';
import { Works } from './database/entities/Works';
import { DailyWorks } from './database/entities/DailyWorks';
import { BlogPost } from './database/entities/BlogPost';
import { BlogPostComments } from './database/entities/BlogPostComments';
import { Hashtags } from './database/entities/Hashtags';
import { CommunityAnonymous } from './database/entities/CommunityAnonymous';
import { CommunityAnonymousComments } from './database/entities/CommunityAnonymousComments';
import { CommunityQuestion } from './database/entities/CommunityQuestion';
import { CommunityQuestionComments } from './database/entities/CommunityQuestionComments';
import { CommunityRecuitment } from './database/entities/CommunityRecuitment';
import { CommunityRecuitmentComments } from './database/entities/CommunityRecuitmentComments';
import { UsersHashtags } from './database/entities/usersHashtags';
import { UsersCircles } from './database/entities/UsersCircles';
import { Readme } from './database/entities/Readme';
import { RefreshTokens } from './database/entities/RefreshTokens';
import { RoutineHistories } from 'src/database/entities/RoutineHistories';
import { RoutineRecords } from 'src/database/entities/RoutineRecords';
import { CircleApplication } from './database/entities/CircleApplication';
import { WorkRecords } from './database/entities/WorkRecords';
import { WorkPriority } from './database/entities/WorkPriority';

export const config: Options = {
  entities: [
    Users,
    UsersHashtags,
    UsersCircles,
    Todos,
    BlogPost,
    BlogPostComments,
    Circles,
    CircleApplication,
    Works,
    WorkRecords,
    WorkPriority,
    CommunityAnonymous,
    CommunityAnonymousComments,
    CommunityQuestion,
    CommunityQuestionComments,
    CommunityRecuitment,
    CommunityRecuitmentComments,
    DailyWorks,
    Hashtags,
    Routines,
    RoutineHistories,
    RoutineRecords,
    Readme,
    RefreshTokens,
  ],
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  type: 'postgresql',
  host: process.env.DB_HOST,
  port: 5432,
  allowGlobalContext: true,

  //autoLoadEntities : true, //이거 키면 entities 에 있는 배열이 비어야 함.
  //synchronize : true,
};

export default config;
