web_project_news_explorer - Etapa 2 (Back-End)

## Descrição:

Esta é a segunda etapa do projeto full-stack, focada na implementação do back-end com Node.js e Express. O projeto inclui uma API RESTful com autenticação JWT, conexão com banco de dados MongoDB e validação de dados.

##Funcionalidades Implementadas:

✅ API com endpoints para registro e login de usuários

✅ Autenticação JWT com proteção de rotas

✅ CRUD completo para artigos salvos

✅ Validação de dados com Joi/Celebrate

✅ Criptografia de senhas com bcrypt

✅ Tratamento centralizado de erros

✅ Logs de requisições e erros

✅ Configuração de variáveis de ambiente

✅ Conexão segura com MongoDB

✅ Deploy em produção com HTTPS

✅ Rate limiting para segurança

✅ Configuração ESLint sem erros

## Tecnologias Utilizadas:

Node.js

Express.js

MongoDB/Mongoose

JWT para autenticação

bcryptjs para criptografia

Celebrate/Joi para validação

Helmet para segurança

Winston para logging

ESLint para linting

## Como Executar o Projeto:

Pré-requisitos:

Node.js (v14 ou superior)

MongoDB Atlas ou local

Git

## Instalação:

Clone o repositório:

bash

git clone https://github.com/datasetsprojeto/web_project_news_explorer.git

Entre no diretório do backend:

bash

cd backend

## Instale as dependências:

bash

npm install

Configure as variáveis de ambiente:

bash

cp .env.example .env

Edite o arquivo .env com suas configurações

Execute em modo desenvolvimento:

bash

npm run dev

Execute em modo produção:

bash

npm run start

## Endpoints da API:

POST /signup - Registro de usuário

POST /signin - Login de usuário

GET /users/me - Obter informações do usuário

GET /articles - Listar artigos salvos

POST /articles - Criar artigo

DELETE /articles/:articleId - Excluir artigo

## Critérios Atendidos:

✅ Estrutura de arquivos completa com ESLint configurado

✅ Scripts de start e dev funcionais

✅ Todas as rotas implementadas e protegidas

✅ Validação de dados nas requisições

✅ Tratamento de erros com códigos de status apropriados

✅ Senhas armazenadas com hash

✅ Variáveis de ambiente para configurações sensíveis

✅ Logs de requisições e erros

✅ Rate limiting implementado

✅ API deployed em produção

## Próximas Etapas:

Integração front-end com back-end

Implementação de testes automatizados

Otimização de performance

Documentação completa com Swagger

## Autor:

Renato Soares Pereira
