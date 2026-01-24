import { Card, CardContent } from '@/components/ui/card';
import { getOutputTypeInstruction } from '@/lib/output-type-utils';
import { useTemplateStore } from '@/stores/template-store';

export function PreviewCard() {
  const { activeItem } = useTemplateStore();

  if (!activeItem) return null;

  const outputType = activeItem.outputType;
  const outputInstruction = getOutputTypeInstruction(outputType);

  return (
    <Card className="border-none shadow-sm bg-white dark:bg-zinc-900">
      <CardContent className="p-6 space-y-4 text-sm">
        <div className="space-y-1">
          <p className="font-semibold text-blue-600">프로프트 {activeItem.title}</p>
        </div>

        <div className="space-y-2">
          {(activeItem.variables ?? []).map((variable) => (
            <div
              key={variable.name}
              className="pl-0 space-y-1 font-semibold text-blue-600"
            >
              <p>{variable.name}:</p>
            </div>
          ))}
        </div>

        <div className="pt-2 text-xs text-muted-foreground">
          <p>→ 입력 완료 후 실행</p>
        </div>

        {outputInstruction && (
          <div className="text-xs text-muted-foreground border-t pt-2 mt-2">
            💾 {outputInstruction}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
