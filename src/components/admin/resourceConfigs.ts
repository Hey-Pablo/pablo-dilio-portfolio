export type FieldType = "text" | "textarea" | "number" | "boolean" | "array" | "select";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  default?: any;
}

export interface ResourceConfig {
  table: "projects" | "education_items" | "certificates" | "experiences" | "skills";
  label: string;
  titleField: string;
  subtitleField?: string;
  fields: FieldConfig[];
}

export const RESOURCES: ResourceConfig[] = [
  {
    table: "projects",
    label: "Projetos",
    titleField: "title",
    subtitleField: "description",
    fields: [
      { name: "title", label: "Título", type: "text", required: true },
      { name: "description", label: "Descrição", type: "textarea" },
      { name: "category", label: "Categoria", type: "select", options: ["fullstack", "frontend", "backend", "mobile", "other"], default: "fullstack" },
      { name: "status", label: "Status", type: "select", options: ["Concluído", "Em Desenvolvimento", "Pausado"], default: "Concluído" },
      { name: "technologies", label: "Tecnologias (separadas por vírgula)", type: "array" },
      { name: "images", label: "URLs de imagens (separadas por vírgula)", type: "array" },
      { name: "link", label: "Link", type: "text" },
      { name: "expires_text", label: "Texto de expiração", type: "text" },
      { name: "order_index", label: "Ordem", type: "number", default: 0 },
      { name: "is_active", label: "Ativo", type: "boolean", default: true },
    ],
  },
  {
    table: "education_items",
    label: "Formação",
    titleField: "course",
    subtitleField: "institution",
    fields: [
      { name: "kind", label: "Tipo", type: "select", options: ["academic", "technical"], required: true, default: "academic" },
      { name: "institution", label: "Instituição", type: "text", required: true },
      { name: "course", label: "Curso", type: "text", required: true },
      { name: "period", label: "Período", type: "text" },
      { name: "status", label: "Status", type: "text" },
      { name: "description", label: "Descrição", type: "textarea" },
      { name: "highlights", label: "Destaques (separados por vírgula)", type: "array" },
      { name: "order_index", label: "Ordem", type: "number", default: 0 },
      { name: "is_active", label: "Ativo", type: "boolean", default: true },
    ],
  },
  {
    table: "certificates",
    label: "Certificados",
    titleField: "title",
    subtitleField: "institution",
    fields: [
      { name: "title", label: "Título", type: "text", required: true },
      { name: "institution", label: "Instituição", type: "text" },
      { name: "date", label: "Data", type: "text" },
      { name: "status", label: "Status", type: "text", default: "Concluído" },
      { name: "skills", label: "Habilidades (separadas por vírgula)", type: "array" },
      { name: "description", label: "Descrição", type: "textarea" },
      { name: "order_index", label: "Ordem", type: "number", default: 0 },
      { name: "is_active", label: "Ativo", type: "boolean", default: true },
    ],
  },
  {
    table: "experiences",
    label: "Experiência",
    titleField: "position",
    subtitleField: "company",
    fields: [
      { name: "company", label: "Empresa", type: "text", required: true },
      { name: "position", label: "Cargo", type: "text", required: true },
      { name: "period", label: "Período", type: "text" },
      { name: "type", label: "Tipo", type: "select", options: ["ti", "administrativo", "vendas", "outro"], default: "ti" },
      { name: "description", label: "Descrição", type: "textarea" },
      { name: "responsibilities", label: "Responsabilidades (separadas por vírgula)", type: "array" },
      { name: "technologies", label: "Tecnologias (separadas por vírgula)", type: "array" },
      { name: "achievements", label: "Conquistas (separadas por vírgula)", type: "array" },
      { name: "order_index", label: "Ordem", type: "number", default: 0 },
      { name: "is_active", label: "Ativo", type: "boolean", default: true },
    ],
  },
  {
    table: "skills",
    label: "Skills",
    titleField: "name",
    subtitleField: "category",
    fields: [
      { name: "name", label: "Nome", type: "text", required: true },
      { name: "group_name", label: "Grupo", type: "select", options: ["technical", "tools", "soft", "methodologies"], required: true, default: "technical" },
      { name: "category", label: "Categoria", type: "text" },
      { name: "level", label: "Nível (0-100)", type: "number" },
      { name: "order_index", label: "Ordem", type: "number", default: 0 },
      { name: "is_active", label: "Ativo", type: "boolean", default: true },
    ],
  },
];
