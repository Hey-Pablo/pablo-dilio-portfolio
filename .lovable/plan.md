# Login discreto no rodapé + Painel Admin

## Fluxo

1. No `Footer`, adicionar um ícone pequeno de cadeado/login (discreto) ao lado do bloco "v1.0.0".
2. Ao clicar, o estado local revela uma **4ª coluna "Login"** dentro do grid do footer (o grid muda de `md:grid-cols-3` para `md:grid-cols-4`), contendo um mini-formulário de email/senha.
3. Submit → `supabase.auth.signInWithPassword` → em caso de sucesso, redireciona para `/admin`.
4. Sem signup público (cadastro restrito). Erros exibidos via `toast`.
5. Se já estiver logado, a coluna mostra o email + botão "Sair" + link "Ir para Admin".

## Autenticação (Lovable Cloud)

- Usar `@/integrations/supabase/client` (já existe).
- Apenas email/senha, sem tabela `profiles`.
- Desabilitar signup público via `configure_auth` (`disable_signup: true`, `auto_confirm_email: false`, `password_hibp_enabled: true`).
- Contas serão criadas manualmente pelo dono no backend.
- Papel `admin` já existe via `user_roles` + função `has_role` + trigger `bootstrap_first_admin` (primeiro usuário vira admin automaticamente).

## Rota protegida `/admin`

- Nova página `src/pages/Admin.tsx` + rota em `App.tsx`.
- Novo componente `ProtectedRoute` que:
  - Registra `onAuthStateChange` primeiro, depois checa `getSession`.
  - Se não logado → redireciona para `/` (o login está no footer).
  - Se logado mas não-admin (`has_role` via RPC) → mostra "Acesso negado".
- Painel admin inicial: layout com abas (Projetos, Formação, Certificados, Experiência, Skills) exibindo os dados atuais dos JSON em read-only + placeholder "Edição em breve". Isso deixa a base pronta sem já implementar CRUD (fora do escopo desta iteração).

## Arquivos

**Novos**
- `src/hooks/useAuth.ts` — hook com `user`, `session`, `isAdmin`, `signIn`, `signOut`.
- `src/components/FooterLogin.tsx` — coluna condicional do footer (form + estado logado).
- `src/components/ProtectedRoute.tsx` — guard de rota.
- `src/pages/Admin.tsx` — painel com abas read-only.

**Editados**
- `src/components/Footer.tsx` — botão toggle discreto + coluna condicional + grid responsivo.
- `src/App.tsx` — rota `/admin`.
- `src/hooks/useTranslation.ts` — chaves PT/EN para "Login", "Sair", "Email", "Senha", "Entrar", "Admin".

## Backend

- `supabase--configure_auth` com `disable_signup: true`, `auto_confirm_email: false`, `external_anonymous_users_enabled: false`, `password_hibp_enabled: true`.
- Nenhuma migração de schema — `user_roles` e `has_role` já existem.
- Após publicar, o dono cria a conta pelo Backend → Users; primeiro login dispara `bootstrap_first_admin` e concede papel admin.

## Visual

- Ícone `LogIn` (lucide) de 14px, opacidade 40% subindo para 100% no hover, mesma linha do "v1.0.0".
- Coluna Login usa o mesmo estilo dos outros títulos do footer (`font-semibold`), inputs com classes `bg-muted border-border` do shadcn, botão `variant="default"` compacto.
- Transição suave (`transition-all duration-300`) ao aparecer/desaparecer a coluna.
- Zero mudança na estética espacial existente.
