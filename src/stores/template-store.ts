import { create } from 'zustand';

import { basicTemplates } from '@/data/templates';
import type { Template } from '@/types/template';

interface TemplateState {
  activeItem: Template;
  setActiveItem: (template: Template) => void;
}

export const useTemplateStore = create<TemplateState>((set) => ({
  activeItem: { ...basicTemplates[0] },

  setActiveItem: (template) => {
    set({ activeItem: template });
  },
}));
