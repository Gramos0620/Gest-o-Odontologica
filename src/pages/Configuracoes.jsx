import { useState } from 'react'
import { Upload } from 'lucide-react'

const tabs = ['Geral', 'Perfil', 'Notificações', 'Integrações']

export default function Configuracoes() {
  const [tab, setTab] = useState('Geral')

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Configurações</h1>
      </div>

      <div className="tabs">
        {tabs.map((t) => (
          <button key={t} className={'tab' + (tab === t ? ' active' : '')} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {tab === 'Geral' ? (
        <div className="grid grid-2">
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: 16 }}>Dados da clínica</h3>
            <div className="field">
              <label>Nome da clínica</label>
              <input defaultValue="Sorriso Saúde Odontológica" />
            </div>
            <div className="field">
              <label>CNPJ</label>
              <input defaultValue="12.345.678/0001-90" />
            </div>
            <div className="field">
              <label>Endereço</label>
              <input defaultValue="Av. Principal, 123 - Centro, Pimenta Bueno - RO" />
            </div>
            <div className="field">
              <label>Telefone</label>
              <input defaultValue="(69) 99234-5678" />
            </div>
            <div className="field">
              <label>E-mail</label>
              <input defaultValue="contato@sorrisosaude.com.br" />
            </div>
            <button className="btn btn-primary">Salvar alterações</button>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <h3 className="card-title" style={{ textAlign: 'left', marginBottom: 16 }}>Logo da clínica</h3>
            <div style={{
              width: 90, height: 90, margin: '0 auto 14px', borderRadius: 16,
              background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: '1.8rem' }}>🦷</span>
            </div>
            <button className="btn btn-secondary" style={{ margin: '0 auto' }}><Upload size={14} /> Carregar imagem</button>
            <p className="muted" style={{ fontSize: '0.75rem', marginTop: 10 }}>Tamanho recomendado: 200x200px</p>
          </div>
        </div>
      ) : (
        <div className="card muted">Conteúdo da aba "{tab}" ainda não implementado.</div>
      )}
    </div>
  )
}
