
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import type { Template } from '@/types/template';

import { NavActionsMenu } from './nav-actions-menu';

interface NavItemProps {
  item: Template;
  activeItem: Template;
  onItemSelect: (item: string) => void;
  isMyTemplate?: boolean;
}

export function NavItem({
  item,
  activeItem,
  onItemSelect,
  isMyTemplate,
}: NavItemProps) {
  return (
    <SidebarMenuItem
      key={item.title}
      className="group/item"
    >
      <SidebarMenuButton
        size="sm"
        className="h-8 font-normal gap-2"
        isActive={activeItem === item}
        onClick={() => onItemSelect(item.title)}
      >
        <span>{item.title}</span>
      </SidebarMenuButton>
      {isMyTemplate && <NavActionsMenu />}
    </SidebarMenuItem>
  );
}
