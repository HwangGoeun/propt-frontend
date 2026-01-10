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
import { useCreateTemplate, useTemplates } from '@/hooks/use-templates';
import { getUniqueTitle } from '@/lib/template-utils';
import { useAuthStore } from '@/stores/auth-store';

import { MyTemplateGroup } from './my-template-group';

export function AppSidebar({ ...props }) {
  const { user, logout } = useAuthStore();
  const { data: templates = [] } = useTemplates();
  const { mutate: createTemplate } = useCreateTemplate();

  const handleCreateClick = () => {
    const newTitle = getUniqueTitle('새로운 프롬프트', templates);

    createTemplate({
      title: newTitle,
      description: null,
      content: '프롬프트를 입력해주세요.',
      variables: [],
    });
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-muted/10 p-4 border-b-0">
        <Button
          onClick={handleCreateClick}
          variant="outline"
          className="w-full justify-start gap-2"
        >
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
