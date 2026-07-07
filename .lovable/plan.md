
# Modo de Edição no Site (sem gastar créditos)

## Objetivo
Permitir que você edite títulos, descrições e itens (projetos, formações, certificados, experiências, habilidades) diretamente na interface do portfólio, sem precisar me pedir alterações. Tudo salvo localmente no seu navegador (localStorage) — não persiste para outros visitantes, mas resolve seu problema de ajustes rápidos.

No fim, um botão **"Exportar JSON"** gera os arquivos atualizados que você (ou eu, numa única rodada) pode colar em `src/data/*.json` para tornar as mudanças permanentes.

## O que você poderá fazer
- Ativar/desativar **Modo Edição** (botão flutuante no canto, tipo lápis)
- Em cada seção, com o modo ligado, aparecem botões:
  - **+ Adicionar** (novo item)
  - **✏️ Editar** (em cada card)
  - **🗑️ Excluir** (em cada card)
  - **✏️ Editar título/subtítulo da seção**
- Formulário em modal com os campos certos por tipo (projeto tem imagens, tags, links; formação tem instituição, período, etc.)
- Reordenar itens (setas ↑ ↓)
- **Exportar todos os dados** como arquivo `.json` (download) ou copiar para clipboard
- **Importar JSON** (caso queira restaurar/trocar de máquina)
- **Resetar** para os dados originais do código

## Seções cobertas
Projetos, Formação Acadêmica, Certificados, Experiência, Habilidades, e textos do Hero (nome, cargo, bio).

## Como funcionará (técnico)
- Novo hook `useEditableData<T>(key, defaultData)` que:
  - Lê do `localStorage` se existir, senão usa o JSON importado
  - Salva a cada mudança
- Novo contexto `EditModeContext` com toggle global
- Novos componentes:
  - `EditModeToggle` (botão flutuante fixo)
  - `EditableSection` (wrapper que injeta botões de edição)
  - `ItemEditorDialog` (modal genérico com campos dinâmicos por tipo)
  - `ExportImportPanel` (dentro do menu de edição)
- Cada `*Section.tsx` existente recebe pequenas alterações para:
  - Ler dados via `useEditableData` em vez de importar JSON direto
  - Renderizar botões de ação quando `editMode === true`
- Nada muda para visitantes normais (modo edição desligado por padrão e o estado é local a você)

## Fluxo típico
1. Você clica no lápis flutuante → entra em modo edição
2. Vai em "Meus Projetos" → clica **+ Adicionar** → preenche → salva
3. Edita o título "Formação Acadêmica" → salva
4. Quando terminar tudo, clica **Exportar JSON** → baixa um arquivo
5. (Opcional) Me manda o arquivo numa mensagem só e eu commito nos JSONs — assim as mudanças ficam permanentes para todos os visitantes, gastando crédito **uma única vez** em vez de várias.

## Fora do escopo
- Autenticação / painel admin real
- Persistência no backend (Lovable Cloud)
- Upload de imagens (você continua colando URL da imagem; se quiser upload real depois, precisaria de Cloud)

Confirma que faz sentido? Se sim, aprove o plano e eu implemento.
