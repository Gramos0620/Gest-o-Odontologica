import { Users, CalendarCheck, Wallet, Activity } from 'lucide-react'
import { agendaHoje, receita7dias } from '../mockData'

const stats = [
  { icon: Users, label: 'Pacientes do dia', value: '12', trend: '+3 que ontem' },
  { icon: CalendarCheck, label: 'Agendamentos', value: '12', trend: '8 confirmados | 2 pendentes' },
  { icon: Wallet, label: 'Receita do dia', value: 'R$ 2.850,00', trend: '+12% que ontem' },
  { icon: Activity, label: 'Em tratamento', value: '18', trend: '+3 novos' },
]

const statusBadge = {
  Confirmado: 'badge-ok',
  Pendente: 'badge-warn',
  Cancelado: 'badge-danger',
}

export default function Dashboard() {
  const max = Math.max(...receita7dias)
  const dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Olá, Dr. Kevin! 👋</h1>
          <p className="page-subtitle">Aqui está um resumo do seu consultório hoje. Quarta-feira, 10 de Setembro de 2026</p>
        </div>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 16 }}>
        {stats.map((s) => (
          <div className="card stat-card" key={s.label}>
            <div className="stat-icon"><s.icon size={18} /></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-trend">↗ {s.trend}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="flex-between" style={{ marginBottom: 10 }}>
            <h3 className="card-title mb-0">Próximos atendimentos</h3>
            <button className="card-link">Ver agenda completa →</button>
          </div>
          {agendaHoje.map((a) => (
            <div className="list-row" key={a.hora}>
              <div style={{ display: 'flex', gap: 14 }}>
                <span className="muted">{a.hora}</span>
                <span>{a.nome} <span className="muted">— {a.tipo}</span></span>
              </div>
              <span className={'badge ' + statusBadge[a.status]}>{a.status}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="flex-between" style={{ marginBottom: 4 }}>
            <h3 className="card-title mb-0">Receita dos últimos 7 dias</h3>
            <span style={{ color: 'var(--ok)', fontSize: '0.8rem' }}>+8%</span>
          </div>
          <div style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: 12 }}>R$ 14.320,00</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 110 }}>
            {receita7dias.map((v, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{
                  height: (v / max) * 90,
                  background: 'linear-gradient(180deg, var(--teal-light), var(--teal-dark))',
                  borderRadius: 4,
                }} />
                <div className="muted" style={{ fontSize: '0.7rem', marginTop: 6 }}>{dias[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-4" style={{ marginTop: 16 }}>
        <div className="card stat-card">
          <div className="stat-value">245</div>
          <div className="stat-label">Pacientes ativos</div>
        </div>
        <div className="card stat-card">
          <div className="stat-value">38</div>
          <div className="stat-label">Novos pacientes (mês)</div>
        </div>
        <div className="card stat-card">
          <div className="stat-value">186</div>
          <div className="stat-label">Consultas realizadas</div>
        </div>
        <div className="card stat-card">
          <div className="stat-value">92%</div>
          <div className="stat-label">Taxa de retorno</div>
        </div>
      </div>
    </div>
  )
}
