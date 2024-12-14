export type FieldType = 'text' | 'textarea' | 'date' | 'email' | 'url' | 'list';

export interface CustomField {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
}

export interface CustomSectionConfig {
  title: string;
  fields: CustomField[];
}