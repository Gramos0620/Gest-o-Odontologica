// Custom hook da área pública: toda a lógica do formulário de agendamento.
// Tem dois modos:
//   'novo'       -> primeira consulta: o cliente preenche todos os dados
//   'cadastrado' -> já é cliente: informa CPF + nascimento, os dados vêm do cadastro
//                   e ele só escolhe serviço, data e horário.

import { useEffect, useState } from 'react'
import { buscarHorarios, buscarCep, buscarCliente, enviarAgendamento } from './agendamentoApi'
import { formatarCEP, formatarCPF, soDigitos, validarFormulario } from './Validacoes'

const FORM_INICIAL = {
  nome: '',
  cpf: '',
  nascimento: '',
  telefone: '',
  email: '',
  cep: '',
  estado: '',
  cidade: '',
  bairro: '',
  rua: '',
  numero: '',
  servico: '',
  data: '',
  horario: '',
}

export function useAgendamento() {
  const [form, setForm] = useState(FORM_INICIAL)
  const [erros, setErros] = useState({}) // { campo: 'mensagem' }
  const [horarios, setHorarios] = useState([])
  const [carregandoHorarios, setCarregandoHorarios] = useState(false)
  const [buscandoCep, setBuscandoCep] = useState(false)
  const [avisoCep, setAvisoCep] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [mensagem, setMensagem] = useState(null) // { tipo: 'sucesso' | 'erro', texto: '...' }

  // Cliente já cadastrado
  const [modo, setModo] = useState('novo') // 'novo' | 'cadastrado'
  const [cliente, setCliente] = useState(null) // cadastro encontrado (ou null)
  const [buscandoCliente, setBuscandoCliente] = useState(false)
  const [avisoCliente, setAvisoCliente] = useState('')

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

  // CEP é opcional: quando o cliente digita os 8 números, tenta preencher o endereço sozinho.
  // No modo "cadastrado" o endereço já vem do cadastro, então não consulta.
  useEffect(() => {
    setAvisoCep('')
    if (modo === 'cadastrado') return
    if (soDigitos(form.cep).length !== 8) return

    let cancelado = false
    setBuscandoCep(true)

    buscarCep(form.cep)
      .then((endereco) => {
        if (cancelado) return
        if (!endereco) {
          setAvisoCep('CEP não encontrado. Preencha o endereço manualmente.')
          return
        }
        setForm((atual) => ({
          ...atual,
          estado: endereco.estado || atual.estado,
          cidade: endereco.cidade || atual.cidade,
          bairro: endereco.bairro || atual.bairro,
          rua: endereco.rua || atual.rua,
        }))
        setErros((atual) => ({ ...atual, estado: '', cidade: '', bairro: '', rua: '' }))
      })
      .catch(() => {
        if (!cancelado) setAvisoCep('Não foi possível consultar o CEP. Preencha o endereço manualmente.')
      })
      .finally(() => {
        if (!cancelado) setBuscandoCep(false)
      })

    return () => {
      cancelado = true
    }
  }, [form.cep, modo])

  function handleChange(evento) {
    const { name, value } = evento.target
    let novoValor = value
    if (name === 'cpf') novoValor = formatarCPF(value)
    if (name === 'cep') novoValor = formatarCEP(value)

    setForm((atual) => ({
      ...atual,
      [name]: novoValor,
      // trocou a data: o horário escolhido antes deixa de valer
      ...(name === 'data' ? { horario: '' } : {}),
    }))
    // quem corrige o campo faz o erro dele sumir
    setErros((atual) => ({ ...atual, [name]: '', ...(name === 'data' ? { horario: '' } : {}) }))
  }

  function escolherHorario(horario) {
    setForm((atual) => ({ ...atual, horario }))
    setErros((atual) => ({ ...atual, horario: '' }))
  }

  // Atalho: props comuns de cada campo (id, nome, valor, mudança e estado de erro)
  function campo(nome) {
    return {
      id: nome,
      name: nome,
      value: form[nome],
      onChange: handleChange,
      'aria-invalid': erros[nome] ? 'true' : 'false',
    }
  }

  // Troca entre "Primeira consulta" e "Já sou cliente" (também serve para o "Não sou eu").
  function mudarModo(novoModo) {
    setModo(novoModo)
    setCliente(null)
    setAvisoCliente('')
    setForm(FORM_INICIAL)
    setErros({})
    setHorarios([])
    setMensagem(null)
  }

  // Procura o cadastro pelo CPF + data de nascimento e, se achar, preenche o formulário.
  async function identificarCliente() {
    setMensagem(null)

    if (soDigitos(form.cpf).length !== 11 || !form.nascimento) {
      setAvisoCliente('Informe o CPF e a data de nascimento.')
      return
    }

    setBuscandoCliente(true)
    setAvisoCliente('')
    try {
      const encontrado = await buscarCliente(form.cpf, form.nascimento)
      if (!encontrado) {
        setAvisoCliente('Não encontramos cadastro com esses dados. Confira ou escolha "Primeira consulta".')
        return
      }

      const endereco = encontrado.endereco || {}
      setCliente(encontrado)
      setForm((atual) => ({
        ...atual,
        nome: encontrado.nome,
        telefone: encontrado.telefone,
        email: encontrado.email || '',
        cep: endereco.cep || '',
        estado: endereco.estado || '',
        cidade: endereco.cidade || '',
        bairro: endereco.bairro || '',
        rua: endereco.rua || '',
        numero: endereco.numero || '',
      }))
    } catch {
      setAvisoCliente('Não foi possível consultar o cadastro. Tente novamente.')
    } finally {
      setBuscandoCliente(false)
    }
  }

  async function handleSubmit(evento) {
    evento.preventDefault()
    setMensagem(null)

    const encontrados = validarFormulario(form)
    setErros(encontrados)

    const primeiroComErro = Object.keys(encontrados)[0]
    if (primeiroComErro) {
      if (modo === 'cadastrado') {
        // os dados pessoais ficam escondidos nesse modo, então o erro pode ser neles
        const soConsulta = ['servico', 'data', 'horario'].includes(primeiroComErro)
        setMensagem({
          tipo: 'erro',
          texto: soConsulta
            ? 'Confira os campos destacados em vermelho.'
            : 'Seu cadastro está incompleto. Escolha "Primeira consulta" para preencher os dados de novo.',
        })
      } else {
        setMensagem({ tipo: 'erro', texto: 'Confira os campos destacados em vermelho.' })
      }
      const elemento = document.getElementById(primeiroComErro)
      if (elemento) elemento.focus()
      return
    }

    const dataEscolhida = form.data
    setEnviando(true)
    try {
      const resposta = await enviarAgendamento(form)
      setMensagem({
        tipo: 'sucesso',
        texto: `Consulta solicitada! Protocolo ${resposta.protocolo}. Entraremos em contato para confirmar.`,
      })
      setForm(FORM_INICIAL)
      setErros({})
      setHorarios([])
      setCliente(null) // no modo "cadastrado", precisa se identificar de novo
    } catch (erro) {
      setMensagem({ tipo: 'erro', texto: erro.message || 'Não foi possível enviar seu agendamento. Tente novamente.' })
      // o horário pode ter sido reservado agora há pouco: limpa a escolha e atualiza a lista
      setForm((atual) => ({ ...atual, horario: '' }))
      buscarHorarios(dataEscolhida).then(setHorarios).catch(() => {})
    } finally {
      setEnviando(false)
    }
  }

  return {
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
  }
}