import { BlockWrapper } from '@/components/common/block-wrapper';
import { Button } from '@/components/ui/button';

interface DataTypeBlockProps {
  order: number;
}

export function DataTypeBlock({ order }: DataTypeBlockProps) {
  return (
    <BlockWrapper
      order={order}
      title={'형식 지정'} >
      <p className="text-sm">결과를 다음 형식으로 작성해주세요</p>
      <div className="flex items-center gap-4 mt-2">
        <span className="text-sm font-medium mr-2">출력 형식:</span>
        <div className="flex gap-2">
          <Button variant="secondary" className="w-24 bg-muted/50 border shadow-sm">표</Button>
          <Button variant="outline" className="w-24">리스트</Button>
          <Button variant="outline" className="w-24">단락</Button>
          <Button variant="outline" className="w-24">JSON</Button>
        </div>
      </div>
    </BlockWrapper>
  );
}
