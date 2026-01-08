# Propt Frontend

>**Build Pipelines, Not Chat Rooms.**

Propt는 대화형 AI(Claude, ChatGPT)를 **반복 가능한 작업 엔진**으로 활용하기 위한 프롬프트 템플릿 관리 시스템입니다. 이 저장소는 Propt 프로젝트의 **프론트엔드** 부분입니다.

---
<br>

## 📌 프로젝트 개요

### 해결하려는 문제

대화형 AI를 반복 작업에 사용할 때 발생하는 세 가지 주요 문제:

1. **컨텍스트 오염**: 이전 대화가 다음 실행에 영향을 주어 일관된 결과를 얻기 어려움
2. **프롬프트 재사용 비효율**: 같은 프롬프트를 매번 복사/붙여넣기 해야 함
3. **배치 작업 불가**: 여러 입력에 대해 일일이 수동으로 반복 실행해야 함

### 해결 방안

- **변수 기반 템플릿 시스템**: `{변수명}` 형식으로 재사용 가능한 프롬프트 템플릿 생성
- **독립적 실행 보장**: 각 실행을 완전히 새로운 AI API 세션으로 처리
- **배치 실행 지원**: 여러 변수 세트를 한 번에 입력하여 자동 실행
- **MCP 연동**: Claude Desktop에서 `/명령어` 형태로 템플릿 실행 가능

---
<br>

## 🚀 주요 기능

- ✅ **템플릿 관리 UI**: 프롬프트 템플릿 생성, 편집, 삭제 인터페이스
- ✅ **변수 자동 추출**: `{변수명}` 형식으로 템플릿 내 변수를 자동 감지
- ✅ **실시간 미리보기**: 템플릿 편집 내용을 실시간으로 미리보기
- ✅ **반응형 레이아웃**: 사이드바, 편집 영역, 미리보기 영역으로 구성된 3단 레이아웃

---
<br>

## 🛠️ 기술 스택

- **Framework**: React 19.2.0 + TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: Zustand 5.0.9
- **Icons**: Lucide React
- **Code Quality**: ESLint + Husky + lint-staged

---
<br>

## 📋 사전 요구사항

- Node.js (최신 LTS 버전 권장)
- npm 또는 pnpm

---
<br>

## 🔧 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

개발 서버가 실행되면 브라우저에서 `http://localhost:5173` (기본 포트)로 접속할 수 있습니다.

### 3. 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

### 4. 프로덕션 미리보기

```bash
npm run preview
```

---
<br>

## 📁 프로젝트 구조

```
propt-frontend/
├── src/
│   ├── components/       # 재사용 가능한 UI 컴포넌트
│   │   ├── auth/         # 인증 관련 컴포넌트
│   │   ├── common/       # 공통 컴포넌트
│   │   ├── preview/      # 미리보기 영역 컴포넌트
│   │   ├── sidebar/      # 사이드바 컴포넌트
│   │   ├── site-header/  # 헤더 컴포넌트 (다크모드, MCP 가이드 등)
│   │   ├── template/     # 템플릿 편집 컴포넌트
│   │   └── ui/           # shadcn/ui 기본 컴포넌트
│   ├── data/             # 정적 데이터 및 목업
│   ├── hooks/            # 커스텀 React 훅
│   ├── lib/              # 유틸리티 함수
│   │   └── template-utils.ts  # 변수 추출 유틸리티
│   ├── pages/            # 페이지 컴포넌트
│   │   ├── login.tsx     # 로그인 페이지
│   │   └── templates.tsx # 템플릿 메인 페이지
│   ├── types/            # TypeScript 타입 정의
│   │   └── template.ts   # 템플릿 관련 타입
│   ├── App.tsx           # 메인 앱 컴포넌트
│   └── main.tsx          # 진입점
├── public/               # 정적 자산
└── package.json
```

---
<br>

## 🔗 관련 저장소

- **Backend**: [propt-backend](https://github.com/HwangGoeun/propt-backend) - Nest.js + MCP 서버

---
<br>

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---
<br>

## 🔗 참고 자료

### 관련 문서
- [Vite 문서](https://vitejs.dev/)
- [React 문서](https://react.dev/)
- [Tailwind CSS 문서](https://tailwindcss.com/)
- [shadcn/ui 문서](https://ui.shadcn.com/)
- [Zustand 문서](https://zustand-demo.pmnd.rs/)
