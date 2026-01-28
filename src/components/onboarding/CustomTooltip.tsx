import type { TooltipRenderProps } from 'react-joyride';

import type { CompletionType } from '@/components/onboarding/steps/desktop-steps';
import { Button } from '@/components/ui/button';

interface CustomTooltipProps extends TooltipRenderProps {
  canProceed: boolean;
  completionType: CompletionType;
}

export function CustomTooltip({
  index,
  step,
  backProps,
  primaryProps,
  skipProps,
  tooltipProps,
  isLastStep,
  canProceed,
  completionType,
}: CustomTooltipProps) {
  const showNextButton = completionType !== 'modal-open';
  const isNextDisabled = !canProceed && completionType !== 'none';

  return (
    <div
      {...tooltipProps}
      className="bg-background border rounded-lg shadow-lg p-4 max-w-sm"
    >
      {step.title && (
        <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
      )}
      <div className="text-sm text-muted-foreground mb-4">{step.content}</div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" {...skipProps}>
          건너뛰기
        </Button>

        <div className="flex gap-2">
          {index > 0 && (
            <Button variant="outline" size="sm" {...backProps}>
              이전
            </Button>
          )}

          {showNextButton && (
            <Button
              size="sm"
              {...primaryProps}
              disabled={isNextDisabled}
              className={
                isNextDisabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200'
                  : 'bg-black text-white hover:bg-gray-800'
              }
            >
              {isLastStep ? '완료' : '다음'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
