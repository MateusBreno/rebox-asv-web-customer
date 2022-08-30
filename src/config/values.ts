// ./src/config/values.ts
export default {
  rebox: {
    default: {
      day_of_the_week: {
        sunday: 'sunday',
        monday: 'monday',
        tuesday: 'tuesday',
        wednesday: 'wednesday',
        thursday: 'thursday',
        friday: 'friday',
        saturday: 'saturday',
        array: [
          'sunday',
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
        ],
      },
      outhers: {
        checkout: {
          stepCustomer: {
            field_type: {
              register: 'REGISTER',
              signIn: 'SIGN_IN',
            },
          },
        },
        sales_new: {
          field_type: {
            user_email: 'USER_EMAIL',
            user_cpf: 'USER_CPF',
            user_cnpj: 'USER_CNPJ',
          },
        },
        called_edit: {
          field_type: {
            user_email: 'USER_EMAIL',
            user_cpf: 'USER_CPF',
            user_cnpj: 'USER_CNPJ',
          },
        },
      },
    },

    user: {
      company_size: {
        undefined: 'UNDEFINED',
        autonomous: 'AUTONOMOUS',
        small: 'SMALL',
        medium: 'MEDIUM',
        large: 'LARGE',
        big: 'BIG',
        array: [
          'UNDEFINED' /* Não se aplica */,
          'AUTONOMOUS' /* Para pessoas autônomas que prestam serviço, como uma empresa. */,
          'SMALL' /* Para empresas que possuem de 1 a 20 colaboradores */,
          'MEDIUM' /* Para empresas que possuem de 21 a 100 colaboradores */,
          'LARGE' /* Para empresas que possuem de 101 a 500 colaboradores */,
          'BIG' /* Para empresas que possuem acima de 500 colaboradores */,
        ],
      },
      role: {
        admin: 'admin',
        assistant: 'assistant',
        attendant: 'attendant',
        client: 'client',
        motorist: 'motorist',
        partner: 'partner',
        provider: 'provider',
        array: [
          'admin' /* Perfil que administra o sistema da rebox */,
          'assistant' /* Perfil que auxilia a rebox/admins na parte operacional */,
          'provider' /* Perfil que administra a parte que presta os serviços (prestador) pela rebox */,
          'attendant' /* Perfil que auxilia o prestador na parte operacional */,
          'motorist' /* Perfil que auxilia o prestador no atendimento presencial */,
          'client' /* Perfil capaz de solicitar (comprar) os serviços da rebox */,
          'partner' /* Perfil que divulga e ganha pontos (dinheiro) por indicações */,
        ],
      },
      is_partner: {
        yes: true /* Esse usuário (seja cliente, admin, prestador etc.) está autorizado a acessar o painel de parceiro */,
        no: false /* Não está autorizado a acessar o painel de parceiro */,
      },
      status: {
        active: 'ACTIVE',
        inactive: 'INACTIVE',
        suspended: 'SUSPENDED',
        incomplete: 'INCOMPLETE',
        deleted: 'DELETED',
        lead: 'LEAD',
        array: [
          'ACTIVE' /* Usuário pode acessar e executar suas atividades */,
          'INACTIVE' /* Usuário não pode acessar mais o sistema */,
          'SUSPENDED' /* Usuário pode acessar mas não exerce as atividades */,
          'INCOMPLETE' /* Usuário com os dados incompletos (Não pode acessar, nem ser exibido como cliente) */,
          'DELETED' /* Usuário cancelou a conta, e após 30 dias (A partir do dia de cancelamento) o registro será deletado */,
          'LEAD' /* Usuário que teve a intenção de se tornar cliente */,
        ],
      },
      access_level: {
        low: 'LOW' /* Promotor */,
        normal: 'NORMAL' /* Afiliado */,
        high: 'HIGH' /* Parceiro */,
      },
      person_type: {
        physical_person: 'PHYSICAL_PERSON',
        legal_person: 'LEGAL_PERSON',
      },
      sex: {
        female: 'FEMALE',
        male: 'MALE',
        undefined: 'UNDEFINED', // Não se aplica
      },
      environment: {
        landingPage: 'LANDING_PAGE', // Marca que cliente veio pelo site rebox.com.br
        operacional: 'OPERATIONAL', // Marca que cliente veio pela equipe de atendimento pelo painel admin
        marketing: 'MARKETING', // Marca que cliente veio através de campanhas pelo site em wordpress
        appCustomer: 'APP_CUSTOMER', // Marca que cliente veio pelo aplicativo para clientes
        attendanceWhatsapp: 'ATTENDANCE_WHATSAPP', // Marca que cliente veio pelo atendimento via whatsapp
        array: [
          'LANDING_PAGE',
          'OPERATIONAL',
          'MARKETING',
          'APP_CUSTOMER',
          'ATTENDANCE_WHATSAPP',
        ],
      },
    },

    session: {
      type: {
        login: 'login',
        logout: 'logout',
        array: ['login', 'logout'],
      },
    },

    vehicle: {
      status: {
        active: 'ACTIVE',
        inactive: 'INACTIVE',
        array: ['ACTIVE', 'INACTIVE'],
      },

      classifications: {
        undefined: 'UNDEFINED',
        passenger_car: 'PASSENGER_CAR',
        pickup_van_utilities: 'PICKUP_VAN_UTILITIES',
      },

      colors: {
        undefined: 'UNDEFINED', // Outras
        yellow: 'YELLOW', // Amarela
        blue: 'BLUE', // Azul
        beige: 'BEIGE', // Bege
        white: 'WHITE', // Branca
        gray: 'GRAY', // Cinza
        brown: 'BROWN', // Marrom
        silver: 'SILVER', // Prata
        black: 'BLACK', // Preta
        green: 'GREEN', // Verde
        red: 'RED', // Vermelho
      },
    },

    product: {
      tag: {
        best_seller: 'BEST_SELLER', // Produtos mais vendidos
        normal: 'NORMAL', // Produto comum
        array: ['BEST_SELLER', 'NORMAL'],
      },

      charge_type: {
        yearly: 'yearly',
        subscription: 'subscription',
        detached: 'detached',
        array: [
          'yearly' /* Tipo de cobrança anual (Uma vez ao ano) */,
          'subscription' /* Tipo de cobrança por assinatura mensal */,
          'detached' /* Tipo de cobrança avulsa (Pagamento único) */,
        ],
      },

      status: {
        active: 'active',
        inactive: 'inactive',
        array: ['active', 'inactive'],
      },

      type: {
        plan: 'plan',
        package: 'package',
        array: [
          'plan' /* O tipo do produto e ser vendido é um plano de assinatura */,
          'package' /* O tipo do produto é um pacote que extende os benefícios do plano contratado */,
        ],
      },

      category: {
        vehicle_assistance: 'vehicle_assistance',
        funeral_assistance: 'funeral_assistance',
        array: [
          'vehicle_assistance' /* Planos da rebox de assistência veicular 24h */,
          'funeral_assistance' /* Planos de assistência funerária */,
        ],
      },

      classification: {
        moto_tricycle: 'MOTO_TRICYCLE', // Para motos. [vehicle_assistance] Apenas para categoria assistência veicular.
        passenger_car: 'PASSENGER_CAR', // Para carros leves. [vehicle_assistance] Apenas para categoria assistência veicular.
        pickup_suv: 'PICKUP_SUV', // Para carros grandes. [vehicle_assistance] Apenas para categoria assistência veicular.
        utilities: 'UTILITIES', // Para veículos pesados. [vehicle_assistance] Apenas para categoria assistência veicular.
        array: ['MOTO_TRICYCLE', 'PASSENGER_CAR', 'PICKUP_SUV', 'UTILITIES'],
      },

      coverage_level: {
        pcl_0001: {
          car_sizes_allowed: ['PASSENGER_CAR'],
          permitted_vehicle_weight_limit: 2000, // Em até o limite definido em kg
          allowed_vehicle_size_limit: 4.8, // Em até o limite definido em metros
        },
        pcl_0002: {
          car_sizes_allowed: ['PICKUP_VAN_UTILITIES'],
          permitted_vehicle_weight_limit: 3500, // Em até o limite definido em kg
          allowed_vehicle_size_limit: 5.8, // Em até o limite definido em metros
        },
      },
    },

    product_items: {
      type: {
        for_vehicle: 'FOR_VEHICLE', // Informa que op item do produto é para o veículo
        for_person: 'FOR_PERSON', // Informa que op item do produto é para o cliente
      },
    },

    contract: {
      cycle: {
        single: 'SINGLE' /* Cobrança única */,
        weekly: 'WEEKLY' /* Periodicidade da cobrança semanal */,
        biweekly: 'BIWEEKLY' /* Periodicidade da cobrança quinzenal */,
        monthly: 'MONTHLY' /* Periodicidade da cobrança mensal */,
        quarterly: 'QUARTERLY' /* Periodicidade da cobrança trimestral */,
        semiannually: 'SEMIANNUALLY' /* Periodicidade da cobrança semestral */,
        yearly: 'YEARLY' /* Periodicidade da cobrança anual */,
      },

      form_of_payment: {
        boleto: 'BOLETO',
        credit_card: 'CREDIT_CARD',
        debit_card: 'DEBIT_CARD',
        undefined: 'UNDEFINED',
        transfer: 'TRANSFER',
        deposit: 'DEPOSIT',
        subscription_plan: 'SUBSCRIPTION_PLAN',
        cash: 'CASH',
        pix: 'PIX',
        array: [
          'BOLETO' /* Pagamento por boleto bancário */,
          'CREDIT_CARD' /* Pagamento por cartão de crédito */,
          'DEBIT_CARD' /* Pagamento por cartão de débito */,
          'UNDEFINED' /* Forma de pagamento desconhecida */,
          'TRANSFER' /* Pagamento por transferência */,
          'DEPOSIT' /* Pagamento por depósito */,
          'SUBSCRIPTION_PLAN' /* Pagamento por plano de assinatura (table contracts) */,
          'CASH' /* Pagamento em dinheiro (Presencialmente) */,
          'PIX',
        ],
      },

      due_date: {
        five: '05',
        ten: '10',
        fifteen: '15',
        twenty: '20',
        twenty_five: '25',
        twenty_eight: '28',
        thirty: '30',
        array: ['05', '10', '15', '20', '25', '28', '30'],
      },

      status: {
        pending: 'PENDING',
        canceled: 'CANCELED',
        released: 'RELEASED',
        deleted: 'DELETED',
        array: [
          'PENDING' /* Cliente não autorizado abrir um chamado pelo plano */,
          'CANCELED' /* Cliente que cancelou o contrato porém quer permanecer no sistema */,
          'RELEASED' /* Cliente já pode utilizar os usos disponíveis no contrato */,
          'DELETED' /* Cliente cancelou o plano e/ou pediu para cancelar sua conta */,
        ],
      },

      current_payments_status: {
        in_day: 'IN_DAY',
        waiting: 'WAITING',
        overdue: 'OVERDUE',
        stop: 'STOP',
      },

      who_gave_discount_type: {
        undefined: 'UNDEFINED',
        partner: 'PARTNER',
        admin: 'ADMIN',
      },

      discount_type: {
        undefined: 'UNDEFINED' /* Não possui desconto */,
        single: 'SINGLE' /* Desconto apenas uma vez */,
        recurrent: 'RECURRENT' /* Desconto recorrente */,
      },

      rate_type: {
        undefined: 'UNDEFINED' /* Não possui taxa a ser aplicada */,
        pro_rata_add: 'PRO_RATA_ADD' /* Acrescentar valor pró-rata */,
        pro_rata_sub: 'PRO_RATA_SUB' /* Diminuir valor pró-rata */,
        single: 'SINGLE' /* Aplicar taxa apenas uma vez */,
        recurrent: 'RECURRENT' /* Aplicar taxa de forma recorrente */,
      },

      allowed_seasonality_for_calls: {
        undefined: 'UNDEFINED', // Não se aplica ao contrato
        weekly: 'WEEKLY', // Para contratos que permitem abrir chamados toda semana
        monthly: 'MONTHLY', // Para contratos que permitem abrir chamados todo mês
        quarterly: 'QUARTERLY', // Para contratos que permitem abrir chamados só a cada 3 meses
        semiannual: 'SEMIANNUAL', // Para contratos que permitem abrir chamados só a cada 6 meses
        yearly: 'YEARLY', // Para contratos que permitem abrir chamados só a cada ano
      },
    },

    payments: {
      what_is_being_paid: {
        indications: 'indications',
        contracts: 'contracts',
        called: 'called',
        array: [
          'indications' /* Simboliza a Rebox bonificando por uma indicação */,
          'contracts' /* Simboliza o pagamento da compra de um produto */,
          'called' /* Simboliza o pagmento de um chamado (avulso ou usando um plano) */,
        ],
      },

      form_of_payment: {
        boleto: 'BOLETO',
        credit_card: 'CREDIT_CARD',
        debit_card: 'DEBIT_CARD',
        undefined: 'UNDEFINED',
        transfer: 'TRANSFER',
        deposit: 'DEPOSIT',
        subscription_plan: 'SUBSCRIPTION_PLAN',
        cash: 'CASH',
        pix: 'PIX',
        array: [
          'BOLETO' /* Pagamento por boleto bancário */,
          'CREDIT_CARD' /* Pagamento por cartão de crédito */,
          'DEBIT_CARD' /* Pagamento por cartão de débito */,
          'UNDEFINED' /* Forma de pagamento desconhecida */,
          'TRANSFER' /* Pagamento por transferência */,
          'DEPOSIT' /* Pagamento por depósito */,
          'SUBSCRIPTION_PLAN' /* Pagamento por plano de assinatura (table contracts) */,
          'CASH' /* Pagamento em dinheiro (Presencialmente) */,
          'PIX' /* Pagamento em débito online */,
        ],
      },

      status: {
        pending: 'PENDING' /* Cobrança pendente */,
        overdue: 'OVERDUE' /* Cobrança vencida. */,
        confirmed:
          'CONFIRMED' /* Cobrança confirmada (pagamento efetuado, porém o saldo ainda não foi disponibilizado). */,
        received: 'RECEIVED' /* Cobrança recebida. */,
        refunded: 'REFUNDED' /* Cobrança estornada. */,
        deleted: 'DELETED' /* Cobrança removida. */,
        canceled: 'CANCELED' /* Cobrança cancelada. */,
        restored: 'RESTORED' /* Cobrança restaurada. */,
      },

      charge_type: {
        single:
          'SINGLE' /* Pagamento único, onde o what_is_being_paid não precisará de outros registros de pagamento */,
        recurrent:
          'RECURRENT' /* Pagamento recorrente, onde a cada ciclo do what_is_being_paid um novo registro é criado */,
        divided:
          'DIVIDED' /* Pagamento divido, que se refere ao what_is_being_paid está sendo com mais de uma forma de pagamento */,
      },

      gateway: {
        asaas: 'ASAAS',
        e_rede: 'E_REDE',
        array: ['ASAAS', 'E_REDE'],
      },
    },

    rescue: {
      status: {
        canceled: 'CANCELED',
        paid: 'PAID',
        pending: 'PENDING',
        reject: 'REJECT',
        array: [
          'CANCELED' /* Resgate cancelado pelo parceiro ou pela Rebox */,
          'PAID' /* Resgate foi pago pela Rebox */,
          'PENDING' /* Resgate aguardando pagamento */,
          'REJECT' /* Resgate recusado pela Rebox (Motivo aleatório) */,
        ],
      },
    },

    indication: {
      cash_bonus: {
        fixed: {
          level_one: {
            min_amount: 15 /* Deve ser maior ou igual */,
            max_amount: 30 /* Deve ser menor */,
            value: 15,
          },
          level_two: {
            min_amount: 30 /* Deve ser maior ou igual */,
            max_amount: 45 /* Deve ser menor */,
            value: 25,
          },
        },
        recurrent: {
          level_one: {
            min_amount: 15 /* Deve ser maior ou igual */,
            max_amount: 25 /* Deve ser menor */,
            value: 1,
          },
          level_two: {
            min_amount: 25 /* Deve ser maior ou igual */,
            max_amount: 45 /* Deve ser menor */,
            value: 1.7,
          },
        },
      },
      status: {
        created: 'CREATED',
        canceled: 'CANCELED',
        effective: 'EFFECTIVE',
        array: [
          'CREATED' /* Aguardando cliente indicado efetivar a compra (aguardando receber confirmação do 1º pagamento) */,
          'EFFECTIVE' /* Apto a receber o bônus e as recorrências */,
          'CANCELED' /* Não recebe mais bonificação por esta indicação (nem fixa ou recorrente) */,
        ],
      },
    },

    recover_password: {
      status: {
        in_progress: 'in_progress',
        released: 'released',
        array: ['in_progress', 'released'],
      },
    },

    bank_account: {
      pix_type: {
        email: 'EMAIL',
        cpf: 'CPF',
        cnpj: 'CNPJ',
        cellphone: 'CELLPHONE',
        others: 'OTHERS',
      },

      type: {
        pix: 'PIX',
        current_account: 'CURRENT_ACCOUNT',
        savings_account: 'SAVINGS_ACCOUNT',
      },

      bank_name: {
        banco_brasil: '001 – BANCO DO BRASIL S.A.',
        santander: '033 – BANCO SANTANDER (BRASIL) S.A.',
        caixa: '104 – CAIXA ECONÔMICA FEDERAL',
        itau: '341 - BANCO ITAÚ S.A.',
        bradesco: '237 - BANCO BRADESCO S.A.',
        mercantil: '389 - BANCO MERCANTIL DO BRASIL S.A.',
        banco_safra: '422 - BANCO SAFRA S.A.',
        banco_rural: '453 - BANCO RURAL S.A.',
        itau_unibanco: '652 - ITAÚ UNIBANCO HOLDING S.A.',
        citibank: '745 - BANCO CITIBANK S.A.',
        banrisul: '041 - BANRISUL S.A.',
        nubank: '260 - NU PAGAMENTOS S.A.',
        pagseguro: '290 - PAG SEGURO INTERNET S.A.',
        picpay: '380 - PICPAY SERVIÇOS S.A.',
        mercado_pago: '323 - MERCADO PAGO',
        cielo: '323 - Mercado Pago',
        inter: '077 - BANCO INTER S.A.',
        original: '212 - BANCO ORIGINAL S.A.',
      },
    },

    setting: {
      commission_transfer: {
        undefined: 'UNDEFINED',
        client: 'CLIENT',
        array: ['UNDEFINED', 'CLIENT'],
      },
    },

    called: {
      vehicle_situation: {
        stopped_working: 'STOPPED_WORKING',
        overturn: 'OVERTURN',
        wheel_problem: 'WHEEL_PROBLEM',
        locked_gear: 'LOCKED_GEAR',
        attic_wheel: 'ATTIC_WHEEL',
        others: 'OTHERS',
        array: [
          'STOPPED_WORKING', // Parou de funcionar
          'OVERTURN',
          'WHEEL_PROBLEM', // Problema na roda
          'LOCKED_GEAR',
          'ATTIC_WHEEL',
          'OTHERS', // Não especificados | outros
        ],
      },
      location_type: {
        public_highway: 'PUBLIC_HIGHWAY',
        basement_garage: 'BASEMENTE_GARAGE',
        street_level_garage: 'STREET_LEVEL_GARAGE',
        bluff_off_track: 'BLUFF_OFF_TRACK',
        array: [
          'PUBLIC_HIGHWAY',
          'BASEMENTE_GARAGE',
          'STREET_LEVEL_GARAGE',
          'BLUFF_OFF_TRACK',
        ],
      },
      status: {
        open: 'OPEN', // Quando o chamado foi feito
        in_progress: 'IN_PROGRESS', // Quando a rebox já encaminhou para o pretador
        in_attendance: 'IN_ATTENDANCE', // Quando o prestador enviou um colaborador para atender o chamado
        done: 'DONE', // Quando o chamado foi concluído pela equipe
        deleted: 'DELETED', // Quando o chamado foi deletado do sistema
        canceled: 'CANCELED', // Quando o solicitante/cliente decide cancelar o chamado
      },
      type: {
        loose: 'LOOSE', // Avulso
        contract: 'CONTRACT', // Coberto por um contrato
      },
    },

    called_addresses: {
      type: {
        origin: 'ORIGIN',
        destination: 'DESTINATION',
      },
    },

    discount_coupons: {
      type: {
        first_free_tuition: 'FIRST_FREE_TUITION', // Esse tipo, oferece a 1ª mensalidade grátis
      },
      recurrence: {
        single: 'SINGLE',
        monthly: 'MONTHLY',
        infinite: 'INFINITE',
      },
      deadline_type: {
        interval: 'INTERVAL', // Intervalo, onde todo o processo normal do contrato de adia até o intervalo ser cumprido
      },
      status: {
        active: 'ACTIVE',
        suspended: 'SUSPENDED',
      },
    },
  },
  asaas: {
    charge: {
      status: {
        created: 'CREATED' /* Geração de nova cobrança. */,
        updated:
          'UPDATED' /* Alteração no vencimento ou valor de cobrança existente. */,
        confirmed:
          'CONFIRMED' /* Cobrança confirmada (pagamento efetuado, porém o saldo ainda não foi disponibilizado). */,
        received: 'RECEIVED' /* Cobrança recebida. */,
        pending: 'PENDING' /* Cobrança pendente */,
        overdue: 'OVERDUE' /* Cobrança vencida. */,
        deleted: 'DELETED' /* Cobrança removida. */,
        restored: 'RESTORED' /* Cobrança restaurada. */,
        refunded: 'REFUNDED' /* Cobrança estornada. */,
        received_in_cash: 'RECEIVED_IN_CASH' /* Recebimento em dinheiro */,
        received_in_cash_undone:
          'RECEIVED_IN_CASH_UNDONE' /* Recebimento em dinheiro desfeito. */,
        chargeback_requested: 'CHARGEBACK_REQUESTED' /* Recebido chargeback. */,
        chargeback_dispute:
          'CHARGEBACK_DISPUTE' /* Em disputa de chargeback (caso sejam apresentados documentos para contestação). */,
        awaiting_chargeback_reversal:
          'AWAITING_CHARGEBACK_REVERSAL' /* Disputa vencida, aguardando repasse da adquirente. */,
      },
    },
  },
};
