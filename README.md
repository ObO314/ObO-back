

<p align="center">
  <img src="https://user-images.githubusercontent.com/116103097/234847827-167615e5-be40-40c1-884b-8c8b1544abc2.jpg" width="200" alt="ObO Logo" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


## 📸 CHANNEL

---

- **GitHub** : https://github.com/LYUHIT
- **Velog** : https://velog.io/@uiseok0514
- **Youtube** : [youtube.com/@blackRabbitTech](https://www.youtube.com/@blackRabbitTech/videos)

## 🗂️ PROJECTS

---

# OBO - 일정관리 웹 서비스

![스크린샷 2023-07-06 오후 11.27.37.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b05d7db1-2017-4aff-98b7-f4ec8cc683f2/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-07-06_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_11.27.37.png)

[↗️ Github](https://github.com/ObO314/ObO-back)

> `TypeScript` `Nest.js` `FxTs`  `jest`  `PostgreSQL` `MikroORM` `AWS (EC2, RDS)`
> 

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
- Fxts
    - 이터레이터를 적극 활용한 라이브러리
- 작성형태

### 2-3. 헥사고날 아키텍쳐

- **레이어드 아키텍쳐와 헥사고날 아키텍쳐의 비교**
    
    ![2-3-1) 3-layer 아키텍쳐](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ff4653ba-c581-4f66-8d39-f92b61b0ab94/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-07-08_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.04.59.png)
    
    2-3-1) 3-layer 아키텍쳐
    
    - 레이어드 아키텍쳐는 각 계층이 역할별로 분리되어 있지만, 상위 계층이 하위계층에 매우 의존적이다.
    - nestJS에서는 의존성 주입을 통해 레이어드 아키텍쳐를 구현하는데, 이는 클래스들의 결속을 강하게 만든다.
    
    ![2-3-2) 헥사고날 아키텍쳐](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/db7ff1f5-abc9-46b5-80d2-1966e9a894b5/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-07-08_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.57.09.png)
    
    2-3-2) 헥사고날 아키텍쳐
    
    - 헥사고날 아키텍쳐는 레이어드 아키텍쳐의 서비스 부분에 해당하는 비즈니스 로직을 중심으로 설계한다.
    - 비즈니스 로직은 포트를 통해 외부와 연결된다. 따라서 각 계층은 결합되어 있지 않기에, 다양한 형태의 외부요소와 연결이 가능하다.
    - 비즈니스로직이 외부계층과 분리되어있고, 의존적이지 않기 때문에 유연한 설계와 유지보수가 용이하다.

- **구현 방법**
    
    ![2-3-3) 인터페이스로 구현한 헥사고날 아키텍쳐](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6cc7d3cb-5810-4de1-ac98-54672eb2e2f8/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-07-08_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.58.42.png)
    
    2-3-3) 인터페이스로 구현한 헥사고날 아키텍쳐
    
    - 헥사고날 아키텍쳐를 nestJS를 통해 구현하려면 위와 같은 형태로 구성할 수 있겠다.
    - 각 계층은 포트에 해당하는 인터페이스를 구현하여 상위계층에 주입된다.
    - 따라서 각 계층은 타 계층을 신경쓸 필요 없이, 자신에게 연결된 인터페이스만 신경쓰면 된다.
    - 추후 비즈니스로직에 연결해야할 DB가 변경된다면, 비즈니스 로직은 그대로 두고 인터페이스를 충족시키는 DB를 연결하면 되는 것이다. 따라서 비즈니스 로직에 더욱 집중할 수 있다.

## 3. 데이터베이스 설계

### 3-1. ERD

- ERD 사진

### 3-2. 데이터베이스 설계 시 중점사항

- 정규화
    - 예시 : 루틴

### 3-3. PostgreSQL 과 MikroORM

- 선택 이유

## 4. 인증과 인가

### 4-1. Dynamic Guard

- NestJS의 공식문서 - 그러나 이렇게하면 데코레이터별로 api를 다 뚫어야 한다..
- 다이나믹 가드가 적용된 데코레이터의 코드
- 구현한 방법 (코드)

### 4-2. 리프레시 토큰

- 리프레시 토큰으로 액세스 토큰 재발급 과정, 재요청 없어도 됨

## 5. 서비스로직 구현

### 5-1. 루틴

- 루틴의 기능
- 루틴의 기능을 고려하면 필요한 테이블, ERD
- 헥사고날 아키텍쳐로 구현한 현재 구조
    - 구조 이미지
    - 인터페이스를 활용하여 외부와의 분리를 통해 테스트가 용이하다 (순수함수를 어겼다?)
- 인덱스 고려하기

### 5-2. 서클

- 가입신청과 승인, 거부
- 새로운 워크의 생성, 했다고 표시, 여부

## 6.  테스트케이스

### 6-1. 의존성 분리

- 아키텍쳐가 주는 테스트케이스의 이점

### 6-2. 계층별 테스트

- 리포지토리 테스트
- 서비스 테스트

---
