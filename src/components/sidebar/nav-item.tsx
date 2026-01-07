
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import type { NavItemData } from '@/types/template';

import { NavActionsMenu } from './nav-actions-menu';

interface NavItemProps {
  item: NavItemData;
  activeItem: string;
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
      key={item.label}
      className="group/item"
    >
      <SidebarMenuButton
        size="sm"
        className="h-8 font-normal gap-2"
        isActive={activeItem === item.label}
        onClick={() => onItemSelect(item.label)}
      >
        <span className="text-lg leading-none">{item.icon}</span>
        <span>{item.label}</span>
      </SidebarMenuButton>
      {isMyTemplate && <NavActionsMenu />}
    </SidebarMenuItem>
  );
}
