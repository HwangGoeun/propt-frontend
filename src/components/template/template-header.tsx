import { Check, Loader2, Pencil, RotateCw } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useUpdateTemplate } from '@/hooks/use-templates';
import { useTemplateStore } from '@/stores/template-store';

export function TemplateHeader() {
  const { activeItem, updateActiveItem, saveStatus } = useTemplateStore();
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateTemplate } = useUpdateTemplate(activeItem?.id ?? '');

  if (!activeItem) return null;

  const handleRetry = () => {
    updateTemplate({
      title: activeItem.title,
      content: activeItem.content,
      variables: activeItem.variables,
    });
  };

  return (
    <div className="p-4 md:p-6 pb-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <div className="min-w-0">
          {isEditing ? (
            <Input
              value={activeItem.title}
              onChange={(e) => updateActiveItem({ title: e.target.value })}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setIsEditing(false);
              }}
              autoFocus
              className="text-xl md:text-2xl h-auto py-1 px-2 w-full max-w-[300px]"
              data-tour="template-title"
            />
          ) : (
            <div
              className="flex items-center gap-2 group cursor-pointer"
              onClick={() => setIsEditing(true)}
              data-tour="template-title"
            >
              <h2 className="text-xl md:text-2xl font-bold truncate">{activeItem.title}</h2>
              <Pencil className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </div>
          )}
          <p className="text-xs md:text-sm text-muted-foreground mt-1 truncate">{`"프로프트 ${activeItem.title}" 명령어를 입력하여 실행해보세요!`}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {saveStatus === 'editing' && (
            <div className="flex items-center text-muted-foreground text-sm gap-1.5">
              <Pencil className="w-3 h-3" />
              <span>작성 중...</span>
            </div>
          )}
          {saveStatus === 'saving' && (
            <div className="flex items-center text-muted-foreground text-sm gap-1.5">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>저장 중...</span>
            </div>
          )}
          {saveStatus === 'saved' && (
            <div className="flex items-center text-green-600 text-sm gap-1.5">
              <Check className="w-4 h-4" />
              <span>저장됨</span>
            </div>
          )}
          {saveStatus === 'error' && (
            <div className="flex items-center gap-2">
              <span className="text-destructive text-sm">저장 실패</span>
              <Button
                size="sm"
                variant="outline"
                onClick={handleRetry}
                className="h-8 px-2"
              >
                <RotateCw className="w-3 h-3 mr-1" />
                재시도
              </Button>
            </div>
          )}
        </div>
      </div>
      <Separator className="my-4" />
    </div>
  );
}
