import { Plus } from 'lucide-react';

export function AddBlockPlaceholder() {
  return (
    <div className="border border-dashed rounded-lg h-32 flex flex-col items-center justify-center text-muted-foreground bg-muted/5">
      <Plus className="h-8 w-8 mb-2 opacity-50" />
      <span className="text-xs">왼쪽에서 옵션 블록을 클릭하세요</span>
    </div>
  );
}
