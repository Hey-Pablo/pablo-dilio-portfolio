
# Modo Admin do Portfólio com Lovable Cloud

## Objetivo
Transformar o portfólio em um mini CMS: você faz login, ativa o modo edição e altera qualquer conteúdo (Hero, Sobre, Projetos, Formação, Certificados, Experiências, Habilidades, títulos das seções, links sociais) direto pela interface. As mudanças são salvas no backend e ficam permanentes para todos os visitantes.

Como o projeto ainda não tem backend, o primeiro passo é ativar o **Lovable Cloud** (backend gerenciado com banco, autenticação e storage — sem contas externas).

## Pré-requisito
Ativar **Lovable Cloud** — sem isso não há como persistir dados nem autenticar admin.

## Controle de acesso
- Autenticação via email/senha (Lovable Cloud Auth)
- Tabela `user_roles` + enum `app_role` (`admin`, `user`) — roles nunca ficam na tabela de perfil (segurança)
- Função `has_role(uid, role)` (SECURITY DEFINER) usada nas policies
- Botão flutuante de "Modo Edição" só aparece se o usuário logado for admin
- Todas as mutations (INSERT/UPDATE/DELETE) protegidas por RLS: só `admin` grava; leitura é pública
- Primeiro admin: cadastro seu email → rodo migration que promove esse email a `admin`

## Modelo de dados (tabelas no Cloud)
Todas as tabelas terão `id uuid`, `order_index int`, `is_active bool`, `created_at`, `updated_at`.

- **`hero_content`** (single-row): name, role, bio, cta_primary_label, cta_primary_link, cta_secondary_label, cta_secondary_link
- **`about_content`** (single-row): title, subtitle, body (markdown/texto), highlights[]
- **`section_titles`**: section_key (unique), title, subtitle
- **`projects`**: title, description, category, technologies[], status, images[], link, expires_text
- **`education_academic`**: institution, course, period, status, description, highlights[]
- **`education_technical`**: institution, course, period, status, highlights[]
- **`certificates`**: title, institution, date, status, skills[], description
- **`experiences`**: company, position, period, type, description, responsibilities[], technologies[], achievements[]
- **`skills`**: name, level (int), category
- **`social_links`**: label, url, icon

Todas com RLS: `SELECT` público (anon+auth), `INSERT/UPDATE/DELETE` só para `has_role(auth.uid(),'admin')`. Grants explícitos para `anon`, `authenticated`, `service_role` conforme regras.

**Migração inicial de dados**: os JSONs atuais (`src/data/*.json`) viram um seed SQL que popula as tabelas na primeira migration — nada de conteúdo se perde.

## UX de edição
- **Rota `/admin/login`**: tela de login (email/senha). Sem opção pública de cadastro.
- **Botão flutuante** (canto inferior direito, só visível para admin logado): alterna Modo Edição on/off + botão "Sair".
- **Com Modo Edição ligado**:
  - Títulos/subtítulos das seções e textos do Hero/Sobre viram **editáveis inline** (clica → vira input → salva ao sair do foco)
  - Cada card de item ganha overlay com **✏️ Editar / 🗑️ Excluir / ↕ Reordenar**
  - Cada seção-lista ganha botão **+ Adicionar**
  - **Modal genérico** (`ItemEditorDialog`) com campos dinâmicos por tipo (text, textarea, url, tags, número, select)
  - `ConfirmDeleteDialog` antes de excluir
- **Feedback**: toasts de "Salvando…", "Salvo", "Erro" (usando o toast já presente)
- **Otimismo**: React Query com invalidate/refetch após mutations
- **Visitantes**: não veem nada de admin. Site funciona igual.

## Arquitetura no frontend
- **Novos**:
  - `src/integrations/supabase/*` (auto-gerado ao ativar Cloud)
  - `src/contexts/AuthContext.tsx` — sessão + `isAdmin`
  - `src/contexts/EditModeContext.tsx` — toggle global
  - `src/hooks/useContent.ts` — hooks por tabela (`useProjects`, `useHero`, etc.) via React Query
  - `src/components/admin/EditModeToggle.tsx` (flutuante)
  - `src/components/admin/AdminToolbar.tsx` (barra fixa no topo quando editando)
  - `src/components/admin/EditableText.tsx` (inline)
  - `src/components/admin/ItemEditorDialog.tsx` (modal com schema)
  - `src/components/admin/ConfirmDeleteDialog.tsx`
  - `src/components/admin/ReorderControls.tsx` (↑ ↓)
  - `src/components/admin/fieldSchemas.ts` (definição de campos por tabela)
  - `src/pages/AdminLogin.tsx` (rota `/admin/login`)
- **Modificados**: `HeroSection`, `AboutSection`, `SkillsSection`, `ProjectsSection`, `EducationSection`, `CertificatesSection`, `ExperienceSection`, `ContactSection`, `Footer`, `Index.tsx`, `App.tsx` (providers + rota admin). Cada seção troca `import xData from "@/data/*.json"` por hook `useX()`.
- **Removidos depois da migração**: JSONs em `src/data/` (mantenho `types.ts`).

## Etapas de entrega
1. **Ativar Lovable Cloud** (bloqueia todo o resto)
2. Migration: enums, tabelas, RLS, grants, `has_role`, seed a partir dos JSONs atuais
3. AuthContext + página `/admin/login` + promoção do seu email a admin
4. Hooks React Query por tabela + refatorar cada Section para consumir hooks
5. EditModeContext + botão flutuante + toolbar
6. EditableText inline (Hero, About, títulos das seções)
7. ItemEditorDialog + Add/Edit/Delete/Reorder em cada seção-lista
8. Toasts, estados de loading/erro, tela vazia
9. Remover JSONs de `src/data/`

## Fora do escopo (fica pra depois)
- Upload real de imagens (por ora continua URL colada; storage pode ser adicionado num plano separado)
- Editor WYSIWYG
- Histórico de versões / rollback
- Aprovação de mudanças / multi-admin com permissões finas
- Painel `/admin` separado

## O que preciso de você antes de começar
1. Aprovar este plano
2. Confirmar que posso ativar o **Lovable Cloud** agora
3. Me passar o **email** que será o admin (para promover na migration inicial)
