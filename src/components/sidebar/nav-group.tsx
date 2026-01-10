import { NavItem } from '@/components/sidebar/nav-item';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import type { Template } from '@/types/template';

interface NavGroupProps extends React.ComponentProps<typeof SidebarGroup> {
  title: string;
  items: Template[];
  isMyTemplate?: boolean;
}

export function NavGroup({ title, items, isMyTemplate = false }: NavGroupProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-1">
        {title}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <NavItem
              key={item.title}
              item={item}
              isMyTemplate={isMyTemplate}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

