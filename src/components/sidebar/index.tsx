import { Plus } from 'lucide-react';

import { NavGroup } from '@/components/sidebar/nav-group';
import { NavUser } from '@/components/sidebar/nav-user';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { basicTemplates } from '@/data/templates';
import { useAuthStore } from '@/stores/auth-store';

import { MyTemplateGroup } from './my-template-group';

export function AppSidebar({ ...props }) {
  const { user, logout } = useAuthStore();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-muted/10 p-4 border-b-0">
        <Button variant="outline" className="w-full justify-start gap-2">
          <Plus className="h-4 w-4" />
          새 프롬프트 만들기
        </Button>
      </SidebarHeader>

      <SidebarContent className="bg-muted/10 px-2 gap-2">
        <MyTemplateGroup />
        <NavGroup
          title={'basic templates'}
          items={basicTemplates}
        />
      </SidebarContent>

      {user && (
        <SidebarFooter className="bg-muted/10 p-2 mb-3.5 border-t border-sidebar-border">
          <NavUser user={user} onLogout={logout} />
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
