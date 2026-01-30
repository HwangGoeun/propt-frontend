import { useEffect, useState } from 'react';

import { BlockWrapper } from '@/components/common/block-wrapper';
import { ConfirmDialog } from '@/components/common/confirm-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PRESET_OPTIONS, PRESET_VALUES } from '@/lib/output-type-utils';
import { useTemplateStore } from '@/stores/template-store';

export function OutputTypeBlock() {
  const { activeItem, updateActiveItem, setShowOutputTypeBlock } =
    useTemplateStore();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const currentType = activeItem?.outputType ?? null;
  const isCustomType = currentType && !PRESET_VALUES.includes(currentType as typeof PRESET_VALUES[number]);

  useEffect(() => {
    if (activeItem && !activeItem.outputType) {
      updateActiveItem({ outputType: 'markdown' });
    }
  }, [activeItem, updateActiveItem]);

  const [lastSyncedType, setLastSyncedType] = useState(activeItem?.outputType ?? null);

  if (currentType !== lastSyncedType) {
    setLastSyncedType(currentType);

    if (isCustomType && currentType && currentType !== customInput.trim()) {
      setCustomInput(currentType);
    }
  }

  if (!activeItem) return null;

  const handlePresetClick = (value: string) => {
    setCustomInput('');
    updateActiveItem({ outputType: value });
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomInput(value);

    if (value.trim()) {
      updateActiveItem({ outputType: value.trim() });
    }
  };

  const handleClose = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    updateActiveItem({ outputType: null });
    setShowOutputTypeBlock(false);
  };

  return (
    <>
      <div data-tour="output-type">
        <BlockWrapper title="형식 지정" onClose={handleClose}>
          <p className="text-sm text-muted-foreground mb-4">
            결과를 다음 형식으로 작성해주세요
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium">출력 형식:</span>

              {PRESET_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  variant={currentType === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handlePresetClick(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">직접 입력:</span>
              <Input
                type="text"
                placeholder="예: pdf, docx, pptx"
                value={customInput}
                onChange={handleCustomInputChange}
                className="max-w-[200px]"
              />
            </div>
          </div>
        </BlockWrapper>
      </div>

      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="형식 지정 삭제"
        description="설정된 출력 형식을 삭제하시겠습니까?"
        confirmText="삭제"
        variant="destructive"
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
