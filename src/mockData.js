export const pacientes = [
  { id: 1, nome: 'Ana Beatriz Silva', telefone: '(69) 99234-5678', nascimento: '12/03/1990', status: 'Ativo' },
  { id: 2, nome: 'Carlos Eduardo Lima', telefone: '(69) 99912-3456', nascimento: '25/07/1985', status: 'Ativo' },
  { id: 3, nome: 'Juliana Rocha', telefone: '(69) 98123-4567', nascimento: '08/11/1992', status: 'Ativo' },
  { id: 4, nome: 'Marcos Vinícius Santos', telefone: '(69) 99765-4321', nascimento: '14/06/1980', status: 'Ativo' },
  { id: 5, nome: 'Fernanda Oliveira', telefone: '(69) 98654-3210', nascimento: '21/09/1995', status: 'Ativo' },
  { id: 6, nome: 'Gabriel Lopes', telefone: '(69) 97321-6543', nascimento: '03/02/2001', status: 'Ativo' },
]

export const historicoPaciente = [
  { data: '10/09/2026', procedimento: 'Limpeza + Profilaxia', profissional: 'Dr. Henrique Souza', status: 'Concluído' },
  { data: '15/07/2026', procedimento: 'Restauração', profissional: 'Dr. Henrique Souza', status: 'Concluído' },
  { data: '20/05/2026', procedimento: 'Avaliação', profissional: 'Dr. Henrique Souza', status: 'Concluído' },
  { data: '12/03/2026', procedimento: 'Limpeza + Profilaxia', profissional: 'Dr. Henrique Souza', status: 'Concluído' },
]

export const agendaHoje = [
  { hora: '08:00', nome: 'Ana Beatriz Silva', tipo: 'Limpeza + Profilaxia', status: 'Confirmado' },
  { hora: '09:30', nome: 'Carlos Eduardo Lima', tipo: 'Restauração', status: 'Pendente' },
  { hora: '11:00', nome: 'Juliana Rocha', tipo: 'Avaliação Ortodôntica', status: 'Confirmado' },
  { hora: '14:00', nome: 'Marcos Vinícius Santos', tipo: 'Endodontia', status: 'Confirmado' },
  { hora: '16:30', nome: 'Fernanda Oliveira', tipo: 'Extração', status: 'Cancelado' },
]

export const receita7dias = [40, 55, 48, 62, 58, 70, 65]

export const movimentacoesFinanceiras = [
  { data: '10/09/2026', descricao: 'Consulta - Ana Beatriz Silva', tipo: 'Recebimento', valor: 'R$ 250,00' },
  { data: '09/09/2026', descricao: 'Restauração - Carlos Eduardo Lima', tipo: 'Recebimento', valor: 'R$ 420,00' },
  { data: '08/09/2026', descricao: 'Material Odontológico', tipo: 'Despesa', valor: 'R$ 180,00' },
  { data: '06/09/2026', descricao: 'Limpeza - Juliana Rocha', tipo: 'Recebimento', valor: 'R$ 200,00' },
]
