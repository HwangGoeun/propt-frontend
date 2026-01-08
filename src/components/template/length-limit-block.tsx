import { useState } from 'react';

import { BlockWrapper } from '@/components/common/block-wrapper';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LengthLimitBlockProps {
  order: number;
}

const LENGTH_LIMITS = ['100', '200', '500', '1000'] as const;
type LengthLimit = typeof LENGTH_LIMITS[number];

export function LengthLimitBlock({ order }: LengthLimitBlockProps) {
  const [lengthLimit, setLengthLimit] = useState<LengthLimit>('100');

  return (
    <BlockWrapper
      order={order}
      title={'길이 제한'}
    >
      <p className="text-sm">{`각 결과는 최대 ${lengthLimit} 단어 이내로 작성해주세요`}</p>
      <div className="flex items-center gap-4 mt-2">
        <span className="text-sm font-medium mr-2">최대 길이:</span>
        <Select
          defaultValue={lengthLimit}
          onValueChange={(value) => {
            setLengthLimit(value as LengthLimit);
          }}
        >
          <SelectTrigger className="w-full max-w-[300px]">
            <SelectValue placeholder="길이 선택" />
          </SelectTrigger>
          <SelectContent>
            {
              LENGTH_LIMITS.map((lengthLimit) => (
                <SelectItem
                  key={lengthLimit}
                  value={lengthLimit}
                >
                  {`${lengthLimit} 단어`}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      </div>
    </BlockWrapper>
  );
}
