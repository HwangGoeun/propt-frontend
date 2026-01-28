import { useState } from 'react';

import { BlockWrapper } from '@/components/common/block-wrapper';
import { Button } from '@/components/ui/button';

const DATA_TYPES = ['table', 'list', 'paragraph', 'JSON'] as const;
type DataType = typeof DATA_TYPES[number];

export function DataTypeBlock() {
  const [dataType, setDataType] = useState<DataType>('table');

  return (
    <BlockWrapper
      title={'형식 지정'} >
      <p className="text-sm">결과를 다음 형식으로 작성해주세요</p>
      <div className="flex items-center gap-4 mt-2">
        <span className="text-sm font-medium mr-2">출력 형식:</span>
        <div className="flex gap-2">
          {DATA_TYPES.map((value) => (
            <Button
              key={value}
              onClick={() => setDataType(value)}
              variant={dataType === value ? 'secondary' : 'outline'}
              className="uppercase"
            >
              {value}
            </Button>
          ))}
        </div>
      </div>
    </BlockWrapper>
  );
}
