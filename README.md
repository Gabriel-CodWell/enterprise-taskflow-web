<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
</p>

# 🚀 Enterprise.TaskFlow Web (Dashboard)

Este é o painel de controle corporativo (Front-end) desenvolvido para consumir a API **[Enterprise.TaskFlow](https://github.com/Gabriel-CodeWell/enterprise-taskflow-api)**. O projeto foi construído para demonstrar boas práticas de arquitetura front-end, consumo de APIs RESTful e gerenciamento de estado utilizando tecnologias modernas.

## 🎯 O que este projeto resolve?
Em sistemas de gestão e logística, interfaces precisam ser rápidas, responsivas e manter o estado sincronizado com o back-end. Este projeto atua como a camada de visualização e interação do sistema de tarefas, lidando com autenticação segura (JWT), rotas protegidas e atualização de interface baseada nas respostas da API.

## 🏗️ Arquitetura e Tecnologias
O projeto foi inicializado utilizando **Vite** para garantir um build ultrarrápido e adota **TypeScript** para tipagem estática e segurança no desenvolvimento.

*   **Framework/Biblioteca:** React 18
*   **Linguagem:** TypeScript
*   **Estilização:** Tailwind CSS (focado em UI corporativa/limpa)
*   **Roteamento:** React Router DOM (com Private Routes)
*   **Requisições HTTP:** Axios (configurado com Interceptors para injeção de JWT)
*   **Gerenciamento de Estado:** Zustand / Context API

## ⚙️ Como executar o projeto localmente

**Pré-requisitos:**
*   [Node.js](https://nodejs.org/) (v18 ou superior)
*   A API [Enterprise.TaskFlow](https://github.com/Gabriel-CodeWell/enterprise-taskflow-api) rodando localmente na porta 5000.

**Passo a passo:**

1. Clone este repositório:
   ```bash
   git clone [https://github.com/Gabriel-CodeWell/enterprise-taskflow-web.git](https://github.com/Gabriel-CodeWell/enterprise-taskflow-web.git)
   cd enterprise-taskflow-web
