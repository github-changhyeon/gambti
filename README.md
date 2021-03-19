![main](README.assets/main.png)

## 🌈GAMBTI란?
- `GAME + MBTI : 사용자 MBTI 및 성향을 고려한 Steam 기반 게임 추천 서비스입니다.`
<br/><br/><br/>

## 👨팀 소개

|   Name   | 이동규                                     | 윤기현                                     | 박수빈                                     | 김창현                                     | 김예슬                                     | 백민주                                     |
| :------: | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| Profile  | ![p1](README.assets/p1.jpg) | ![p2](README.assets/p2.jpg) | ![p3](README.assets/p3.jpg) | ![p4](README.assets/p4.jpg) | ![p5](README.assets/p5.jpg) | ![p6](README.assets/p6.jpg) |
| Position | 팀장<br />백엔드                           | 인프라<br />백엔드                         | 백엔드<br />데이터 분석                    | 프론트엔드<br />데이터 분석                | 프론트엔드<br />MBTI 설문                  | 프론트엔드<br />디자인                     |


<br/><br/><br/>
## **📖Index**

- [Architecture](#archiecture)
- [Tech Stack](#tech-stack)
- [Feature](#feature)
- [Wireframe](#wireframe)

<br/><br/><br/>


## **🏰Architecture**

![flow1](README.assets/flow.png)
![flow2](README.assets/flow2.png)

<br/><br/><br/>

## **⚙️Tech Stack**

### 💻Back-End

<hr/>

#### 기술스택

![Apache Maven](https://img.shields.io/badge/Apache_Maven-4.0.0-C71A36?Style=flat&logo=Apache-Maven&logoColor=C71A36)
![JAVA ](https://img.shields.io/badge/JAVA_JDK-1.8-007396?Style=flat&logo=Java&logoColor=007396)
![SpringBoot](https://img.shields.io/badge/SpringBoot-2.4.2-6DB33F?Style=flat&logo=Spring&logoColor=6DB33F)
![MariaDB](https://img.shields.io/badge/MariaDB(AWS_RDS)-10.4.13-61DAFB?Style=flat&logo=MariaDB&logoColor=61DAFB)

#### 📚사용된 라이브러리

![spring-mail](https://img.shields.io/badge/Spring_mail-2.4.2-6DB33F?Style=flat&logo=Spring&logoColor=85EA2D)
![spring-security](https://img.shields.io/badge/Spring_security-2.4.2-6DB33F?Style=flat&logo=Spring&logoColor=85EA2D)
![spring-redis](https://img.shields.io/badge/Spring_redis-2.4.2-DC382D?Style=flat&logo=Redis&logoColor=DC382D)
![spring-jpa](https://img.shields.io/badge/Spring_jpa-2.4.2-6DB33F?Style=flat&logo=Spring&logoColor=85EA2D)
![spring-jdbc](https://img.shields.io/badge/Spring_jdbc-2.4.2-6DB33F?Style=flat&logo=Spring&logoColor=85EA2D)
![spring-validation](https://img.shields.io/badge/Spring_validation-2.4.2-6DB33F?Style=flat&logo=Spring&logoColor=85EA2D)
![Lombok](https://img.shields.io/badge/Lombok-1.18.16-BC4521?Style=flat)
![Swagger](https://img.shields.io/badge/Swagger-2.9.2-85EA2D?Style=flat&logo=Swagger&logoColor=85EA2D)
![Firebase-admin](https://img.shields.io/badge/Firebase_admin-7.0.1-FFCA28?Style=flat&logo=Firebase&logoColor=FFCA28)


### ✨Front-End

<hr/>

#### 기술스택

![React](https://img.shields.io/badge/React-17.0.1-61DAFB?Style=flat&logo=React&logoColor=61DAFB)
![PostCSS](https://img.shields.io/badge/PostCSS-gray?Style=flat&logo=PostCSS&logoColor=DD3A0A)


#### 📚사용된 라이브러리

![Font Awesome](https://img.shields.io/badge/Font_Awesome-5.15.2-339AF0?Style=flat&logo=Font-Awesome&logoColor=339AF0)
![Axios](https://img.shields.io/badge/Axios-0.21.1-61DAFB?Style=flat&logo=React&logoColor=61DAFB)
![ClassNames](https://img.shields.io/badge/ClassNames-2.2.6-61DAFB?Style=flat&logo=React&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-8.2.6-FFCA28?Style=flat&logo=Firebase&logoColor=FFCA28)
![PropTypes](https://img.shields.io/badge/PropTypes-15.7.2-FECF0C?Style=flat)
![React-dom](https://img.shields.io/badge/ReactDom-17.0.1-61DAFB?Style=flat&logo=React&logoColor=61DAFB)
![React-fade-in](https://img.shields.io/badge/ReactFadeIn-2.0.1-61DAFB?Style=flat&logo=React&logoColor=61DAFB)
![react-router-dom](https://img.shields.io/badge/React_Router-5.2.0-CA4245?Style=flat&logo=React-Router&logoColor=CA4245)
![React-scripts](https://img.shields.io/badge/ReactScripts-4.0.1-61DAFB?Style=flat&logo=React&logoColor=61DAFB)

### 인프라

<hr/>

#### ⚙️기술스택

![Docker](https://img.shields.io/badge/Docker-gray?Style=flat&logo=Docker&logoColor=2496ED)
![Nginx](https://img.shields.io/badge/Nginx-gray?Style=flat&logo=Nginx&logoColor=269539)
![Jenkins](https://img.shields.io/badge/Jenkins-gray?Style=flat&logo=Jenkins&logoColor=D24939)
![GitLab](https://img.shields.io/badge/GitLab-gray?Style=flat&logo=GitLab&logoColor=FCA121)
![Mattermost](https://img.shields.io/badge/Mattermost-gray?Style=flat&logo=Mattermost&logoColor=0072C6)

<br/><br/><br/>

## **🌌Feature**

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

<br/><br/><br/>

## **🧙Wireframe**

  * 📌[Figma proto](https://www.figma.com/proto/n7biHPfvyDgPvwODgEO5ko/gambti?node-id=14%3A0&scaling=scale-down-width)
  * ![main page](README.assets/mainpage.png)

  
