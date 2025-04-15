📦 기술 스택
백엔드: Node.js, Express.js

DB: MySQL

인증: JWT 기반 로그인

비밀번호 암호화: bcrypt

AI 응답: OpenAI GPT-3.5 Turbo

배포: Docker + GitHub Actions + EC2

📁 폴더 구조

<pre>
├── config/
│   └── db.js                # MySQL 연결 풀 설정
├── controllers/
│   ├── authController.js   # 회원가입, 로그인, 토큰 검증
│   └── chatController.js   # AI 연애 상담 처리
├── models/
│   ├── userModel.js        # 회원 정보 관련 DB 함수
│   └── chatModel.js        # 채팅 로그 관련 DB 함수
├── routes/
│   └── authRoutes.js       # 인증 관련 라우터
│   └── chatRoutes.js       # 상담 관련 라우터 (※ 현재 파일 미제공)
├── middlewares/
│   └── auth.js             # JWT 토큰 검증 미들웨어
├── index.js                # 서버 엔트리포인트
├── Dockerfile              # Docker 이미지 생성 설정
├── docker.yml              # GitHub Actions용 CI/CD 설정
├── .env                    # 환경변수 (로컬에서 직접 생성 필요)
└── package.json
</pre>
  
🔐 환경변수 (.env 예시)
ini
복사
편집
DB_HOST=your-mysql-host
DB_USER=root
DB_PASSWORD=your-password
DB_NAME=love_advisor
JWT_SECRET=your-secret-key
OPENAI_API_KEY=your-openai-key
🧪 실행 방법
bash
복사
편집
# 패키지 설치
npm install

# 로컬 서버 실행
npm start
🐳 Docker 빌드 & 배포
Docker 이미지 빌드 및 푸시
GitHub의 main 브랜치에 push하면 다음 자동 작업이 수행됩니다:

Docker 이미지 빌드

Docker Hub에 푸시 (peterseo9503/love-backend:latest)

EC2 서버에 SSH로 접속하여 deploy.sh 실행

(CI/CD는 docker.yml에서 정의됨)
