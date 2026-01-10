
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useTemplateStore } from '@/stores/template-store';
import type { Template } from '@/types/template';

import { NavActionsMenu } from './nav-actions-menu';

interface NavItemProps {
  item: Template;
  isMyTemplate?: boolean;
}

export function NavItem({
  item,
  isMyTemplate,
}: NavItemProps) {
  const { activeItem, setActiveItem } = useTemplateStore();

  return (
    <SidebarMenuItem
      key={item.title}
      className="group/item"
    >
      <SidebarMenuButton
        size="sm"
        className="h-8 font-normal gap-2"
        isActive={activeItem === item}
        onClick={() => setActiveItem(item)}
      >
        <span>{item.title}</span>
      </SidebarMenuButton>
      {isMyTemplate && <NavActionsMenu />}
    </SidebarMenuItem>
  );
}
