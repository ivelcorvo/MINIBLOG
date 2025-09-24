# ✍️ MiniBlog

Aplicação web em **React** que simula um **blog com CRUD completo**:\
- ✨ Criação de posts\
- 📝 Edição de posts\
- ❌ Exclusão de posts

### Recursos principais

-   **React Router** para navegação\
-   **Hooks + Context API** para gerenciamento de estados globais\
-   **Firebase Authentication** para login/registro de usuários\
-   **Firebase Database** (via SDK oficial) para persistência
    dos posts\
-   **TailwindCSS** para interfaces modernas e responsivas

## 🚀 Tecnologias Utilizadas

-   **React (Create React App)**\
-   **React Router**\
-   **Context API & Hooks**\
-   **Firebase SDK (Auth + Database)**\
-   **TailwindCSS**

## 🔒 Segurança e Deploy

O deploy é feito com **GitHub Actions**, garantindo integração e entrega
contínua.

-   Por padrão, o `GITHUB_TOKEN` já garante autenticação segura.\
-   No entanto, utilizei um **Personal Access Token (Fine-grained)** comFral
    permissões restritas (`Contents: Read & Write`) apenas para este
    repositório.

Essa escolha demonstra:\
- ✔️ Princípio de **menor privilégio**\
- ✔️ Conhecimento de **configurações avançadas do GitHub**\
- ✔️ Capacidade de adaptação do fluxo de autenticação

## 💡 Aprendizados e Boas Práticas

-   Integração direta com **Firebase SDK** (sem libs extras)\
-   CRUD completo com **Firebase Database**\
-   Proteção de rotas com **React Router**\
-   Organização de estados globais via **Context API**\
-   Interface **responsiva** e escalável com TailwindCSS