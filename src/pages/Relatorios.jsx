import { useState } from 'react'

const tabs = ['Financeiro', 'Agendamentos', 'Pacientes']
const atendimentosPorTipo = [
  { label: 'Limpeza', valor: 0 },
  { label: 'Restauração', valor: 0 },
  { label: 'Endodontia', valor: 0 },
  { label: 'Ortodontia', valor: 0 },
  { label: 'Extração', valor: 0 },
]

export default function Relatorios() {
  const [tab, setTab] = useState('Financeiro')
  const max = Math.max(...atendimentosPorTipo.map((a) => a.valor))

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Relatórios</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary">📅 01/09/2026 - 30/09/2026</button>
          <button className="btn btn-primary">Gerar Relatório</button>
        </div>
      </div>

      <div className="tabs">
        {tabs.map((t) => (
          <button key={t} className={'tab' + (tab === t ? ' active' : '')} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      <div className="grid grid-3" style={{ marginBottom: 16 }}>
        <div className="card stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Total de atendimentos</div>
          <div className="stat-trend">↗ 0% em relação ao período anterior</div>
        </div>
        <div className="card stat-card">
          <div className="stat-value">R$ 0,00</div>
          <div className="stat-label">Receita total</div>
          <div className="stat-trend">↗ 0% em relação ao período anterior</div>
        </div>
        <div className="card stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Novos pacientes</div>
          <div className="stat-trend">↗ 0% em relação ao período anterior</div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3 className="card-title">Atendimentos por tipo</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 130, marginTop: 16 }}>
            {atendimentosPorTipo.map((a) => (
              <div key={a.label} style={{ flex: 1, textAlign: 'center' }}>
                <div className="muted" style={{ fontSize: '0.75rem', marginBottom: 4 }}>{a.valor}</div>
                <div style={{
                  height: (a.valor / max) * 100,
                  background: 'linear-gradient(180deg, var(--teal-light), var(--teal-dark))',
                  borderRadius: 4,
                }} />
                <div className="muted" style={{ fontSize: '0.7rem', marginTop: 6 }}>{a.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Forma de pagamento</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
            {[
              { label: 'Pix', pct: 0, cor: 'var(--teal)' },
              { label: 'Cartão', pct: 0, cor: 'var(--teal-light)' },
              { label: 'Dinheiro', pct: 0, cor: 'var(--warning)' },
              { label: 'Convênio', pct: 0, cor: 'var(--text-muted)' },
            ].map((f) => (
              <div key={f.label} className="flex-between" style={{ fontSize: '0.85rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: f.cor, display: 'inline-block' }} />
                  {f.label}
                </span>
                <span className="muted">{f.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
