import { Search, Bell } from 'lucide-react'

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="search-box">
        <Search size={16} />
        <input placeholder="Buscar paciente, nome, CPF ou telefone..." />
      </div>
      <div className="topbar-right">
        <Bell size={18} color="var(--text-muted)" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="avatar">HS</div>
          <div>
            <div className="doctor-name">Dr. Kevin Eduardo</div>
            <div className="doctor-role">Cirurgião Dentista</div>
          </div>
        </div>
      </div>
    </header>
  )
}
