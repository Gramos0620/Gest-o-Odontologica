import { useAgendamento } from './useAgendamento'
import { SERVICOS } from './servicos'
import { ESTADOS, hojeISO } from './Validacoes'

// Rótulo + campo + mensagem de erro. Fica FORA do componente principal
// para o campo não perder o foco a cada letra digitada.
function Campo({ id, label, erro, dica, cheio, children }) {
  return (
    <div className={'pub-campo' + (cheio ? ' pub-campo-cheio' : '')}>
      <label htmlFor={id}>{label}</label>
      {children}
      {dica && !erro && <p className="pub-dica">{dica}</p>}
      {erro && <p className="pub-erro" role="alert">{erro}</p>}
    </div>
  )
}

// Página de agendamento da área pública.
// A lógica (estado, validação, API) está no hook useAgendamento.
// Props: onVoltar() leva de volta à página inicial.
function Agendamento({ onVoltar }) {
  const {
    form,
    erros,
    horarios,
    carregandoHorarios,
    buscandoCep,
    avisoCep,
    enviando,
    mensagem,
    modo,
    cliente,
    buscandoCliente,
    avisoCliente,
    campo,
    escolherHorario,
    mudarModo,
    identificarCliente,
    handleSubmit,
  } = useAgendamento()

  // Cliente novo vê tudo. Cliente cadastrado só vê a consulta, depois de se identificar.
  const mostrarConsulta = modo === 'novo' || cliente
  const primeiroNome = cliente ? cliente.nome.split(' ')[0] : ''

  return (
    <section className="pub-secao">
      <button type="button" className="pub-voltar" onClick={onVoltar}>
        ← Voltar ao início
      </button>

      <h1>Agende sua consulta</h1>
      <p className="pub-sub">Escolha o dia e o horário que ficam melhores para você. Campos com * são obrigatórios.</p>

      <form className="pub-form" onSubmit={handleSubmit} noValidate>
        {/* Escolha: primeira consulta ou já é cliente */}
        <div className="pub-campo pub-campo-cheio">
          <div className="pub-horarios" role="group" aria-label="Tipo de cliente">
            <button
              type="button"
              className={`pub-horario ${modo === 'novo' ? 'pub-horario-ativo' : ''}`}
              aria-pressed={modo === 'novo'}
              onClick={() => mudarModo('novo')}
            >
              Primeira consulta
            </button>
            <button
              type="button"
              className={`pub-horario ${modo === 'cadastrado' ? 'pub-horario-ativo' : ''}`}
              aria-pressed={modo === 'cadastrado'}
              onClick={() => mudarModo('cadastrado')}
            >
              Já sou cliente
            </button>
          </div>
        </div>

        {/* Cliente cadastrado: identificação por CPF + nascimento */}
        {modo === 'cadastrado' && !cliente && (
          <>
            <h3 className="pub-grupo">Identifique-se</h3>

            <Campo id="cpf" label="CPF *" erro={erros.cpf}>
              <input {...campo('cpf')} type="text" inputMode="numeric" placeholder="000.000.000-00" maxLength={14} />
            </Campo>

            <Campo id="nascimento" label="Data de nascimento *" erro={erros.nascimento}>
              <input {...campo('nascimento')} type="date" min="1900-01-01" max={hojeISO()} />
            </Campo>

            <div className="pub-campo pub-campo-cheio">
              <button type="button" className="pub-btn" onClick={identificarCliente} disabled={buscandoCliente}>
                {buscandoCliente ? 'Buscando...' : 'Continuar'}
              </button>
              {avisoCliente && <p className="pub-erro" role="alert">{avisoCliente}</p>}
            </div>
          </>
        )}

        {/* Cliente cadastrado, já identificado */}
        {modo === 'cadastrado' && cliente && (
          <div className="pub-campo pub-campo-cheio">
            <p className="pub-msg pub-msg-sucesso">
              Olá, {primeiroNome}! Encontramos seu cadastro. Escolha o serviço, o dia e o horário.
            </p>
            <button type="button" className="pub-voltar" onClick={() => mudarModo('cadastrado')}>
              Não sou eu
            </button>
          </div>
        )}

        {/* Primeira consulta: dados pessoais e endereço */}
        {modo === 'novo' && (
          <>
            <h3 className="pub-grupo">Dados pessoais</h3>

            <Campo id="nome" label="Nome completo *" erro={erros.nome} cheio>
              <input {...campo('nome')} type="text" placeholder="Seu nome" autoComplete="name" />
            </Campo>

            <Campo id="cpf" label="CPF *" erro={erros.cpf}>
              <input {...campo('cpf')} type="text" inputMode="numeric" placeholder="000.000.000-00" maxLength={14} />
            </Campo>

            <Campo id="nascimento" label="Data de nascimento *" erro={erros.nascimento}>
              <input {...campo('nascimento')} type="date" min="1900-01-01" max={hojeISO()} autoComplete="bday" />
            </Campo>

            <Campo id="telefone" label="Telefone *" erro={erros.telefone}>
              <input {...campo('telefone')} type="tel" placeholder="(00) 00000-0000" autoComplete="tel" />
            </Campo>

            <Campo id="email" label="E-mail" erro={erros.email}>
              <input {...campo('email')} type="email" placeholder="seu@email.com" autoComplete="email" />
            </Campo>

            <h3 className="pub-grupo">Endereço</h3>

            <Campo
              id="cep"
              label="CEP (opcional)"
              erro={erros.cep}
              dica={buscandoCep ? 'Buscando endereço...' : avisoCep || 'Se informar, o endereço é preenchido automaticamente.'}
            >
              <input {...campo('cep')} type="text" inputMode="numeric" placeholder="00000-000" maxLength={9} autoComplete="postal-code" />
            </Campo>

            <Campo id="estado" label="Estado *" erro={erros.estado}>
              <select {...campo('estado')}>
                <option value="">Selecione</option>
                {ESTADOS.map((estado) => (
                  <option key={estado.sigla} value={estado.sigla}>{estado.nome}</option>
                ))}
              </select>
            </Campo>

            <Campo id="cidade" label="Cidade *" erro={erros.cidade}>
              <input {...campo('cidade')} type="text" placeholder="Sua cidade" autoComplete="address-level2" />
            </Campo>

            <Campo id="bairro" label="Bairro *" erro={erros.bairro}>
              <input {...campo('bairro')} type="text" placeholder="Seu bairro" />
            </Campo>

            <Campo id="rua" label="Rua *" erro={erros.rua}>
              <input {...campo('rua')} type="text" placeholder="Nome da rua" autoComplete="address-line1" />
            </Campo>

            <Campo id="numero" label="Número da casa *" erro={erros.numero}>
              <input {...campo('numero')} type="text" placeholder="Ex.: 123" maxLength={10} />
            </Campo>
          </>
        )}

        {/* Consulta: aparece para cliente novo, ou para cliente cadastrado já identificado */}
        {mostrarConsulta && (
          <>
            <h3 className="pub-grupo">Consulta</h3>

            <Campo id="servico" label="Serviço *" erro={erros.servico}>
              <select {...campo('servico')}>
                <option value="">Selecione</option>
                {SERVICOS.map((servico) => (
                  <option key={servico.id} value={servico.id}>{servico.titulo}</option>
                ))}
              </select>
            </Campo>

            <Campo id="data" label="Data *" erro={erros.data}>
              <input {...campo('data')} type="date" min={hojeISO()} />
            </Campo>

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
                {erros.horario && <p className="pub-erro" role="alert">{erros.horario}</p>}
              </div>
            )}
          </>
        )}

        {mensagem && (
          <p role="status" className={`pub-msg pub-msg-${mensagem.tipo} pub-campo-cheio`}>
            {mensagem.texto}
          </p>
        )}

        {mostrarConsulta && (
          <button type="submit" className="pub-btn pub-campo-cheio" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Solicitar agendamento'}
          </button>
        )}
      </form>
    </section>
  )
}

export default Agendamento