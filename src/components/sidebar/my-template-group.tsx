import { useTemplates } from '@/hooks/use-templates';
import type { Template, TemplateResponseDto } from '@/types/template';

import { NavGroup } from './nav-group';

interface MyTemplaetGroupProps {
  activeItem: Template;
  onItemSelect: (item: string) => void;
}

export function MyTemplateGroup({ activeItem, onItemSelect }: MyTemplaetGroupProps) {
  const { data: templates = [] } = useTemplates();

  const items: Template[] = (templates ?? []).map((template: TemplateResponseDto): Template => ({
    id: template.id,
    title: template.title,
    description: template.description,
    content: template.content,
    variables: template.variables
  }));

  return (
    <NavGroup
      title={'My Templates'}
      items={items}
      activeItem={activeItem}
      onItemSelect={onItemSelect}
      isMyTemplate={true}
    />
  );
}
