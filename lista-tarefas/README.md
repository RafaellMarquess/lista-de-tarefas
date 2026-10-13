# Lista de Tarefas (React + React Router + Vite)

Lista de tarefas com página de login funcional e rotas protegidas.

## Como rodar

```bash
npm install
npm run dev
```

Acesse o endereço mostrado no terminal (normalmente http://localhost:5173).

## Usuários de teste

| E-mail           | Senha     |
| ---------------- | --------- |
| admin@teste.com  | 123456    |
| aluno@teste.com  | react2026 |

## Estrutura

```
src/
├── components/   NavBar, ItemTarefa, RotaProtegida
├── context/      AuthContext (login, cadastro, logout, sessão)
├── services/     authService (dados de usuários; trocar por fetch ao ter servidor)
├── pages/        Inicio, Login, Cadastro, Tarefas, DetalheTarefa, NaoEncontrada
├── App.jsx       definição das rotas
└── main.jsx      BrowserRouter + AuthProvider
```

## Rotas

- `/` — início (pública)
- `/login` — login (pública)
- `/cadastro` — criação de conta (pública)
- `/tarefas` e `/tarefas/:id` — protegidas, exigem login
- `*` — página 404

## Integrando com um servidor

Todo o acesso a dados de usuário está em `src/services/authService.js` (funções `entrar` e `cadastrar`, já assíncronas). Ao ter a API, substitua o corpo dessas funções por `fetch` mantendo o retorno `{ ok, usuario }` / `{ ok: false, erro }` — telas e contexto não precisam mudar. Hoje os usuários ficam no `localStorage` com senha em texto puro, só para simulação.
