<div align="center">

# 🏢 Enterprise TaskFlow — Web

**Dashboard corporativo de gestão de tarefas construído para escalar.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 🔗 Visão Geral e Integração

Este repositório é o **Front-end** do ecossistema **Enterprise TaskFlow** — um sistema Full Stack de gestão de tarefas corporativas projetado para ambientes logísticos e operacionais.

A interface consome diretamente a [**Enterprise TaskFlow API**](https://github.com/seu-usuario/enterprise-taskflow-api), uma API RESTful construída em **.NET 8** com **Clean Architecture**, **CQRS (MediatR)**, **Redis** (cache de 5 min), **RabbitMQ** (mensageria assíncrona) e **SQL Server**.

> Juntos, API + Web formam um ecossistema Full Stack completo — da persistência e cache distribuído até a experiência do usuário final no navegador.

---

## 🏗️ Decisões Arquiteturais

### Autenticação & Segurança

| Aspecto | Implementação |
|---|---|
| **Protocolo** | JWT Bearer Token emitido pela API |
| **Armazenamento** | `localStorage` com gerenciamento via Zustand |
| **Injeção automática** | Axios Interceptor injeta `Authorization: Bearer <token>` em todas as requests |
| **Expiração** | Interceptor de resposta detecta `401 Unauthorized`, limpa o estado e redireciona ao login |
| **Rotas protegidas** | `PrivateRoute` wrapper valida sessão antes de renderizar rotas autenticadas |

### Gerenciamento de Estado

Utilizo **Zustand** como state manager global por ser:
- **Minimalista** — sem boilerplate de reducers, actions ou providers;
- **Type-safe** — integração nativa com TypeScript sem wrappers;
- **Performático** — subscriptions granulares que evitam re-renders desnecessários.

As stores são divididas por domínio:

```
stores/
├── useAuthStore.ts    → Token JWT, dados do usuário, login/logout
└── useTaskStore.ts    → Tarefas pendentes, loading states, ações
```

### Componentização

A estrutura segue o padrão de **Feature-based Organization**, separando responsabilidades de forma clara:

```
src/
├── components/        → Componentes reutilizáveis de UI (Button, Card, Modal...)
├── hooks/             → Custom hooks encapsulando lógica de negócio
├── pages/             → Componentes de página (Login, Dashboard)
├── routes/            → Configuração do React Router + PrivateRoute
├── services/api/      → Instância Axios, interceptors e módulos de endpoint
├── stores/            → Zustand stores por domínio
├── types/             → Interfaces e tipos TypeScript compartilhados
├── App.tsx            → Componente raiz com Provider de rotas
├── main.tsx           → Entry point da aplicação
└── index.css          → Design System (Tailwind v4 @theme tokens)
```

### Design System

O CSS é construído sobre o sistema de **@theme tokens** do Tailwind CSS v4, garantindo consistência visual sem classes arbitrárias:

| Token | Uso |
|---|---|
| `brand-*` | Cores primárias da marca (blue scale) |
| `surface-*` | Tons neutros para backgrounds e texto (slate scale) |
| `success-*` / `danger-*` / `warning-*` | Feedback visual de status |
| `font-sans` | Inter (Google Fonts) — tipografia profissional |

> A interface opera em **dark mode por padrão**, seguindo a tendência de dashboards corporativos modernos que priorizam conforto visual em operações prolongadas.

---

## ⚡ Funcionalidades

| Funcionalidade | Endpoint Consumido | Descrição |
|---|---|---|
| 🔐 **Login** | `POST /api/auth/login` | Autenticação com username/password. Armazena o JWT e redireciona ao Dashboard. |
| 📋 **Listagem de Tarefas** | `GET /api/tasks/pending` | Exibe todas as tarefas pendentes. A API serve dados do cache Redis (TTL 5 min) para alta performance. |
| ✅ **Completar Tarefa** | `POST /api/tasks/{id}/complete` | Marca a tarefa como concluída. A API invalida o cache e publica um evento no RabbitMQ. A UI atualiza instantaneamente. |

---

## 🛠️ Tech Stack

| Camada | Tecnologia | Versão | Propósito |
|---|---|---|---|
| **UI Library** | React | 19.x | Construção de interfaces declarativas |
| **Linguagem** | TypeScript | 6.0 | Tipagem estática e segurança em tempo de compilação |
| **Build Tool** | Vite | 8.x | HMR instantâneo e builds otimizados |
| **Estilização** | Tailwind CSS | 4.x | Utility-first CSS com design tokens customizados |
| **Roteamento** | React Router DOM | 7.x | SPA routing com rotas protegidas |
| **HTTP Client** | Axios | 1.x | Requisições HTTP com interceptors para JWT |
| **Estado Global** | Zustand | 5.x | State management minimalista e performático |
| **Lint** | Oxlint | 1.x | Linting rápido com regras React + TypeScript |

---

## 🚀 Como Executar

### Pré-requisitos

- **Node.js** ≥ 18
- **npm** ≥ 9
- [**Enterprise TaskFlow API**](https://github.com/seu-usuario/enterprise-taskflow-api) rodando na porta `5000`

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/enterprise-taskflow-web.git
cd enterprise-taskflow-web

# 2. Instale as dependências
npm install

# 3. Configure o ambiente
cp .env.example .env
```

Edite o arquivo `.env` com a URL da sua API local:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

```bash
# 4. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em **http://localhost:5173**.

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com HMR |
| `npm run build` | Gera o bundle de produção otimizado |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` | Executa o Oxlint para análise estática |

---

## 🔄 Fluxo de Integração com a API

```
┌─────────────────────┐       HTTP/JWT        ┌──────────────────────────┐
│                     │ ───────────────────▶  │                          │
│   Enterprise        │                       │   Enterprise             │
│   TaskFlow Web      │  ◀───────────────── │   TaskFlow API           │
│                     │       JSON            │                          │
│   React + TS        │                       │   .NET 8                 │
│   Vite + Tailwind   │                       │   Clean Architecture     │
│                     │                       │   Redis + RabbitMQ       │
└─────────────────────┘                       └──────────────────────────┘
        :5173                                         :5000
```

1. **Login** → O front-end envia credenciais via `POST`. A API retorna um JWT válido por 1h.
2. **Dashboard** → Axios injeta o token automaticamente. A API retorna tarefas do cache Redis.
3. **Completar** → O front-end dispara o `POST`. A API marca a tarefa, invalida o cache e publica no RabbitMQ.

---

## 📁 Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `VITE_API_BASE_URL` | ✅ | URL base da Enterprise TaskFlow API (ex: `http://localhost:5000/api`) |

---

## 📄 Licença

Este projeto é de uso educacional e demonstrativo — desenvolvido como parte de um portfólio Full Stack profissional.

---

<div align="center">

**Feito com ☕ e boas práticas por [Gabriel CodWell](https://www.linkedin.com/in/gabriel-codwell-7b060a433/)**

*Enterprise TaskFlow — Da arquitetura limpa ao pixel perfeito.*

</div>
