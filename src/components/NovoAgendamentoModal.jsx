import { X } from 'lucide-react'

export default function NovoAgendamentoModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Novo Agendamento</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="field">
          <label>Paciente</label>
          <select className="field-select" style={selectStyle}>
            <option>Selecione um paciente</option>
          </select>
        </div>

        <div className="field">
          <label>Profissional</label>
          <select style={selectStyle}>
            <option>Selecione o profissional</option>
          </select>
        </div>

        <div className="field">
          <label>Tipo de atendimento</label>
          <select style={selectStyle}>
            <option>Selecione o tipo de atendimento</option>
          </select>
        </div>

        <div className="two-col">
          <div className="field">
            <label>Data</label>
            <input type="date" defaultValue="2026-09-10" />
          </div>
          <div className="field">
            <label>Horário</label>
            <input type="time" defaultValue="08:00" />
          </div>
        </div>

        <div className="field">
          <label>Observações (opcional)</label>
          <input placeholder="Digite uma observação..." />
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={onClose}>Salvar</button>
        </div>
      </div>
    </div>
  )
}

const selectStyle = {
  width: '100%', padding: '10px 12px', borderRadius: 8,
  border: '1px solid var(--border)', background: 'var(--bg-panel)', color: 'var(--text-main)',
}
