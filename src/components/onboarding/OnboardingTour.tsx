import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Joyride, {
  ACTIONS,
  type CallBackProps,
  EVENTS,
  STATUS,
  type TooltipRenderProps,
} from 'react-joyride';

import { CustomTooltip } from '@/components/onboarding/CustomTooltip';
import { OnboardingCompletionDialog } from '@/components/onboarding/OnboardingCompletionDialog';
import { createDesktopSteps } from '@/components/onboarding/steps/desktop-steps';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { useTemplateStore } from '@/stores/template-store';

export function OnboardingTour() {
  const {
    isTourRunning,
    currentStep,
    stepCompleted,
    setStepIndex,
    goToNextStep,
    completeTour,
    dismissTour,
    markStepCompleted,
    isMcpGuideModalOpen,
  } = useOnboardingStore();

  const { activeItem, showOutputTypeBlock } = useTemplateStore();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const prevTitleRef = useRef<string | null>(null);
  const prevOutputType = useRef<string | null>(null);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  // 다크모드 감지
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const steps = useMemo(
    () => createDesktopSteps(activeItem?.title),
    [activeItem?.title]
  );

  const currentStepData = steps[currentStep];
  const completionType = currentStepData?.completionType ?? 'none';

  // 완료 조건 검증
  const checkCompletion = useCallback((): boolean => {
    if (!activeItem) return false;

    switch (completionType) {
      case 'title-change':
        return prevTitleRef.current !== null && activeItem.title !== prevTitleRef.current;

      case 'variable-input':
        return /{.+}/.test(activeItem.content ?? '');

      case 'description':
        return (activeItem.variables ?? []).some((v) => v.description && v.description.trim() !== '');

      case 'output-type-opened':
        return showOutputTypeBlock;

      case 'format-select':
        return prevOutputType.current !== null && activeItem.outputType !== prevOutputType.current;

      case 'none':
        return true;

      case 'click':
      case 'modal-open':
        return false;

      default:
        return true;
    }
  }, [activeItem, completionType, showOutputTypeBlock]);

  // 완료 조건 감시 (click, modal-open 타입은 이벤트로 처리하므로 제외)
  useEffect(() => {
    if (!isTourRunning) return;
    if (completionType === 'click' || completionType === 'modal-open') return;

    const isCompleted = checkCompletion();
    if (isCompleted !== stepCompleted) {
      markStepCompleted(isCompleted);
    }
  }, [isTourRunning, checkCompletion, stepCompleted, markStepCompleted, completionType]);

  // 스텝 변경 시 참조 값 저장
  useEffect(() => {
    if (!isTourRunning || !activeItem) return;

    if (completionType === 'title-change' && prevTitleRef.current === null) {
      prevTitleRef.current = activeItem.title;
    }

    if (completionType === 'format-select' && prevOutputType.current === null) {
      prevOutputType.current = activeItem.outputType ?? null;
    }
  }, [isTourRunning, activeItem, completionType]);

  // 스텝 변경 시 참조 값 초기화
  useEffect(() => {
    if (completionType !== 'title-change') {
      prevTitleRef.current = null;
    }
    if (completionType !== 'format-select') {
      prevOutputType.current = null;
    }
  }, [currentStep, completionType]);

  // 클릭 이벤트 핸들러 (click 타입 스텝용)
  useEffect(() => {
    if (!isTourRunning) return;

    let isProcessingClick = false;

    const handleClick = (e: MouseEvent) => {
      if (isProcessingClick) return;

      const target = e.target as HTMLElement;

      // Step 0: 새 프롬프트 만들기 버튼 클릭 시 다음 버튼 활성화
      if (currentStep === 0) {
        const clickedNewTemplateButton = target.closest('[data-tour="new-template"]');
        if (clickedNewTemplateButton) {
          setTimeout(() => markStepCompleted(true), 300);
        }
      }

      // Step 4: 형식 지정 메뉴 클릭
      if (currentStep === 4) {
        const menuButton = document.querySelector('[data-tour="output-type-menu"]') as HTMLButtonElement;
        if (menuButton) {
          const isOverlayClick = target.closest('.react-joyride__overlay') !== null;

          if (isOverlayClick) {
            const rect = menuButton.getBoundingClientRect();
            const isWithinButton =
              e.clientX >= rect.left &&
              e.clientX <= rect.right &&
              e.clientY >= rect.top &&
              e.clientY <= rect.bottom;

            if (isWithinButton) {
              isProcessingClick = true;
              menuButton.click();
              setTimeout(() => {
                isProcessingClick = false;
              }, 300);
            }
          }
        }
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [isTourRunning, currentStep, markStepCompleted]);

  // output-type-menu 스텝(4)에서는 클릭 이벤트 핸들러로 진행
  // output-type 스텝(5)에서 형식 블록이 보이는지 확인
  useEffect(() => {
    if (!isTourRunning || currentStep !== 5) return;

    // 형식 지정 블록이 아직 안 보이면 이전 스텝으로
    if (!showOutputTypeBlock) {
      setStepIndex(4);
    }
  }, [isTourRunning, currentStep, showOutputTypeBlock, setStepIndex]);

  // MCP 가이드 모달이 닫히면 완료 다이얼로그 표시
  const wasMcpGuideModalOpen = useRef(false);

  useEffect(() => {
    if (!isTourRunning || currentStep !== 7) return;

    // 모달이 열렸었는지 추적
    if (isMcpGuideModalOpen) {
      wasMcpGuideModalOpen.current = true;
    }

    // 모달이 열렸다가 닫히면 완료 다이얼로그 표시
    if (wasMcpGuideModalOpen.current && !isMcpGuideModalOpen) {
      setTimeout(() => {
        setShowCompletionDialog(true);
      }, 0);
      wasMcpGuideModalOpen.current = false;
    }
  }, [isTourRunning, currentStep, isMcpGuideModalOpen]);

  const handleJoyrideCallback = useCallback(
    (data: CallBackProps) => {
      const { status, action, type, index } = data;

      if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
        completeTour();
        return;
      }

      if (action === ACTIONS.CLOSE) {
        dismissTour();
        return;
      }

      if (type === EVENTS.STEP_AFTER) {
        if (action === ACTIONS.NEXT) {
          if (completionType === 'none' || stepCompleted) {
            goToNextStep();
          }
        } else if (action === ACTIONS.PREV) {
          setStepIndex(Math.max(0, index - 1));
        }
      }
    },
    [completeTour, dismissTour, goToNextStep, setStepIndex, completionType, stepCompleted]
  );

  const tooltipComponent = useMemo(
    () =>
      function Tooltip(props: TooltipRenderProps) {
        return (
          <CustomTooltip
            {...props}
            canProceed={stepCompleted}
            completionType={completionType}
          />
        );
      },
    [stepCompleted, completionType]
  );

  const handleCompletionDialogClose = () => {
    setShowCompletionDialog(false);
    completeTour();
  };

  if (showCompletionDialog) {
    return (
      <OnboardingCompletionDialog
        open={showCompletionDialog}
        onClose={handleCompletionDialogClose}
      />
    );
  }

  if (!isTourRunning) return null;

  const currentSpotlightClicks = currentStepData?.spotlightClicks ?? false;
  const shouldRunTour = isTourRunning && !isMcpGuideModalOpen;

  return (
    <Joyride
      steps={steps}
      stepIndex={currentStep}
      run={shouldRunTour}
      continuous
      disableOverlayClose
      disableScrolling={false}
      scrollOffset={100}
      spotlightClicks={currentSpotlightClicks}
      callback={handleJoyrideCallback}
      tooltipComponent={tooltipComponent}
      styles={{
        options: {
          arrowColor: isDarkMode ? '#27272a' : '#fff',
          backgroundColor: isDarkMode ? '#27272a' : '#fff',
          primaryColor: '#3b82f6',
          textColor: isDarkMode ? '#fafafa' : '#09090b',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
          spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        },
      }}
      locale={{
        back: '이전',
        close: '닫기',
        last: '완료',
        next: '다음',
        skip: '건너뛰기',
      }}
    />
  );
}
