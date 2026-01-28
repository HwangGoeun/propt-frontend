import { PartyPopper } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface OnboardingCompletionDialogProps {
  open: boolean;
  onClose: () => void;
}

export function OnboardingCompletionDialog({ open, onClose }: OnboardingCompletionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <PartyPopper className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <DialogTitle className="text-center text-xl">
            축하합니다!
          </DialogTitle>
          <DialogDescription className="text-center">
            프로프트 사용법 체험을 모두 완료했습니다!
            <br />
            이제 나만의 프롬프트 템플릿을 만들어보세요.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-4">
          <Button onClick={onClose}>
            시작하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
