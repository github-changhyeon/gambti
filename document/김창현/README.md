# 프로젝트 주제

- 사용자 리뷰 기반 스팀 게임 추천 서비스
- 팀원 추천 알고리즘에 따른 팀 매칭 서비스
- Cold Start 문제를 해결하기 위해 사용자의 MBTI를 협업 필터링 알고리즘에 사용



# 한 일

- 2021년 3월 2일 화요일
  - 와이어 프레임 회의 내용
    - 사용자 유입을 위해 비로그인시에도 메인페이지의 인기순 조회는 가능, 하지만 빅데이터 기반 추천 서비스는 로그인시에만 이용 가능
    - 메인 페이지
      - 비로그인시 인기순 조회 가능
      - 로그인시 빅데이터 기반 추천순으로 조회 가능
      - 장르 클릭시 해당 장르의 게임을 추천해 주는 View로 라우터 이동
    - 장르별 게임 추천 페이지
      - 처음 보여주는 화면은 데이터를 랜덤하게 뿌려줌 -> 사용자에게 항상 같은 화면을 보여주지 않기 위해
      - 대신, 해당 장르 게임들 중 빅데이터 기반 추천 순위 상위 3개를 따로 보여줌
      - 또한, 추천순, 최신순, 가격순 등의 필터링 기능 제공
      - 추천 순위가 높을수록 Card에 가시적인 네온사인 효과 적용
    - 게임 디테일 페이지
      - 게임 정보, 워드 클라우드 정보 제공
      - 왼쪽 탭에서 해당 게임의 커뮤니티로 이동 가능
      - 커뮤니티에서는 게시글 CRUD 가능 (비로그인시는 조회만 가능)
      - 팀 매칭을 통해 그룹별 실시간 채팅 입장 가능 -> 팀 매칭시 MBTI 고려 가능 
      
      
  
- 2021년 3월 3일 수요일

  - 와이어 프레임 작성
    - 장르별 게임 추천 페이지 와이어 프레임 작성
      - 추천 순위 1, 2, 3, 4등을 위한 휘장 아이콘과 휘장 아이콘에 사용될 css() 
  - 서비스 구체화 회의
    - 게임 추천, 채팅방 매칭, 커뮤니티(게시글), SNS(좋아요, 팔로우) 기능에서 커뮤니티 기능과 SNS기능은 축소시키고 빅데이터 관련 기능 및 빅데이터 시각화 기능(그래프, 통계)을 강화하자는 의견
    - 게임 관련 유튜브 영상 추천 기능을 제공하자는 의견



- 2021년 3월 4일 목요일
  - 와이어 프레임 작성
    - 검색 결과를 보여주는 페이지의 와이어 프레임 작성
  - 10시 팀미팅 내용
    - 게임 추천 알고리즘이 단순하다 -> 조금 더 고도화 시킬 필요가 있다.
    - 팀 추천 알고리즘을 통한 팀원 매칭은 차별화된 강점이 될 수 있겠다.
  - 팀내 회의 내용
    - 추천 알고리즘의 경우 성능 평가를 통해 알고리즘의 정당성을 검증하고 여러가지 전처리를 통해 성능을 향상시킬 필요가 있다.
      - 하지만 실제로 서비스 되기 전에는 "어떠한 사용자가 어떠한 추천을 받았을때 어떠한 만족도를 보였다"와 같은 데이터가 없다. -> 이런 경우 추천 알고리즘의 성능 평가를 어떻게 해야할까? -> 내일 질문
    - 실제 스팀 아이디와 연동하여 스팀에서 소유하고 있는 게임들에 대한 처리도 할 수 있어야 한다.
      - Steamworks 의 REST API 사용?
    - 빅데이터 추천과 관련성이 떨어지는 SNS 기능은 과감히 제거



- 2021년 3월 5일 금요일
  - 와이어 프레임 수정
  - 다음주 할일 정리
    - REST API 정리
    - 명세서 정리
    - Architecture 설계
    - DB 설계
    - 코드 컨벤션 정하기





# 와이어 프레임

- figma 사이트

https://www.figma.com/file/n7biHPfvyDgPvwODgEO5ko/GAMBTI?node-id=0%3A1



- 메인 페이지

![main](https://lab.ssafy.com/s04-bigdata-sub2/s04p22b201/raw/document/document/김창현/wireframe/main.JPG)

- 장르별 페이지

![genre](https://lab.ssafy.com/s04-bigdata-sub2/s04p22b201/raw/document/document/김창현/wireframe/genre.JPG)

- 검색 결과 페이지

![searchResult](https://lab.ssafy.com/s04-bigdata-sub2/s04p22b201/raw/document/document/김창현/wireframe/searchResult.JPG)

- 게임 디테일 정보 페이지

![detail](https://lab.ssafy.com/s04-bigdata-sub2/s04p22b201/raw/document/document/김창현/wireframe/detail.JPG)

- 게임 뉴스 페이지

![detailNews](https://lab.ssafy.com/s04-bigdata-sub2/s04p22b201/raw/document/document/김창현/wireframe/detailNews.JPG)

- 게임 유튜브 페이지

![detailYoutube](https://lab.ssafy.com/s04-bigdata-sub2/s04p22b201/raw/document/document/김창현/wireframe/detailYoutube.JPG)

- 유저 정보 페이지

![userInfo](https://lab.ssafy.com/s04-bigdata-sub2/s04p22b201/raw/document/document/김창현/wireframe/userInfo.JPG)

- 프로필 편집 페이지

![edit](https://lab.ssafy.com/s04-bigdata-sub2/s04p22b201/raw/document/document/김창현/wireframe/edit.JPG)

- 로그인 페이지

![login](https://lab.ssafy.com/s04-bigdata-sub2/s04p22b201/raw/document/document/김창현/wireframe/login.JPG)

- 회원가입 페이지

![join](https://lab.ssafy.com/s04-bigdata-sub2/s04p22b201/raw/document/document/김창현/wireframe/join.JPG)