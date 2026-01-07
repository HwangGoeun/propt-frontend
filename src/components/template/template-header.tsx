import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface TemplateHeaderProps {
  title: string;
}

export function TemplateHeader({ title }: TemplateHeaderProps) {
  return (
    <div className="p-6 pb-2">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{`Claude.ai에서 /${title} 명령으로 사용 가능`}</p>
        </div>
        <Button variant="outline">저장하기</Button>
      </div>
      <Separator className="my-4" />
    </div>
  );
}
