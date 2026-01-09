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
import { basicTemplateList, optionList } from '@/data/mock-templates';
import { useAuthStore } from '@/stores/auth-store';

import { MyTemplateGroup } from './my-template-group';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeItem: string;
  onItemSelect: (item: string) => void;
}

export function AppSidebar({ activeItem, onItemSelect, ...props }: AppSidebarProps) {
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
        <MyTemplateGroup
          activeItem={activeItem}
          onItemSelect={onItemSelect}
        />

        <NavGroup
          title="basic template"
          items={basicTemplateList}
          activeItem={activeItem}
          onItemSelect={onItemSelect}
        />

        <NavGroup
          title="options"
          items={optionList}
          activeItem={activeItem}
          onItemSelect={onItemSelect}
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
