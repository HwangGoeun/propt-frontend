import { create } from 'zustand';

import type { Template } from '@/types/template';

interface TemplateState {
  activeItem: Template | null;
  isInitialized: boolean;
  setActiveItem: (template: Template | null) => void;
  updateActiveItem: (updates: Partial<Template>) => void;
  initializeActiveItem: (template: Template | null) => void;
}

export const useTemplateStore = create<TemplateState>((set, get) => ({
  activeItem: null,
  isInitialized: false,

  setActiveItem: (template) => {
    set({ activeItem: template });
  },

  updateActiveItem: (updates) => {
    set((state) => ({
      activeItem: state.activeItem ? { ...state.activeItem, ...updates } : null,
    }));
  },

  initializeActiveItem: (template) => {
    const { isInitialized } = get();
    // 템플릿이 있을 때만 초기화된 것으로 간주
    if (!isInitialized && template) {
      set({ activeItem: template, isInitialized: true });
    } else if (!template) {
      // 템플릿이 없으면 activeItem을 null로 설정 (초기화 상태는 유지하지 않음)
      set({ activeItem: null });
    }
  },
}));
