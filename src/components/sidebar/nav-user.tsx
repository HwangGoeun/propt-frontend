import { BookOpen, ChevronsUpDown, LogOut, UserX } from 'lucide-react';
import { useState } from 'react';

import { UserInfo } from '@/components/common/user-info';
import { WithdrawDialog } from '@/components/sidebar/withdraw-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useOnboardingStore } from '@/stores/onboarding-store';
import type { User } from '@/types/auth';

interface NavUserProps {
  user: User;
  onLogout: () => void;
  onWithdraw: () => void;
}

export function NavUser({ user, onLogout, onWithdraw }: NavUserProps) {
  const { isMobile } = useSidebar();
  const { resetTour, startTour } = useOnboardingStore();
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);

  const handleRestartTour = () => {
    resetTour();
    startTour();
  };

  const handleWithdrawConfirm = () => {
    setWithdrawDialogOpen(false);
    onWithdraw();
  };

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <UserInfo user={user} />
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuItem onClick={handleRestartTour}>
                <BookOpen className="h-4 w-4 mr-2" />
                가이드 다시보기
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                로그아웃
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setWithdrawDialogOpen(true)}
                className="text-destructive focus:text-destructive"
              >
                <UserX className="h-4 w-4 mr-2" />
                회원 탈퇴
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <WithdrawDialog
        open={withdrawDialogOpen}
        onOpenChange={setWithdrawDialogOpen}
        onConfirm={handleWithdrawConfirm}
      />
    </>
  );
}
