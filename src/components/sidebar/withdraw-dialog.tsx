import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface WithdrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function WithdrawDialog({ open, onOpenChange, onConfirm }: WithdrawDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>정말 탈퇴하시겠습니까?</DialogTitle>
          <DialogDescription>
            모든 데이터가 삭제되며 이 작업은 되돌릴 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            탈퇴하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
