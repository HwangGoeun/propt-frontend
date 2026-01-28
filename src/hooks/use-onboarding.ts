import { useEffect } from 'react';

import { useTemplates } from '@/hooks/use-templates';
import { useOnboardingStore } from '@/stores/onboarding-store';

export function useOnboarding() {
  const {
    hasCompletedTour,
    isTourRunning,
    hasDismissedTour,
    currentStep,
    stepCompleted,
    startTour,
    stopTour,
    completeTour,
    dismissTour,
    resetTour,
    setStepIndex,
    goToNextStep,
    goToPrevStep,
    markStepCompleted,
  } = useOnboardingStore();
  const { isLoading } = useTemplates();

  useEffect(() => {
    // 로딩 중이거나 이미 투어를 완료했거나 실행 중이거나 사용자가 취소했으면 아무것도 하지 않음
    if (isLoading || hasCompletedTour || isTourRunning || hasDismissedTour) {
      return;
    }

    // 바로 투어 시작 - 첫 스텝에서 사용자가 직접 "새 프롬프트 만들기" 클릭
    startTour();
  }, [hasCompletedTour, isTourRunning, hasDismissedTour, startTour, isLoading]);

  return {
    isTourRunning,
    currentStep,
    stepCompleted,
    stopTour,
    completeTour,
    dismissTour,
    setStepIndex,
    goToNextStep,
    goToPrevStep,
    markStepCompleted,
    restartTour: () => {
      resetTour();
      startTour();
    }
  };
}
