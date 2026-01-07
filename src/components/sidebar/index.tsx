import { Plus } from 'lucide-react';

import { NavGroup } from '@/components/sidebar/nav-group';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { basicTemplateList, myTemplateList, optionList } from '@/data/mock-templates';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeItem: string;
  onItemSelect: (item: string) => void;
}

export function AppSidebar({ activeItem, onItemSelect, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-muted/10 p-4 border-b-0">
        <Button variant="outline" className="w-full justify-start gap-2">
          <Plus className="h-4 w-4" />
          새 프롬프트 만들기
        </Button>
      </SidebarHeader>

      <SidebarContent className="bg-muted/10 px-2 gap-2">
        {/* My Template Category */}
        <NavGroup
          title="my template"
          items={myTemplateList}
          activeItem={activeItem}
          onItemSelect={onItemSelect}
          isMyTemplate={true}
        />

        {/* Basic Template Category */}
        <NavGroup
          title="basic template"
          items={basicTemplateList}
          activeItem={activeItem}
          onItemSelect={onItemSelect}
        />

        {/* Options Category */}
        <NavGroup
          title="options"
          items={optionList}
          activeItem={activeItem}
          onItemSelect={onItemSelect}
        />
      </SidebarContent>
    </Sidebar>
  );
}
