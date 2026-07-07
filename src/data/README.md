# Dados editáveis do portfólio

Cada arquivo `.json` deste diretório alimenta uma seção do site. Edite aqui para adicionar/remover/atualizar itens — não é necessário mexer nos componentes.

## Arquivos

- **projects.json** — Projetos exibidos em "Meus Projetos".
- **education.json** — Formação Acadêmica e Cursos Técnicos.
- **certificates.json** — Certificados e Formações.
- **experience.json** — Experiência Profissional.
- **skills.json** — Habilidades (técnicas, ferramentas, soft, metodologias).

## Como adicionar um projeto com imagens

1. Coloque as imagens em `public/projects/<slug-do-projeto>/img1.jpg`, `img2.jpg`, ...
2. Em `projects.json`, adicione:

```json
{
  "id": 7,
  "title": "Nome do Projeto",
  "description": "Descrição...",
  "category": "fullstack",
  "technologies": ["React", "TypeScript"],
  "status": "Concluído",
  "images": ["/projects/meu-projeto/img1.jpg", "/projects/meu-projeto/img2.jpg"],
  "link": "https://exemplo.com"
}
```

As imagens passarão em slideshow com fade automático dentro do card.
Se `images` estiver vazio, o card mostra o "planeta" gradiente padrão.

## Remover um item

Apague o objeto do array correspondente. Só isso.
