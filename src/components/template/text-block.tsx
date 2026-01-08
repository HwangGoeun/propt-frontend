import { useRef } from 'react';

import { BlockWrapper } from '@/components/common/block-wrapper';
import { VariableBlock } from '@/components/template/variable-block';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { extractVariablesFromText } from '@/lib/template-utils';
import type { TemplateVariable } from '@/types/template';

interface TextBlockProps {
  order: number;
  setVariableList: (variables: TemplateVariable[]) => void;
  variableList?: TemplateVariable[] | null;
}

// TODO: 변수 설명 입력칸 구현 필요
export function TextBlock({ order, setVariableList, variableList }: TextBlockProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  function handleTextInput() {
    const text = textAreaRef.current?.value || '';

    setVariableList(extractVariablesFromText(text));
  }

  return (
    <BlockWrapper
      order={order}
      title={'텍스트 입력'}>
      <Textarea
        ref={textAreaRef}
        onChange={handleTextInput}
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
