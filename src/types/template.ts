export interface NavItemData {
  id?: string;
  icon: string;
  label: string;
}

export type SaveStatus = 'idle' | 'editing' | 'saving' | 'saved' | 'error';

export interface TemplateVariable {
  name: string;
  description?: string | null;
}

export interface TemplateResponseDto {
  id: string;
  title: string;
  content: string;
  variables: TemplateVariable[];
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  title: string;
  content: string;
  variables: TemplateVariable[] | [];
}

export interface CreateTemplateDto {
  title: string;
  content: string | null;
  variables: TemplateVariable[];
}
