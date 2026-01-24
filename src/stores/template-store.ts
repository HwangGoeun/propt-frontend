import { create } from 'zustand';

import type { SaveStatus, Template } from '@/types/template';

interface TemplateState {
  activeItem: Template | null;
  isInitialized: boolean;
  saveStatus: SaveStatus;
  showOutputTypeBlock: boolean;
  setActiveItem: (template: Template | null) => void;
  updateActiveItem: (updates: Partial<Template>) => void;
  initializeActiveItem: (template: Template | null) => void;
  setSaveStatus: (status: SaveStatus) => void;
  setShowOutputTypeBlock: (show: boolean) => void;
}

export const useTemplateStore = create<TemplateState>((set, get) => ({
  activeItem: null,
  isInitialized: false,
  saveStatus: 'idle',
  showOutputTypeBlock: false,

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
    if (!isInitialized && template) {
      set({ activeItem: template, isInitialized: true, saveStatus: 'idle' });
    } else if (!template) {
      set({ activeItem: null, saveStatus: 'idle' });
    }
  },

  setSaveStatus: (status) => {
    set({ saveStatus: status });
  },

  setShowOutputTypeBlock: (show) => {
    set({ showOutputTypeBlock: show });
  },
}));
