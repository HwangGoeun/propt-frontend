import { Pencil } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useTemplateStore } from '@/stores/template-store';
import type { TemplateVariable } from '@/types/template';

interface TemplateHeaderProps {
  variables?: TemplateVariable[] | null;
}

export function TemplateHeader({ variables }: TemplateHeaderProps) {
  const { activeItem } = useTemplateStore();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(activeItem.title);

  function handleSave() {
    // TODO: PATCH /templates/:id API 요청 구현
    console.log(variables);
  }

  return (
    <div className="p-6 pb-2">
      <div className="flex items-center justify-between mb-2">
        <div>
          {isEditing ? (
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setIsEditing(false);
              }}
              autoFocus
              className="text-2xl h-auto py-1 px-2 w-[300px]"
            />
          ) : (
            <div
              className="flex items-center gap-2 group cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              <h2 className="text-2xl font-bold">{title}</h2>
              <Pencil className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
          <p className="text-sm text-muted-foreground mt-1">{`Claude.ai에서 /${title} 명령으로 사용 가능`}</p>
        </div>
        <Button
          onClick={handleSave}
          variant="outline"
        >
          저장하기
        </Button>
      </div>
      <Separator className="my-4" />
    </div>
  );
}
