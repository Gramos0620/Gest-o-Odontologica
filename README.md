# OralGest — Interface (Vite + React)

## Como rodar
```bash
npm install
npm run dev
```

## Como funciona a navegação
Não usamos react-router. Em `src/App.jsx` existe um estado `pagina`
(`useState('dashboard')`) que guarda o nome da tela atual. A função
`renderPagina()` faz um `switch` nesse estado e retorna o componente
da página correspondente. O `Sidebar` chama `onNavigate('nomeDaPagina')`
para trocar esse estado — é só isso que "troca de tela".

Páginas: `dashboard`, `agenda`, `pacientes`, `prontuario`, `financeiro`,
`relatorios`, `configuracoes`. O prontuário guarda também qual paciente
foi clicado (`pacienteSelecionado`) para exibir os dados dele.

## Estrutura
```
src/
  App.jsx              -> navegação e login
  mockData.js           -> dados fake (trocar depois pelo Supabase)
  components/
    Sidebar.jsx
    Topbar.jsx
    NovoAgendamentoModal.jsx
  pages/
    Login.jsx
    Dashboard.jsx
    Agenda.jsx
    Pacientes.jsx
    Prontuario.jsx
    Financeiro.jsx
    Relatorios.jsx
    Configuracoes.jsx
  styles/index.css       -> design system (cores, cards, tabelas, etc.)
```

## Próximos passos sugeridos
1. Ajustar detalhes visuais finos comparando com o mockup.
2. Trocar `mockData.js` por chamadas reais ao Supabase.
3. Adicionar validação nos formulários (Login, Novo Agendamento, Configurações).
4. Fazer o modal de Novo Agendamento realmente adicionar um item na Agenda.
