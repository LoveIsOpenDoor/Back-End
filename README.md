
# 💘 AI 연애 상담(2025.04.11 ~ 2025.04.15)

> 연애 고민, 더 이상 혼자 고민하지 마세요!  
> AI에게 사랑 이야기를 들려주면, 따뜻하고 진심 어린 답변을 드립니다.

---

## 🌐 주요 기능

| 기능 | 설명 |
|------|------|
| 🔐 회원가입 및 로그인 | bcrypt + JWT를 이용한 사용자 인증 |
| 🧑‍💬 AI 연애 상담 | OpenAI GPT-3.5 Turbo API를 통한 따뜻한 상담 응답 제공 |
| 📝 상담 내역 관리 | 사용자의 질문과 AI의 답변을 저장, 조회, 삭제 가능 |
| 🚀 CI/CD 자동 배포 | GitHub Actions + Docker + EC2 기반 자동화 배포 구성 |

---

## 🛠️ 사용 기술

| 영역 | 기술 |
|------|------|
| 백엔드 | Node.js, Express |
| DB | MySQL, mysql2/promise |
| 인증 및 보안 | JWT, bcrypt |
| AI 연동 | OpenAI GPT API (gpt-3.5-turbo) |
| 배포 | Docker, GitHub Actions, AWS EC2 |

---

## 🗂️ 폴더 구조

<pre>

📦 backend
 ┣ 📂config
 ┃ ┗ 📜db.js                  # MySQL 연결 설정
 ┣ 📂controllers
 ┃ ┣ 📜authController.js     # 회원가입, 로그인, 토큰 검증
 ┃ ┗ 📜chatController.js     # 상담 요청 처리 및 저장
 ┣ 📂models
 ┃ ┣ 📜userModel.js          # 사용자 DB 접근 함수
 ┃ ┗ 📜chatModel.js          # 채팅 DB 접근 함수
 ┣ 📂routes
 ┃ ┣ 📜authRoutes.js         # 인증 관련 라우터
 ┃ ┗ 📜chatRoutes.js         # 상담 관련 라우터
 ┣ 📂middlewares
 ┃ ┗ 📜auth.js               # JWT 인증 미들웨어
 ┣ 📂.github/workflows
 ┃ ┗ 📜docker.yml            # GitHub Actions 기반 CI/CD 설정
 ┣ 📜index.js                # 서버 진입점
 ┣ 📜Dockerfile              # Docker 이미지 정의
 ┣ 📜.dockerignore           # Docker 빌드시 제외할 파일
 ┣ 📜.env                    # 환경변수 파일
 ┣ 📜package.json
 ┗ 📜README.md               # 프로젝트 설명

</pre>

---

## 🔐 환경 변수 (.env 예시)

```env
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-password
DB_NAME=love_advisor
JWT_SECRET=your-secret-key
OPENAI_API_KEY=your-openai-api-key
```

---

## 🐳 배포 방법

- GitHub `main` 브랜치에 push하면 자동으로 다음 작업이 수행됩니다:
  1. Docker 이미지 빌드
  2. Docker Hub에 푸시
  3. EC2 서버에 SSH 접속
  4. `deploy.sh` 실행하여 컨테이너 재시작

> 자세한 설정은 `.github/workflows/docker.yml` 파일 참고

---

# deploy.sh
<pre>
#!/bin/bash 

CONTAINER_NAME=loveapi
IMAGE_NAME=peterseo9503/love-backend:latest
ENV_PATH=.env
PORT=5000

print_line "Pulling latest image from Docker Hub..."
docker pull $IMAGE_NAME

if [ $(docker ps -aq -f name=$CONTAINER_NAME) ]; then
  print_line "Stopping and removing existing container..."
  docker stop $CONTAINER_NAME
  docker rm $CONTAINER_NAME
fi

print_line "Running new container..."
docker run -d \
  --name $CONTAINER_NAME \
  -p $PORT:$PORT \
  --env-file $ENV_PATH \
  $IMAGE_NAME

print_line " Deployment complete!"
docker ps | grep $CONTAINER_NAME
 </pre>
---

## 👨‍💻 개발자
서동현 (PeterSeo)  
백엔드 개발 & 배포 자동화 구축 담당

---

## 📜 후기  
Express 프로젝트를 MVC 아키텍처에 맞춰 리팩토링하면서 
모듈화를 통해 코드의 응집도를 높이고 결합도를 낮추는 구조의 중요성을 체감했습니다.
단방향암호화 , 토큰서명 개념을 공부하고 실제 코드에서 적용하여 
bcrypt와 JWT를 통해 인증 시스템을 안전하게 구성하는 방법을 배웠고,  
OpenAI API를 연동하여 AI 상담 기능을 실제로 구현하면서
RESTful API 설계의 흐름과 서버-DB-클라이언트 간 데이터 흐름을 깊이 있게 이해할 수 있었습니다.
DB는 GCP의 SQL instance, 백앤드 서버는 AWS의 EC2를 사용하여 클라우드에 대한 이해도를 높였습니다. 
또 Bash shell 스크립트를 작성하여 반복적인 작업을 효율적으로 수행하는 스크립트 파일을 만들고 
GitHub Actions와 Docker를 활용하여 자동 배포가 가능한 파이프 라인을 구성했습니다.

이번 프로젝트를 통해 단순히 기능 구현을 넘어서, 구조적 설계와 보안, 클라우드, 자동화까지 전반적인 백엔드 개발의 흐름을 직접 체득할 수 있었습니다. 
혼자서 백앤드을 설계하고 구현하면서 수많은 시행착오를 겪었고, 그 과정에서 한 단계 더 성장했음을 느꼈습니다.
