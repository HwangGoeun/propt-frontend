import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { BlockWrapper } from '../common/block-wrapper';

interface LengthLimitBlockProps {
  order: number;
}

export function LengthLimitBlock({ order }: LengthLimitBlockProps) {
  // TODO: 추후 state로 변경
  const selectedMaxLength = '200';

  return (
    <BlockWrapper
      order={order}
      title={'길이 제한'}
    >
      <p className="text-sm">{`각 결과는 최대 ${selectedMaxLength}단어 이내로 작성해주세요`}</p>
      <div className="flex items-center gap-4 mt-2">
        <span className="text-sm font-medium mr-2">최대 길이:</span>
        <Select defaultValue="200">
          <SelectTrigger className="w-full max-w-[300px]">
            <SelectValue placeholder="길이 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100">100단어</SelectItem>
            <SelectItem value="200">200단어</SelectItem>
            <SelectItem value="500">500단어</SelectItem>
            <SelectItem value="1000">1000단어</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </BlockWrapper>
  );
}
