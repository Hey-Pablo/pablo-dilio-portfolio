export type FieldType = "text" | "textarea" | "url" | "tags" | "number" | "select";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
}

export interface Schema {
  title: string;
  fields: FieldDef[];
  defaults?: Record<string, any>;
}

export const schemas: Record<string, Schema> = {
  projects: {
    title: "Projeto",
    fields: [
      { key: "title", label: "Título", type: "text", required: true },
      { key: "description", label: "Descrição", type: "textarea", required: true },
      {
        key: "category",
        label: "Categoria",
        type: "select",
        options: [
          { value: "fullstack", label: "Full Stack" },
          { value: "frontend", label: "Frontend" },
          { value: "backend", label: "Backend" },
        ],
      },
      { key: "status", label: "Status", type: "text", placeholder: "Ex: Concluído / Em Desenvolvimento" },
      { key: "technologies", label: "Tecnologias (separe por vírgula)", type: "tags" },
      { key: "images", label: "URLs das imagens (uma por linha)", type: "tags" },
      { key: "link", label: "Link do projeto", type: "url" },
      { key: "expires_text", label: "Texto sobre link (opcional)", type: "text" },
    ],
    defaults: { category: "fullstack", status: "Em Desenvolvimento", technologies: [], images: [] },
  },
  education_academic: {
    title: "Formação Acadêmica",
    fields: [
      { key: "institution", label: "Instituição", type: "text", required: true },
      { key: "course", label: "Curso", type: "text", required: true },
      { key: "period", label: "Período", type: "text", placeholder: "Ex: 01/2023 - Cursando" },
      { key: "status", label: "Status", type: "text" },
      { key: "description", label: "Descrição", type: "textarea" },
      { key: "highlights", label: "Destaques (separe por vírgula)", type: "tags" },
    ],
    defaults: { kind: "academic", highlights: [] },
  },
  education_technical: {
    title: "Curso Técnico / Profissionalizante",
    fields: [
      { key: "institution", label: "Instituição", type: "text", required: true },
      { key: "course", label: "Curso", type: "text", required: true },
      { key: "period", label: "Período", type: "text" },
      { key: "status", label: "Status", type: "text" },
      { key: "highlights", label: "Destaques (separe por vírgula)", type: "tags" },
    ],
    defaults: { kind: "technical", highlights: [] },
  },
  certificates: {
    title: "Certificado",
    fields: [
      { key: "title", label: "Título", type: "text", required: true },
      { key: "institution", label: "Instituição", type: "text" },
      { key: "date", label: "Data", type: "text", placeholder: "Ex: 05/2025" },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: [
          { value: "Concluído", label: "Concluído" },
          { value: "Em Andamento", label: "Em Andamento" },
          { value: "Previsto", label: "Previsto" },
        ],
      },
      { key: "description", label: "Descrição", type: "textarea" },
      { key: "skills", label: "Habilidades (separe por vírgula)", type: "tags" },
    ],
    defaults: { status: "Concluído", skills: [] },
  },
  experiences: {
    title: "Experiência Profissional",
    fields: [
      { key: "company", label: "Empresa", type: "text", required: true },
      { key: "position", label: "Cargo", type: "text", required: true },
      { key: "period", label: "Período", type: "text" },
      {
        key: "type",
        label: "Área",
        type: "select",
        options: [
          { value: "ti", label: "Tecnologia" },
          { value: "administrativo", label: "Administrativo" },
          { value: "vendas", label: "Vendas" },
        ],
      },
      { key: "description", label: "Descrição", type: "textarea" },
      { key: "responsibilities", label: "Responsabilidades (uma por linha, separe por vírgula)", type: "tags" },
      { key: "technologies", label: "Tecnologias / Ferramentas (separe por vírgula)", type: "tags" },
      { key: "achievements", label: "Conquistas (separe por vírgula)", type: "tags" },
    ],
    defaults: { type: "ti", responsibilities: [], technologies: [], achievements: [] },
  },
  skills_technical: {
    title: "Habilidade Técnica",
    fields: [
      { key: "name", label: "Nome", type: "text", required: true },
      { key: "level", label: "Nível (0-100)", type: "number", min: 0, max: 100 },
      {
        key: "category",
        label: "Categoria",
        type: "select",
        options: [
          { value: "Frontend", label: "Frontend" },
          { value: "Backend", label: "Backend" },
          { value: "Database", label: "Database" },
        ],
      },
    ],
    defaults: { group_name: "technical", level: 50, category: "Frontend" },
  },
  skills_tools: {
    title: "Ferramenta",
    fields: [
      { key: "name", label: "Nome", type: "text", required: true },
      { key: "level", label: "Nível (0-100)", type: "number", min: 0, max: 100 },
      {
        key: "category",
        label: "Categoria",
        type: "select",
        options: [
          { value: "Tools", label: "Ferramentas" },
          { value: "Design", label: "Design" },
          { value: "Enterprise", label: "Enterprise" },
        ],
      },
    ],
    defaults: { group_name: "tools", level: 50, category: "Tools" },
  },
  skills_soft: {
    title: "Soft Skill",
    fields: [{ key: "name", label: "Nome", type: "text", required: true }],
    defaults: { group_name: "soft" },
  },
  skills_methodologies: {
    title: "Metodologia",
    fields: [{ key: "name", label: "Nome", type: "text", required: true }],
    defaults: { group_name: "methodologies" },
  },
};
