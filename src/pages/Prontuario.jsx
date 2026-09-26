import { useState } from 'react'
import { ArrowLeft, Pencil } from 'lucide-react'
import { historicoPaciente } from '../mockData'

const tabs = ['Histórico', 'Anamnese', 'Exames', 'Tratamentos', 'Observações']

export default function Prontuario({ paciente, onVoltar }) {
  const [tab, setTab] = useState('Histórico')

  return (
    <div className="page">
      <button className="btn btn-ghost" style={{ marginBottom: 16 }} onClick={onVoltar}>
        <ArrowLeft size={15} /> Voltar
      </button>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="flex-between">
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div className="person-avatar" style={{ width: 56, height: 56, fontSize: '1.1rem' }}>
              {paciente.nome.split(' ').slice(0, 2).map((n) => n[0]).join('')}
            </div>
            <div>
              <h2 style={{ margin: 0 }}>{paciente.nome}</h2>
              <div className="muted" style={{ fontSize: '0.85rem' }}>
                x anos · CPF 000.000.000-00 · {paciente.telefone}
              </div>
            </div>
          </div>
          <button className="btn btn-secondary"><Pencil size={14} /> Editar</button>
        </div>
      </div>

      <div className="tabs">
        {tabs.map((t) => (
          <button key={t} className={'tab' + (tab === t ? ' active' : '')} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {tab === 'Histórico' && (
        <div className="grid grid-2">
          <div className="card">
            <h3 className="card-title">Últimos atendimentos</h3>
            {historicoPaciente.map((h, i) => (
              <div className="list-row" key={i}>
                <div>
                  <div>{h.data}</div>
                  <div className="muted" style={{ fontSize: '0.78rem' }}>{h.procedimento} · {h.profissional}</div>
                </div>
                <span className="badge badge-ok">{h.status}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <h3 className="card-title">Anamnese</h3>
            <p className="muted" style={{ fontSize: '0.85rem' }}><strong style={{ color: 'var(--text-main)' }}>Alergias</strong><br />Não informado</p>
            <p className="muted" style={{ fontSize: '0.85rem' }}><strong style={{ color: 'var(--text-main)' }}>Medicações em uso</strong><br />Não informado</p>
            <p className="muted" style={{ fontSize: '0.85rem' }}><strong style={{ color: 'var(--text-main)' }}>Histórico médico</strong><br />Sem alterações</p>
            <p className="muted" style={{ fontSize: '0.85rem' }}><strong style={{ color: 'var(--text-main)' }}>Observações</strong><br />Paciente relatou sensibilidade ao frio</p>
          </div>
        </div>
      )}

      {tab !== 'Histórico' && (
        <div className="card muted">Conteúdo da aba "{tab}" ainda não implementado.</div>
      )}
    </div>
  )
}
