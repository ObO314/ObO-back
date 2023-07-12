# OBO - 일정관리 웹 서비스

![ObO profile 34](https://github.com/ObO314/ObO-back/assets/116103097/7e5409e8-1363-417e-b84e-ea3f7d1d5d19)

### `TypeScript` `Nest.js` `FxTs`  `jest` `PostgreSQL` `MikroORM` `AWS(EC2, RDS)`

> **기간**
> 
> - 2023.03~2023.07
> 

> **프로젝트 인원** ( 총 2명 )
> 
> - 프론트엔드 : 1명
> - 백엔드 : 1명 (유의석)

---

* 해당 문서는 백엔드에 대해서만 서술되었습니다. *

* 해당 문서에 첨부된 모든 이미지는 직접 제작한 자료입니다. *

* Notion 으로 더 편하게 보기 => https://uiseok.notion.site/OBO-d6313b5578404684892def01e41dbf45?pvs=4 *

---

## 1. 프로젝트 개요

### 1-1. 소   개

**OBO 프로젝트** : One by One 의 약자로, 하루하루를 계획적으로 보내기 위한 플래너 웹 서비스이다.

### 1-2. 목   표

- **기능적 목표**
    - 많은 클릭과 입력이 필요했던 기존의 플래너와 달리, 단순한 동작으로 하루 계획을 쉽게 작성할 수 있다.
    - 큰 틀 (월간, 주간) 에서 작성한 일정을 모아, 작은 틀 (일일계획)을 상세히 작성하는 형태로 구현한다.
- **기술적 목표**
    - 프로젝트에 아키텍쳐를 적용해 본다.
    - 프로젝트에 함수형 프로그래밍 패러다임을 적용해 본다.
    - 서비스에 적합하고 효율적인 데이터베이스를 설계한다.
    - 테스트 케이스를 활용하여 기능을 검증한다.
    

### 1-3. 프로젝트 요구사항 (요약)

- **User**
    - 일반 회원가입과 소셜 회원가입이 가능해야 한다.
- **Readme**
    - 개인을 소개하는 글을 작성할 수 있다.
    - 개인과 연관된 해시태그를 등록할 수 있다.
- **Todo**
    - 개인의 할 일을 날짜별로 작성 및 조회가 가능해야 한다.
    - 완료여부를 표시할 수 있다.
- **Routine**
    - 반복적인 일과를 등록하여 자동으로 일일계획표에 표시되어야 한다.
    - 날짜 별로 완료여부를 표시할 수 있다.
    - 루틴이 삭제되어도, 이전날짜의 기록은 지워지지 않아야 한다.
- **Circle**
    - 공통적인 업무를 하는 유저들끼리 모여 그룹을 생성한다.
    - 멤버에 등급을 부여하여, 업무의 작성과 삭제 권한을 할당할 수 있다.
- **Work**
    - 서클을 구성한 인원들끼리 업무의 일정과 내용을 공유할 수 있다.
    - 멤버 별로 완료 여부를 표시할 수 있다.
    - 완료한 멤버를 카운트하여 진척도를 표시할 수 있다.
<br/><br/>

## 2. 패러다임과 아키텍쳐

### 2-1. 이전 프로젝트들의 문제점

- **아키텍쳐의 부재**
    - 아키텍쳐의 부재로 인하여, 수정 시 코드가 어느범위까지 영향을 미치는지 직접 넓은 범위를 확인해야 함
    - 코드의 명확한 역할분리와 유지보수성의 향상을 위하여 아키텍쳐의 적용이 필요
- **패러다임의 부재**
    - 코드가 선언형으로 작성될 경우, 다양한 변수가 어디에서 사용되는지 확인해야 하므로 가독성이 떨어짐
    - 매서드가 어떻게 기능을 하는 지 한 눈에 알아보기 어려움
    - 다양한 메서드가 부수효과를 일으키므로, 이를 제어할 수 있는 패러다임이 필요
    - 자연스러운 흐름으로 이해가 가능한 코드형태로 개선이 필요

### 2-2. 함수형 프로그래밍

- **함수형 프로그래밍**
    - 순수함수들을 조합하여, 부수효과를 제어하는 프로그래밍 형태
    - 메서드에 대해 영향을 끼치는 범위를 함수내부로 제한하고, 이런 형태의 함수들을 엮어 역할과 단계가 명확해 지도록 적용함.
- **Fxts**
    - 이터레이터를 활용하여 지연평가를 구현한 함수형 프로그래밍 패러다임의 라이브러리
    - 라이브러리 주요 매서드의 구현을 자세히 연구하여 활용
        - 🔗 [https://velog.io/@uiseok0514/FxTS-reduce](https://velog.io/@uiseok0514/FxTS-reduce)
        - 🔗 [https://velog.io/@uiseok0514/JS-FP](https://velog.io/@uiseok0514/JS-FP)

### 2-3. 헥사고날 아키텍쳐

ObO 프로젝트에서는 아키텍쳐로 ‘포트 앤 어댑터’ 라고 불리는 ‘헥사고날 아키텍쳐’를 적용했다. 이 아키텍쳐를 적용하기 위해 레이어드 아키텍쳐와 비교하고, NestJS에서 구현할 수 있도록 인터페이스를 활용했다.

- **레이어드 아키텍쳐와 헥사고날 아키텍쳐의 비교**
    <img width="1348" alt="스크린샷 2023-07-08 오후 9 00 39" src="https://github.com/ObO314/ObO-back/assets/116103097/e8bfa5d6-d7d7-463a-a115-46ffe09d7657">

    2-3-1) 3-layer 아키텍쳐
    
    - 레이어드 아키텍쳐는 각 계층이 역할 별로 분리되어 있지만, 상위 계층이 하위계층에 매우 의존적이다.
    - nestJS에서는 의존성 주입을 통해 레이어드 아키텍쳐를 구현하는데, 이는 클래스들의 결속을 강하게 만든다.
    
    <img width="1339" alt="스크린샷 2023-07-08 오후 9 00 54" src="https://github.com/ObO314/ObO-back/assets/116103097/fd6ebb5d-ef23-4ffc-a07a-eb88076b43f3">

    2-3-2) 헥사고날 아키텍쳐
    
    - 헥사고날 아키텍쳐는 레이어드 아키텍쳐의 서비스 부분에 해당하는 비즈니스 로직을 중심으로 설계한다.
    - 비즈니스 로직은 포트를 통해 외부와 연결된다. 따라서 각 계층은 결합되어 있지 않기에, 다양한 형태의 외부요소와 연결이 가능하다.
    - 비즈니스로직이 외부계층과 분리되어있고, 의존적이지 않기 때문에 유연한 설계와 유지보수가 용이하다.

- **구현 방법**
  
    <img width="1339" alt="스크린샷 2023-07-08 오후 9 01 03" src="https://github.com/ObO314/ObO-back/assets/116103097/8937adc3-f7d1-47a3-ac8e-04790619ec18">
    
    2-3-3) 인터페이스로 구현한 헥사고날 아키텍쳐
    
    - 헥사고날 아키텍쳐를 nestJS를 통해 구현하려면 위와 같은 형태로 구성할 수 있겠다.
    - 각 계층은 포트에 해당하는 인터페이스를 구현하여 상위계층에 주입된다.
    - 따라서 각 계층은 타 계층을 신경쓸 필요 없이, 자신에게 연결된 인터페이스만 신경쓰면 된다.
    - 추후 비즈니스로직에 연결해야할 DB가 변경된다면, 비즈니스 로직은 그대로 두고 인터페이스를 충족시키는 DB를 연결하면 되는 것이다. 따라서 비즈니스 로직에 더욱 집중할 수 있다.

<br/><br/>

## 3. 데이터베이스 설계

### 3-1. ERD

- **ERD 다이어그램**
  
    ![erd](https://github.com/ObO314/ObO-back/assets/116103097/5eecb651-eb79-421d-8bb6-95463719234a)
  
    3-1-1) ERD 다이어그램. 약 20여개의 테이블이 연결되어 있다. (클릭 시 크게볼 수 있습니다.)
    

### 3-2. 데이터베이스 설계 시 중점사항

- **정규화**
    - 각각의 테이블은 다음과 같이 생성하였다.
        1. 기능별로 기준테이블을 생성. ( Users, Todos, Routines, Circles, Works…)
        2. 기준테이블에서 필요한 모든 컬럼을 나열
            
            예) Routine : 
            
                 id, user, name, updated_at, description, startTime, endTime, is_active, date..
            
        3. 키를 기준으로 각 튜플이 고유할 수 있도록 컬럼들을 분리 (정규화)
            
            예) Routine :
            
            - routine (루틴 자체의 정보)
            : id, user, name, description
            - routine_histories (유저가 루틴을 수정한 기록)
            : routine, updated_at, start_Time, end_Time, is_active
            - routine_records (유저가 루틴을 이행했는지 기록) 
            : routine, date
        4. 인덱싱을 고려하여 필요한 컬럼을 테이블에 추가
            
            예) routine_histories는 routine과 join하면 user를 알 수 있지만, user 별로 정렬되어 있지 않으면 유저로 연관된 데이터들을 찾는데 오래걸린다. 
            따라서 routine_histories에 user를 추가하여 인덱싱을 하고, 쿼리 소요시간을 줄이고자 했다.
            

### 3-3. PostgreSQL 과 MikroORM

- **PostgreSQL**
  
    <img width="1355" alt="스크린샷 2023-07-08 오후 8 58 51" src="https://github.com/ObO314/ObO-back/assets/116103097/69849e50-2d3e-4e0d-bd1b-4444b49a052d">

    - DBMS 의 경험이 풍부하지 않은 상태에서 적합한 RDMS 를 고르는 것은 매우 어려운 일이다. 따라서, 기존에 사용해 본 MongoDB와 같이 JSON 데이터를 완전히 지원하고, 관계형 데이터베이스 형태를 지닌 무료의 PostgreSQL을 선정하게 되었다. ( 그러나 실제로 JSON 데이터를 직접 DBMS에 넣어 사용하는 일은 없었으며, ORM 을 통해 관리하였다. ) 또한 PostgreSQL은 오픈소스 DBMS이므로, 커뮤니티의 도움과 이슈의 빠른해결을 기대할 수 있다는 부분을 참고했다.
    
- **MikroORM**
    
    <img width="1346" alt="스크린샷 2023-07-08 오후 8 59 01" src="https://github.com/ObO314/ObO-back/assets/116103097/d1a42eb5-8c6c-44a4-a756-b2942158216e">

    - NestJS 서버 내에서 잘 사용하기 위해, 공식문서 상에 있는 ORM 중 하나를 사용하기로 했다.
    - TypeORM은 인기있는 ORM으로 관련자료도 많지만, 메이저 버전이 나오지 않은 상태로 메인테이너가 더 이상 시간을 투자하지 못하는 이슈가 올라 온 적이 있었다. Prisma는 일부 제한된 기능에 대해 무료로 사용이 가능했다. 따라서 공식문서가 보기 쉽고, 무료버전인 MikroORM을 채택했다.
    - 개발 과정에서 MikroORM에서는 Entity Manager라는 기능을 지원하는데, 이는 엔티티별 Repository를 생성하여 인스턴스화 하지 않아도, Entity Manager 인스턴스 하나만으로 모든 엔티티를 전체적으로 관리할 수 있었다. 또한 NestJS에서의 싱글톤 패턴을 지원한다. (서로 다른 클래스에 주입된 em 인스턴스의 주소가 일치함을 확인)
    
- **Entity Generator**
    - PostgreSQL 에서 지원하는 관리프로그램인 PgAdmin4 를 사용하여 테이블(엔티티)를 정의했다.
    - 이어서 MikroORM에서 지원하는 generate 기능을 활용하여 서버 내 엔티티를 생성했다.
        
        ```tsx
        npx mikro-orm generate-entities --save --path=./src/database/entities
        ```
        
<br/><br/>

## 4. 인증과 인가

### 4-1. Dynamic Guard

- **Guard의 구현**
    - NestJS 공식문서에서는 각 Strategy 별 가드를 쉽게 생성할 수 있도록 돕는다.
        
        ```tsx
        export class JwtAuthGuard extends AuthGuard('jwt')
        
        export class JwtAuthGuard extends AuthGuard(['strategy_1','...']) { ... }
        ```
        
    
    - 그러나 위와 같은 방법으로만 사용하면 다음과 같은 문제점이 있다.
        1. 단일 전략을 사용하는 Guard를 생성할 경우, 각 가드 데코레이터가 붙는 api를 각각 만들어 주어야한다.
        2. 1번의 단점을 극복하기 위해 전략배열을 활용할 수 있지만, 각 소셜로그인마다 지원하는 기능이 어떻게 다른 지 알 수 없으므로 추가적인 수정소요가 예상된다.
    - 따라서 단일 가드로 구현하되, 가드를 구현하는 CanActivate를 오버라이딩 하여 동적인 ‘다이나믹 가드’ 를 만들었다.
    
- **다이나믹 가드의 형태**
    
     <img width="1357" alt="스크린샷 2023-07-08 오후 11 15 06" src="https://github.com/ObO314/ObO-back/assets/116103097/e68caa82-91ce-41ba-b07a-34a41b14dd08">


- **다이나믹 가드의 구현**
    
    [↗️ auth.dynamic.guard.ts](https://github.com/ObO314/ObO-back/blob/main/src/modules/auth/guard/auth.dynamic.guard.ts)
    
    ```tsx
    @Injectable()
    export class DynamicAuthGuard implements CanActivate {
      constructor(
        private localAuthGuard: AuthLocalGuard,
        private googleAuthGuard: AuthGoogleGuard,
      ) {}
    
      canActivate(
        context: ExecutionContext,
      ): boolean | Promise<boolean> | Observable<boolean> {
        const guard = this.getGuard(context);
        return guard ? guard.canActivate(context) : false;
      }
    
      private getGuard(context: ExecutionContext): CanActivate {
        const request = context.switchToHttp().getRequest();
    
        switch (request.path.split('/').pop()) {
          case 'local':
            return this.localAuthGuard;
          case 'google':
            return this.googleAuthGuard;
          default:
            return null;
        }
      }
    }
    ```
    

### 4-2. 리프레시 토큰

- 리프레시 토큰
    - 리프레시 토큰은 로그인시 리프레시 토큰을 생성하여 DB에 저장하고, 로그아웃 시 리프레시 토큰을 DB에서 삭제하도록 구현했다.
    - 프론트서버에서 액세스 토큰이 만료되어 리프레시 토큰을 백엔드 서버에 제시했을 경우
    리프레시 토큰을 받고 원래 하려던 api 요청을 반복하지 않도록, 한 번의 요청으로 리프레시 토큰 발급과 api 응답을 전송할 수 있도록 구현했다.

    <img width="1351" alt="스크린샷 2023-07-08 오후 11 45 25" src="https://github.com/ObO314/ObO-back/assets/116103097/c4623bc6-8336-47dc-94bf-039083ec3c2c">
     
    [↗️ auth.jwt.guard.ts](https://github.com/ObO314/ObO-back/blob/main/src/modules/auth/guard/auth.jwt.guard.ts)
    
    ```tsx
    // AuthJwtGuard.ts
    
    export class AuthJwtGuard extends AuthGuard('jwt') implements CanActivate {
      constructor() {
        super();
      }
      async canActivate(context: ExecutionContext): Promise<boolean> {
        const isValid = (await super.canActivate(context)) as boolean;
    
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const newAccessToken = request.user.newAccessToken;
        const userId: string = request.user.userId;
    
        if (newAccessToken) {
          response.setHeader('Authorization', `Bearer ${newAccessToken}`);
        }
        request.user = userId;
    
        return isValid;
      }
    }
    ```
    
    [↗️ auth.jwt.strategy.ts](https://github.com/ObO314/ObO-back/blob/main/src/modules/auth/strategy/auth.jwt.strategy.ts)
    
    ```tsx
    // AuthJwtStrategy.ts
    
    async validate(
        payload: AuthJwtValidateInboundPortInputDto,
      ): Promise<AuthJwtValidateInboundPortOutputDto> {
        const { userId, tokenType, iat, exp } = payload;
        switch (tokenType) {
          case 'ACCESS':
            return { undefined, userId };
          case 'REFRESH':
            const foundUserToken =
              await this.authFindRefreshTokenOutboundPort.execute({
                userId: userId,
              });
            if (!foundUserToken) {
              throw new HttpException(
                '다시 로그인하여 주십시오.',
                HttpStatus.BAD_REQUEST,
              );
            }
            const savedUser = foundUserToken.user.id;
            const savedToken = foundUserToken.token;
    
            const validateUser = userId == savedUser;
            const decodedToken = this.jwtService.verify(savedToken);
    
            const validateToken =
              iat == decodedToken.iat && exp == decodedToken.exp;
    
            if (validateUser && validateToken) {
              const newAccessToken = this.jwtService.sign(
                { userId: userId, tokenType: 'ACCESS' },
                { expiresIn: '30m' },
              );
              return { newAccessToken, userId };
            } else {
              throw new HttpException(
                '비정상적인 접근입니다.',
                HttpStatus.BAD_REQUEST,
              );
           }
        }
      }
    ```
<br/><br/>

## 5. 서비스로직 구현

<aside>
💡 서비스는 크게 `User`, `Readme`, `Todo`,`Routine`, `Circle`, `Work` 등 의 분야로 구분되어 있다.

그 중 유저정보, `User`, `Readme`, `Todo`는  단순 CRUD 의 기능으로 구성되어 있으므로, 

여기서는 어느정도 서비스 로직이 구현된 `Routine`과 `Circle`에 대해 설명했다.

</aside>

### 5-1. 루틴 기능

- **루틴의 기능**
    - 유저가 매일 특정시간에 반복하는 할 일을 생성한다.
    - 생성된 루틴항목은 일일페이지에 시간대에 맞춰 자동으로 표기된다.
    - 날마다 루틴을 실시 했는지 여부를 표기할 수 있다.
    - 루틴을 이행해 오다가 어느 날 시간대를 수정해도, 이전 날의 수행기록 및 시간은 바뀌지 않는다.
    - 루틴을 이행해 오다가 어느 날 삭제해도, 이전 날의 수행기록은 삭제되지 않는다.
    
- **고려사항**
    - 루틴은 매일 생성하는 일과 이지만, 자동적으로 일일데이터를 생성하여 시행여부를 boolean으로 처리하면 DB가 매우 낭비될 것이다. ( 방치한 루틴도 매일 의미없는 데이터를 생산하게 되므로 )
    - 루틴을 수정해도 이전 데이터가 바뀌면 안 되는 것은, 그 동안의 수정 내역을 저장해야 함을 의미한다.
    - 특정 날짜의 루틴 이행여부를 확인하려면, 각각 수정시점이 다른 루틴의 정보를 받아와야 한다.
    ( A루틴은 3월 1일, B 루틴은 5월 14일에 수정한 상태에서 4월 30일의 이행여부를 확인하려면, 
      A는 수정된 후의 정보, B는 수정되기 전의 정보를 불러와야 함. )
    
- **엔티티 설계**
    
    <img width="1355" alt="스크린샷 2023-07-09 오후 3 27 08" src="https://github.com/ObO314/ObO-back/assets/116103097/be007df0-be5a-4c6c-8cfb-c8f5d04bdc10">

    5-1-1) 루틴의 테이블
    
    - `Routines` : 루틴의 이름과 내용이 기록. 루틴 자체이므로 id로 구별 가능.
    - `RoutineHistory` : 이전의 수정내역을 저장. 언제 수정이 이루어 졌는지로 구분.
    - `RoutineRecords` : 일일 이행여부를 기록. 시행여부는 루틴-날짜 쌍이 존재하는 지 여부로 확인.

- **인덱싱**
    - `RoutineHistory` : user 컬럼에 대해 b-tree로 생성
        - 유저가 자신의 루틴을 검색할 때, 루틴을 날짜 기준으로 최신 정보를 찾아와야 한다. 그런데 루틴이 id로 정렬되어 있다면, 자신의 루틴을 찾기위해서 데이터베이스의 모든 튜플을 찾아봐야 할 것이다. 비효율적인 검색을 방지하기 위해, user 별로 관리할 수 있도록 인덱스를 지정하였다.
    - `Routine` : 인덱스 추가 X
        - 루틴의 검색은 날짜별로 그 결과가 달라진다. 따라서 `RoutineHistory` 로 검색이 먼저 된 후, `RoutineHistory.routine` 외래키를 통해 `[Routine.id](http://Routine.id)` 로 탐색하게 되므로, ‘user’ 등 다른 컬럼의 인덱스가 필요하지 않았다.

- 모듈 **구조 ( 헥사고날 아키텍쳐 )**
    
    <img width="1385" alt="스크린샷 2023-07-09 오전 10 49 24" src="https://github.com/ObO314/ObO-back/assets/116103097/00d2b934-4cf3-4382-bd15-d22d0d443c83">

    5-1-2) 헥사고날 아키텍쳐로 계층 간 의존성을 분리한 Routine Module 의 형태
    
    <img width="1363" alt="스크린샷 2023-07-09 오후 3 53 29" src="https://github.com/ObO314/ObO-back/assets/116103097/5130b7bc-6a39-43ea-9f6a-043cd1c3c665">
    
    5-1-3) 각 계층이 상위계층에 주입된, 의존성이 매우 높은 형태의 구조가 아니다.
    
    - 헥사고날 아키텍쳐를 인터페이스를 활용하여 Routine 모듈을 그림 5-1-2 과 같이 구현했다.
    - 서비스 로직에서 보면, Repository에 대한 내용을 직접적으로 알 수 없다. 그리고 알 필요도 없다. 
    파란색으로 표시한 인터페이스인 outbound-port 만 알고 있으며, 이런 형태의 인스턴스가 ‘있다 치고’ 동작하므로, 서비스 로직을 하위계층에서 분리하여 추상적으로 코드를 작성할 수 있다.
    
- **구현 코드**
[↗️ routine.read-by-date.service.ts](https://github.com/ObO314/ObO-back/blob/main/src/modules/routine/service/routine.read-by-date.service.ts)
    
    ```tsx
    export class RoutineReadByDateService implements RoutineReadByDateInboundPort {
      constructor(
    		// 서비스는 인터페이스를 주입받아 추상적으로 활용한다.
    		// 실제 구현체의 주입은 서버가 실행 될 때, 모듈에 의하여 토큰에 해당하는 클래스의 인스턴스가 주입된다.
        @Inject(ROUTINE_READ_BY_DATE_OUTBOUND_PORT)
        private readonly routineReadByDateOutboundPort: RoutineReadByDateOutboundPort,
        @Inject(ROUTINE_READ_RECORD_BY_DATE_OUTBOUND_PORT)
        private readonly routineReadRecordByDateOutboundPort: RoutineReadRecordByDateOutboundPort,
      ) {}
      async execute(
        params: RoutineReadByDateInboundPortInputDto,
      ): Promise<RoutineReadByDateInboundPortOutputDto> {
        // 함수형 라이브러리 Fxts의 pipe, map, filter, flat, toArray 사용
        return await pipe(
          [params],
          toAsync,
          map((param) => {
            return this.routineReadByDateOutboundPort.readByDate(param);
          }),
          flat,
          filter((routine) => routine.is_active == true),
          map(async (userRoutine) => {
            return {
              routine: userRoutine.routine,
              name: userRoutine.name,
              startTime: userRoutine.start_time,
              endTime: userRoutine.end_time,
              description: userRoutine.description,
              done: await this.routineReadRecordByDateOutboundPort.execute({
                routineId: userRoutine.routine,
                date: params.date,
              }),
            };
          }),
          toArray,
        );
      }
    }
    ```
    
    위 코드는 특정날짜의 루틴과 이행여부를 찾아 반환하는 서비스로직 `RoutineReadByDateService` 다.
    
    - **헥사고날 아키텍쳐의 구현**
        - 서비스로직에 들어온 input인 `params` 에 대해, 주어진 날짜를 기준에 맞는 루틴의 정보를 불러오고, 활성화 되어 있는 (삭제되지 않은) 루틴에 대해서만 각각의 정보와 이행여부를 찾아 배열에 담아 반환한다.
        - 그림 5-1-2 을 보면,  `RoutineReadByDateService` 에는 `read-by-date` 와 `read-record-by-date` Repository를 사용하고 있지만, 코드에서는 repository 관련 어떤 코드도 찾아볼 수 없다. 모두 인터페이스로 추상화 되어 사용했기 때문이다.
    - **함수형 프로그래밍 라이브러리 Fxts 사용**
        - `**pipe**` : 첫 인자와 함수들을 받아, 인자가 함수를 차례대로 통과하도록 만듬.
                     만약 map, filter와 같이 이터레이터를 활용하는 매서드가 함수로 들어올 경우,
                     첫 인자는 이터러블한 객체가 필요하며, 이터레이터의 값을 하나씩 넘기는 것이 아니라 
                     이터레이터 자체를 함수로 넘긴다.
        - **`[params]`** : fxts는 지연평가 메서드인 map, filter 등의 구현을 이터레이터를 통해 구현한다. 
                     따라서 들어온 input 길이가 1 임에도 불구하고, map, filter 등을 사용할 수 있도록 
                     배열로 다듬었다.
        - **`toAsync`** : map과 filter 내부에 비동기 동작이 구현 될 것이기 때문에 비동기 동작으로 변환했다.
                    (탐구 과정 : [https://velog.io/@uiseok0514/Fxts-AsyncIterable](https://velog.io/@uiseok0514/Fxts-AsyncIterable))
        - **`flat`** : 중첩된 배열을 한 차원 풀어 평탄하게 만든다. 여기서는 DB로 부터 찾아온 루틴이 
                    하나의 배열에 담겨있어, 이를 이터레이터로 순환하기 위해 평탄화 했다.
        - **`filter`** : 특정 조건을 만족하는 요소만 이터레이터의 next()로 반환한다. 
                   여기서는 활성화 된 루틴만 필터링하도록 설정했다. 
                   ( * 루틴이 수정/삭제되어도 이전 정보는 유지되어야 하기 때문에, 유저가 루틴을 삭제해도 
                    실제로는 삭제되지 않고 비활성화되어 보이지 않는다.)
        - **`map`** : 이터레이터의 각 요소마다 정해진 함수를 실행하여 결과를 배열로 반환한다. 
                   여기서는 루틴의 시행여부를 확인하고, service 의 outputDTO 에 맞추는 작업을 한다.
        - **`toArray`** : pipe를 통과한 이터레이터로 부터 최종 결과값을 받아내는 작업이 필요하다. 
                  toArray는 pipe를 통과한 결과값을 모아 배열에 담아 반환한다.
    

### 5-2. 서클 & 워크 기능

- **서클 & 워크의 기능**
    - 서클(Circle) 의 기능
        - 동일한 관심사 또는 같은 일정을 공유해야하는 유저들 끼리 그룹을 만들 수 있다.
        - 각 서클에는 서클장(owner)과 스태프(staff) 멤버(member)가 존재한다.
        - 서클의 가입은 owner 또는 staff가 승인해야 이루어진다.
    - 워크(Work) 의 기능
        - 서클의 Todo 기능인 워크(work)는 owner 또는 staff 등급의 유저가 생성할 수 있다.
        - 워크는 서클에 포함된 모든 유저가 볼 수 있다.
        - 워크의 수정은 본인만 가능하며, 삭제는 본인 또는 owner가 가능하다.
        - 서클의 유저는 어떤 work 에 대해 자신의 일일 플랜 화면에서 완료여부를 표시할 수 있다.
        - 워크 조회 시, 해당 워크를 완료한 유저비율을 확인할 수 있다.

- **고려사항**
    - 세부적인 기능이 많이 필요하므로, 어떤 맥락으로 기능들을 구분할 지 고려해야한다.
        
        ⇒ 서클 관리 / 멤버 관리 / 워크 총 3가지 모듈로 분리
        
    - 서클별 / 등급별 로 가능한 동작이 구분되어 있으므로, 권한을 준수할 수 있는 장치가 필요
        
        ( 서클에 가입하지 않았는데, 워크를 생성하거나, member 등급인데 owner를 강퇴시기기 등 )
        
    
- 테이블 **설계**
    
    <img width="1377" alt="스크린샷 2023-07-09 오후 3 28 21" src="https://github.com/ObO314/ObO-back/assets/116103097/c50a02bc-8dea-4856-86b0-5d6bc8822ee6">

    5-2-1) 서클과 워크의 테이블
    
    - `circle` : 서클에 대한 정보. 
                     ‘is_Open’ 으로 서클가입을 열고 닫을 수 있으며, ‘members’ 는 멤버 총 인원 수를 저장
    - `circle_application` : 서클 가입신청 데이터. 유저-서클 쌍을 생성하여 신청여부를 확인 함.
    - `circle_grades` : 서클 멤버에 대한 등급. 1-owner ~ 3-member 까지로 설정
    - `user_circles` : 유저가 가입한 서클 데이터. 유저-서클 쌍을 생성하여 가입여부를 확인 함.
    - `work` : 서클의 todo 인 워크에 대한 정보.
    - `work_records` : 어떤 워크에 대해 누가 완료했는지를 기록하는 데이터. 
                                 컬럼에 circle을 추가한 이유는 인덱싱을 위해서 추가함.
    - `work_priority` : 워크에 대한 중요도 데이터. 1~5 등급으로 구분

- **인덱싱**
    - `circle` : name 으로 인덱스 추가
        - 서클 검색 시, 시간을 최소화 하기 위한 조치
    - `user_circles` : circle로 인덱스 추가
        - 기본적으로 user에 대해 인덱스가 생성되어 유저가 자신이 가입한 서클을 검색할 때 빠른 속도로 찾을 수 있다. 그러나 서클에 가입한 멤버들을 조회할 때 테이블을 모두 탐색해야 하므로, 서클 별로 인덱싱을 추가할 필요가 있다.
    - `work` : circle로 인덱스 추가
        - 워크는 서클별로 조회하므로, id 기본 인덱스 이외에 circle로 추가 인덱스가 필요했다.
    - `work_records` : 인덱스 추가 X
        - 일일플래너에서 워크는 유저-가입된서클-워크 순으로 검색되므로, work id 로 충분히 검색이 가능하여 별도 인덱스를 추가하지 않았다.
        
- 모듈 **구조 ( 헥사고날 아키텍쳐 )**
    - 형태는 5-1-2 루틴기능의 아키텍쳐 구조와 동일하다. 여기서는 실제 코드 파일이 어떻게 구성되어 있고, 모듈에서 각 인터페이스를 어떻게 제어하고 있는 지 설명했다.
    
    ![스크린샷 2023-07-09 오후 4 05 40](https://github.com/ObO314/ObO-back/assets/116103097/2e4e1992-bec6-4628-97df-e833f18f3126)

    5-2-2) circle 의 management 모듈.
  
    ![스크린샷 2023-07-09 오후 4 06 27](https://github.com/ObO314/ObO-back/assets/116103097/d3d79d3c-6687-4978-883c-8dea057e0264)

    5-2-3) circle.management.module 의 설정.
    
    - 각 계층의 구조는 다음과 같은 형태로 구성되어 있다
        
        `module` - `controller` - `inboundPort` - `service` - `outboundPort` - `repository`
        
    - 각 계층에서는 외부로부터 주입되는 인스턴스를 인터페이스를 통해 추상적으로 다루기 때문에, 런타임 시 실제로 어떤 클래스를 사용할 지 지정해 주어야 한다.
    - 각 계층에는 인터페이스에 토큰이 주입되어 있으며, 토큰이 무엇을 지칭하는지는  module에서 5-2-3 사진처럼 설정한다.
        
        ```tsx
        {
        	provide: CIRCLE_MANAGEMENT_CREATE_INBOUND_PORT, // 이 토큰이 주입된 것은
        	useClass: CircleManagementCreateService, // 실제로는 이 클래스를 사용합니다.
        }
        ```
        
        <img width="1069" alt="스크린샷 2023-07-09 오후 4 24 23" src="https://github.com/ObO314/ObO-back/assets/116103097/a72a705a-253a-4b99-a9d6-d7c8222e1cee">
        
        5-2-4) 각 계층에는 토큰이 주입되고, 주입되는 인스턴스를 인터페이스를 통해 추상적으로 다룬다.
        
    - 이는 각 계층이 인터페이스로 타 계층을 추상적으로 다루고 있기 때문에 가능하다. 또한 계층이 변동 되더라도, 인터페이스를 만족하는 다른 계층을 모듈에서 토큰으로 연결하면 되므로 관리가 용이하다.
    
    <aside>
    📌 지금까지 루틴과 서클을 예시로, 어떻게 서버가 구성 되었는지 나타내었다. 그러나 이 설명이 서버에 대한 모든 것을 내포하는 것은 아니다. 아키텍쳐는 동일하게 가져가되, 서비스로직은 각 모듈의 기능에 초점을 맞추어 구현되었다. 자세한 코드는 : [https://github.com/ObO314/ObO-back](https://github.com/ObO314/ObO-back)
    
    </aside>

<br/><br/>

## 6.  테스트케이스

### 6-1. 의존성 분리

- **아키텍쳐가 주는 테스트케이스의 이점**
    - 헥사고날 아키텍쳐의 적용은, 인터페이스를 통해 각 계층의 의존성을 분리 할 수 있었다.
    - 테스트 관점에서도 각 계층의 의존성 분리는 해당계층의 테스트에 집중할 수 있는 환경을 제공한다.
    - 모킹하는 인스턴스가 인터페이스를 구현하며, 실제의 클래스 형태를 준수한다.
    

### 6-2. 계층별 테스트

- **리포지토리 테스트**
    
    <img width="1338" alt="스크린샷 2023-07-09 오후 9 11 38" src="https://github.com/ObO314/ObO-back/assets/116103097/d10889c5-b31a-4218-9d3a-d1ba682f5efe">

    - 레포지토리 테스트의 중점 : 실제 데이터베이스와 통신하고 적절한 데이터의 입출력이 이루어지는가?
    - 비어있는 테스트용 데이터베이스에, 엔티티 매니저가 create, upsert 등을 잘 반영하는지 체크한다.
    - 테스트 데이터베이스 환경 구축 ( 테이블을 오리지널 데이터베이스와 동일하게 구축하기 )
        
        ```
        const orm = await MikroORM.init(testConfig); // 테스트용 DB주소가 입력된 설정사용
          const generator = orm.getSchemaGenerator(); // 스키마 생성기를 가져와 실행
          await generator.updateSchema();
        ```
        
    - 아래는 유저를 생성하는 `UserCreateRepository` 클래스에 대한 코드와 테스트 케이스이다.
        
        [↗️ user.create.repository.ts](https://github.com/ObO314/ObO-back/blob/main/src/modules/user/outbound-adapter/user.create.repository.ts)
        
        ```tsx
        export class UserCreateRepository implements UserCreateOutboundPort {
          constructor(private readonly em: EntityManager) {}
        
          async execute(
            params: UserCreateOutboundPortInputDto,
          ): Promise<UserCreateOutboundPortOutputDto> {
            const newUser = this.em.create(Users, params);
            await this.em.persistAndFlush(newUser);
            return newUser;
          }
        }
        ```
        
        [↗️ user.create.repository.spec.ts](https://github.com/ObO314/ObO-back/blob/main/src/modules/user/outbound-adapter/spec/user.create.repository.spec.ts)
        
        ```tsx
        describe('UserCreateRepository Spec', () => {
          let userCreateRepository: UserCreateRepository;
          let em: EntityManager;
          let orm: MikroORM;
        
          beforeAll(async () => {
            orm = await MikroORM.init({ ...testConfig, driver: PostgreSqlDriver });
            em = orm.em;
            userCreateRepository = new UserCreateRepository(em);
          });
        
        ...
        
        	test('회원가입(로컬) : 로컬유저를 생성합니다.', async () => {
        	    const params = {
        	      id: '123', // 임의지정 (원래는 시퀀스 사용)
        	      email: 'createLocalTester@obo.com',
        	      nickname: 'oboNewbie',
        	      password: '1q2w3e4r',
        	      authMethod: 'LOCAL',
        	    };
        	
        	    const result: UserCreateOutboundPortOutputDto =
        	      await userCreateRepository.execute(params);
        	
        	    expect(result).toEqual({
        	      userId: '123',
        	      email: 'createLocalTester@obo.com',
        	      nickname: 'oboNewbie',
        	    });
        	  });
        	...
        }
        ```
        
        ![스크린샷 2023-07-09 오후 9 27 05](https://github.com/ObO314/ObO-back/assets/116103097/88b8980b-0991-45ca-b508-229156955b7a)


- **서비스 테스트**
    
    <img width="1369" alt="스크린샷 2023-07-09 오후 9 07 02" src="https://github.com/ObO314/ObO-back/assets/116103097/67828121-fd5f-47d4-ba71-dc01c4a57993">

    - 서비스 테스트는 실제 레포지토리가 아닌  Mock 객체가 주입된다.
    - mock은 서비스가 사용하는 outboundPort 인터페이스를 준수한다.
    - 따라서 서비스는 정해진 mock을 받기 위한 올바른 입력과, 적절한 최종값이 출력 되는지 테스트 한다.
    
    [↗️ user.sign-up.service.ts](https://github.com/ObO314/ObO-back/blob/main/src/modules/user/service/user.sign-up.service.ts)
    
    ```tsx
    export class UserSignUpService implements UserSignUpInboundPort {
      constructor(
        @Inject(USER_READ_OUTBOUND_PORT)
        private readonly userReadOutboundPort: UserReadOutboundPort,
        @Inject(USER_CREATE_OUTBOUND_PORT)
        private readonly userCreateOutboundPort: UserCreateOutboundPort,
      ) {}
    
      async execute(
        params: UserSignUpInboundPortInputDto,
      ): Promise<UserSignUpInboundPortOutputDto> {
    
        // 이메일이 존재하는가
        // 유효한 비밀번호인가
        // 비밀번호를 해쉬화
        // 유저 생성하기
        // 유저를 찾아 DB에서 반환 하기
    
        return await pipe(
          [params],
          toAsync,
          filter(async (params) => {
            if (!(await this.userReadOutboundPort.execute({email: params.email}))) {
              return true;
            } else {
              throw new HttpException(
                '이미 가입된 이메일입니다.',
                HttpStatus.BAD_REQUEST,
              );
            }
          }),
          filter((params) => {
            if (params.password) { return true } 
    				else {
              throw new HttpException(
                '비밀번호를 입력하세요.',
                HttpStatus.BAD_REQUEST,
              );
            }
          }),
          map(async (params) => {
            return {
              ...params,
              password: await bcrypt.hash(params.password, 10),
            };
          }),
          map((params) => this.userCreateOutboundPort.execute(params)),
          map((user) => {
            return {
              userId: user.id,
              email: user.email,
              nickname: user.nickname,
            };
          }),
          head,
        );
      }
    }
    ```
    
    [↗️ user.sign-up.service.spec.ts](https://github.com/ObO314/ObO-back/blob/main/src/modules/user/service/spec/user.sign-up.service.spec.ts)
    
    ```tsx
    describe('UserSignUpService Spec', () => {
      let userSignUpService: UserSignUpService;
    
    	//-- Mocking --
    
      class MockUserReadOutboundPort implements UserReadOutboundPort {
        constructor(private readonly params: UserReadOutboundPortOutputDto) {}
        async execute(
          _: UserReadOutboundPortInputDto,
        ): Promise<UserReadOutboundPortOutputDto> {
          return this.params;
        }
      }
    
      class MockUserCreateOutboundPort implements UserCreateOutboundPort {
        constructor(private readonly params: UserCreateOutboundPortOutputDto) {}
        async execute(
          _: UserCreateOutboundPortInputDto,
        ): Promise<UserCreateOutboundPortOutputDto> {
          return this.params;
        }
      }
    
    	//-- testing --
    
      test('회원가입(로컬) : 정상적인 회원가입', async () => {
        userSignUpService = new UserSignUpService(
          new MockUserReadOutboundPort(null),
          new MockUserCreateOutboundPort({
            id: '1',
            email: 'createLocalTester@obo.com',
            nickname: 'oboNewbie',
            authMethod: 'LOCAL',
          }),
        );
    
        const params = {
          email: 'createLocalTester@obo.com',
          password: '1q2w3e4r',
          nickname: 'oboNewbie',
          authMethod: 'LOCAL',
        };
    
        const result: UserSignUpInboundPortOutputDto =
          await userSignUpService.execute(params);
    
        expect(result).toEqual({
          userId: '1',
          email: 'createLocalTester@obo.com',
          nickname: 'oboNewbie',
        });
      });
    
      //--------------------------------------------------
    
      test('회원가입(로컬) : 중복된 이메일로 회원가입 시도', async () => {
        userSignUpService = new UserSignUpService(
          new MockUserReadOutboundPort({
            id: '1',
            email: 'existentUsers@obo.com',
            nickname: 'oboUser',
            authMethod: 'LOCAL',
          }),
          new MockUserCreateOutboundPort(null),
        );
    
        const params = {
          email: 'existentUsers@obo.com', // 중복된 이메일
          password: '1q2w3e4r',
          nickname: 'oboNewbie',
          authMethod: 'LOCAL',
        };
    
        expect(async () => await userSignUpService.execute(params)).rejects.toThrow(
          new HttpException('이미 가입된 이메일입니다.', HttpStatus.BAD_REQUEST),
        );
      });
    
      //--------------------------------------------------
    
      test('회원가입(로컬) : 비밀번호 없이 회원가입 시도', async () => {
        userSignUpService = new UserSignUpService(
          new MockUserReadOutboundPort(null),
          new MockUserCreateOutboundPort({
            id: '1',
            email: 'createLocalTester@obo.com',
            nickname: 'oboNewbie',
            authMethod: 'LOCAL',
          }),
        );
    
        const params = {
          email: 'createLocalTester@obo.com',
          password: null, // 로컬 가입인데 비밀번호 미 입력
          nickname: 'oboNewbie',
          authMethod: 'LOCAL',
        };
    
        expect(async () => await userSignUpService.execute(params)).rejects.toThrow(
          new HttpException('비밀번호를 입력하세요.', HttpStatus.BAD_REQUEST),
        );
      });
    });
    ```

<br/><br/>

## 7.  마치며

### 7-1. 회고

- **ObO 프로젝트의 의미**
    - OBO 프로젝트의 일정관리 서비스는 내가 실제로 필요한 기능을 담아 만든 프로젝트이다.
    - 그래서 클라이언트 관점에서 바라보며, 이것이 백엔드에서는 어떻게 구현되는지 생각해 볼 수 있었다.
    - 그 전까지의 프로젝트들은 단순 구현에 머물렀지만, ObO는 아키텍쳐와 패러다임의 적용과 새로운 기술의 사용이 이루어졌기에 더욱 성장할 수 있는 프로젝트였다.
    - 프로젝트를 진행하며 마주한 자잘한 문제들은 기록하지 않았다. 대부분이 단순 지식부족이기에 기록할 필요가 없다고 느꼈기 때문이다. 반면에 새로 알게되고 이해가 정리된 내용은 기록했다.
    
- **느리지만 확실하게**
    - 프로젝트를 진행하면서 이해가 부족하다고 느낀부분은 프로젝트를 중단하고 개념을 이해하고 오기도 했다. 특히 함수형 프로그래밍이 그랬다. ([https://velog.io/@uiseok0514/FP-deepdive](https://velog.io/@uiseok0514/FP-deepdive))
    - 공부와 개발을 반복하다보니 작성한 지 조금 지난 코드들은 이전에 보이지 않던 잘못된 점과 단점들이 보이기 시작했다. 특히 초반에 개발한 user와 todo 파트는 거의 3번정도 갈아 엎었다.
    - 테스트 케이스도 절반 이상 모듈을 작성했다가, 잘못된 부분을 깨닫고 모두 삭제했다. 현재 다시 테스트케이스를 작성 중이다. ( 이 프로젝트는 TDD는 아니기 때문에 테스트케이스를 먼저 작성하진 않았다. )

- **하지만 아직도 부족하다**
    - 프로젝트를 통해 다양한 기술과 개념을 새로 접했지만, 아직 배우고 익혀야 할 것들이 넘쳐난다.
    - 예를 들면, 나는 DB쿼리를 mikroORM의 entityManager를 통해 작성했지만, SQL 쿼리문으로 작성하진 않았다. ORM이 가진 한계점은 분명하기에, 데이터베이스에 최적화 되고 복잡한 쿼리를 수행하기 위해서는 SQL문 작성 능력이 필요하다.
    - 지금의 서버는 단일서버, 단일DB 이다. 만일 서버의 유저가 매우 많고 요청되는 쿼리와 정보가 한 대의 서버 만으로 커버될 수 없을 것이고, 수직 또는 수평적 확장이 이루어져야 한다. 여기에 대해서는 추가적으로 공부가 필요하다.
    - 좋은 프로그램이란 무엇일까? 좋은 코드란 무엇일까? 라는 질문에 대해 깨달음을 얻기위해 읽으려고 쌓아둔 책이 아직 많다. 경험이 부족해서 책의 내용을 다 이해 못할 때도 많고, 시간이 부족해 읽지 못한 책도 있다. 꾸준히 읽고 생각하며 고찰해야 할 것이다.
