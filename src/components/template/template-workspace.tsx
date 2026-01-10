import { useState } from 'react';

import { useTemplateStore } from '@/stores/template-store';
import type { TemplateVariable } from '@/types/template';

import { PreviewPanel } from '../preview';
import { TemplatePanel } from '.';

export function TemplateWorkspace() {
  const { activeItem } = useTemplateStore();

  const [variables, setVariables] = useState<TemplateVariable[]>(activeItem.variables ?? []);

  return (
    <>
      <TemplatePanel
        key={activeItem.id}
        variables={variables}
        setVariables={setVariables}
      />

      <PreviewPanel
        key={activeItem.id}
        variables={variables}
      />
    </>
  );
}
