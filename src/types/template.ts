export interface NavItemData {
  icon: string;
  label: string;
}

export interface TemplateVariable {
  name: string;
  description?: string | null;
}

export interface TemplateResponseDto {
  id: string;
  title: string;
  description: string;
  content: string;
  variables: TemplateVariable[];
  createdAt: string;
  updatedAt: string;
}
