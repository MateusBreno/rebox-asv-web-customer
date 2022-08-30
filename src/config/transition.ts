// ./src/config/transition.ts

// Usuários
const rebox_user_status: any = {
  active: 'Ativo',
  inactive: 'Inativo',
  suspended: 'Suspenso',
  incomplete: 'Incompleto',
  deleted: 'Deletado',
  undefined: '',
};
const rebox_user_role: any = {
  admin: 'Admin',
  assistant: 'Assistente',
  attendant: 'Atendente',
  client: 'Cliente',
  motorist: 'Motorista',
  partner: 'Afiliado',
  provider: 'Prestador',
};
const rebox_user_access_level: any = {
  low: 'Promotor' /* Promotor */,
  normal: 'Afiliado' /* Afiliado */,
  high: 'Parceiro' /* Parceiro */,
};
const rebox_user_person_type: any = {
  physical_person: 'Pessoa física',
  legal_person: 'Pessoa jurídica',
};

// Veículos
const rebox_vehicles_classifications: any = {
  passenger_car: 'Carros leves',
  moto: 'Motos',
  pickup_suv: 'Picapes ou suv',
  quadricycle: 'Quadricíclo',
  tricycle: 'Tricíclo',
  pickup_van_utilities: 'Vans ou utilitários',
  undefined: '',
};
const rebox_vehicles_status: any = {
  active: 'Ativo',
  inactive: 'Inativo',
  undefined: '',
};
const rebox_vehicles_colors: any = {
  undefined: 'Outra', // Outras
  yellow: 'Amarela', // Amarela
  blue: 'Azul', // Azul
  beige: 'Bege', // Bege
  white: 'Branca', // Branca
  gray: 'Cinza', // Cinza
  brown: 'Marrom', // Marrom
  silver: 'Prata', // Prata
  black: 'Preta', // Preta
  green: 'Verde', // Verde
  red: 'Vermelha', // Vermelho
};

// Contratos
const rebox_contracts_cycle: any = {
  single: 'única' /* Cobrança única */,
  weekly: 'semanal' /* Periodicidade da cobrança semanal */,
  biweekly: 'quinzenal' /* Periodicidade da cobrança quinzenal */,
  monthly: 'mensal' /* Periodicidade da cobrança mensal */,
  quarterly: 'trimestral' /* Periodicidade da cobrança trimestral */,
  semiannually: 'semestral' /* Periodicidade da cobrança semestral */,
  yearly: 'anual' /* Periodicidade da cobrança anual */,
};
const rebox_contracts_status: any = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  released: 'Realizado',
  deleted: 'Deletado',
};
const rebox_contracts_current_payments_status: any = {
  in_day: 'Em dia',
  waiting: 'Aguardando',
  overdue: 'Em atraso',
  stop: 'Cancelado',
  undefined: '',
};
const rebox_contracts_type_grace_period: any = {
  finished: 'Cumprida',
  onHold: 'Não iniciada',
};
const rebox_contracts_form_of_payment: any = {
  boleto: 'Boleto',
  credit_card: 'Cartão de crédito',
  debit_card: 'Cartão de débito',
  undefined: '',
};

// Vendas
const rebox_sales_new_field_type: any = {
  user_email: 'E-mail',
  user_cpf: 'CPF',
  user_cnpj: 'CNPJ',
};

// Chamados
const rebox_called_vehicle_situation: any = {
  stopped_working: 'Parou de funcionar',
  overturn: 'Capotado',
  wheel_problem: 'Problema na roda',
  locked_gear: 'Câmbio travado',
  attic_wheel: 'Roda furtada',
  others: 'Não especificado',
  undefined: '',
};
const rebox_called_location_type: any = {
  public_highway: 'Via pública',
  basement_garage: 'Garagem subsolo',
  street_level_garage: 'Garagem nível da rua',
  bluff_off_track: 'Ribanceira / Fora da via',
  undefined: '',
};
const rebox_called_status: any = {
  open: 'Em aberto', // Quando o chamado foi feito
  in_progress: 'Prest. à caminho', // Quando a rebox já encaminhou para o pretador
  in_attendance: 'Em atendimento', // Quando o prestador enviou um colaborador para atender o chamado
  done: 'Concluído', // Quando o chamado foi concluído pela equipe
  deleted: 'Deletado', // Quando o chamado foi deletado do sistema
  canceled: 'Cancelado', // Quando o solicitante/cliente decide cancelar o chamado
  undefined: '',
};
const rebox_called_counter_by_status: any = {
  open: 'Aguardando',
  in_progress: 'A caminho',
  in_attendance: 'Prestando serviço',
  done: 'Encerrada',
  deleted: 'Encerrada',
  canceled: 'Encerrada',
  undefined: 'Encerrada',
};
const rebox_called_field_type: any = {
  user_email: 'E-mail',
  user_cpf: 'CPF',
  user_cnpj: 'CNPJ',
};

// Resgates
const rebox_rescues_status: any = {
  canceled: 'Cancelado',
  paid: 'Pago',
  pending: 'Pendente',
  reject: 'Rejeitado',
  undefined: '',
};

// Pagamentos
const rebox_payments_status: any = {
  created: 'Gerada' /* Geração de nova cobrança. */,
  updated:
    'Atualizada' /* Alteração no vencimento ou valor de cobrança existente. */,
  confirmed:
    'Confirmada' /* Cobrança confirmada (pagamento efetuado, porém o saldo ainda não foi disponibilizado). */,
  received: 'Recebida' /* Cobrança recebida. */,
  pending: 'Pendente' /* Cobrança pendente */,
  overdue: 'Atrasada' /* Cobrança vencida. */,
  canceled: 'Cancelada' /* Cobrança cancelada. */,
  deleted: 'Deletada' /* Cobrança removida. */,
  restored: 'Restaurada' /* Cobrança restaurada. */,
  refunded: 'Estornada' /* Cobrança estornada. */,
  undefined: '',
};
const rebox_payments_form_of_payment: any = {
  boleto: 'Boleto',
  credit_card: 'Cartão de crédito',
  debit_card: 'Cartão de débito',
  transfer: 'Transferência',
  deposit: 'Deposito',
  subscription_plan: 'Caberto pelo plano',
  cash: 'Dinheiro',
  pix: 'Pix',
  undefined: '',
};

// indicações
const rebox_indications_status: any = {
  created: 'Em espera',
  canceled: 'Cancelada',
  effective: 'Efetivada',
  undefined: '',
};

export default {
  rebox_user_status,
  rebox_vehicles_classifications,
  rebox_vehicles_status,
  rebox_vehicles_colors,
  rebox_user_role,
  rebox_user_access_level,
  rebox_user_person_type,
  rebox_contracts_cycle,
  rebox_contracts_status,
  rebox_contracts_current_payments_status,
  rebox_contracts_type_grace_period,
  rebox_contracts_form_of_payment,
  rebox_sales_new_field_type,
  rebox_called_vehicle_situation,
  rebox_called_location_type,
  rebox_called_status,
  rebox_called_counter_by_status,
  rebox_called_field_type,
  rebox_rescues_status,
  rebox_payments_status,
  rebox_payments_form_of_payment,
  rebox_indications_status,
};
