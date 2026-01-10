import { useTemplates } from '@/hooks/use-templates';
import type { Template, TemplateResponseDto } from '@/types/template';

import { NavGroup } from './nav-group';

export function MyTemplateGroup() {
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
      isMyTemplate={true}
    />
  );
}
