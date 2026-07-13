# Candidaturas Kanban — Plano de Implementação

> **Goal:** App estilo Trello para organizar candidaturas a vagas de emprego

**Stack:** Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui + @hello-pangea/dnd

**Persistência:** localStorage (sem backend — dados salvos no navegador)

---

## Escopo

**Colunas do Kanban:**
| Coluna | Descrição |
|---|---|
| 📌 Salvas | Vagas salvas para aplicar depois |
| 📝 Inscrições | Vagas onde já se inscreveu |
| 🎯 Entrevista | Vagas em processo de entrevista |
| ✅ Encerradas | Finalizadas (contratado/recusado) |

**Card (candidatura):**
- Nome da empresa
- Cargo / vaga
- Link da candidatura
- Data que salvou
- Status da coluna
- Cor / etiqueta opcional
- Notas / observações

**Funcionalidades:**
- Drag & drop entre colunas
- Criar, editar, deletar cards
- Persistência automática no localStorage
- Exportar dados (JSON)
- Responsivo (mobile-first)
- Tema escuro (igual ao portfólio)

---

## Estrutura do Projeto

```
candidaturas-kanban/
├── index.html
├── vite.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── lib/
│   │   └── utils.ts          # Utilitários shadcn
│   ├── hooks/
│   │   ├── useLocalStorage.ts # Hook de persistência
│   │   ├── useTheme.tsx       # Tema escuro (do portfólio)
│   │   └── useKanban.ts       # Lógica do kanban
│   ├── components/
│   │   ├── ui/                # shadcn components
│   │   ├── KanbanBoard.tsx    # Board principal
│   │   ├── KanbanColumn.tsx   # Coluna com cards
│   │   ├── KanbanCard.tsx     # Card individual
│   │   ├── CardDialog.tsx     # Modal de criar/editar card
│   │   └── ThemeToggle.tsx    # Alternar tema
│   ├── types/
│   │   └── index.ts           # Tipos TypeScript
│   └── data/
│       └── defaults.ts        # Colunas e dados iniciais
├── public/
│   └── favicon.ico
├── .github/
│   └── workflows/
│       └── deploy.yml         # Deploy GitHub Pages
└── README.md
```

---

## Tasks

### Task 1: Inicializar projeto

- `npm create vite@latest candidaturas-kanban -- --template react-ts`
- Instalar dependências: tailwindcss, shadcn/ui, @hello-pangea/dnd, lucide-react
- Configurar Tailwind + shadcn + vite.config.ts com path alias `@/`

### Task 2: Criar tipos e dados padrão

- Definir tipos `Column`, `Card`, `KanbanState`
- Criar colunas padrão e dados iniciais vazios

### Task 3: Hook useLocalStorage

- Hook genérico para persistir estado no localStorage
- Fallback silencioso se localStorage não disponível

### Task 4: Hook useKanban

- Estado do board com colunas e cards
- Funções: addCard, editCard, deleteCard, moveCard (drag & drop)
- Persistência via useLocalStorage

### Task 5: Componentes UI (shadcn)

- Botão, Dialog, Input, Textarea, Select, Badge
- Usar `npx shadcn@latest add` ou criar manualmente

### Task 6: KanbanBoard + KanbanColumn + KanbanCard

- Board com layout horizontal responsivo (scroll mobile)
- Drag & drop via @hello-pangea/dnd
- Card com informações compactas

### Task 7: CardDialog (criar/editar card)

- Modal com formulário: empresa, cargo, link, cor, notas
- Validação básica (empresa obrigatório)
- Suporta criação e edição

### Task 8: Tema escuro

- Adaptar useTheme do portfólio
- Alternador de tema no header
- Persistir preferência

### Task 9: Exportar dados

- Botão para exportar dados como JSON
- Útil para backup ou migração

### Task 10: Deploy GitHub Pages

- Criar workflow de deploy
- Configurar GitHub Pages
- Subir repositório

---

## Próximos passos

1. Criar o repositório `candidaturas-kanban` no GitHub
2. Implementar task por task
3. Publicar em GitHub Pages

Quer que eu comece a implementação?
