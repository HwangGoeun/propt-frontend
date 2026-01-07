import { VariableBlock } from '@/components/template/variable-block';
import { Separator } from '@/components/ui/separator';
import type { TemplateVariable } from '@/types/template';

import { BlockWrapper } from '../common/block-wrapper';
import { Textarea } from '../ui/textarea';

interface TextBlockProps {
  order: number;
  variableList?: TemplateVariable[] | null;
}

export function TextBlock({ order, variableList }: TextBlockProps) {
  return (
    <BlockWrapper
      order={order}
      title={'텍스트 입력'}>
      <Textarea
        placeholder={'\'{문장}\'을 {언어}로 번역해주세요.'}
      />
      <Separator />
      <div className="space-y-4">
        <p className="text-sm font-medium">변수 설정</p>
        {
          // TODO: 삼항 연산자로 인한 가독성 저하 개선 필요
          variableList && variableList.length > 0 ?
            <div>
              {variableList.map((variable) => (
                <VariableBlock
                  key={variable.name}
                  name={variable.name}
                  description={variable.description}
                />
              ))}
            </div> :
            <div className="flex items-center justify-center gap-4 bg-muted/30 p-2 rounded-md">
              <span className="text-sm font-medium pt-0.5 text-muted-foreground">
                {'{변수}를 입력해보세요!'}
              </span>
            </div>
        }
      </div>
    </BlockWrapper>
  );
}
