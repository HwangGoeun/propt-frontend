import { useEffect } from 'react';

import { useTemplates } from '@/hooks/use-templates';
import { useAuthStore } from '@/stores/auth-store';
import { useOnboardingStore } from '@/stores/onboarding-store';

export function useOnboarding() {
  const {
    isTourRunning,
    currentStep,
    stepCompleted,
    startTour,
    stopTour,
    completeTour: completeTourLocal,
    resetTour,
    setStepIndex,
    goToNextStep,
    goToPrevStep,
    markStepCompleted,
  } = useOnboardingStore();
  const { user, updateOnboardingStatus } = useAuthStore();
  const { isLoading } = useTemplates();

  const hasCompletedOnboarding = user?.hasCompletedOnboarding ?? false;

  useEffect(() => {
    if (isLoading || hasCompletedOnboarding || isTourRunning) {
      return;
    }

    startTour();
  }, [hasCompletedOnboarding, isTourRunning, startTour, isLoading]);

  const completeTour = async () => {
    completeTourLocal();
    await updateOnboardingStatus(true);
  };

  const restartTour = async () => {
    await updateOnboardingStatus(false);
    resetTour();
    startTour();
  };

  return {
    isTourRunning,
    currentStep,
    stepCompleted,
    stopTour,
    completeTour,
    setStepIndex,
    goToNextStep,
    goToPrevStep,
    markStepCompleted,
    restartTour,
  };
}
