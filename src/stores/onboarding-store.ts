import { create } from 'zustand';

interface OnboardingState {
  isTourRunning: boolean;
  currentStep: number;
  stepCompleted: boolean;
  isMcpGuideModalOpen: boolean;

  startTour: () => void;
  stopTour: () => void;
  completeTour: () => void;
  resetTour: () => void;
  setStepIndex: (index: number) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  markStepCompleted: (completed: boolean) => void;
  setMcpGuideModalOpen: (open: boolean) => void;
}

export const useOnboardingStore = create<OnboardingState>()((set) => ({
  isTourRunning: false,
  currentStep: 0,
  stepCompleted: false,
  isMcpGuideModalOpen: false,

  startTour: () => set({ isTourRunning: true, currentStep: 0, stepCompleted: false }),
  stopTour: () => set({ isTourRunning: false }),
  completeTour: () => set({ isTourRunning: false, currentStep: 0 }),
  resetTour: () => set({ isTourRunning: false, currentStep: 0, stepCompleted: false }),
  setStepIndex: (index) => set({ currentStep: index, stepCompleted: false }),
  goToNextStep: () => set((state) => ({ currentStep: state.currentStep + 1, stepCompleted: false })),
  goToPrevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1), stepCompleted: false })),
  markStepCompleted: (completed) => set({ stepCompleted: completed }),
  setMcpGuideModalOpen: (open) => set({ isMcpGuideModalOpen: open }),
}));
