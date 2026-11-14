// Camada de comunicação da área pública com o back end.
//
// Por enquanto as funções SIMULAM o servidor com um atraso (setTimeout),
// para a tela funcionar sem back end pronto.
// Quando o back end existir, só o corpo destas funções muda
// (fetch para a API do grupo ou chamada ao Supabase).
// O Home.jsx não precisa ser alterado.

const HORARIOS_BASE = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// data chega no formato "AAAA-MM-DD" (valor do <input type="date">)
export async function buscarHorarios(data) {
  await esperar(600)

  // Simulação: remove alguns horários para parecerem ocupados.
  // Exemplo de versão real:
  //   const resposta = await fetch(`/api/horarios?data=${data}`)
  //   return await resposta.json()
  const dia = Number(data.slice(8, 10))
  return HORARIOS_BASE.filter((_, indice) => (indice + dia) % 3 !== 0)
}

export async function enviarAgendamento(dados) {
  await esperar(800)

  // Exemplo de versão real:
  //   const resposta = await fetch('/api/agendamentos', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(dados),
  //   })
  //   if (!resposta.ok) throw new Error('Falha ao agendar')
  //   return await resposta.json()
  console.log('Agendamento enviado:', dados)
  return { ok: true, protocolo: `AG-${Date.now().toString().slice(-6)}` }
}
