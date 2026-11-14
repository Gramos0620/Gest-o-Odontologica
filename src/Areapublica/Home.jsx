import { useEffect, useState } from 'react'
import { buscarHorarios, enviarAgendamento } from './agendamentoApi'
import './Home.css'

const SERVICOS = [
  { id: 'avaliacao', titulo: 'Avaliação', descricao: 'Primeira consulta para conhecer a saúde da sua boca.' },
  { id: 'limpeza', titulo: 'Limpeza', descricao: 'Remoção de placa e tártaro para um sorriso saudável.' },
  { id: 'clareamento', titulo: 'Clareamento', descricao: 'Mais brilho para o seu sorriso, com segurança.' },
  { id: 'ortodontia', titulo: 'Ortodontia', descricao: 'Alinhamento dos dentes com acompanhamento próximo.' },
]

const FORM_INICIAL = {
  nome: '',
  telefone: '',
  email: '',
  servico: '',
  data: '',
  horario: '',
}

// Data de hoje no formato AAAA-MM-DD, usando o fuso do computador
function hojeISO() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().split('T')[0]
}

function Home({ onEntrar }) {
  const [form, setForm] = useState(FORM_INICIAL)
  const [horarios, setHorarios] = useState([])
  const [carregandoHorarios, setCarregandoHorarios] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [mensagem, setMensagem] = useState(null) // { tipo: 'sucesso' | 'erro', texto: '...' }

  // Sempre que o cliente escolhe (ou troca) a data, busca os horários na API.
  useEffect(() => {
    if (!form.data) {
      setHorarios([])
      return
    }

    let cancelado = false // evita atualizar a tela com uma resposta antiga
    setCarregandoHorarios(true)

    buscarHorarios(form.data)
      .then((lista) => {
        if (!cancelado) setHorarios(lista)
      })
      .catch(() => {
        if (!cancelado) {
          setHorarios([])
          setMensagem({ tipo: 'erro', texto: 'Não foi possível carregar os horários. Tente novamente.' })
        }
      })
      .finally(() => {
        if (!cancelado) setCarregandoHorarios(false)
      })

    return () => {
      cancelado = true
    }
  }, [form.data])

  function handleChange(evento) {
    const { name, value } = evento.target
    setForm((atual) => ({
      ...atual,
      [name]: value,
      // trocou a data: o horário escolhido antes deixa de valer
      ...(name === 'data' ? { horario: '' } : {}),
    }))
  }

  function escolherHorario(horario) {
    setForm((atual) => ({ ...atual, horario }))
  }

  async function handleSubmit(evento) {
    evento.preventDefault()
    setMensagem(null)

    if (!form.nome.trim() || !form.telefone.trim() || !form.servico || !form.data || !form.horario) {
      setMensagem({ tipo: 'erro', texto: 'Preencha nome, telefone, serviço, data e horário.' })
      return
    }

    setEnviando(true)
    try {
      const resposta = await enviarAgendamento(form)
      setMensagem({
        tipo: 'sucesso',
        texto: `Consulta solicitada! Protocolo ${resposta.protocolo}. Entraremos em contato para confirmar.`,
      })
      setForm(FORM_INICIAL)
      setHorarios([])
    } catch {
      setMensagem({ tipo: 'erro', texto: 'Não foi possível enviar seu agendamento. Tente novamente.' })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="pub">
      <header className="pub-header">
        <div className="pub-marca">
          <span className="pub-logo" aria-hidden="true">🦷</span>
          <div className="pub-marca-texto">
            <strong>Gestão Odontológica</strong>
            <small>Clínica Odontológica</small>
          </div>
        </div>
        <button type="button" className="pub-btn pub-btn-contorno" onClick={onEntrar}>
          Área do profissional
        </button>
      </header>

      <main className="pub-conteudo">
        <section className="pub-hero">
          <h1>Mais sorrisos, com a atenção que você merece.</h1>
          <p>Agende sua consulta online em poucos minutos, escolhendo o dia e o horário que ficam melhores para você.</p>
          <a href="#agendar" className="pub-btn">Agendar consulta</a>
        </section>

        <section className="pub-secao">
          <h2>Nossos serviços</h2>
          <div className="pub-servicos">
            {SERVICOS.map((servico) => (
              <article key={servico.id} className="pub-cartao">
                <h3>{servico.titulo}</h3>
                <p>{servico.descricao}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="agendar" className="pub-secao">
          <h2>Agende sua consulta</h2>

          <form className="pub-form" onSubmit={handleSubmit} noValidate>
            <div className="pub-campo">
              <label htmlFor="nome">Nome completo *</label>
              <input id="nome" name="nome" type="text" placeholder="Seu nome" value={form.nome} onChange={handleChange} />
            </div>

            <div className="pub-campo">
              <label htmlFor="telefone">Telefone *</label>
              <input id="telefone" name="telefone" type="tel" placeholder="(00) 00000-0000" value={form.telefone} onChange={handleChange} />
            </div>

            <div className="pub-campo">
              <label htmlFor="email">E-mail</label>
              <input id="email" name="email" type="email" placeholder="seu@email.com" value={form.email} onChange={handleChange} />
            </div>

            <div className="pub-campo">
              <label htmlFor="servico">Serviço *</label>
              <select id="servico" name="servico" value={form.servico} onChange={handleChange}>
                <option value="">Selecione</option>
                {SERVICOS.map((servico) => (
                  <option key={servico.id} value={servico.id}>{servico.titulo}</option>
                ))}
              </select>
            </div>

            <div className="pub-campo">
              <label htmlFor="data">Data *</label>
              <input id="data" name="data" type="date" min={hojeISO()} value={form.data} onChange={handleChange} />
            </div>

            {form.data && (
              <div className="pub-campo pub-campo-cheio">
                <span className="pub-rotulo">Horário *</span>
                {carregandoHorarios && <p className="pub-aviso">Buscando horários disponíveis...</p>}
                {!carregandoHorarios && horarios.length === 0 && (
                  <p className="pub-aviso">Nenhum horário disponível nesta data.</p>
                )}
                <div className="pub-horarios">
                  {horarios.map((horario) => (
                    <button
                      key={horario}
                      type="button"
                      className={`pub-horario ${form.horario === horario ? 'pub-horario-ativo' : ''}`}
                      aria-pressed={form.horario === horario}
                      onClick={() => escolherHorario(horario)}
                    >
                      {horario}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {mensagem && (
              <p role="status" className={`pub-msg pub-msg-${mensagem.tipo} pub-campo-cheio`}>
                {mensagem.texto}
              </p>
            )}

            <button type="submit" className="pub-btn pub-campo-cheio" disabled={enviando}>
              {enviando ? 'Enviando...' : 'Solicitar agendamento'}
            </button>
          </form>
        </section>
      </main>

      <footer className="pub-rodape">
        <small>© Gestão Odontológica</small>
      </footer>
    </div>
  )
}

export default Home
