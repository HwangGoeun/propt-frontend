import type { Step } from 'react-joyride';

export type CompletionType =
  | 'click'              // 클릭하면 다음 버튼 활성화
  | 'title-change'       // 제목 변경 후 다음 버튼
  | 'variable-input'     // {변수} 패턴 감지 후 다음 버튼
  | 'description'        // 설명 입력 후 다음 버튼
  | 'output-type-opened' // 형식 지정 블록이 열리면 다음 버튼
  | 'format-select'      // 형식 선택하면 자동 진행
  | 'none'               // 조건 없음, 다음 버튼으로 진행
  | 'modal-open';        // 모달 열리면 완료

export interface OnboardingStep extends Step {
  completionType: CompletionType;
  spotlightClicks?: boolean;
}

export const createDesktopSteps = (templateTitle?: string): OnboardingStep[] => [
  {
    target: '[data-tour="new-template"]',
    title: '새 프롬프트 만들기',
    content: '버튼을 클릭해서 새 프롬프트를 만들어보세요!',
    disableBeacon: true,
    completionType: 'click',
    spotlightClicks: true,
  },
  {
    target: '[data-tour="template-title"]',
    title: '템플릿 제목',
    content: '템플릿 이름을 수정해보세요. 클릭하면 편집할 수 있어요.',
    completionType: 'title-change',
    spotlightClicks: true,
  },
  {
    target: '[data-tour="prompt-input"]',
    title: '프롬프트 작성',
    content: '{단어} 처럼 대괄호를 이용하면 변수를 만들 수 있습니다. \'단어\' 글자에 대괄호를 감싸보세요.',
    completionType: 'variable-input',
    spotlightClicks: true,
  },
  {
    target: '[data-tour="variable-block"]',
    title: '변수 설명',
    content: '변수를 클릭해서 설명을 입력해보세요. 설명을 추가하면 나중에 템플릿을 실행할 때 어떤 값을 입력해야 하는지 쉽게 알 수 있어요.',
    completionType: 'description',
    spotlightClicks: true,
  },
  {
    target: '[data-tour="output-type-menu"]',
    title: '형식 지정 메뉴',
    content: '형식 지정 메뉴를 클릭해서 출력 형식을 설정해보세요.',
    completionType: 'output-type-opened',
    spotlightClicks: false,
  },
  {
    target: '[data-tour="output-type"]',
    title: '출력 형식',
    content: '원하는 출력 형식을 선택하세요 (Markdown, JSON, 표 등).',
    completionType: 'format-select',
    spotlightClicks: true,
  },
  {
    target: '[data-tour="preview-panel"]',
    title: '미리보기',
    content: `MCP에서 "프로프트 ${templateTitle || '템플릿 제목'}" 입력을 통해 이 템플릿을 실행할 수 있어요.`,
    completionType: 'none',
    spotlightClicks: false,
  },
  {
    target: '[data-tour="mcp-guide"]',
    title: 'MCP 설정',
    content: 'Claude Desktop에서 사용하려면 여기서 MCP 설정 방법을 확인하세요.',
    completionType: 'modal-open',
    spotlightClicks: true,
  },
];
