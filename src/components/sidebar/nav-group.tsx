import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useTemplateStore } from '@/stores/template-store';
import type { OptionItem,OptionNavGroupProps, TemplateNavGroupProps } from '@/types/sidebar';
import type { Template } from '@/types/template';

import { NavActionsMenu } from './nav-actions-menu';

interface NavGroupBaseProps {
  title: string;
  children: React.ReactNode;
}

function NavGroupBase({ title, children }: NavGroupBaseProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-1">
        {title}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {children}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

interface TemplateNavItemProps {
  item: Template;
}

function TemplateNavItem({ item }: TemplateNavItemProps) {
  const { activeItem, setActiveItem } = useTemplateStore();

  return (
    <SidebarMenuItem className="group/item">
      <SidebarMenuButton
        size="sm"
        className="h-8 font-normal gap-2"
        isActive={activeItem?.id === item.id}
        onClick={() => setActiveItem(item)}
      >
        <span>{item.title}</span>
      </SidebarMenuButton>
      <NavActionsMenu id={item.id} />
    </SidebarMenuItem>
  );
}

interface OptionNavItemProps {
  option: OptionItem;
}

function OptionNavItem({ option }: OptionNavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={option.onClick}
        className="gap-2"
        data-tour={option.id === 'output-type' ? 'output-type-menu' : undefined}
      >
        {option.icon}
        <span>{option.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function TemplateNavGroup({ title, items }: TemplateNavGroupProps) {
  return (
    <NavGroupBase title={title}>
      {items.map((item) => (
        <TemplateNavItem
          key={item.id}
          item={item}
        />
      ))}
    </NavGroupBase>
  );
}

export function OptionNavGroup({ title, options }: OptionNavGroupProps) {
  return (
    <NavGroupBase title={title}>
      {options.map((option) => (
        <OptionNavItem key={option.id} option={option} />
      ))}
    </NavGroupBase>
  );
}
