# 차세대 KOS App 프로젝트

> 개발 후 반드시 빌드(`pnpm build`)하여 오류 미검출 시 소스 코드를 저장소로 올립니다.
***  

## 시작 가이드

### 요구 사항

- Node.js v20.15.1 이상
- pnpm v9 이상

### 설치 및 실행

```bash  
// package
pnpm install

// Flutter BottomNavigationBar 대체 바텀 네비게이션 노출을 위한 run
pnpm run local
```  

***  

## 프로젝트 정보

### 기술 스택

![My Skills](https://skillicons.dev/icons?i=react,nextjs,tailwind,js,ts,pnpm,docker)

### 프로젝트 구조

```  
📦 project
│
├── 🗂️ docker                 // 서비스 배포 관련
│
├── 🗂️ public
│ └── 🗂️ icons                // svg 아이콘, 이미지 파일
│
├── 🗂️ src
│ ├── 🗂️ app                  
│ │   ├── 🗂️ _components      // 공통 컴포넌트
│ │   ├── 🗂️ _fonts           // 폰트
│ │   ├── 🗂️ _lib             // 외부 라이브러리
│ │   ├── 🗂️ _store           // 전역 상태 관리 대상인 state
│ │   └── 🗂️ ...              // 라우팅 관련
│ │
│ ├── 🗂️ hooks                // 공통 커스텀 훅
│ ├── 🗂️ stories              // Storybook 관련
│ └── 🗂️ utils                // 공통 유틸리티 함수
```  

***  

## 부가 설정

### ![My Skills](https://skillicons.dev/icons?i=idea)

> ***ESLint***
>
> IntelliJ - 설정 - 언어 및 프레임워크 - JavaScript - 코드 품질 도구 - ESLint - `수동 ESLint 구성` 체크 활성화 - ESLint 패키지 경로 지정 - 구성 파일 경로
> 지정 -  
`저장 시 eslint --fix 실행` 체크 활성화

> ***Prettier***
>
> IntelliJ - 설정 - 플러그인 - Prettier 설치 - 언어 및 프레임워크 - JavaScript - Prettier - `수동 Prettier 구성` 체크 활성화 - Prettier 패키지 경로  
> 지정 - `'코드 서식 다시 지정' 액션 시 실행` 체크 활성화 - `저장 시 실행` 체크 활성화

> ***파일 저장 시 자동 코드 정렬 기능 활성화***
>
> IntelliJ - 설정 - 도구 - 저장 시 액션 - `코드 서식 다시 지정` 체크 활성화

> ***주석 태그 활용 및 커밋 옵션 제외 처리***
>
> IntelliJ - 기본 설정 - 설정 - 에디터 - 할일 목록 - 추가 - `NOTE` 패턴 입력 - `색 구성표 TODO 디폴트 색상 사용` 체크 비활성화 - 전경 헥스코드 영역 클릭 - `00a8ff`
> 헥스  
> 코드 입력 후 선택 - 확인 - 적용 - 확인
>
> IntelliJ - 커밋 탭 - 커밋 및 푸시 버튼 우측의 커밋 옵션 표시 - `TODO 확인` 체크 비활성화

### ![My Skills](https://skillicons.dev/icons?i=vscode)

> ***ESLint***
>
> Visual Studio Code - 기본 설정 - 확장 - ESLint 검색 후 설치

> ***Prettier***
>
> Visual Studio Code - 기본 설정 - 확장 - Prettier 검색 후 설치 - 기본 설정 - 설정 - `default formatter` 검색 - 텍스트 편집기 - 셀렉터에서  
`Prettier - Code formatter` 선택

> ***파일 저장 시 자동 코드 정렬 기능 활성화***
>
> Visual Studio Code - 기본 설정 - 설정 - `format on save` 검색 - `Editor: Format On Save` 체크 활성화  