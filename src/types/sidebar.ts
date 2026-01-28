import type { Template } from './template';

export interface BaseNavGroupProps {
  title: string;
}

export interface TemplateNavGroupProps extends BaseNavGroupProps {
  items: Template[];
}

export type OptionId = 'output-type';

export interface OptionItem {
  id: OptionId;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
}

export interface OptionNavGroupProps extends BaseNavGroupProps {
  options: OptionItem[];
}
