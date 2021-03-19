# GAMBTI

---

![main](README.assets/main.png)

`GAME + MBTI : 사용자 MBTI 및 성향을 고려한 Steam 기반 게임 추천 서비스`


## 팀 소개
|   Name   | 임동규                                     | 윤기현                                     | 박수빈                                     | 김창현                                     | 김예슬                                     | 백민주                                     |
| :------: | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| Profile  | ![p1](README.assets/p1.jpg) | ![p2](README.assets/p2.jpg) | ![p3](README.assets/p3.jpg) | ![p4](README.assets/p4.jpg) | ![p5](README.assets/p5.jpg) | ![p6](README.assets/p6.jpg) |
| Position | 팀장<br />백엔드                           | 인프라<br />백엔드                         | 백엔드<br />데이터 분석                    | 프론트엔드<br />데이터 분석                | 프론트엔드<br />MBTI 설문                  | 프론트엔드<br />디자인                     |
| Nickname | 특공머 머장                                | 특공 개구리                                | 특공 막내                                  | 특공 공주님                                | 특공 방구머장                              | 특공 예쁜이                                |


## **Index**

- [Architecture](#archiecture)
- [Tech Stack](#tech-stack)
- [Feature](#feature)



## **Architecture**

![flow1](README.assets/flow.png)
![flow2](README.assets/flow2.png)

## **Tech Stack**

**Back-End**

- SpringBoot
- Spring Security
- JPA Hibernate
- MariaDB
- Firebase
- RedisDB
- Python

**Front-End**

- React
- material-ui
- HMTL
- CSS
- JavaScript

## **Feature**

### **주요 기능**

### **회원**

- 사용자 인증, 인가
  - 인증이 필요한 요청인 경우 Firebase에서 IdToken 유효성 검사
  - AuthenticationProvider 구현체에서 인증된 사용자의 권한 확인
- 로그인
  - Bearer Token 기반
- 회원가입
  - Firebase 메일 인증을 기반으로 함
- 비밀번호 변경
  - Firebase를 통해 사용자 재인증 후 비밀번호 변경
- 비밀번호 찾기
  - Firebase 메일 인증을 기반으로 비밀번호 찾기

### 게임 추천

- 게임 정보 확인
  - 스팀 게임에 대한 상세 정보 조회 가능
- 게임 추천
  - MBTI와 사용자 성향을 고려한 개인화 추천 제공

### 팀원 추천

- MBTI 별 궁합에 따른 팀원 자동 매칭

### 와이어 프레임
# 와이어 프레임

  * [Figma proto](https://www.figma.com/proto/n7biHPfvyDgPvwODgEO5ko/gambti?node-id=14%3A0&scaling=scale-down-width)
  * ![main page](README.assets/mainpage.png)

  
