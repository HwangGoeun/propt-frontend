import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTemplateStore } from '@/stores/template-store';
import type { TemplateVariable } from '@/types/template';

interface TemplateHeaderProps {
  variables?: TemplateVariable[] | null;
}

export function TemplateHeader({ variables }: TemplateHeaderProps) {
  const { activeItem } = useTemplateStore();

  function handleSave() {
    // TODO: PATCH /templates/:id API 요청 구현
    console.log(variables);
  }

  return (
    <div className="p-6 pb-2">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold">{activeItem.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{`Claude.ai에서 /${activeItem.title} 명령으로 사용 가능`}</p>
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
