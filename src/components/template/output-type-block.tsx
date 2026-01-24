import { useEffect, useState } from 'react';

import { BlockWrapper } from '@/components/common/block-wrapper';
import { ConfirmDialog } from '@/components/common/confirm-dialog';
import { Button } from '@/components/ui/button';
import { PRESET_OPTIONS } from '@/lib/output-type-utils';
import { useTemplateStore } from '@/stores/template-store';

export function OutputTypeBlock() {
  const { activeItem, updateActiveItem, setShowOutputTypeBlock } =
    useTemplateStore();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const currentType = activeItem?.outputType ?? null;

  useEffect(() => {
    if (activeItem && !activeItem.outputType) {
      updateActiveItem({ outputType: 'markdown' });
    }
  }, [activeItem, updateActiveItem]);

  if (!activeItem) return null;

  const handlePresetClick = (value: string) => {
    updateActiveItem({ outputType: value });
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
        </div>
      </BlockWrapper>

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
