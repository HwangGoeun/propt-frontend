import type { OptionId } from '@/types/sidebar';

interface SidebarOptionConfig {
  id: OptionId;
  label: string;
  icon: string;
}

export const SIDEBAR_OPTIONS = {
  OUTPUT_TYPE: {
    id: 'output-type',
    label: '형식 지정',
    icon: '💾'
  },
} as const satisfies Record<string, SidebarOptionConfig>;
