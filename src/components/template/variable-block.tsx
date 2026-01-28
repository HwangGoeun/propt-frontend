import { Pencil } from 'lucide-react';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { useTemplateStore } from '@/stores/template-store';
import type { TemplateVariable } from '@/types/template';

interface VariableBlockProps {
  variable: TemplateVariable;
}

export function VariableBlock({ variable }: VariableBlockProps) {
  const { activeItem, updateActiveItem } = useTemplateStore();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(variable.description);

  if (!activeItem) return null;

  function handleChange(value: string) {
    setDescription(value);

    if (!activeItem) return;

    const newVariables = (activeItem.variables ?? []).map((v) =>
      v.name === variable.name
        ? { ...v, description: value }
        : v
    );
    updateActiveItem({ variables: newVariables });
  }

  function handleBlur() {
    setIsEditing(false);
  }

  return (
    <div className="flex items-center gap-4 bg-muted/30 p-2 rounded-md">
      <div className="min-w-20">
        <span className="text-sm font-bold text-blue-600">
          {`{${variable.name}}`}
        </span>
      </div>
      {isEditing ? (
        <Input
          value={description ?? ''}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleBlur();
          }}
          autoFocus
          className="text-xs text-muted-foreground h-auto py-1 px-2 w-full"
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="w-full"
        >
          <div className="flex group gap-2 text-xs text-muted-foreground cursor-pointer">
            <span>{description || '예: 영어로 번역 할 단어를 입력하세요'}</span>
            <Pencil className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      )}
    </div>
  );
}
