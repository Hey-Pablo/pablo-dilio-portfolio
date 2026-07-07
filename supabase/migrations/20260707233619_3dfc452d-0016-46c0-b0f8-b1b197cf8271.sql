
-- ========== Roles ==========
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE POLICY "Users see their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins see all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Auto-promote FIRST user to admin (bootstrap owner).
CREATE OR REPLACE FUNCTION public.bootstrap_first_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created_bootstrap_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.bootstrap_first_admin();

-- ========== Shared updated_at ==========
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- ========== Site key/value content (hero, about, section titles, socials) ==========
CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins write site_content" ON public.site_content
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_site_content_updated BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.site_content (key, value) VALUES
('hero', '{
  "tagline": "disponível para novas missões",
  "kicker": "<developer/>",
  "name_line1": "Pablo Adriano",
  "name_line2": "Maciel Dilio",
  "role": "Full Stack Developer & Criador de Experiências Digitais",
  "bio": "Desenvolvo sistemas web modernos, interfaces funcionais e experiências digitais que unem tecnologia, design e performance.",
  "cta_primary_label": "Ver Projetos",
  "cta_primary_target": "#projects",
  "cta_secondary_label": "Baixar CV",
  "cta_tertiary_label": "Entrar em Contato",
  "cta_tertiary_target": "#contact"
}'::jsonb),
('about', '{
  "title_prefix": "Sobre",
  "title_highlight": "Mim",
  "subtitle": "Conheça minha trajetória de crescimento profissional e acadêmico na área de tecnologia",
  "story_title": "Minha Trajetória",
  "story_paragraphs": [
    "Sou Pablo Adriano Maciel Dilio, um desenvolvedor em formação apaixonado por tecnologia e resolução de problemas. Atualmente no 4º semestre de Análise e Desenvolvimento de Sistemas, tenho uma trajetória única que me levou da área de vendas até a TI.",
    "Minha experiência profissional inclui passagens pela Magazine Luiza, Caterpillar Brasil e atualmente na TID Software, onde atuo como Auxiliar de Informática Jr. Essa progressão me proporcionou uma visão ampla de negócios e a capacidade de entender as necessidades reais dos usuários.",
    "Meus valores profissionais são baseados no aprendizado contínuo, resolução de problemas complexos e na busca constante por conhecimento técnico. Estou focado em me tornar um desenvolvedor full stack completo, combinando frontend e backend."
  ],
  "highlights": [
    { "icon": "Book", "title": "Formação Acadêmica", "description": "4º semestre de ADS - Centro Universitário União das Américas Descomplica" },
    { "icon": "Code", "title": "Experiência Atual", "description": "Auxiliar de Informática Jr. na TID Software - Suporte e desenvolvimento" },
    { "icon": "Settings", "title": "Especialização", "description": "Desenvolvimento Full Stack com foco em sistemas web e análise" },
    { "icon": "User", "title": "Objetivo", "description": "Consolidar conhecimentos e me tornar um desenvolvedor full stack completo" }
  ]
}'::jsonb),
('section_titles', '{
  "projects": { "kicker": "<projects_galaxy/>", "title_prefix": "Meus", "title_highlight": "Projetos", "subtitle": "Cada projeto é um planeta neste universo digital. Explore, orbite e clique para ver detalhes." },
  "education": { "title_prefix": "Formação", "title_highlight": "Acadêmica", "subtitle": "Minha jornada educacional e cursos técnicos que moldaram meu conhecimento em tecnologia e gestão" },
  "certificates": { "title_prefix": "Certificados e", "title_highlight": "Formações", "subtitle": "Certificações e cursos que comprovam meu comprometimento com o aprendizado contínuo e desenvolvimento profissional" },
  "experience": { "title_prefix": "Experiência", "title_highlight": "Profissional", "subtitle": "Minha trajetória profissional progressiva: de vendas ao administrativo, até chegar à área de TI" },
  "skills": { "title_prefix": "Minhas", "title_highlight": "Habilidades", "subtitle": "Conjunto de competências técnicas e comportamentais adquiridas ao longo da minha jornada" }
}'::jsonb),
('social_links', '{
  "items": [
    { "label": "GitHub", "url": "https://github.com/Hey-Pablo", "icon": "Github" },
    { "label": "LinkedIn", "url": "https://www.linkedin.com/in/pablo-dilio-4063991b2", "icon": "Linkedin" },
    { "label": "Email", "url": "mailto:dilio.pablo@gmail.com", "icon": "Mail" }
  ]
}'::jsonb);

-- ========== Projects ==========
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'fullstack',
  technologies text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT '',
  images text[] NOT NULL DEFAULT '{}',
  link text,
  expires_text text,
  order_index int NOT NULL DEFAULT 0,
  is_active bool NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admins write projects" ON public.projects FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_projects_updated BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.projects (title, description, category, technologies, status, order_index) VALUES
('App Web para controle de Leitura', 'Site para gestão de Manwhas/Weebton pessoal com dashboard interativo. Desenvolvido com foco na experiência do usuário.', 'fullstack', ARRAY['React','TypeScript','Tailwind CSS','Vite','shadcn/ui'], 'Em Desenvolvimento', 1),
('Açaí Control – Sistema Web de Gestão de Vendas e Estoque', 'Criação de um sistema completo de gestão para estabelecimentos de açaí, com autenticação segura, dashboard, vendas integradas ao estoque, relatórios e cadastro de produtos. Construído com React, TailwindCSS e Supabase, incluindo RLS e cálculos automáticos de custos e lucros.', 'fullstack', ARRAY['React','TypeScript','Tailwind CSS','Supabase','RLS'], 'Em Desenvolvimento', 2),
('Portfólio Pessoal', 'Portfólio responsivo desenvolvido com React e TypeScript, apresentando projetos e habilidades de forma interativa e moderna.', 'frontend', ARRAY['React','TypeScript','Tailwind CSS','Responsive'], 'Em Desenvolvimento', 3),
('Brasil Dev Tools', 'Coleção de ferramentas para devs brasileiros inspirada no 4Devs: geradores, validadores e utilitários para testes.', 'frontend', ARRAY['React','TypeScript','Tailwind CSS'], 'Em Desenvolvimento', 4),
('FinanceFlow — Sistema de Gestão Financeira Pessoal', 'Aplicação web para controle completo de finanças pessoais, incluindo receitas, despesas, investimentos e dividendos. Possui dashboard interativo, acompanhamento de ações em tempo real e design moderno focado em usabilidade.', 'fullstack', ARRAY['React 18','TypeScript','Tailwind CSS','Supabase','React Query','Recharts','Framer Motion'], 'Concluído', 5),
('Suporte do Pablão — Base de Conhecimento e Help Desk', 'Aplicação web para gestão de documentação técnica e artigos de suporte, permitindo que empresas organizem conteúdos em uma Base de Conhecimento com controle de acesso, busca inteligente e um painel administrativo completo.', 'fullstack', ARRAY['React 18','TypeScript','Tailwind CSS','Supabase','Tiptap','shadcn/ui'], 'Concluído', 6);

-- ========== Education (academic + technical in one table with kind) ==========
CREATE TABLE public.education_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('academic','technical')),
  institution text NOT NULL,
  course text NOT NULL,
  period text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT '',
  description text,
  highlights text[] NOT NULL DEFAULT '{}',
  order_index int NOT NULL DEFAULT 0,
  is_active bool NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.education_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.education_items TO authenticated;
GRANT ALL ON public.education_items TO service_role;
ALTER TABLE public.education_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read education" ON public.education_items FOR SELECT USING (true);
CREATE POLICY "Admins write education" ON public.education_items FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_education_updated BEFORE UPDATE ON public.education_items
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.education_items (kind, institution, course, period, status, description, highlights, order_index) VALUES
('academic','Centro Universitário União das Américas Descomplica','Análise e Desenvolvimento de Sistemas','01/2023 - Cursando','4º semestre','Foco em desenvolvimento full stack e análise de sistemas. Aprendendo sobre modelagem de dados, programação orientada a objetos, desenvolvimento web e metodologias ágeis.',ARRAY['Desenvolvimento Full Stack','Análise de Sistemas','Modelagem de Dados','Metodologias Ágeis','Programação Orientada a Objetos'],1),
('academic','Colégio Mello Ayres','Ensino Médio Completo','2017 - 2019','Concluído','Formação básica com foco em exatas e preparação para ensino superior. Base sólida em matemática e ciências que contribuiu para o interesse em tecnologia.',ARRAY['Formação em Exatas','Preparação Vestibular','Base Matemática','Ciências'],2),
('technical','SENAI','Técnico em Administração','06/2023','Concluído',NULL,ARRAY['Gestão','Processos','Qualidade','Liderança'],1),
('technical','Digital Innovation One','Backend Developer','12/2024','Concluído',NULL,ARRAY['APIs','Server-side','Database','Security'],2),
('technical','Digital Innovation One','Object-Oriented Developer','09/2024','Concluído',NULL,ARRAY['OOP','Design Patterns','SOLID','Clean Code'],3),
('technical','Digital Innovation One','Programmer','05/2024','Concluído',NULL,ARRAY['Logic','Algorithms','Data Structures'],4),
('technical','Digital Innovation One','Basic Frontend','03/2024','Concluído',NULL,ARRAY['HTML5','CSS3','JavaScript','Responsive'],5),
('technical','Certificação','Auxiliar Mecânico de Manutenção','08/2022','Concluído',NULL,ARRAY['Manutenção','Mecânica','Equipamentos'],6),
('technical','People','Robótica','2019','Concluído',NULL,ARRAY['Automação','Programação','Eletrônica'],7),
('technical','Microlins','Montagem e Manutenção de Computadores e Redes','2019','Concluído',NULL,ARRAY['Hardware','Redes','Manutenção','Infraestrutura'],8),
('technical','Microlins','Design Gráfico e Multimídia','2019','Concluído',NULL,ARRAY['Corel Draw','Photoshop','Flash','After Effects','3D Studio Max'],9),
('technical','Micropro','Profissional Administrativo Tecnológico','2018','Concluído',NULL,ARRAY['Administração','Tecnologia','Gestão'],10),
('technical','Micropro','Contabilidade / Secretariado / Departamento Pessoal','2018','Concluído',NULL,ARRAY['Contabilidade','RH','Secretariado','Legislação'],11);

-- ========== Certificates ==========
CREATE TABLE public.certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  institution text NOT NULL DEFAULT '',
  date text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'Concluído',
  skills text[] NOT NULL DEFAULT '{}',
  description text NOT NULL DEFAULT '',
  order_index int NOT NULL DEFAULT 0,
  is_active bool NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.certificates TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.certificates TO authenticated;
GRANT ALL ON public.certificates TO service_role;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Admins write certificates" ON public.certificates FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_certificates_updated BEFORE UPDATE ON public.certificates
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.certificates (title, institution, date, status, skills, description, order_index) VALUES
('Full Stack Developer','Digital Innovation One','05/2025','Concluído',ARRAY['Full Stack','Frontend','Backend','Database'],'Certificação completa em desenvolvimento full stack com foco em tecnologias modernas.',1),
('Backend Developer','Digital Innovation One','12/2024','Concluído',ARRAY['APIs','Server-side','Database','Security'],'Especialização em desenvolvimento backend com foco em APIs e arquitetura de sistemas.',2),
('Object-Oriented Developer','Digital Innovation One','09/2024','Concluído',ARRAY['OOP','Design Patterns','SOLID','Clean Code'],'Fundamentos sólidos de programação orientada a objetos e boas práticas.',3),
('Programmer','Digital Innovation One','05/2024','Concluído',ARRAY['Logic','Algorithms','Data Structures','Problem Solving'],'Base fundamental em lógica de programação e estruturas de dados.',4),
('Basic Frontend','Digital Innovation One','03/2024','Concluído',ARRAY['HTML5','CSS3','JavaScript','Responsive'],'Introdução ao desenvolvimento frontend com tecnologias essenciais.',5),
('Técnico em Administração','SENAI','06/2023','Concluído',ARRAY['Gestão','Processos','Qualidade','Liderança'],'Formação técnica em administração com foco em gestão de processos.',6);

-- ========== Experiences ==========
CREATE TABLE public.experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  position text NOT NULL,
  period text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'ti',
  description text NOT NULL DEFAULT '',
  responsibilities text[] NOT NULL DEFAULT '{}',
  technologies text[] NOT NULL DEFAULT '{}',
  achievements text[] NOT NULL DEFAULT '{}',
  order_index int NOT NULL DEFAULT 0,
  is_active bool NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.experiences TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.experiences TO authenticated;
GRANT ALL ON public.experiences TO service_role;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Admins write experiences" ON public.experiences FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_experiences_updated BEFORE UPDATE ON public.experiences
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.experiences (company, position, period, type, description, responsibilities, technologies, achievements, order_index) VALUES
('TID Software','Auxiliar de Informática Jr.','07/2024 - Atualmente','ti','Atuo no suporte técnico e desenvolvimento, sendo responsável por introduzir usuários ao sistema TID, realizar mapeamento de sistemas internos e atender demandas de suporte. Faço visitas a empresas para atender demandas específicas de clientes.',
 ARRAY['Introdução ao usuário e suporte para uso geral do sistema TID','Mapeamento do sistema interno do cliente','Suporte ao usuário em demandas diversas','Visitas a empresas para atendimento de demandas','Documentação de processos e sistemas'],
 ARRAY['Sistemas TID','Suporte Técnico','Mapeamento','Documentação'],
 ARRAY['Implementação de processos de suporte mais eficientes','Redução no tempo de resposta ao cliente','Melhoria na documentação de sistemas'],1),
('Caterpillar Brasil','Aprendiz Administrativo','02/2023 - 06/2024','administrativo','Trabalhei com conferência de Notas Fiscais, classificação para depreciação e transferências entre filiais. Utilizei sistemas como RED-E, RIS e SAP, além de elaborar relatórios mensais de depreciação.',
 ARRAY['Conferência de Notas Fiscais e classificação para depreciação mensal e anual','Operação dos sistemas RED-E e RIS','Transferências de itens entre filiais via sistema SAP','Elaboração de lista de depreciação mensal','Controle de processos administrativos'],
 ARRAY['SAP','RED-E','RIS','Excel','Processos Administrativos'],
 ARRAY['Otimização do processo de depreciação','Redução de erros em transferências','Melhoria na organização de documentos fiscais'],2),
('Magazine Luiza','Assistente de Vendas Jr.','04/2022 - 01/2023','vendas','Responsável pelo controle e organização de estoque, aplicação de metodologias 5S e FIFO, atendimento ao público e controle digital. Gerenciei saída de pedidos e elaborei relatórios de inventário.',
 ARRAY['Controle e organização de estoque','Aplicação de metodologias 5S e FIFO','Atendimento ao público','Controle digital de pedidos'],
 ARRAY['5S','FIFO','Atendimento','Vendas'],
 ARRAY['Melhoria da organização do estoque','Redução de perdas','Aumento da satisfação do cliente'],3);

-- ========== Skills (unified) ==========
CREATE TABLE public.skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_name text NOT NULL CHECK (group_name IN ('technical','tools','soft','methodologies')),
  name text NOT NULL,
  level int,
  category text,
  order_index int NOT NULL DEFAULT 0,
  is_active bool NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.skills TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.skills TO authenticated;
GRANT ALL ON public.skills TO service_role;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Admins write skills" ON public.skills FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_skills_updated BEFORE UPDATE ON public.skills
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.skills (group_name, name, level, category, order_index) VALUES
('technical','JavaScript',85,'Frontend',1),
('technical','HTML/CSS',90,'Frontend',2),
('technical','React.js',75,'Frontend',3),
('technical','Java',70,'Backend',4),
('technical','MySQL',80,'Database',5),
('technical','SQL Server',75,'Database',6),
('technical','Python',65,'Backend',7),
('technical','C#',60,'Backend',8),
('tools','Git/GitHub',85,'Tools',1),
('tools','VS Code',90,'Tools',2),
('tools','Photoshop',80,'Design',3),
('tools','Corel Draw',85,'Design',4),
('tools','SAP',70,'Enterprise',5),
('tools','Docker',50,'Tools',6),
('soft','Resolução de problemas complexos',NULL,NULL,1),
('soft','Visão analítica de negócios',NULL,NULL,2),
('soft','Capacidade de aprendizado rápido',NULL,NULL,3),
('soft','Comunicação técnica eficaz',NULL,NULL,4),
('soft','Trabalho em equipe',NULL,NULL,5),
('soft','Análise crítica',NULL,NULL,6),
('soft','Adaptabilidade',NULL,NULL,7),
('soft','Organização',NULL,NULL,8),
('methodologies','Scrum/Kanban',NULL,NULL,1),
('methodologies','Análise de Requisitos',NULL,NULL,2),
('methodologies','Modelagem de Dados',NULL,NULL,3),
('methodologies','UML',NULL,NULL,4),
('methodologies','Prototipagem',NULL,NULL,5),
('methodologies','5S e FIFO',NULL,NULL,6),
('methodologies','REST APIs',NULL,NULL,7),
('methodologies','Levantamento de requisitos',NULL,NULL,8);
