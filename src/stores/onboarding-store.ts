import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingState {
  hasCompletedTour: boolean;
  isTourRunning: boolean;
  hasDismissedTour: boolean;
  currentStep: number;
  stepCompleted: boolean;
  isMcpGuideModalOpen: boolean;

  startTour: () => void;
  stopTour: () => void;
  completeTour: () => void;
  dismissTour: () => void;
  resetTour: () => void;
  setStepIndex: (index: number) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  markStepCompleted: (completed: boolean) => void;
  setMcpGuideModalOpen: (open: boolean) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasCompletedTour: false,
      isTourRunning: false,
      hasDismissedTour: false,
      currentStep: 0,
      stepCompleted: false,
      isMcpGuideModalOpen: false,

      startTour: () => set({ isTourRunning: true, hasDismissedTour: false, currentStep: 0, stepCompleted: false }),
      stopTour: () => set({ isTourRunning: false }),
      completeTour: () => set({ hasCompletedTour: true, isTourRunning: false, currentStep: 0 }),
      dismissTour: () => set({ isTourRunning: false, hasDismissedTour: true }),
      resetTour: () => set({ hasCompletedTour: false, isTourRunning: false, hasDismissedTour: false, currentStep: 0, stepCompleted: false }),
      setStepIndex: (index) => set({ currentStep: index, stepCompleted: false }),
      goToNextStep: () => set((state) => ({ currentStep: state.currentStep + 1, stepCompleted: false })),
      goToPrevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1), stepCompleted: false })),
      markStepCompleted: (completed) => set({ stepCompleted: completed }),
      setMcpGuideModalOpen: (open) => set({ isMcpGuideModalOpen: open }),
    }),
    {
      name: 'propt-onboarding-storage',
      partialize: (state) => ({
        hasCompletedTour: state.hasCompletedTour,
        hasDismissedTour: state.hasDismissedTour,
      }),
    }
  )
);
