import { Pencil } from 'lucide-react';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import type { TemplateVariable } from '@/types/template';

interface VariableBlockProps {
  variable: TemplateVariable;
}

export function VariableBlock({ variable }: VariableBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(variable.description);

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
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setIsEditing(false);
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
            <span>{description ?? '변수에 대한 설명을 입력해주세요'}</span>
            <Pencil className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      )}
    </div>
  );
}
