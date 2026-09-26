import { Plus } from 'lucide-react'
import { agendaHoje } from '../mockData'

const corStatus = {
  Confirmado: '#34d399',
  Pendente: '#fbbf24',
  Cancelado: '#f87171',
}

export default function Agenda({ onNovoAgendamento }) {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Agenda</h1>
          <p className="page-subtitle">Quarta-feira, 10 de Setembro de 2026</p>
        </div>
        <button className="btn btn-primary" onClick={onNovoAgendamento}>
          <Plus size={16} /> Novo Agendamento
        </button>
      </div>

      <div className="card">
        {agendaHoje.map((a) => (
          <div
            key={a.hora}
            className="list-row"
            style={{ borderLeft: `3px solid ${corStatus[a.status]}`, paddingLeft: 12, marginBottom: 8, borderRadius: 6 }}
          >
            <div style={{ display: 'flex', gap: 16 }}>
              <span className="muted" style={{ width: 50 }}>{a.hora}</span>
              <div>
                <div style={{ fontWeight: 600 }}>{a.nome}</div>
                <div className="muted" style={{ fontSize: '0.78rem' }}>{a.tipo}</div>
              </div>
            </div>
            <span className={'badge ' + (a.status === 'Confirmado' ? 'badge-ok' : a.status === 'Pendente' ? 'badge-warn' : 'badge-danger')}>
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
