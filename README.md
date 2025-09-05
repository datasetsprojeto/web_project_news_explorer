# web_project_news_explorer (Aplicação Full Stack)

## 📋 Descrição do Projeto:

O News Explorer é uma aplicação full-stack que permite aos usuários buscar notícias através de uma API externa, salvar artigos e acessá-los posteriormente. O projeto foi desenvolvido em três etapas, cada uma com foco em uma parte específica do desenvolvimento.

## 🚀 Funcionalidades Gerais:

Busca de Notícias: Integração com API externa para pesquisa e exibição de notícias.

Design Responsivo: Adaptado para diferentes resoluções de tela (a partir de 320px).

Autenticação de Usuários: Registro e login com validação de dados.

Salvar Artigos: Usuários autenticados podem salvar artigos em seu perfil.

Página de Artigos Salvos: Acesso aos artigos salvos, com possibilidade de exclusão.

Componentes Modais: Janelas pop-up funcionais para interações do usuário.

Carregamento Dinâmico: Exibição de 3 cards por vez com botão "Mostrar mais".

Validação de Formulários: Verificação client-side e server-side dos campos de entrada.

## 🛠️ Tecnologias Utilizadas: 

### Front-end:

React (CRA - Create React App)

CSS3 com Flexbox/Grid

BEM (Metodologia de nomenclatura CSS)

HTML5 Semântico

JavaScript ES6+

Fetch API para requisições HTTP

React Router para navegação

Context API para gerenciamento de estado global

### Back-end:

Node.js

Express.js

MongoDB

Mongoose

JWT (JSON Web Tokens) para autenticação

Celebrate/Joi para validação de dados

Winston para logging

Helmet para segurança

Rate limiting para proteção contra ataques de força bruta

Ferramentas de Desenvolvimento

ESLint para linting

Git para controle de versão

Postman para teste de APIs

## Pré-requisitos:

-Node.js (versão 14 ou superior)

-npm ou yarn

-MongoDB (local ou remoto)

## 🔧 Instalação e Execução:

### Clone o repositório:

bash

git clone 

[[URL do repositório](https://github.com/datasetsprojeto/web_project_news_explorer.git)]

Entrar no diretório:

bash

cd backend

### Instale as dependências:

Altere o .env.example para .env na pasta do backend com as seguintes variáveis:

.env

//Application

NODE_ENV=development
PORT=3001

//Database

DB_URL=mongodb://localhost:27017/newsdb

//JWT

JWT_SECRET=your-super-secret-jwt-key-here

//CORS

ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173

### ️️⚠️ Notas para o Backend:

Altere DB_URL conforme sua configuração do MongoDB

DEFINA UM SEGREDO JWT REAL - não use o valor exemplo em produção

Ajuste ALLOWED_ORIGINS para incluir URLs do seu frontend

bash

npm install

Execute em modo de desenvolvimento:

bash

npm start

### Entrar no diretório:

bash

cd frontend

### Instale as dependências:

Altere o .env.example para .env na pasta do frontend:

env

VITE_API_BASE_URL=http://localhost:3001

VITE_NEWS_API_KEY=sua_chave_real_da_api_de_noticias

### ⚠️ Notas para o Frontend:

A VITE_NEWS_API_KEY fornecida é apenas um exemplo - obtenha uma chave real em NewsAPI.org

Se o backend estiver em outra porta, atualize VITE_API_BASE_URL

bash

npm install

Execute em modo de desenvolvimento:

bash

npm run dev

# ✅ Etapas do Projeto

## Etapa 1: Front-end (Marcação e JSX + API de terceiros)

### *Critérios Implementados

#### Marcação e JSX:

Layout responsivo sem scroll horizontal a partir de 320px.
Navegação funcional entre páginas e links externos.
Nomenclatura BEM para classes CSS.
HTML semântico com tags apropriadas.
Uso de Flexbox/Grid para layout.
Projeto criado com Create React App.
Componentes modais com funcionalidade de abrir/fechar.

#### React e API:

Hooks usados corretamente (fora de condicionais/loops).
Requisições API com Fetch em arquivo separado.
Preloader durante requisições.
Exibição de mensagem "Nada encontrado" quando apropriado.
Paginação de resultados (3 cards por vez).

#### Boas Práticas:

Fontes conectadas via @font-face.
Ícones em SVG.
Estados de foco para elementos interativos.
Placeholders e validação de formulários.
Sem uso de reset.css.
Tratamento de erros da API.
Constantes em arquivo separado.

## Etapa 2: Back-End

### *Critérios Implementados

#### Infraestrutura:

Arquivos de configuração (package.json, .eslintrc, .gitignore) corretos.
Scripts para iniciar o servidor (dev e start).
Linting sem erros.

#### Rotas:

GET /users/me (retorna informações do usuário)
POST /signup (cria usuário)
POST /signin (login, retorna JWT)
GET /articles (retorna artigos salvos do usuário)
POST /articles (salva um artigo)
DELETE /articles/articleId (exclui um artigo)

#### Segurança:

Autenticação via JWT.
Proteção de rotas (exceto signin/signup).
Hash de senhas (bcrypt).
Validação de dados (celebrate/joi).

#### Tratamento de Erros:

Códigos de status HTTP apropriados.
Mensagens de erro descritivas.
Manipulador centralizado de erros.

#### Boas Práticas:

Logs de requisições e erros.
Variáveis de ambiente para dados sensíveis.
Arquivos de configuração separados.

## Etapa 3: Integração Front-end e Back-end (Autorização com React)

### *Critérios Implementados

#### Funcionalidades:

Registro e login com redirecionamento.
Proteção de rotas no front-end (ProtectedRoute).
Persistência de login com localStorage e JWT.
Logout com remoção do token.
Salvar e excluir artigos.
Página de artigos salvos com contagem e palavras-chave.
Gerenciamento de Estado:
Context API para dados do usuário.
Atualização de estado global upon login/logout.

#### Requisições Assíncronas:

Centralização das chamadas API.
Tratamento de erros e loading states.

## Boas Práticas:

Código limpo e legível.
Componentes reutilizáveis.
Nomenclatura consistente (camelCase, substantivos para componentes).
Hooks customizados com prefixo "use".

🌐 Deploy
Front-end
O front-end está implantado e acessível em: [http://news-explorer-full.strangled.net]

Back-end
O back-end está implantado e acessível em: [http://api.news-explorer-full.strangled.net)]

## 📝 Próximas Melhorias
Testes unitários e de integração.
PWA (Progressive Web App) capabilities.
Melhorias de acessibilidade.
Internacionalização (i18n).

## 👨‍💻 Desenvolvido por:

Renato Soares Pereira

Este projeto foi desenvolvido como parte do programa de formação em desenvolvimento web da TripleTen.
