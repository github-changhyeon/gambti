# Git flow

> **Git-flow**는 Git이 새롭게 활성화되기 시작하는 10년전 쯤에 **Vincent Driessen**이라는 사람의 블로그 글에 의해 널리 퍼지기 시작했고 현재는 Git으로 개발할 때 거의 표준과 같이 사용되는 방법론입니다.
>
> `Vincent Driessen 글 주소` : https://nvie.com/posts/a-successful-git-branching-model/



`Git-flow`는 `git`에 있는 기능이 아니고 서로간의 약속인 방법론 

`Git-flow`도 완벽한 방법론은 아니고 각자 개발 환경에 따라 `수정`하고 `변형`해서 사용하라고  **Vincent Driessen** 가언급했습니다.


<br/>

### `Git-flow`의 5가지 종류의 브랜치

**master** : 기준이 되는 브랜치로 제품을 배포하는 브랜치 입니다.

**develop** : 개발 브랜치로 개발자들이 이 브랜치를 기준으로 각자 작업한 기능들을 합(Merge)칩니다.

**feature** : 단위 기능을 개발하는 브랜치로 기능 개발이 완료되면 develop 브랜치에 합칩니다.

**release** : 배포를 위해 master 브랜치로 보내기 전에 먼저 QA(품질검사)를 하기위한 브랜치 입니다.

**hotfix** : master 브랜치로 배포를 했는데 버그가 생겼을 떄 긴급 수정하는 브랜치 입니다.



이렇게 항상 유지되는 메인 브랜치들(master, develop)과 일정 기간 동안만 유지되는 보조 브랜치들(feature, release, hotfix)이 있습니다.


<br/>
<br/>

git flow 설명하는 대표적 이미지

![git-flow_overall_graph](uploads/9df740c2d2156a250e670713a21cbb56/git-flow_overall_graph.png)





보통 Git-flow를 설명할 때 가장 많이 사용되는 설명 이미지 입니다.

1. 일단 **master** 브랜치에서 시작을 합니다.
2. 동일한 브랜치를 **develop**에도 생성을 합니다. 개발자들은 이 develop 브랜치에서 개발을 진행합니다.
3. 개발을 진행하다가 회원가입, 장바구니 등의 기능 구현이 필요할 경우 A개발자는 develop 브랜치에서 **feature** 브랜치를 하나 생성해서 회원가입 기능을 구현하고 B개발자도 develop 브랜치에서 **feature** 브랜치를 하나 생성해서 장바구니 기능을 구현합니다.
4. 완료된 feature 브랜치는 검토를 거쳐 다시 **develop** 브랜치에 합칩니다.(Merge)
5. 이제 모든 기능이 완료되면 develop 브랜치를 **release** 브랜치로 만듭니다. 그리고 QA(품질검사)를 하면서 보완점을 보완하고 버그를 픽스합니다.
6. 모든 것이 완료되면 이제 release 브랜치를 **master** 브랜치와 **develop** 브랜치로 보냅니다. **master** 브랜치에서 버전추가를 위해 태그를 하나 생성하고 배포를 합니다.
7. 배포를 했는데 미처 발견하지 못한 버그가 있을 경우 **hotfixes** 브랜치를 만들어 긴급 수정 후 태그를 생성하고 바로 수정 배포를 합니다.




<br/>
<br/>




## Clone / Fork

fork는 **다른 사람의 Repository**에서 내가 어떤 부분을 수정하거나 추가 기능을 넣고 싶을 때 해당 repository를 **내 Repository로** 그대로 복제하는 기능이다. 

fork한 저장소는 원본(원래 Repository 주인)과 연결되어 있다. 

여기서 연결되어 있다는 의미는 원래 레포지토리에 어떤 변화가 생기면(새로운 commit, push) 이는 그대로 fork된 repository로 반영할 수 있다. 이 때 fetch, pull의 과정이 필요하다

그 후 original repository에 변경 사항을 원본 레포지토리에 적용하고 싶으면 원본 저장소에 **pull request(merge)**를 보내야 한다.
**pull request(merge)**가 original repository의 관리자로 부터 승인 되었으면 내가 수정한 코드가 commit, merge되어 원본 레포지토리에 반영된다. pull request 하기 전까지는 내 github에 있는 fork한 repository에만 변경사항이 적용된다.




<br/>
<br/>

## Commit

#### Commit Message의 규칙 7가지 규칙

    1. 제목과 본문을 빈 행으로 구분한다
    2. 제목을 50글자 내로 제한
    3. 제목 첫글자는 대문자로 작성
    4. 제목 끝에 마침표 넣지 않기
    5. 제목은 명령문으로 사용하며 과거형을 사용하지 않는다
    6. 본문의 각 행은 72글자 내로 제한
    7. 어떻게 보다는 무엇과 왜를 설명한다



#### Commit message의 구조 

```
type(타입) : [123-front]subject   [back]subject  

body(본문, 생략 가능)

Footer
```

- type : 어떤 의도로 커밋했는지를 type에 명시

- subject : 최대 50글자가 넘지 않도록 하고 마침표 X

  ​				영문으로 표기하는 경우 동사(원형)을 가장 앞에 두고 첫글자는 대문자로 표기(명령문으로)

  ​				ex) 수정했음, 수정함 X   /  수정 O

- body : 긴 설명이 필요한 경우에 작성합니다. **어떻게** 했는지가 아니라, **무엇**을 **왜** 했는지 작성 

  ​			최대 75글자를 넘기지 않도록 합니다.

  

####  Type

- **feat** : 새로운 기능에 대한 커밋     ex) feat: 유저 전체 조회 기능 추가

- **fix** : 버그 수정에 대한 커밋    

- **build** : 빌드 관련 파일 수정에 대한 커밋(시스템 또는 외부 종속성에 영향을 미치는 변경사항 (npm, gulp, yarn 레벨)   

- **chore** : 그 외 자잘한 수정에 대한 커밋 (코드 수정 없이 설정을 변경) -> 문서로 관리

- **ci** : CI(지속적 통합(Continuous Integration)관련 설정 수정에 대한 커밋 -> merge       

- **docs** : 문서 수정에 대한 커밋      

- **style** : (코드의 수정 없이) 스타일(style)만 변경(들여쓰기 같은 포맷이나 세미콜론을 빼먹은 경우)     

- **refactor** :  코드 리팩토링에 대한 커밋(버그를 수정하거나 기능을 추가하지 않는 코드 변경, 리팩토링)

- **test** : 테스트 코드 수정에 대한 커밋 (누락된 테스트 추가 또는 기존 테스트 수정)









1. 

   