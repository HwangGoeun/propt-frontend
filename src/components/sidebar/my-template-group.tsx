import { useTemplates } from '@/hooks/use-templates';
import type { NavItemData, TemplateResponseDto } from '@/types/template';

import { NavGroup } from './nav-group';

interface MyTemplaetGroupProps {
  activeItem: string;
  onItemSelect: (item: string) => void;
}

export function MyTemplateGroup({ activeItem, onItemSelect }: MyTemplaetGroupProps) {
  const { data: templates = [] } = useTemplates();

  const items: NavItemData[] = (templates ?? []).map((template: TemplateResponseDto) => ({
    icon: '',
    label: template.title,
  }));

  return (
    <NavGroup
      title={'My Template'}
      items={items}
      activeItem={activeItem}
      onItemSelect={onItemSelect}
      isMyTemplate={true}
    />
  );
}
