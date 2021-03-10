# **작심**

> 작심삼일도 122번 하면 1년!

## 배포 URL

## 	`https://i4b108.p.ssafy.io/`

## 머지텍(mergeTech) 소개

- 팀명 (B108) :  **머지텍** 
   5명의 개성을 merge 하는 터틀텍의 자회사 머지텍입니다.

- 팀원 소개

  팀장 : 노천명 (BE)

  팀원 : 김상돈(FE), 김예슬(FE), 백민주(FE), 박수빈(BE)

- 직함
  - CEO : 백민주(머지민주)
  - CTO : 노천명(GP천명)
  - 개발자 : 박수빈(물콩수빈)
  - 디자이너 :  김예슬(Yes예슬)
  - 앞잡이 : 김상돈(낭만상돈)
  
  

## 작심이란?

- 목표관리 서비스

  : 계획은 거창하지만 실천력이 부족하여 작심삼일 하는 사람들을 위한 목표 달성 플랫폼



## 서비스 대상

- 목표는 거창하게 세우지만 늘 작심삼일 하게 되는 사람
- 목표한 바를 해내며 성취감을 느껴 더욱 몰입하고 싶은 사람

  

## 사용자 예시

### A. 취미를 가지고 싶은 의지박약 직장인

- 새해를 맞은 개발자 A씨는 올해도 계획을 세우지만 한 해 끝을 가면 실천한 계획이 거의 없다.
- 평소에도 의지가 약해서 계획(목표)을 잘 실천하지 못하는 편이다.
- 코로나로 인해 집에 있는 시간이 길어지고, 재택 근무 할때 의지가 약해지는 A씨는 정해진 기간 안에 성과를 내야하는데 자꾸 침대에 눕고싶다
- 취미 활동 이나 스터디를 하고 싶지만 같이 할 사람을 못 모아 실천하지 못하는 사람
- A씨는 약간의 관종기가 있다
- 다른 플랫폼은 다양한 설치들이 어려워 간단한 플랫폼(핸드폰)을 사용하고 싶은 A씨 ⇒ 핸드폰을 못해 더 집중

### B. 공부를 열심히 해야하는 고3 수험생

- 김모씨는 이 플랫폼에서 평소했던 도전(영상)으로 관리하고 싶다 (다운, 관리) ⇒ ex) 다이어트 몸 사진 ⇒ 도전의 과정 움짤 만들기...? ⇒ 공부/다이어트 카테고리에만 적용?()
- 자신이 일정에 짠 스케줄대로 잘 행동할 수 있도록 감독이 있었으면 한다.
- 자신처럼 열심히 하는 사람들의 모습을 매일 보면서 자극을 받고 싶다.
- 보통 SNS나 커뮤니티는 자신에게 필요없는 내용이 너무 많다.



## 기능

### 회원 관리
- 회원 관리 (마이페이지)
- 마이작심 (회원이 참여한 챌린지 현황 조회)

### 챌린지 관리
- 챌린지 조회 (순서별, 해시태그별), 추천 (인기별, 사용자 맞춤), 관리
- 챌린지 참여, 탈퇴, 찜하기
- 챌린지 인증글 및 댓글 관리

### 커뮤니티 관리
- 게시글 및 댓글 관리


## Home

- 프로모션 영상과 인기챌린지, 최근 챌린지 등이 표시된다.

## About

- 작심 사이트 소개 및 개발자 소개.

## Category

- 챌린지 검색 페이지. 특정 순서별 또는 해시태그별로 검색할 수 있다.

## MyZaksim

- 로그인 한 유저의 일정 확인 페이지. 기간이 만료된 챌린지, 진행중인 챌린지도 확인할 수 있다.



## 기술스택

- React (frontend)
- Spring Boot (backend)
- MariaDB (Database)



## 디자인 참고 사이트

- UI Kits

  ​	[Top 50 Free Web UI Kits & Templates](https://speckyboy.com/free-web-ui-kits/)

- particle animation

  ​	[10 Beautiful Examples of Particle Animation in Web Design](https://speckyboy.com/particle-animation-code-snippets/)

- particles.js

  ​	[particles.js - A lightweight JavaScript library for creating particles](https://vincentgarreau.com/particles.js/)



## 사이트맵

![사이트맵](./SiteMap.jpg)



## AWS 환경 셋팅

### SSAFY에서 받은 서버 기본 정보 

- 서버명(DNS) : [i4b108.p.ssafy.io](http://i4b108.p.ssafy.io)
- git version : 2.25.1 
- java version : 없음 
- 방화벽 : inactive상태 
- DB :없음 
- ubuntu version : 20.04



### 현재 서버 상태 

- java version : openjdk version "1.8.0_275" 
- OpenJDK Runtime Environment (build 1.8.0_275-8u275-b01-0ubuntu1~20.04-b01) 
- OpenJDK 64-Bit Server VM (build 25.275-b01, mixed mode)

- 방화벽 : active (22, 3306 포트 열어놓음) 
- DB : MariaDB (mysql  Ver 15.1 Distrib 10.5.8-MariaDB, for debian-linux-gnu (x86_64) 
- using readline 5.2) 
- npm : 6.1.4

- 메이븐 : Apache Maven 3.6.3 
- Maven home: /usr/share/maven 
- Java version: 1.8.0_275, vendor: Private Build, runtime: /usr/lib/jvm/java-8-openjdk-amd64/jre 
- Default locale: en, platform encoding: UTF-8 
- OS name: "linux", version: "5.4.0-1018-aws", arch: "amd64", family: "unix"



## Material-UI 

- React를 기반으로 material-ui(https://material-ui.com/)를 통한 디자인을 가미하였다.

```sh
// with npm
npm install @material-ui/core

// with yarn
yarn add @material-ui/core
```



## 개발 규칙

### Git

🐱‍💻**1 day 1 commit**

### git commit 메시지

> 커밋 메시지는 Jira 이슈 번호, (Fix, Add, Delete, Update, Merge) 중 하나 (첫글자는 대문자로) 그리고 작업 내용을 명시 
>

```
이슈번호(공백)/(공백)작업분류(공백)::(공백)작업 내용 

ex )  S04P12B108-11 / Add :: 로그인 관련 파일 추가
```

### 작업분류

- Fix : 버그 수정에 대한 커밋

```jsx
ex) Fix :: 로그인시 DB에 저장 안되는 것 수정
```

- Add : 코드나 테스트, 예제 문서 등의 처음 추가가 있을 때 사용

```jsx
ex) Add :: login 컴포넌트 기능 추가
```

- Delete : 코드의 삭제, 파일의 삭제가 있을 때

```jsx
ex) Delete :: login.vue 파일 삭제
```

- Update : 이미 추가 되어 있는 파일의 수정, 추가, 보완을 했을 때

```jsx
ex) Update :: Readme 업데이트
```

- Merge : 브랜치의 소스코드를 병합 할 때

```jsx
ex) Merge :: front 브랜치와 dev 브랜치 병합
```



### git merge

- 작업 하기 전 dev 브랜치에 있는 내용 pull 해오기

```jsx
git checkout 브랜치명
git pull origin dev
```

- merge 하기 전 코드 리뷰 댓글,  또는 의견 받은 뒤 merge 하기
- merge 한 뒤 필요 없는 branch 는 삭제

```jsx
ex) feature/fLogin 로그인 기능 구현이 완료 되었으면 merge 할 때 feature/fLogin은
    삭제하기
```



### git branch

```
			    → front → feature/f*
master → dev
				→ back  → feature/b*
```

- dev : deploy-ready 상태의 코드가 있는 브랜치로 테스트가 완료 되고 언제든 배포 가능한 상태의 코드
- `feature/f `, `feature/b ` : frontend와 backend의 동일한 기능이름에서 오는 동일path 충돌을 막기 위해 front는 소문자 f로 시작, back은 b로 시작하고 뒤의 상세 기능은 대문자로 시작한다