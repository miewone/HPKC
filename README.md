# 프로젝트 명 
> 우리의발표

# 프로젝트 목적

매주 진행하는 발표를 서로 익명성 투표를 하여 투표결과를 바탕으로 발표의 질을 높이고 철저한 벌칙과 재미를 위한 프로젝트입니다.

# 프로젝트 목표

취업을 위한 포트폴리오 겸 토이프로젝트 이므로 회사에서 요구하는 기술을 녹여볼려합니다.
## 자격요건

1. __Node.Js__ ,TypeScript ,NestJs
2. MySql( AWS Aurora ),MongoDB
3. Jest                         
4. Docker,Docker-compose
5. AWS (ECS, SNS, SQS, API Gateway 등)
6. Terraform

## 기업에서 우대하는 사항

- AWS, GCP, Azure와같은클라우드서비스사용경험
- Typescript 백엔드경력
- DDD (Domain Driven Design)에경험이있거나, 관심이있는분
- 마이크로서비스 아키텍처에 관심이 있거나 운영 경험이 있는 분
- NestJS 혹은 Spring 사용경험

위 자격사항과 우대사항을 충족하게 프로젝트를 진행 할 것입니다.

# 프로젝트 설계

## 요구사항
1. 카카오 및 Oauth 로그인 기능을 사용하여 사용자를 식별하기
2. 팀을 만들어서 관리자 및 팀 구성원이 사용자를 추가,삭제,변경
3. 발표에 사용했던 PPT,PDF,HWP 등 파일 자료 업로드
4. 익명 투표 기능
5. 발표 내역들을 저장하고 통계를 내어 보여주기.
6. 통계 자료를 엑셀 등 파일로 내보내기
7. sns에 공유하기 기능
8. 리액트를 이용하여 프론트엔드 구현
9. 데이터베이스 설계
10. JWT를 이용한 Authentication 관리
11. 자신이 속한 팀 리스트 보여주기
12. 팀에 관련된 멤버르 리스트 보여주기
13. 발표 등록,삭제,수정,조회
14. 팀마다 해당하는 페이지를 공간을 만들어 줘야한다.
15. https 인증된 사이트로 구성
16. 도메인 이름 구매

what's new
   팀 찾기 기능
   팀에 인원을 추가할때 초대수락 개념과
   팀 나오기 기능을 넣어두자.
## 일정 계획
![](./etc/calendar.PNG)

### 상세 일정 _(예정)_
1. 기획
    - ~ 7월 10일 : 기획 마무리
2. 설계
    - ~ 7월 15일 : 설계 완료
3. 개발
    - ~ 7월 3일 : 요구사항 - 1, SNS, GOOGLE 등 외부 사이트 로그인 구현ㅅ
      - ~~Kakao oAuth 로그인 구현~~
      - ~~존재하는 유저가 다른 oAuth를 이용하여 로그인할경우 이메일을 이용~~
    - ~ 7월 8일 : 로그인 구현과 같이 유저 정보 저장 
      - ~~카카오 로그인 유저 정보 저장.~~
      - ~~사이트에 직접으로 계정생성한 사람에 한함.( 암호화 )~~
    - ~ 7월 13일 : 요구사항 - 2, 구성원들 CRUD와 자료 테이블 관계 완성
      - ~~팀 생성 기능 추가~~
      - ~~팀과 유저를 다 대 다 관계 구성~~
      - ~~팀에 멤버 추가,삭제~~
      - ~~팀 삭제 기능 추가~~
    - ~ 7월 13일 : 요구사항 - 3, 자료 업로드 기능 구현
      - ~~자료 다운로드 기능 구현~~
      - ~~파일명 한글일 경우에도 다운로드~~
      - 업로드할 파일 압축하기
      - 압축된 파일 압축 풀면서 다운
    - ~ 7월 15일 : 요구사항 - 4, ~~익명 투표기능 추가~~
    - ~ 7월 20일 : 요구사항 - 5, 통계 내역 그래프를 이용 하여 보여주기
    - ~ 7월 23일 : 요구사항 - 6, 요구사항 - 5의 그래프를 산출물로 내보내기 기능 구현
    - ~ 7월 30일 : 요구사항 - 7, SNS에 공유하여 보여주기 기능 구현
    - ~ 8월 20일 : 요구사항 - 8, 프론트 엔드 개발 시작
      - 요구사항 4 ~ 8 리액트와 같이 진행 필요.
    - ~ 8월 25일 : 리팩토링 완료하기.
4. 테스트
   - ~ 7월 8일 : 로그인 로그아웃 테스트 구현 - 완료
   - ~ 7월 15일 : 개발환경 구축으로 팀 발표 테스트 구현 - 완료
5. 배포
# 기능 구현
## 카카오톡 로그인
> [카카오 Dev Doc 참조](https://developers.kakao.com/docs/latest/ko/kakaologin/common)

소개 : 

    카카오 로그인은 카카오계정과 애플리케이션(이하 앱)을 연결하고 토큰을 발급받아카카오 API를 사용할 수 있도록 하는 기능입니다. 
    토큰은 사용자를 인증하고 카카오 API 호출 권한을 부여하는 액세스 토큰(Access Token)와 액세스 토큰을 갱신하는 데 쓰는 리프레시 토큰(Refresh Token)이 있습니다

|NAME|설명|Kakao API|
|---|---|---|
|로그인|카카오계정 정보로 사용자를 인증하고 API 호출 권한을 얻습니다.|O|
|연결|카카오계정과 앱을 연결, 사용자가 해당 앱에서 카카오 API를 사용할 수 있게 합니다.|O|
|가입|카카오계정 정보로 로그인한 사용자를 서비스 데이터베이스(DB)에 회원으로 등록합니다.|X<br>서비스 자체 구현|
|로그아웃|로그아웃 요청한 사용자의 토큰을 만료시킵니다.|O|
|연결 끊기|카카오계정과 서비스 사이의 연결을 해제합니다.|O|
|탈퇴|회원 정보를 삭제하고 서비스를 더 이상 이용하지 않습니다.|X<br>서비스 자체 구현|
|토큰|API 호출 권한을 증명하며, 로그인을 통해 발급받습니다.|O|


### 로그인 과정

![](https://developers.kakao.com/docs/latest/ko/assets/style/images/kakaologin/kakaologin_process.png)


|토큰 종류|권한|유효기간|
|----|-----|-----|
|AccessToken|사용자를 인증|REST API : 6 시간|
|RefreshToken|일정 기간 동안 다시 인증 절차를 거치지 않고도 액세스 토큰 발급을 받을수 있게 해줍니다.|2달<br>유효기간 1달 남은 시점부터 갱신 가능|

## 로그인 과정
Node.js 의 미들웨어인 passport, passport-kakao를 이용하였습니다.

[카카오톡 로그인 과정](routes/auth.js)

순서
1. router 및 app에 .use(passport.initialize())와 passport.session()을 연결
2. passport.use에서 clientId(카카오톡에서 발급받은 키),callbackURL:[로그인 성공후 콜백받을 URL]하여 로그인 시도 --> 성공하였으면 접속 토큰을 발급받고 사용자 정보를 가져온다.
3. passport.serializeUser를 이용하여 세션에 저장을 하고 저장이 완료된다면 로그인 과정 성공.

### passport
- serializeUser
   - verify callback으로 유저 정보를 전달하면 실행되는 함수로, 성공한 유저의 정보를 session에 추가한다.
- deserializeUser
   - deserializeUser은 Cookie에 저장된 passport session 정보를 이용해서 user정보를 가져오는 함수
   
passport를 이용하여 로그인에 성공을한다면 passport.session()을 이용하여 세션에 저장이된다.


## 몽고 DB 설명

[mongodb.md](./mdFiles/nosql.md)

## 테이블 정의
> Users

|Column|Explanation|Type|
|----|-----|---|
|name|사용자 이름|String|
|provider|회원가입 제공자|String|
|team|참여 팀에 관한 정보 |Object,Reference Type|
|recommendationList|추천 발표자료 리스트 |Object,Reference Type|
|email|사용자 이메일|String|
|password|사용자 비밀번호|String|
|salt|비밀번호 검증을 위한 salt|String|

> Teams

|Column|Explanation|Type|
|----|-----|---|
|teamName|팀 이름 |String|
|subject|팀 주제 |String|
|creator|생성자 아이디 |Object|
|member_id|사용자 DB 아이디 |Array[Object],Reference Type|
|pt_id|팀에서 만들어진 발표 DB 아이디 |Array[Object],Reference Type|








# 제공 API

## 유저

### 로그인

#### 기본 로그인

|Value|설명|type|
|---|---|---|
|/oauth/logins| 요청에 필요한 URL|URL|
|userEmail|로그인 할 유저의 이메일|String|
|password|로그인 할 유저의 비밀번호|String|

return

|Value|설명|type|
|---|---|---|
|req.user| 로그인 한 유저의 기본 정보|Object|

#### 카카오톡 로그인
로그인에 필요한 데이터

|Value|설명|type|
|---|---|---|
|/oauth/kakao| 요청에 필요한 URL|URL|
|req.user |카카오톡 서버 인증|Object|

return

|Value|설명|type|
|---|---|---|
|req.user|로그인에 성공한 유저의 정보|Object|
### 생성
> 요청 데이터

|Value|설명|type|
|---|---|---|
|/oauth/register| 요청에 필요한 URL|URL|
|userName|유저 이름|String|
|userEmail|유저 이메일|String|
|password|비밀번호|String|

return

|Value|설명|type|
|---|---|---|
|msg|200,400,403, etc|Object|

### 삭제

### 수정

### 조회

## 팀

### 생성
> 요청 데이터

|Value|설명|type|
|---|---|---|
|/team/create| 요청에 필요한 URL|URL|
|teamName|생성 할 팀 이름|String|
|subject|팀의 주제|String|

return

|Value|설명|type|
|---|---|---|
|teamName|생성 된 팀 이름|String|
### 삭제
> 요청 데이터

|Value|설명|type|
|---|---|---|
|/team/delete| 요청에 필요한 URL|URL|
|teamName|삭제 할 팀 이름|String|

- 필수 : 팀을 생성한 유저만 삭제 가능

return

|Value|설명|type|
|---|---|---|
|teamName |삭제된 팀 이름|String|
|ptName|삭제된 발표|Array|
### 수정
#### 멤버 추가
> 요청 데이터

|Value|설명|type|
|---|---|---|
|/team/memberAppend| 요청에 필요한 URL|URL|
|teamName|멤버 추가할 팀 이름|String|
|memberEmail|회원가입 및 DB에 들어있는 유저의 이메일|String|

#### 멤버 삭제
> 요청 데이터

|Value|설명|type|
|---|---|---|
|/team/memberRemove| 요청에 필요한 URL|URL|
|teamName|멤버가 삭제될 팀 이름|String|
|memberEmail|삭제 될 멤버|String|
- 필수 : 팀을 만든 유저의 권한

### 조회
## 발표

### 생성
> 요청 데이터

|Value|설명|type|
|---|---|---|
|/pt/:team_name/createPresentation|요청에 필요한 URL|URL|
|ptName|발표 이름|String|
|attendents|발표 참석자|Array|
|ptOrder|발표 순서|Object|
|resultVote|투표 결과|Object|
|joined_people|참석 인원 수 |Number|

### 삭제
> 요청데이터

|Value|설명|type|
|---|---|---|
|/pt/delete|요청에 필요한 URL|URL|
|teamName|팀 이름|String|
|ptName|발표 이름|String|

> 응답데이터

|Value|설명|type|
|---|---|---|
|data|요청에 대한 응답을 담은 데이터|Object|
|data.success|요청에 성공,실패|Boolean|
|data.msg|삭제된 발표이름|String|
### 수정
> 요청데이터

|Value|설명|type|
|---|---|---|
|/pt/update|요청에 필요한 URL|URL|
|teamName|팀 이름|String|
|ptName|발표 이름|String|
|presentation|발표 수정내용|Object||

> 응답데이터

|Value|설명|type|
|---|---|---|
|data|요청에 대한 응답을 담은 데이터|Object|
|data.success|요청에 성공,실패|Boolean|
|data.msg|수정된 발표이름|String|
### 조회

# 배포 진행 과정
1. OS 선택
   - Azure의 클라우드 서비스에서 가상머신 Ubuntu 20.05 (Linux) 사용
2. 배포에 필요한 패키지들 설치 및 환경 설정
   1. git - gitHub에 업로드된 소스를 가져옴
   2. nodejs - NodeJs 서버를 이용하기 위해서 nodejs를 설치하면서 npm도 같이설치
      - 버전 : node(v14.17.1) , npm(6.14.13)
      ```shell
      $ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
      $ sudo apt-get install -y nodejs
      ```
   3. nginx : 정적 페이지 배포에 관리하기 쉽게 도와주는 툴
      - 설정
         - /etc/nginx/sites-available에 존재하는 파일 default를 내 배포 설정에 맞게 수정
         - default 파일 생성/수정 후 /etc/nginx/sites-enables/에 심볼릭 링크 파일 생성
      ```shell
      $ ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enables/default
      ```
      여기서 주의해야할 점이 상대 경로로 심볼릭 링크를 생성하면 **Too many levels of symbolic links** 에러가 발생
      - Default 파일
      ```text
      server {
         listen       80 default;
         server_name  www.miewone.site;

         location / {
            return 301 https://www.miewone.site$request_uri;
         }
      }

      server {
         listen      443 ssl default;
         server_name www.miewone.site;

         ssl_certificate     /etc/letsencrypt/live/www.miewone.site/fullchain.pem;
         ssl_certificate_key /etc/letsencrypt/live/www.miewone.site/privkey.pem;

         location / {
            root      /home/miewone/hpkc_front/build;
            index     index.html index.htm;
            try_files $uri $uri/ /index.html;
            }
         location /api/ {
            proxy_pass http://127.0.0.1:3045;
            }
        }
      ```

   4. Certbot : Let's Encrypt의 인증서 발급을 편하게 도와주는 도구.
      - 설치 방법
      ```shell
      $ sudo apt-get update
      $ sudo apt-get install software-properties-common
      $ sudo add-apt-repository universe
      $ sudo add-apt-repository ppa:certbot/certbot
      $ sudo apt-get update
      $ sudo apt-get install certbot
      ```
   5. mongoDB : NoSQL 데이터베이스
   6. Docker : Linux 커널기능을 사용하여 프로세스를 분리함으로써 독립적으로 실행될 수 있도록 한다.
      - Docker를 포함한 컨테이너 툴은 이미지 기반 배포 모델을 제공. 여러 환경 전반에서 애플리케이션 또는 서비르 모든 종속 항목과 손쉽게 공유 가능.
      - Docker는 이 컨테이너 환경 내에서 애플리케이션 배포를 자동화 한다.
      - Docekrfile 설명
      ```dockerfile
      FROM node:14
      LABEL Wongyun Park miewone@kakao.com
      RUN mkdir -p /home/miewone/dockerserver
      WORKDIR /home/miewone/dockerserver
      ADD . /home/miewone/dockerserver
      RUN mkdir -p /home/miewone/dockerserver/log
      RUN npm install
      EXPOSE 3045
      CMD ["npm","run","start"]
      ```


#기능 이슈
## 로그인 유지 이슈
리액트와 연동하여 서버와 통신할때 리액트에서는 로그인이 풀리고 서버에서는 가지고 있으며 반대로 서버에서는 가지고 있지 않는데 
리액트에서는 가지고 있는 경우가 있음 
쿠키와 세션 부분을 좀 더 세밀히 만들어야할것 같음.

### 해결
1. 프론트에서 로그인 저장 구현기능을 좀 더 세밀화 해야하고
   로그인이 성공하였으면 로컬저장소에 로그인에 성공한 유저의 정보를 저장하고
   페이지 이동 및 새로고침이 발생할때 스토리지에 있는 유저 정보를 가져와 토큰 검증 api를 이용하여
   계속해서 사이트 이용 권한을 줄것인지 결정한다.
2. 서버 사이드에서는 jwt를 이용한 검증 작업을 추가해야한다.
   1 항목에 해당하는 jwt verify 기능을 이용하여 검증 요청이 들어올때 마다 서버에서 검증을 한 후 
   데이터를 돌려준다.

## 게시글에 대한 권한 이슈
현재로써 개발된 부분은 한 계정이 있다면 이 계정이 팀 과 발표를 만들며 발표 사람의 순서를 정하거나 파일을 올리고 해당 사람에 대한 글을 작성할
수 있다. 하지만 이렇게 되면 파일 관나 게시글의 권한이 제대로 구분되지 않으니 이 점에 관한 문제 처리 필요. 

## 추천시 인원 추가되는 이슈
발표에 들어가서 추천버튼을 누르면 인원이 늘어나는 이슈 발생.
### 해결
추천한 인원 고르는 배열 api 함수 filter,map을 사용하고 문제부분에서 데이터를 중복으로 집어넣어서 그럼

```javascript
const recommandedMember = await ptCursor.attendents.map((ele) => {
            if (ele.email === ptOwner.email) {
                return {
                    ...ele,
                    ddabong: [...ele.ddabong, recommender.email],
                };
            } else {
                return ele;
            }
        });

        await ptCollection.update(
            { _id: ptCursor._id },
            {
                $set: {
                    attendents: [...maintaindMember, ...recommandedMember], // < ---- 문제 부분
                },
            },
        );
```
# 해결
코드 수정
```javascript
const maintaindMember = await ptCursor.attendents.map((ele) => {
            if (ele.email === ptOwner.email) {
                return {
                    ...ele,
                    ddabong: [...ele.ddabong, recommender.email],
                };
            } else {
                return ele;
            }
        });
await ptCollection.update(
        { _id: ptCursor._id },
        {
           $set: {
              attendents: attendents,
           },
        },
);
```
## 소셜 로그인 이슈
로그인 인증 과정을 변경함으로써 기존에 사용하던 소셜 로그인 기능에서 이슈가 발생하였다.

기존 로그인 검증 순서 
1. 프론트에서 링크를 클릭 
2. 소셜 로그인 페이지로 리다이렉트 
3. 로그인 한 정보를 등록된 콜백페이지로 반환 
4. 세션 및 유저 로그인 처리
5. 홈페이지로 이동
6. 홈페이지에서 로그인 처리 로직 진행

변경된 방식으로는 4 -> 5에
로그인한 정보를 담아서 보내고 프론트단에서 응답 데이터를 받아서 localStorage에 저장을하고 유저 확인이 필요할때 마다
서버에 검증 요청을 보내 확인하다. ( JWT Verify 방식 활용)

해결하기 위해서는 위 방식과 같이 로직이 돌아가게하면 되는데.

## 해결
서버단에서 코드 수정한 부분은 없고
프론트에서 소셜 로그인을 시도하면 LocalStorage에 sosial키 와 true값을 주고
소셜 로그인 (리다이렉트)를 진행 시킨다. 소셜 로그인이 끝나면 홈페이지로 리다이렉트를 시키며
홈페이지에서 LocalStorage의 sosial 키가 있으면 서버에 유저 로그인 정보를 요청하면된다.

## 없는 팀 접속 이슈



# 테스트 이슈
### Request path contains unescaped characters 에러
기존에 잘 되던 인원추가 ,인원삭제 ,발표 생성 테스트에서 알 수 없는 이슈 발생
```text
Request path contains unescaped characters
TypeError [ERR_UNESCAPED_CHARACTERS]: Request path contains unescaped characters
    at new ClientRequest (_http_client.js:155:13)
    at Object.request (http.js:94:10)
    at Test.request (E:\gitStudy\hamparkkimchoi\node_modules\superagent\src\node\index.js:785:18)
    at Test.Object.<anonymous>.Request.end (E:\gitStudy\hamparkkimchoi\node_modules\superagent\src\node\index.js:949:8)
    at Test.end (E:\gitStudy\hamparkkimchoi\node_modules\supertest\lib\test.js:153:7)
    at E:\gitStudy\hamparkkimchoi\node_modules\superagent\src\request-base.js:311:12
    at new Promise (<anonymous>)
    at Test.Object.<anonymous>.RequestBase.then (E:\gitStudy\hamparkkimchoi\node_modules\superagent\src\request-base.js:293:31)
    at processTicksAndRejections (internal/process/task_queues.js:95:5)
```
URL에 띄워쓰기나 한글이 있으면 나오는 이슈라고 하는데 URL에는 문제 없음. 
#### 해결
없이 없는 이유. 테스트 URL에서 문제가 있었음. 꺼진 불도 다시보자.
### Cannot set headers after they are sent to the client 에러

```text
Cannot set headers after they are sent to the client
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at ServerResponse.setHeader (_http_outgoing.js:561:11)
    at ServerResponse.header (E:\gitStudy\hamparkkimchoi\node_modules\express\lib\response.js:767:10)
    at ServerResponse.send (E:\gitStudy\hamparkkimchoi\node_modules\express\lib\response.js:170:12)
    at ServerResponse.json (E:\gitStudy\hamparkkimchoi\node_modules\express\lib\response.js:267:15)
    at teamCreate (E:\gitStudy\hamparkkimchoi\routes\team.js:84:9)
    at processTicksAndRejections (internal/process/task_queues.js:95:5)
```
#### 해결
위와 동.

# 배포 이슈
## 도커 타임 아웃 이슈
```text
xhr.js:177 POST http://20.194.50.3/api/oauth/logins 504 (Gateway Time-out)

Error: Request failed with status code 504
    at e.exports (createError.js:16)
    at e.exports (settle.js:17)
    at XMLHttpRequest.p.onreadystatechange (xhr.js:62)
```
도커로 빌드해서 배포하니 3045포트로 잘 접속이 되지만 nginx를 통해 배포되고있는 리액트를 이용하여 api 통신을
시도하니 타임 아웃이 됨.
# 프로젝트 리뷰
## 1차 리뷰
1. 글을 줄이고 시각화 자료를 늘리자.
   - 당장보고 느낄 수 있는것.
2. 파일을 업로드할때 디비에 저장을 어떤방식으로 할것인지.
   - 경로를 디비에 저장할건지
   - 디비에 데이터를 저장할 것인지.
3. 팀을 볼때 날짜나 검색 같은 필터 기능이 있으면 좋겟다.

4. 홈페이지 워딩 추가,수정,삭제로 변경
5. 팀 선택했을때 팀 이름 두줄로 나오는 부분 처리
6. 회원가입을 했을대 가입한 정보로 로그인을 해놓던가 아니면 로그인 창을 띄워주는 방식
기능을 많이 넣자.
   

   
# 후술...