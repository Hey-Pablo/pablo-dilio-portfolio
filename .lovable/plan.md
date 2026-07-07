# Plano — Portfólio Galáctico v2

Manter a paleta atual (roxo #7C3AED / magenta #D946EF / azul #38BDF8 / fundo deep space) e a stack existente. Nada de recriar do zero — só refinar visual, adicionar carrossel, parallax de fundo e mover conteúdo para JSON.

## 1. Dados em JSON editável

Criar `src/data/` com um arquivo por seção. Cada componente passa a ler dali (sem UI de admin — você edita o `.json` no código).

```
src/data/
  projects.json          // id, title, description, category, technologies[], status, images[], link
  education.json         // instituição, curso, período, descrição
  certificates.json      // título, emissor, data, link
  experience.json        // empresa, cargo, período, descrição, tecnologias
  skills.json            // nome, nível, categoria
  gallery.json           // título, imagem, descrição
```

Componentes afetados: `ProjectsSection`, `EducationSection`, `CertificatesSection`, `ExperienceSection`, `SkillsSection`, `GallerySection`. Tipos TS ficam em `src/data/types.ts`. Para adicionar/remover item: editar o JSON — pronto.

Imagens dos projetos: array `images: string[]` apontando para `/public/projects/<slug>/*.jpg` (você deposita os arquivos ali).

## 2. Carrossel fade nas imagens de projeto

Novo componente `src/components/ProjectImageCarousel.tsx`:

- Recebe `images: string[]`.
- Auto-play a cada ~3.5s, transição cross-fade suave (500ms).
- Pausa no hover, retoma ao sair.
- Fallback: se `images` vazio, mostra o "planeta" gradiente atual (mantém o visual atual como placeholder).
- Dots discretos embaixo, sem setas (visual limpo).
- Usado tanto no card do grid quanto no modal de detalhes (versão maior lá).

Implementação leve com `useState` + `setInterval`, sem lib nova.

## 3. Fundo galáctico cinematográfico + parallax por seção

Refatorar `SpaceBackground.tsx` em duas camadas fixas (`position: fixed; inset: 0; z-index: -1`):

**Camada A — Galáxia hero (inspirada na imagem 1, sem copiar):**
- SVG/canvas com espiral de partículas roxo/magenta girando lentamente (60s/volta).
- Só visível no topo, fade-out ao rolar (`opacity` via scroll).
- Mantém identidade "gal_axy" que você já tem.

**Camada B — Starfield parallax multi-camada:**
- 3 camadas de estrelas (perto/médio/longe) que se movem em velocidades diferentes conforme `window.scrollY` (hook `useScrollParallax`).
- Cor/densidade das partículas transiciona por seção via `IntersectionObserver`: 
  - Hero → roxo dominante
  - About/Skills → azul nebular
  - Projects → magenta
  - Gallery → rosa/roxo
  - Experience/Contact → azul profundo
- Transição de cor suave (CSS `transition: filter/hue-rotate 1.2s`).

Performance: `requestAnimationFrame` throttled, respeita `prefers-reduced-motion` (desliga parallax).

## 4. Refino visual (imagem 1 como referência)

- Hero: adicionar a espiral galáctica atrás do título, com o nome flutuando por cima (glow sutil, letter-spacing maior tipo "FLYING").
- Tipografia do H1 do hero: peso mais forte, tracking amplo em caixa alta discreta.
- Botão principal do hero: pill translúcida com ícone `>` estilo "enter", mantendo o `neon-btn` atual.
- Cards de projeto: overlay do carrossel de imagens quando houver, badge de status mantida.
- Manter todos os tokens de cor existentes em `src/index.css` — sem hardcode.

## 5. Estrutura técnica

```text
src/
├── data/
│   ├── types.ts
│   ├── projects.json
│   ├── education.json
│   ├── certificates.json
│   ├── experience.json
│   ├── skills.json
│   └── gallery.json
├── components/
│   ├── ProjectImageCarousel.tsx    (novo)
│   ├── SpaceBackground.tsx         (refatorado: galáxia + parallax)
│   └── [sections].tsx              (leem do JSON)
├── hooks/
│   ├── useScrollParallax.ts        (novo)
│   └── useSectionTheme.ts          (novo — muda cor do bg por seção visível)
```

## 6. O que NÃO muda

- Paleta, tokens de cor, stack, funcionalidades (i18n PT/EN, PWA, dark mode, download CV, modal de projetos, filtros).
- Estrutura das seções e rotas.
- Sem backend, sem novas dependências pesadas.

## 7. Ordem de execução

1. Criar `src/data/*.json` + tipos, migrar seções para lerem dali.
2. Criar `ProjectImageCarousel` e plugar no card + modal.
3. Refatorar `SpaceBackground` com galáxia + parallax + hook de tema por seção.
4. Polir hero (tipografia, botão, espiral atrás).
5. Typecheck final.

Depois é só você popular os JSONs e jogar imagens em `/public/projects/`.