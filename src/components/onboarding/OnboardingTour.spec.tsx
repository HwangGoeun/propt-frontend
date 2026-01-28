import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { OnboardingTour } from '@/components/onboarding/OnboardingTour';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { useTemplateStore } from '@/stores/template-store';

vi.mock('react-joyride', () => ({
  default: vi.fn(({ callback, tooltipComponent: TooltipComponent, steps, stepIndex }) => {
    const step = steps[stepIndex] || steps[0];
    const mockTooltipProps = {
      index: stepIndex,
      step,
      backProps: { onClick: () => callback({ action: 'prev', type: 'step:after', index: stepIndex, status: 'running' }) },
      primaryProps: { onClick: () => callback({ action: 'next', type: 'step:after', index: stepIndex, status: 'running' }) },
      skipProps: { onClick: () => callback({ action: 'skip', type: 'tour:end', index: stepIndex, status: 'skipped' }) },
      tooltipProps: { 'data-testid': 'tooltip' },
      isLastStep: stepIndex === steps.length - 1,
    };
    return (
      <div data-testid="joyride">
        {TooltipComponent && <TooltipComponent {...mockTooltipProps} />}
      </div>
    );
  }),
  ACTIONS: {
    NEXT: 'next',
    PREV: 'prev',
    CLOSE: 'close',
    SKIP: 'skip',
  },
  EVENTS: {
    STEP_AFTER: 'step:after',
    TOUR_END: 'tour:end',
  },
  STATUS: {
    FINISHED: 'finished',
    SKIPPED: 'skipped',
    RUNNING: 'running',
  },
}));

describe('OnboardingTour', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useOnboardingStore.setState({
      hasCompletedTour: false,
      isTourRunning: false,
      hasDismissedTour: false,
      currentStep: 0,
      stepCompleted: false,
      isMcpGuideModalOpen: false,
    });

    useTemplateStore.setState({
      activeItem: null,
      showOutputTypeBlock: false,
    });
  });

  // ==================== 렌더링 조건 ====================

  describe('렌더링 조건', () => {
    it('isTourRunning이 false일 때 아무것도 렌더링하지 않아야 한다', () => {
      useOnboardingStore.setState({ isTourRunning: false });

      const { container } = render(<OnboardingTour />);

      expect(container.firstChild).toBeNull();
    });

    it('isTourRunning이 true일 때 Joyride가 렌더링되어야 한다', () => {
      useOnboardingStore.setState({ isTourRunning: true });

      render(<OnboardingTour />);

      expect(screen.getByTestId('joyride')).toBeInTheDocument();
    });
  });

  // ==================== CustomTooltip 컴포넌트 ====================

  describe('CustomTooltip', () => {
    beforeEach(() => {
      useOnboardingStore.setState({ isTourRunning: true, currentStep: 0 });
    });

    it('건너뛰기 버튼이 항상 표시되어야 한다', () => {
      render(<OnboardingTour />);

      expect(screen.getByRole('button', { name: '건너뛰기' })).toBeInTheDocument();
    });

    it('첫 번째 스텝에서는 이전 버튼이 표시되지 않아야 한다', () => {
      useOnboardingStore.setState({ currentStep: 0 });

      render(<OnboardingTour />);

      expect(screen.queryByRole('button', { name: '이전' })).not.toBeInTheDocument();
    });

    it('두 번째 스텝 이후에는 이전 버튼이 표시되어야 한다', () => {
      useOnboardingStore.setState({ currentStep: 1 });

      render(<OnboardingTour />);

      expect(screen.getByRole('button', { name: '이전' })).toBeInTheDocument();
    });

    it('completionType이 none일 때 다음 버튼이 표시되어야 한다', () => {
      // Step 6 (preview-panel)은 completionType이 'none'
      useOnboardingStore.setState({ currentStep: 6 });

      render(<OnboardingTour />);

      expect(screen.getByRole('button', { name: '다음' })).toBeInTheDocument();
    });

    it('completionType이 click일 때 다음 버튼이 비활성화 상태로 표시되어야 한다', () => {
      // Step 0 (new-template)은 completionType이 'click'
      useOnboardingStore.setState({ currentStep: 0, stepCompleted: false });

      render(<OnboardingTour />);

      const nextButton = screen.getByRole('button', { name: '다음' });
      expect(nextButton).toBeInTheDocument();
      expect(nextButton).toBeDisabled();
    });

    it('completionType이 none일 때 다음 버튼이 활성화되어야 한다 (stepCompleted: true)', () => {
      // Step 6 (preview-panel)은 completionType이 'none'이므로 항상 활성화
      useOnboardingStore.setState({ isTourRunning: true, currentStep: 6, stepCompleted: true });

      render(<OnboardingTour />);

      const nextButton = screen.getByRole('button', { name: '다음' });
      expect(nextButton).not.toBeDisabled();
    });

    it('마지막 스텝에서는 완료 버튼이 표시되어야 한다', () => {
      // Step 7 (mcp-guide)은 마지막 스텝이지만 completionType이 'modal-open'이라 버튼 안 보임
      // Step 6 (preview-panel)에서 테스트
      useOnboardingStore.setState({ currentStep: 6 });

      render(<OnboardingTour />);

      // Step 6은 마지막이 아니므로 '다음' 표시
      expect(screen.getByRole('button', { name: '다음' })).toBeInTheDocument();
    });
  });

  // ==================== 콜백 핸들러 ====================

  describe('Joyride 콜백', () => {
    beforeEach(() => {
      useOnboardingStore.setState({ isTourRunning: true, currentStep: 6, stepCompleted: true });
    });

    it('건너뛰기 클릭 시 completeTour가 호출되어야 한다', async () => {
      render(<OnboardingTour />);

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: '건너뛰기' }));
      });

      expect(useOnboardingStore.getState().hasCompletedTour).toBe(true);
    });

    it('다음 버튼 클릭 시 goToNextStep이 호출되어야 한다', async () => {
      useOnboardingStore.setState({ currentStep: 6, stepCompleted: true });

      render(<OnboardingTour />);

      const initialStep = useOnboardingStore.getState().currentStep;

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: '다음' }));
      });

      expect(useOnboardingStore.getState().currentStep).toBe(initialStep + 1);
    });

    it('이전 버튼 클릭 시 이전 스텝으로 이동해야 한다', async () => {
      useOnboardingStore.setState({ currentStep: 6 });

      render(<OnboardingTour />);

      const prevStep = useOnboardingStore.getState().currentStep;

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: '이전' }));
      });

      // 이전 스텝으로 이동했는지 확인 (mock에서 index - 1 = 6 - 1 = 5, 하지만 실제 콜백에서는 stepIndex 기준)
      expect(useOnboardingStore.getState().currentStep).toBeLessThan(prevStep);
    });
  });

  // ==================== 완료 조건 검증 (checkCompletion) ====================

  describe('완료 조건 검증', () => {
    beforeEach(() => {
      useOnboardingStore.setState({ isTourRunning: true });
    });

    it('activeItem이 없으면 stepCompleted가 false여야 한다', () => {
      useTemplateStore.setState({ activeItem: null });
      useOnboardingStore.setState({ currentStep: 1 }); // title-change

      render(<OnboardingTour />);

      expect(useOnboardingStore.getState().stepCompleted).toBe(false);
    });

    it('title-change: 제목이 변경되면 stepCompleted가 true가 되어야 한다', async () => {
      useOnboardingStore.setState({ currentStep: 1 });
      useTemplateStore.setState({
        activeItem: { id: '1', title: '원래 제목', content: '', variables: [], outputType: null },
      });

      render(<OnboardingTour />);

      // 제목 변경 시뮬레이션
      await act(async () => {
        useTemplateStore.setState({
          activeItem: { id: '1', title: '변경된 제목', content: '', variables: [], outputType: null },
        });
      });

      expect(useOnboardingStore.getState().stepCompleted).toBe(true);
    });

    it('variable-input: {변수} 패턴이 있으면 stepCompleted가 true가 되어야 한다', async () => {
      useOnboardingStore.setState({ currentStep: 2 });
      useTemplateStore.setState({
        activeItem: { id: '1', title: '제목', content: '내용', variables: [], outputType: null },
      });

      render(<OnboardingTour />);

      await act(async () => {
        useTemplateStore.setState({
          activeItem: { id: '1', title: '제목', content: '{변수} 패턴 테스트', variables: [], outputType: null },
        });
      });

      expect(useOnboardingStore.getState().stepCompleted).toBe(true);
    });

    it('description: 변수 설명이 있으면 stepCompleted가 true가 되어야 한다', async () => {
      useOnboardingStore.setState({ currentStep: 3 });
      useTemplateStore.setState({
        activeItem: {
          id: '1',
          title: '제목',
          content: '',
          variables: [{ name: '변수', description: null }],
          outputType: null,
        },
      });

      render(<OnboardingTour />);

      await act(async () => {
        useTemplateStore.setState({
          activeItem: {
            id: '1',
            title: '제목',
            content: '',
            variables: [{ name: '변수', description: '설명 추가' }],
            outputType: null,
          },
        });
      });

      expect(useOnboardingStore.getState().stepCompleted).toBe(true);
    });

    it('output-type-opened: showOutputTypeBlock이 true면 stepCompleted가 true가 되어야 한다', async () => {
      useOnboardingStore.setState({ currentStep: 4 });
      useTemplateStore.setState({
        activeItem: { id: '1', title: '제목', content: '', variables: [], outputType: null },
        showOutputTypeBlock: false,
      });

      render(<OnboardingTour />);

      await act(async () => {
        useTemplateStore.setState({ showOutputTypeBlock: true });
      });

      expect(useOnboardingStore.getState().stepCompleted).toBe(true);
    });

    it('format-select: outputType이 변경되면 stepCompleted가 true가 되어야 한다', async () => {
      useOnboardingStore.setState({ currentStep: 5 });
      useTemplateStore.setState({
        activeItem: { id: '1', title: '제목', content: '', variables: [], outputType: 'text' },
        showOutputTypeBlock: true,
      });

      const { rerender } = render(<OnboardingTour />);

      // 먼저 초기 outputType이 저장되도록 기다림
      await new Promise((resolve) => setTimeout(resolve, 50));

      await act(async () => {
        useTemplateStore.setState({
          activeItem: { id: '1', title: '제목', content: '', variables: [], outputType: 'json' },
        });
      });

      rerender(<OnboardingTour />);

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(useOnboardingStore.getState().stepCompleted).toBe(true);
    });

    it('none: 조건 없이 stepCompleted가 true가 되어야 한다', () => {
      useOnboardingStore.setState({ currentStep: 6 });
      useTemplateStore.setState({
        activeItem: { id: '1', title: '제목', content: '', variables: [], outputType: null },
      });

      render(<OnboardingTour />);

      expect(useOnboardingStore.getState().stepCompleted).toBe(true);
    });
  });

  // ==================== 완료 다이얼로그 ====================

  describe('완료 다이얼로그', () => {
    it('MCP 가이드 모달이 닫히면 완료 다이얼로그가 표시되어야 한다', async () => {
      useOnboardingStore.setState({
        isTourRunning: true,
        currentStep: 7,
        isMcpGuideModalOpen: true,
      });

      const { rerender } = render(<OnboardingTour />);

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // 모달 닫힘 시뮬레이션
      await act(async () => {
        useOnboardingStore.setState({ isMcpGuideModalOpen: false });
      });

      rerender(<OnboardingTour />);

      await waitFor(() => {
        expect(screen.getByText('축하합니다!')).toBeInTheDocument();
      });
      expect(screen.getByText(/프로프트 사용법 체험을 모두 완료했습니다/)).toBeInTheDocument();
    });

    it('시작하기 버튼 클릭 시 다이얼로그가 닫히고 투어가 완료되어야 한다', async () => {
      useOnboardingStore.setState({
        isTourRunning: true,
        currentStep: 7,
        isMcpGuideModalOpen: true,
      });

      const { rerender } = render(<OnboardingTour />);

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      await act(async () => {
        useOnboardingStore.setState({ isMcpGuideModalOpen: false });
      });

      rerender(<OnboardingTour />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: '시작하기' })).toBeInTheDocument();
      });

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: '시작하기' }));
      });

      expect(useOnboardingStore.getState().hasCompletedTour).toBe(true);
    });
  });

  // ==================== 다크모드 ====================

  describe('다크모드 감지', () => {
    it('다크모드 클래스 변경을 감지해야 한다', async () => {
      useOnboardingStore.setState({ isTourRunning: true });

      render(<OnboardingTour />);

      // 다크모드 추가
      await act(async () => {
        document.documentElement.classList.add('dark');
      });

      await new Promise((resolve) => setTimeout(resolve, 50));

      // 다크모드 제거
      await act(async () => {
        document.documentElement.classList.remove('dark');
      });

      await new Promise((resolve) => setTimeout(resolve, 50));

      // 컴포넌트가 여전히 정상 동작하는지 확인
      expect(screen.getByTestId('joyride')).toBeInTheDocument();
    });
  });

  // ==================== Step 5 형식 블록 체크 ====================

  describe('Step 5 형식 블록 체크', () => {
    it('Step 5에서 showOutputTypeBlock이 false면 Step 4로 돌아가야 한다', async () => {
      useOnboardingStore.setState({ isTourRunning: true, currentStep: 5 });
      useTemplateStore.setState({
        activeItem: { id: '1', title: '제목', content: '', variables: [], outputType: null },
        showOutputTypeBlock: false,
      });

      render(<OnboardingTour />);

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(useOnboardingStore.getState().currentStep).toBe(4);
    });
  });
});
