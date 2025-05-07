# 🛡️ Projeto de Autenticação com NestJS + Prisma + JWT + React

![alt text](image.png)
Este projeto é uma aplicação fullstack composta por um backend em **NestJS** e um frontend em **React (Vite)**. Ele oferece autenticação segura via JWT, integração com banco de dados PostgreSQL usando Prisma ORM, e observabilidade com Winston + AWS CloudWatch.

---

## 🚀 Stack de Tecnologias Utilizadas

| Tecnologia         | Descrição                                                                 |
|--------------------|---------------------------------------------------------------------------|
| **NestJS**         | Framework Node.js para construção de aplicações escaláveis em TypeScript. |
| **Prisma ORM**     | ORM moderno e tipado para banco de dados relacional.                      |
| **PostgreSQL**     | Banco de dados relacional usado na aplicação.                             |
| **Docker Compose** | Orquestrador para containers, usado para subir o PostgreSQL localmente.   |
| **JWT (jsonwebtoken)** | Para autenticação stateless com tokens seguros.                    |
| **Winston Logger** | Gerenciador de logs estruturados.                                          |
| **CloudWatch**     | Serviço da AWS para armazenar e analisar logs.                            |
| **Swagger (OpenAPI)** | Documentação automática e interativa da API.                         |
| **PNPM**           | Gerenciador de pacotes rápido e eficiente.                                |
| **React + Vite**   | Frontend leve e moderno com build otimizado.                              |

---

## 📁 Estrutura Simplificada do Projeto
---
### 📦 Backend (NestJS)

```bash
backend/
├── src/
│   ├── auth/                  # Lógica de autenticação (login, JWT, guards, DTOs)
│   ├── users/                 # Lógica de criação e gerenciamento de usuários
│   ├── cloudwatch-logger/    # Serviço de logging para AWS CloudWatch (via Winston)
│   ├── database/             # PrismaService para injeção do PrismaClient
│   ├── model/                # Schema do banco e migrations (Prisma)
│   ├── app.module.ts         # Módulo raiz da aplicação NestJS
│   └── main.ts               # Bootstrap da aplicação (ponto de entrada)
│
├── .env-example              # Exemplo de variáveis de ambiente
├── docker-compose.yml        # Container para banco PostgreSQL
├── README.md                 # Documentação do projeto
├── package.json              # Scripts e dependências do projeto
└── tsconfig.json            # Configurações do TypeScript
```
---
---

### 🎨 Frontend (React + Vite)

```bash
frontend/
├── node_modules/            # Dependências do projeto frontend
├── public/                  # Arquivos públicos (favicon, index.html base)
├── src/                     # Código-fonte principal da aplicação React
│   ├── assets/              # Imagens e recursos estáticos
│   ├── App.jsx              # Componente principal da aplicação
│   ├── main.jsx             # Ponto de entrada da aplicação (ReactDOM)
│   ├── App.css              # Estilos globais do App
│   ├── index.css            # Estilos gerais base
├── index.html               # HTML base usado pelo Vite
├── vite.config.js           # Configuração do Vite
├── package.json             # Scripts e dependências do projeto frontend
├── pnpm-lock.yaml           # Lockfile do gerenciador de pacotes
└── .gitignore               # Arquivos ignorados pelo Git
```
---


## ✅ Funcionalidades Implementadas

- [x] **POST /auth/login**: Endpoint de autenticação com retorno de JWT.
- [x] **POST /users**: Criação de usuários.
- [x] **CloudWatch**: Logging com Winston para AWS CloudWatch.
- [x] **Swagger**: Documentação da API em `/api`.
- [x] **Prisma**: ORM e sistema de migrations.
- [x] **Prisma Studio**: Visualização gráfica do banco de dados.
- [x] **Logs locais**: Possibilidade de desativar CloudWatch para debug no terminal.
- [x] **Banco com Docker Compose**: PostgreSQL containerizado para facilitar desenvolvimento.

---

## 📦 Como Rodar o Projeto

### 1. Configurar Variáveis de Ambiente

Copie o arquivo `.env-example` para `.env` e preencha os campos:

```bash
cp .env-example .env
```

### 2. Subir o Banco de Dados com Docker Compose

Na raiz do projeto:

```bash
docker compose up -d
```

### 3. Instalar Dependências

```bash
cd backend 
pnpm install
```

### 4. Rodar as Migrations

```bash
pnpm prisma migrate:deploy
```

### 5. Iniciar o Servidor

```bash
pnpm start
```

---


### 6. Instalar as dependencias do frontend
```bash
cd /frontend/
pnpm install

```

### 7. Inicializar frontend

```bash
pnpm dev
```


## 🔁 Endpoints Disponíveis

### 🔐 POST `/auth/login`
- **Descrição**: Autentica usuário e retorna um token JWT.
- **Exemplo de Request**:
```json
{
  "email": "usuario@dominio.com",
  "password": "senha"
}
```
- **Resposta**:
```json
{
  "access_token": "jwt_gerado"
}
```

---

### 👤 POST `/users`
- **Descrição**: Criação de novo usuário.
- **Request**:
```json
{
  "name": "Usuário",
  "email": "usuario@dominio.com",
  "password": "senha_segura"
}
```
- **Resposta**:
```json
{
  "id": "1",
  "name": "Usuário",
  "email": "usuario@dominio.com",
  "createdAt": "2025-04-25T10:00:00Z"
}
```

---

### 📘 Swagger
- Acesse a documentação interativa da API:
  [http://localhost:3000/api](http://localhost:3000/api)

---

### 🧪 Prisma Studio

```bash
npx prisma studio
```

---

## ⚠️ Debug com Logs no Terminal

Se você não configurou corretamente as variáveis do CloudWatch, os logs podem não aparecer. Para desabilitar o envio para o CloudWatch e visualizar no terminal, edite o `main.ts`:

**ANTES**:
```ts
const app = await NestFactory.create(AppModule, {
  logger: WinstonModule.createLogger({
    transports: cloudwatchLogger.transports,
  }),
});
```

**DEPOIS**:
```ts
const app = await NestFactory.create(AppModule);
```

---