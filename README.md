# web_project_news_explorer - Etapa 2 

Este é o backend do projeto News Explorer, uma aplicação full-stack que permite aos usuários buscar notícias e salvar artigos de seu interesse. Esta API fornece autenticação de usuários, gestão de artigos salvos e integração com o frontend React.

## 🚀 Tecnologias Utilizadas:

Node.js - Ambiente de execução JavaScript

Express.js - Framework web para Node.js

MongoDB - Banco de dados NoSQL

Mongoose - ODM para MongoDB

JWT - Autenticação baseada em tokens

bcryptjs - Criptografia de senhas

Celebrate - Validação de dados

Helmet - Segurança de headers HTTP

Winston - Sistema de logging

CORS - Habilitação de cross-origin requests

## 📋 Pré-requisitos:

Node.js (versão 16 ou superior)

MongoDB (local ou em nuvem)

npm ou yarn

## 🔧 Instalação e Configuração:

Clone o repositório:

bash
git clone <url-do-repositorio>
cd news-explorer-api
Instale as dependências:

bash
npm install
Configure as variáveis de ambiente:

Copie o arquivo .env.example para .env

Preencha as variáveis com seus valores:

.env
NODE_ENV=development
PORT=3001
DB_URL=mongodb://localhost:27017/newsdb
JWT_SECRET=seu-super-segredo-jwt-aqui
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
Inicie o servidor em modo desenvolvimento:

bash
npm run dev
Para produção:

bash
npm start

## Autor:

Renato Soares Pereira