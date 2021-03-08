



## Jenkins 기본 설정

1. 인스턴스에 젠킨스 이미지를 올리고 해당 컨테이너를 실행한다

   ```
   sudo docker run -d -p [포트번호]:8080 -v /home/jenkins:/var/jenkins_home --name jenkins -u root -e TZ=Asia/Seoul jenkins/jenkins:jdk11
   
   sudo docker exec -i -t jenkins bash
   ```

   

2. jenkins 컨테이너에서 gradle 최신 버전을 설치한다

   ```
   1. add-apt-repository 사용을 위해 설치
   apt-get install -y software-properties-common
   
   2. 최신 gralde 버전을 가져옴
   add-apt-repository ppa:cwchien/gradle
   
   3. apt-get을 업데이트한다
   apt-get update
   
   4. 만약 3에서 PUBKEY가 없다는 오류가 발생하면 다음 명령을 실행시킨다
   apt-key adv --keyserver keyserver.ubuntu.com --recv-keys [PUBKEY번호]
   
   5. gradle 설치
   apt-get install -y gradle
   ```

   

3. 최신 버전의 nodejs, npm을 설치한다

   ```
   1. nodejs 14버전 가져옴
   curl -sL https://deb.nodesource.com/setup_14.x | bash -
   apt-get update
   
   2. nodejs 설치
   apt-get install nodejs
   ```



## Jenkins 서버 환경 설정

1. 젠킨스 서버를 접속한다(서버 주소는 인스턴스 주소에 위 젠킨스 컨테이너를 올릴때 지정한 포트 번호를 붙인 것이다)
      ![2021-02-08_16_51_59](uploads/3adca9dbd9f074d6291394e9e4445679/2021-02-08_16_51_59.PNG)

2. 젠킨스 컨테이너 환경에 맞게 jdk와 gradle 경로를 지정해 준다

   1. 기본 젠킨스 컨테이너는 기본적으로 openjdk8 버전이 설치되어 있지만, 우리는 openjdk11을 사용하는 젠킨스 이미지를 받았기 때문에 별도로 jdk를 지정해주어야 한다.

      ![2021-02-08_16_52_54](uploads/9ab4494f1f7c3aafa0e8b333278bd364/2021-02-08_16_52_54.PNG)

   2. gradle이 설치된 경로도 지정해준다.

      ![2021-02-08_16_53_05](uploads/2f45fdd65b7df3fcabd8b7afa1028dc9/2021-02-08_16_53_05.PNG)

3. Credentials에 들어가 자신의 gitlab 계정을 등록한다.

   ![2021-02-08_16_57_43](uploads/9a7da82c854c3581cc96157576c1df50/2021-02-08_16_57_43.PNG)

   
## Jenkins 자동 빌드 설정

1. 새로운 Item을 추가한다

2. 프로젝트 이름을 기입하고 freestyle project로 생성한다

   ![2021-02-08_17_04_23](uploads/d11ab5c7f694d4df755a299a4b56e851/2021-02-08_17_04_23.PNG)

3. 소스코드 관리에서 Git 주소를 입력하고  방금 등록한 Credential을 적용한다.

   ![2021-02-08_17_05_02](uploads/1f469eb777f7ea3c2c84cdd21c385451/2021-02-08_17_05_02.PNG)

4. 빌드 유발에서 아래와 같이 설정하고 webhook 주소를 어딘가에 복사해둔다

   ![2021-02-08_17_07_10](uploads/fe3b73efb81de6db5e5fc42d165a9ac3/2021-02-08_17_07_10.PNG)

5. 빌드 유발의 고급 탬에서 Secret Token을 생성하고 어딘가에 복사해둔다.

   ![2021-02-08_17_10_02](uploads/1579bd7dd63a5df325929fe1b7fcb154/2021-02-08_17_10_02.PNG)

6. 빌드 환경에서 빌드할 때마다 workspace를 초기화하도록 설정한다.

   - node_modules을 삭제하기에는 매우 오랜 시간이 걸리기 때문에 초기화에서 제외한다.

   ![2021-02-08_17_11_12](uploads/845fdd7cdd2b19f7186387eca4801a36/2021-02-08_17_11_12.PNG)

7. 빌드를 수행할 shell script를 작성한다

   ![2021-02-08_17_13_37](uploads/87b9870e39ed82244a5b4081544b364a/2021-02-08_17_13_37.PNG)

   - /var/jenkins_home/workspace/viewment에 git에서 내려받은 project가 저장된다

   - 배포용 application.yml, .env, 기타 firebase 설정 파일은 /var/jenkins_home/common 폴더에 미리 저장되어 있다.

     ```
     cd /var/jenkins_home/workspace/viewment/frontend
     
     1. 개발용 env 파일을 삭제한다
     rm /var/jenkins_home/workspace/viewment/frontend/.env.development
     
     2. 배포용 env 파일을 복사해 해당되는 경로에 위치시킨다.
     cp -r /var/jenkins_home/common/.env /var/jenkins_home/workspace/viewment/frontend
     
     3. firebaseConfig.js 파일을 해당되는 경로에 위치시킨다.
     cp -r /var/jenkins_home/common/firebaseConfig.js\ /var/jenkins_home/workspace/viewment/frontend
     
     4. Front 빌드 시작
     npm install
     npm install dotenv-webpack --save-dev
     npm run build
     
     cd /var/jenkins_home/workspace/viewment/backend
     
     5. Firebase SDK 파일을 환경 변수에 등록한다
     export GOOGLE_APPLICATION_CREDENTIALS="/var/jenkins_home/common/config.json"
     
     6. 배포용 application.yml 파일을 해당 경로에 위치시킨다.
     cp /var/jenkins_home/common/application.yml src/main/resources
     
     7. Back 빌드 시작
     chmod +x ./gradlew
     ./gradlew clean
     ./gradlew build
     
     ```

8. save!!!



## Gitlab 연동

1. gitlab 프로젝트의 Setting의 Integration 설정으로 이동한다

2. URL과 Secret token에 방금 복사해둔 webhook 주소와 Secret token을 입력한다

   ![2021-02-08_17_28_12](uploads/0ff8bc783feb09ce791fd532bf6565b7/2021-02-08_17_28_12.PNG)
3. add webhook 버튼을 눌러 추가한다

4. 아래 테스트의 push event를 실행 후 200 코드가 오면 성공!!

   ![2021-02-08_17_30_55](uploads/1963d6519d2afbbe56da2d836510b53b/2021-02-08_17_30_55.PNG)



## Jenkins + Docker 자동 배포

### Jenkins 설정

1. 우리는 호스트 서버의 /home/ubuntu/viewment에 배포할 우리의 프로그램을 저장할 것이다.

2. 먼저 플러그인 관리에서 Publish over SSH 플러그인을 설치한다.

   ![2021-02-09_22_59_10](uploads/40834c07899f91762202a7d60a705572/2021-02-09_22_59_10.PNG)

3. Jenkins 관리에서 시스템 설정으로 들어간다

4. Publish over SSH 섹션에서 key 필드에 .pem 파일의 내용을 작성해준다.

   ![2021-02-09_23_01_27](uploads/5151aecdbfccfc86efa69f29976227eb/2021-02-09_23_01_27.PNG)

5. SSH 서버에 본인의 AWS 인스턴스 정보를 기입한다.

   ![2021-02-09_23_02_24](uploads/c3d2aa066409c3e0c327ef2cb5552861/2021-02-09_23_02_24.PNG)

   - Remote Directory에는 호스트 서버의 시작 디렉토리를 적어주자
   - 모두 작성이 끝났다면 `Test Configuration` 버튼을 클릭해 호스트 서버와 정상적으로 연결이 되었는지 확인해보자

6. 다시 프로젝트의 빌드 구성으로 돌아오자

7. 빌드 후 조치 탭에서 send build artifacts over SSH를 선택해준다.

   ![2021-02-09_23_06_45](uploads/d0112f847dd0a537442ca35e5ae4a5d0/2021-02-09_23_06_45.PNG)

8. SSH 서버는 방금 등록한 우리의 호스트 서버를 등록해준다.

   ![2021-02-09_23_07_59](uploads/d68c515ff90fca8408b4dde0cc29cff4/2021-02-09_23_07_59.PNG)

   - Source files: 호스트 서버로 보낼 파일을 지정해준다. 우리는 jar 파일을 보낼것이다.
   - Remove prefix: 호스트 서버의 /home/ubuntu/viewment/backend 디렉토리에 jar 파일을 보내기 위해 젠킨스 서버에서의 prefix 경로를 제거해 준다.
   - Remote directory: ssh 서버를 등록할 때 remote directory가 이미 /home/ubuntu로 설정되었기 때문에 하위 디렉토리인 viewment/backend 만 입력한다.
   - Exec command: 호스트 서버에서 배포를 위해 shell Script를 작성한다.

### Dockerfile 설정

1. 이제 다시 호스트 서버로 돌아오자

2. 현재 호스트 서버의 /home/ubunut/viewment 디렉토리의 구조는 다음과 같다

   ![2021-02-09_23_21_41](uploads/f952890f575a90b46b364a4820bea814/2021-02-09_23_21_41.PNG)

3. backend 디렉토리로 이동하자

   ![2021-02-09_23_24_04](uploads/40d9519f52f31a8585104b5dc7e6dcc0/2021-02-09_23_24_04.PNG)

   - config.json 파일은 firebase sdk 파일이다.

4. 젠킨스 서버에서 빌드가 완료되면 이 backend 디렉토리에 jar 파일이 저장되고 deploy-back.sh가 실행될 것이다.

5. 스프링 서버를 도커로 배포하기 위해 이 디렉토리에 Dockerfile을 생성해주자

   ```dockerfile
   #이 도커 컨테이너는 openjdk 11 환경에서 수행된다.
   FROM openjdk:11-jdk
   
   ## jar 파일을 변수로 저장한다.
   ARG JAR_NAME=*.jar
   
   ## 복사한 jar 파일을 viewment_server.jar에 복사한다
   COPY ${JAR_NAME} viewment_server.jar
   
   ## 호스트의 config.json 파일을 컨테이너의 해당 경로에 복사한다.
   COPY config.json /home/ubuntu/viewment/backend/config.json
   
   ## 환경 변수로 컨테이너의 config.json 파일 경로를 등록한다.
   ENV GOOGLE_APPLICATION_CREDENTIALS=/home/ubuntu/viewment/backend/config.json
   
   ## 작업이 수행될 기본 경로를 설정한다
   WORKDIR /home/ubuntu/viewment/backend
   
   ## 8080 포트를 노출시킨다.
   EXPOSE 8080
   
   ## 스프링 서버를 백그라운드 환경에서 실행 시킨다.
   ENTRYPOINT ["nohup", "java", "-jar", "/viewment_server.jar","&"]
   ```

6. deploy-back.sh 스크립트를 작성한다.

   ```shell
   #!/bin/sh
   
   1. 스크립트가 위치한 경로로 이동한다.
   cd /home/ubuntu/viewment/backend
   
   2. 만약 실행되고 있는 이전 도커 컨테이너가 있으면 중지 후 삭제한다.
   sudo docker stop viewment_server
   sudo docker rm -f viewment_server
   
   3. 작성된 도커 파일을 빌드해 이미지를 생성한다.
   sudo docker build -t viewment_server .
   
   4. 생성된 이미지를 통해 도커 컨테이너를 올린다.
   5. 이때 호스트와 공유할 볼륨을 반드시 설정한다(이미지를 호스트의 /home/ubuntu/viewment/images에 저장해야 하기 때문)
   sudo docker run -d -p 8080:8080 --name viewment_server -v /home/ubuntu/viewment:/home/ubuntu/viewment viewment_server
   sudo docker ps
   ```

   

7. 이제 젠킨스 빌드가 성공하면 이 호스트 서버에서 새롭게 배포된 도커 컨테이너가 생성될 것이다.

8. 끝!!!!!!!!!!!!!!!!!!!!!!





