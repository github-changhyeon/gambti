# GAMBTI Project Sub1

   | 번호 | 할 일                   | 이슈 번호                                                  | 진행 상황 | 문서 링크                                     |
   | :--: | ----------------------- | ---------------------------------------------------------- | --------- | --------------------------------------------- |
   |  1   | 프로젝트 주제 구체화    | [S04P21B206-2](https://jira.ssafy.com/browse/S04P21B206-2) | `완료`    | [프로젝트 주제 구체화](#프로젝트-주제-구체화) |
   |  2   | 필수 기능 설계          | [S04P21B206-3](https://jira.ssafy.com/browse/S04P21B206-3) | `완료`    | [필수 기능](#필수-기능)                       |
   |  3   | 와이어프레임 설계       | [S04P21B206-4](https://jira.ssafy.com/browse/S04P21B206-4) | `완료`    | [와이어 프레임](#와이어-프레임)               |
   |  4   | 사이트명 정하기(Domain) | [S04P21B206-5](https://jira.ssafy.com/browse/S04P21B206-5) | `완료`    | [도메인 지정](#도메인-지정)                   |
   |  5   | Coming soon page 구현   | [S04P21B206-7](https://jira.ssafy.com/browse/S04P21B206-7) | `완료`    | [Server](#server)                             |
   |  6   | docker-compose 구성     | [S04P21B206-8](https://jira.ssafy.com/browse/S04P21B206-8) | `완료`    | [Server](#server)                             |
   |  7   | nginx proxy config      | [S04P21B206-9](https://jira.ssafy.com/browse/S04P21B206-9) | `완료`    | [Server](#server)                             |
   |  8   | HTTPS 적용              | [S04P21B206-10](https://jira.ssafy.com/browse/S04P21B206-10) | `완료`   | [Server](#server)                            |
   |  9   | main layout 설계        | [S04P21B206-11](https://jira.ssafy.com/browse/S04P21B206-11) | `완료`   | [와이어 프레임](#와이어-프레임)              |
   | 10   | main page 설계          | [S04P21B206-12](https://jira.ssafy.com/browse/S04P21B206-12) | `완료`   | [와이어 프레임](#와이어-프레임)              |
   | 11   | log in page 설계        | [S04P21B206-13](https://jira.ssafy.com/browse/S04P21B206-13) | `완료`   | [와이어 프레임](#와이어-프레임)              |
   | 12   | sign up page 설계       | [S04P21B206-14](https://jira.ssafy.com/browse/S04P21B206-14) | `완료`   | [와이어 프레임](#와이어-프레임)              |
   
   <br/><br/><br/>


# 프로젝트 주제 구체화

   * 리뷰와 MBTI를 분석해서 성향에 맞는 게임을 추천해주는 서비스
   * 각 게임의 페이지(커뮤니티)를 통해 이용자간의 소통할 수 있는 서비스
   * MBTI 궁합을 통해 잘 맞을 것 같은 팀원을 매칭시켜 주는 서비스
   * 데이터 수집 : Steam page
   * 게임과 MBTI : [자료1](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1484a505-ab2c-4aa1-be1b-e0af20a6a731/_MBTI.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210302T154433Z&X-Amz-Expires=86400&X-Amz-Signature=235ecfffe42bb52d286d95887177147f965f131e2e2708d67568beb53b52a688&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22_MBTI.pdf%22)
     * 관계에 대한 논문이나 자료들을 더 찾아볼 예정입니다.

   <br/><br/><br/>

# 필수 기능

   1. 로그인,로그아웃
   2. 회원 가입(스팀 아이디로 가입 가능하면 넣을 것!), 탈퇴, 정보 수정
   3. Game MBTI 검사
   4. MBTI에 따른 게임 추천
      * 로그인 후, 메인 페이지에서 추천 순으로 게임을 보여준다.
      * JOIN한 게임은 추천하지 않는다.
      * 동일한 점수를 가지는 등수가 있으면 우선 `random`으로 추천(매번 동일한 추천 방지)
      * 게임 장르 페이지는 상단에 해당 게임의 추천 게임을 넣는다.
      * 추천 게임 아래에는 필터를 구성해 해당 장르의 게임을 보여준다.
      * `추가적인 필터`는 차후 논의 예정

   5. 마음에 드는 게임에 join(커뮤니티에 합류) 기능
   6. 커뮤니티 글 POST(CRUD 다 만들어야 함)
   7. 해당 게임이 `팀 구성` 가능 게임이라면 `MBTI 조합`을 통한 팀 구성 (팀원들의 `MBTI 조합 점수`가 가장 높게)
   8. 각 게임의 메인(커뮤니티 메인)에는 `워드 클라우드` 넣기(스팀 + post 리뷰 데이터 분석)
   9. 각 게임의 메인에 어떤 `MBTI`를 가진 사람들이 많이 하는지 `지표(그래프)`로 보여주기
   10. 회원가입 후, MBTI 설문 및 회원의 추가 정보 받기
     * 성별, 나이 등등
     * MBTI 설문은 약 20질문(금요일 회의로 결정 예정)
   11. 실시간 알림(`FCM + RealTimeDataBase`)


   <br/><br/><br/>

# 와이어 프레임
  * [Figma GAMBTI](https://www.figma.com/file/n7biHPfvyDgPvwODgEO5ko/gambti?node-id=0%3A1)
  * [Figma proto](https://www.figma.com/proto/n7biHPfvyDgPvwODgEO5ko/gambti?node-id=14%3A0&scaling=scale-down-width)
  * ![main page](imgs/mainpage.png)

<br/><br/><br/>

# 도메인 지정
  * www.gambti.com 도메인으로 설정
  * 서브 도메인 설정
     * ![domain](imgs/gambtidomain.png)
     * 아직 서버 분리는 X

<br/><br/><br/>

# Server
* server url : www.gambti.com
* [서버 설정 문서](GAMBTI/server)
* 현 서버 index 페이지
![comingsoon](imgs/comingsoon.png)
