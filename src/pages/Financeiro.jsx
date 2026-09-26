import { useState } from 'react'
import { movimentacoesFinanceiras } from '../mockData'

const tabs = ['Resumo', 'Contas a Receber', 'Contas a Pagar']
const categorias = [
  { label: 'Materiais', pct: 45 },
  { label: 'Laboratório', pct: 20 },
  { label: 'Salários', pct: 15 },
  { label: 'Aluguel', pct: 10 },
  { label: 'Outros', pct: 10 },
]

export default function Financeiro() {
  const [tab, setTab] = useState('Resumo')

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Financeiro</h1>
        <button className="btn btn-secondary">📅 Setembro 2026</button>
      </div>

      <div className="tabs">
        {tabs.map((t) => (
          <button key={t} className={'tab' + (tab === t ? ' active' : '')} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {tab === 'Resumo' ? (
        <>
          <div className="grid grid-3" style={{ marginBottom: 16 }}>
            <div className="card stat-card">
              <div className="stat-value">R$ 0,00</div>
              <div className="stat-label">Receita do mês</div>
              <div className="stat-trend">↗ 0% em relação ao mês anterior</div>
            </div>
            <div className="card stat-card">
              <div className="stat-value">R$ 0,00</div>
              <div className="stat-label">Despesas do mês</div>
              <div className="stat-trend" style={{ color: 'var(--danger)' }}>↘ -8% em relação ao mês anterior</div>
            </div>
            <div className="card stat-card">
              <div className="stat-value">R$ 0.00</div>
              <div className="stat-label">Lucro líquido</div>
              <div className="stat-trend">↗ 0% em relação ao mês anterior</div>
            </div>
          </div>

          <div className="grid grid-2">
            <div className="card">
              <h3 className="card-title">Movimentações recentes</h3>
              <table>
                <thead>
                  <tr><th>Data</th><th>Descrição</th><th>Tipo</th><th>Valor</th></tr>
                </thead>
                <tbody>
                  {movimentacoesFinanceiras.map((m, i) => (
                    <tr key={i}>
                      <td className="muted">{m.data}</td>
                      <td>{m.descricao}</td>
                      <td><span className={'badge ' + (m.tipo === 'Recebimento' ? 'badge-ok' : 'badge-danger')}>{m.tipo}</span></td>
                      <td>{m.valor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card">
              <h3 className="card-title">Despesas por categoria</h3>
              {categorias.map((c) => (
                <div key={c.label} style={{ marginBottom: 12 }}>
                  <div className="flex-between" style={{ fontSize: '0.82rem', marginBottom: 4 }}>
                    <span>{c.label}</span><span className="muted">{c.pct}%</span>
                  </div>
                  <div style={{ background: 'var(--bg-card)', borderRadius: 6, height: 6 }}>
                    <div style={{ width: `${c.pct}%`, height: '100%', borderRadius: 6, background: 'var(--teal)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="card muted">Conteúdo da aba "{tab}" ainda não implementado.</div>
      )}
    </div>
  )
}
