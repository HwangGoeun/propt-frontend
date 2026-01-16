import { Card, CardContent } from '@/components/ui/card';
import { useTemplateStore } from '@/stores/template-store';

export function PreviewCard() {
  const { activeItem } = useTemplateStore();

  // activeItem이 null이면 렌더링하지 않음
  if (!activeItem) return null;

  return (
    <Card className="border-none shadow-sm bg-white dark:bg-zinc-900">
      <CardContent className="p-6 space-y-4 text-sm">
        <div className="space-y-1">
          <p className="font-semibold text-blue-600">사용자: /{activeItem.title}</p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-purple-600">Claude: 변수를 입력해주세요</p>

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
      </CardContent>
    </Card>
  );
}
