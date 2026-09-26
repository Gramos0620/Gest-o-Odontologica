import { useState } from 'react'
import { Stethoscope, CalendarClock, Wallet, FileText } from 'lucide-react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="login-shell">
      <div className="login-hero">
        <div className="sidebar-logo" style={{ padding: 0, marginBottom: 24 }}>
          <div className="icon" style={{ width: 46, height: 46 }}><Stethoscope size={24} /></div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.3rem' }}>Gestão Odontologica</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Gestão Odontológica</div>
          </div>
        </div>
        <h1>Mais organização<br />para o seu consultório.</h1>
        <p>Mais sorrisos para seus pacientes.</p>

        <div className="login-feature"><CalendarClock size={18} color="var(--teal-light)" /> Agendamentos inteligentes</div>
        <div className="login-feature"><Wallet size={18} color="var(--teal-light)" /> Controle financeiro completo</div>
        <div className="login-feature"><FileText size={18} color="var(--teal-light)" /> Prontuário eletrônico</div>
      </div>

      <div className="login-form-side">
        <form className="login-box" onSubmit={handleSubmit}>
          <h2>Bem-vindo de volta!</h2>
          <p className="subtitle">Faça login para acessar o seu painel.</p>

          <div className="field">
            <label>E-mail ou usuário</label>
            <input type="text" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="field">
            <label>Senha</label>
            <input type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          </div>

          <div className="login-row">
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input type="checkbox" style={{ width: 'auto' }} defaultChecked /> Lembrar de mim
            </label>
            <a>Esqueceu sua senha?</a>
          </div>

          <button type="submit" className="btn btn-primary">Entrar</button>

          <div className="login-footer">
            Ainda não tem uma conta? <a>Fale conosco</a>
          </div>
        </form>
      </div>
    </div>
  )
}
