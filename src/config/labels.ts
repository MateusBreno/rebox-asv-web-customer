// src/config/labels.ts
import ConfigValues from './values';

export default {
  rebox: {
    export: {
      excel: {
        contract: [
          { label: 'Adesão em', key: 'contract_date' },
          { label: 'Código', key: 'contract_code' },
          { label: 'Produto', key: 'product_name' },
          { label: 'Situação/Status', key: 'contract_status' },
          { label: 'Adimplência', key: 'contract_currentpaymentstatus' },
          { label: 'Vencimento', key: 'contract_duedate' },
          { label: 'Carência', key: 'contract_grace_period_release_date' },
          {
            label: 'Acion. contratados',
            key: 'contract_number_of_uses_allowed',
          },
          { label: 'Acion. disponíveis', key: 'contract_available_uses' },
          { label: 'Cliente', key: 'user_name' },
          { label: 'CPF/CNPJ', key: 'user_cpf_or_cnpj' },
          { label: 'Nascimento', key: 'user_date_of_birth' },
          { label: 'E-mail', key: 'user_email' },
          { label: 'Celular', key: 'user_cellphone' },
          { label: 'UF', key: 'user_adresses_state' },
          { label: 'Cidade', key: 'user_adresses_city' },
          { label: 'Veículo', key: 'user_vehicle_licenseplate' },
          { label: 'Marca', key: 'user_vehicle_brand' },
          { label: 'Modelo', key: 'user_vehicle_model' },
          { label: 'Porte', key: 'user_vehicle_classification' },
        ],
        customer: [
          { label: 'Nome', key: 'user_name' },
          { label: 'CPF/CNPJ', key: 'user_cpf_or_cnpj' },
          { label: 'Nascimento', key: 'user_date_of_birth' },
          { label: 'E-mail', key: 'user_email' },
          { label: 'Celular', key: 'user_cellphone' },
          { label: 'Status', key: 'user_status' },
          { label: 'UF', key: 'user_adresses_state' },
          { label: 'Cidade', key: 'user_adresses_city' },
          { label: 'Epharma', key: 'user_epharma' },
        ],
        affiliate: [
          { label: 'Nome', key: 'user_name' },
          { label: 'CPF/CNPJ', key: 'user_cpf_or_cnpj' },
          { label: 'Nascimento', key: 'user_date_of_birth' },
          { label: 'E-mail', key: 'user_email' },
          { label: 'Celular', key: 'user_cellphone' },
          { label: 'Status', key: 'user_status' },
          { label: 'UF', key: 'user_adresses_state' },
          { label: 'Cidade', key: 'user_adresses_city' },
        ],
        provider: [
          { label: 'Nome', key: 'user_name' },
          { label: 'CPF/CNPJ', key: 'user_cpf_or_cnpj' },
          { label: 'Nascimento', key: 'user_date_of_birth' },
          { label: 'E-mail', key: 'user_email' },
          { label: 'Celular', key: 'user_cellphone' },
          { label: 'Status', key: 'user_status' },
        ],
        rescue: [
          { label: 'Solicitado em', key: 'rescue_date' },
          { label: 'Código', key: 'rescue_code' },
          { label: 'Afiliado', key: 'user_name' },
          { label: 'CPF/CNPJ', key: 'user_cpf_or_cnpj' },
          { label: 'E-mail', key: 'user_email' },
          { label: 'Celular', key: 'user_cellphone' },
          { label: 'Valor', key: 'rescue_amount' },
          { label: 'Status', key: 'rescue_status' },
          { label: 'Pago em', key: 'rescue_date_payment' },
        ],
        charge: [
          { label: 'Gerada em', key: 'payment_date_created' },
          { label: 'Forma de pagamento', key: 'payment_form_of_payment' },
          { label: 'Valor da cobrança', key: 'payment_amount' },
          { label: 'Vencimento', key: 'payment_due_date' },
          { label: 'Situação da cobrança', key: 'payment_status' },
          { label: 'Data de pagamento', key: 'payment_pay_day' },
          { label: 'Contrato', key: 'contract_code' },
          { label: 'Adesão em', key: 'contract_date' },
          { label: 'Produto', key: 'product_name' },
          { label: 'Adimplência', key: 'contract_currentpaymentstatus' },
          { label: 'Carência', key: 'contract_grace_period_release_date' },
          { label: 'Cliente', key: 'user_name' },
          { label: 'CPF/CNPJ', key: 'user_cpf_or_cnpj' },
          { label: 'Nascimento', key: 'user_date_of_birth' },
          { label: 'E-mail', key: 'user_email' },
          { label: 'Celular', key: 'user_cellphone' },
          { label: 'UF', key: 'user_adresses_state' },
          { label: 'Cidade', key: 'user_adresses_city' },
          { label: 'Veículo', key: 'user_vehicle_licenseplate' },
          { label: 'Marca', key: 'user_vehicle_brand' },
          { label: 'Modelo', key: 'user_vehicle_model' },
          { label: 'Porte', key: 'user_vehicle_classification' },
        ],
        called: [
          { label: 'Código', key: 'called_code' },
          { label: 'Solicitado em', key: 'called_date_created' },
          { label: 'Atendimento para', key: 'called_appointment_date' },
          { label: 'Serviço', key: 'services_name' },
          { label: 'Situação do veículo', key: 'called_vehicle_situation' },
          { label: 'Local da remoção', key: 'called_location_type' },
          { label: 'Status', key: 'called_status' },
          {
            label: 'Atendimento iniciado em',
            key: 'called_call_initiation_date',
          },
          { label: 'Serviço iniciado em', key: 'called_service_start_date' },
          { label: 'Serviço finalizado em', key: 'called_closing_date' },
          { label: 'Veículo', key: 'vehicle_license_plate' },
          { label: 'Marca', key: 'vehicle_brand' },
          { label: 'Modelo', key: 'vehicle_model' },
          { label: 'Origem', key: 'called_source_address' },
          { label: 'Destino', key: 'called_destination_address' },
          { label: 'Distância', key: 'called_distance_between_points_in_km' },
          { label: 'Cliente', key: 'customer_name' },
          { label: 'CPF/CNPJ', key: 'customer_cpf_or_cnpj' },
          { label: 'E-mail', key: 'customer_email' },
          { label: 'Celular', key: 'customer_cellphone' },
          { label: 'Prestador', key: 'provider_name' },
          { label: 'CPF/CNPJ', key: 'provider_cpf_or_cnpj' },
          { label: 'E-mail', key: 'provider_email' },
          { label: 'Celular', key: 'provider_cellphone' },
        ],
      },
    },
    filter: {
      period: {
        days: [
          { label: 'Todos', value: 'UNDEFINED' },
          { label: 'Hoje', value: '0' },
          { label: 'Últimos 7 dias', value: '7' },
          { label: 'Últimos 15 dias', value: '15' },
          { label: 'Últimos 30 dias', value: '30' },
          { label: 'Últimos 3 meses', value: '180' },
          { label: 'Outro', value: 'OTHER' },
        ],
      },
      contract: {
        currentPaymentsStatus: [
          { label: 'Todos', value: 'UNDEFINED' },
          {
            label: 'Aguardando',
            value: ConfigValues.rebox.contract.current_payments_status.waiting,
          },
          {
            label: 'Em dia',
            value: ConfigValues.rebox.contract.current_payments_status.in_day,
          },
          {
            label: 'Bloqueado',
            value: ConfigValues.rebox.contract.current_payments_status.overdue,
          },
          {
            label: 'Cancelado',
            value: ConfigValues.rebox.contract.current_payments_status.stop,
          },
        ],
      },
      rescue: {
        status: [
          { label: 'Todos', value: '' },
          {
            label: 'Pendentes',
            value: ConfigValues.rebox.rescue.status.pending,
          },
          { label: 'Pagos', value: ConfigValues.rebox.rescue.status.paid },
          {
            label: 'Recusados',
            value: ConfigValues.rebox.rescue.status.reject,
          },
          {
            label: 'Cancelados',
            value: ConfigValues.rebox.rescue.status.canceled,
          },
        ],
      },
      payment: {
        periodType: [
          { label: 'Data de criação', value: 'DATE_CREATED' },
          { label: 'Data de pagamento', value: 'PAY_DAY' },
          { label: 'Data de vencimento', value: 'DUE_DATE' },
        ],
        status: [
          { label: 'Todas', value: '' },
          {
            label: 'Pendente',
            value: ConfigValues.rebox.payments.status.pending,
          },
          {
            label: 'Atrasada',
            value: ConfigValues.rebox.payments.status.overdue,
          },
          {
            label: 'Confirmada',
            value: ConfigValues.rebox.payments.status.confirmed,
          },
          {
            label: 'Recebida',
            value: ConfigValues.rebox.payments.status.received,
          },
          {
            label: 'Estornada',
            value: ConfigValues.rebox.payments.status.refunded,
          },
          {
            label: 'Cancelada',
            value: ConfigValues.rebox.payments.status.canceled,
          },
          {
            label: 'Deletada',
            value: ConfigValues.rebox.payments.status.deleted,
          },
          {
            label: 'Restaurada',
            value: ConfigValues.rebox.payments.status.restored,
          },
        ],
      },
      called: {
        periodType: [
          { label: 'Data da solicitação', value: 'DATE_CREATED' },
          { label: 'Data de atendimento', value: 'APPOINTMENT_DATE' },
        ],
        vehicleSituation: [
          { label: 'Todos', value: '' },
          {
            label: 'Parou de funcionar',
            value: ConfigValues.rebox.called.vehicle_situation.stopped_working,
          },
          {
            label: 'Capotado',
            value: ConfigValues.rebox.called.vehicle_situation.overturn,
          },
          {
            label: 'Problema na roda',
            value: ConfigValues.rebox.called.vehicle_situation.wheel_problem,
          },
          {
            label: 'Câmbio travado',
            value: ConfigValues.rebox.called.vehicle_situation.locked_gear,
          },
          {
            label: 'Roda furtada',
            value: ConfigValues.rebox.called.vehicle_situation.attic_wheel,
          },
          {
            label: 'Nenhuma das opções',
            value: ConfigValues.rebox.called.vehicle_situation.others,
          },
        ],
        locationType: [
          { label: 'Todos', value: '' },
          {
            label: 'Via pública',
            value: ConfigValues.rebox.called.location_type.public_highway,
          },
          {
            label: 'Garagem subsolo',
            value: ConfigValues.rebox.called.location_type.basement_garage,
          },
          {
            label: 'Garagem nível da rua',
            value: ConfigValues.rebox.called.location_type.street_level_garage,
          },
          {
            label: 'Ribanceira / Fora da via',
            value: ConfigValues.rebox.called.location_type.bluff_off_track,
          },
        ],
        status: [
          { label: 'Todos', value: '' },
          { label: 'Em aberto', value: ConfigValues.rebox.called.status.open },
          {
            label: 'Prest. à caminho',
            value: ConfigValues.rebox.called.status.in_progress,
          },
          {
            label: 'Em atendimento',
            value: ConfigValues.rebox.called.status.in_attendance,
          },
          { label: 'Concluído', value: ConfigValues.rebox.called.status.done },
          {
            label: 'Cancelado',
            value: ConfigValues.rebox.called.status.canceled,
          },
          {
            label: 'Deletado',
            value: ConfigValues.rebox.called.status.deleted,
          },
        ],
      },
    },
    validation: {
      newSale: {
        fieldType: [
          {
            label: 'E-mail',
            value:
              ConfigValues.rebox.default.outhers.sales_new.field_type
                .user_email,
          },
          {
            label: 'CPF',
            value:
              ConfigValues.rebox.default.outhers.sales_new.field_type.user_cpf,
          },
          {
            label: 'CNPJ',
            value:
              ConfigValues.rebox.default.outhers.sales_new.field_type.user_cnpj,
          },
          // { label: 'Código de indicação', value: 'USER_REFERRAL_CODE' },
        ],
      },
      calledEdit: {
        fieldType: [
          {
            label: 'E-mail',
            value:
              ConfigValues.rebox.default.outhers.called_edit.field_type
                .user_email,
          },
          {
            label: 'CPF',
            value:
              ConfigValues.rebox.default.outhers.called_edit.field_type
                .user_cpf,
          },
          {
            label: 'CNPJ',
            value:
              ConfigValues.rebox.default.outhers.called_edit.field_type
                .user_cnpj,
          },
          // { label: 'Código de indicação', value: 'USER_REFERRAL_CODE' },
        ],
      },
    },
    others: {
      called: {
        vehicleSituation: [
          {
            label: 'Parou de funcionar',
            value: ConfigValues.rebox.called.vehicle_situation.stopped_working,
          },
          {
            label: 'Capotado',
            value: ConfigValues.rebox.called.vehicle_situation.overturn,
          },
          {
            label: 'Problema na roda',
            value: ConfigValues.rebox.called.vehicle_situation.wheel_problem,
          },
          {
            label: 'Câmbio travado',
            value: ConfigValues.rebox.called.vehicle_situation.locked_gear,
          },
          {
            label: 'Roda furtada',
            value: ConfigValues.rebox.called.vehicle_situation.attic_wheel,
          },
          {
            label: 'Nenhuma das opções',
            value: ConfigValues.rebox.called.vehicle_situation.others,
          },
        ],
        locationType: [
          {
            label: 'Via pública',
            value: ConfigValues.rebox.called.location_type.public_highway,
          },
          {
            label: 'Garagem subsolo',
            value: ConfigValues.rebox.called.location_type.basement_garage,
          },
          {
            label: 'Garagem nível da rua',
            value: ConfigValues.rebox.called.location_type.street_level_garage,
          },
          {
            label: 'Ribanceira / Fora da via',
            value: ConfigValues.rebox.called.location_type.bluff_off_track,
          },
        ],
        type: [
          { label: 'Avulso', value: ConfigValues.rebox.called.type.loose },
          {
            label: 'Por contrato',
            value: ConfigValues.rebox.called.type.contract,
          },
        ],
        status: [
          { label: 'Em aberto', value: ConfigValues.rebox.called.status.open },
          {
            label: 'Prest. à caminho',
            value: ConfigValues.rebox.called.status.in_progress,
          },
          {
            label: 'Em atendimento',
            value: ConfigValues.rebox.called.status.in_attendance,
          },
          { label: 'Concluído', value: ConfigValues.rebox.called.status.done },
          {
            label: 'Cancelado',
            value: ConfigValues.rebox.called.status.canceled,
          },
          {
            label: 'Deletado',
            value: ConfigValues.rebox.called.status.deleted,
          },
        ],
        estimatedHoursForInitiation: [
          { label: '1 hora', value: '1' },
          { label: '2 horas', value: '2' },
          { label: '3 horas', value: '3' },
          { label: '4 horas', value: '4' },
          { label: '5 horas', value: '5' },
          { label: '6 horas', value: '6' },
          { label: '7 horas', value: '7' },
          { label: '8 horas', value: '8' },
          { label: '9 horas', value: '9' },
          { label: '10 horas', value: '10' },
        ],
        estimatedHoursForServiceStart: [
          { label: '1 hora', value: '1' },
          { label: '2 horas', value: '2' },
          { label: '3 horas', value: '3' },
          { label: '4 horas', value: '4' },
          { label: '5 horas', value: '5' },
          { label: '6 horas', value: '6' },
          { label: '7 horas', value: '7' },
          { label: '8 horas', value: '8' },
          { label: '9 horas', value: '9' },
          { label: '10 horas', value: '10' },
        ],
      },
      contract: {
        status: [
          {
            label: 'Pendente',
            value: ConfigValues.rebox.contract.status.pending,
          },
          {
            label: 'Realizado',
            value: ConfigValues.rebox.contract.status.released,
          },
          {
            label: 'Cancelado',
            value: ConfigValues.rebox.contract.status.canceled,
          },
          {
            label: 'Deletado',
            value: ConfigValues.rebox.contract.status.deleted,
          },
        ],
        form_of_payment: [
          {
            label: 'Boleto',
            value: ConfigValues.rebox.contract.form_of_payment.boleto,
          },
          {
            label: 'Cartão de crédito',
            value: ConfigValues.rebox.contract.form_of_payment.credit_card,
          },
          {
            label: 'Cartão de débito',
            value: ConfigValues.rebox.contract.form_of_payment.debit_card,
          },
          {
            label: 'Depósito',
            value: ConfigValues.rebox.contract.form_of_payment.deposit,
          },
          {
            label: 'Dinheiro',
            value: ConfigValues.rebox.contract.form_of_payment.cash,
          },
          {
            label: 'Transferência',
            value: ConfigValues.rebox.contract.form_of_payment.transfer,
          },
          {
            label: 'Pix',
            value: ConfigValues.rebox.contract.form_of_payment.pix,
          },
          {
            label: 'Outro',
            value: ConfigValues.rebox.contract.form_of_payment.undefined,
          },
        ],
        due_date: [
          {
            label: 'Todo dia 05',
            value: ConfigValues.rebox.contract.due_date.five,
          },
          {
            label: 'Todo dia 10',
            value: ConfigValues.rebox.contract.due_date.ten,
          },
          {
            label: 'Todo dia 15',
            value: ConfigValues.rebox.contract.due_date.fifteen,
          },
          {
            label: 'Todo dia 20',
            value: ConfigValues.rebox.contract.due_date.twenty,
          },
          {
            label: 'Todo dia 25',
            value: ConfigValues.rebox.contract.due_date.twenty_five,
          },
          {
            label: 'Todo dia 28',
            value: ConfigValues.rebox.contract.due_date.twenty_eight,
          },
          {
            label: 'Todo dia 30',
            value: ConfigValues.rebox.contract.due_date.thirty,
          },
        ],
        discount_type: [
          {
            label: 'Nenhum',
            value: ConfigValues.rebox.contract.discount_type.undefined,
          },
          {
            label: 'Único',
            value: ConfigValues.rebox.contract.discount_type.single,
          },
          {
            label: 'Recorrente',
            value: ConfigValues.rebox.contract.discount_type.recurrent,
          },
        ],
        cycle: [
          {
            label: 'Única',
            value: ConfigValues.rebox.contract.cycle.single,
          },
          {
            label: 'Semanal',
            value: ConfigValues.rebox.contract.cycle.weekly,
          },
          {
            label: 'Quinzenal',
            value: ConfigValues.rebox.contract.cycle.biweekly,
          },
          {
            label: 'Mensal',
            value: ConfigValues.rebox.contract.cycle.monthly,
          },
          {
            label: 'Trimestral',
            value: ConfigValues.rebox.contract.cycle.quarterly,
          },
          {
            label: 'Semestral',
            value: ConfigValues.rebox.contract.cycle.semiannually,
          },
          {
            label: 'Anual',
            value: ConfigValues.rebox.contract.cycle.yearly,
          },
        ],
        current_payments_status: [
          {
            label: 'Aguardando',
            value: ConfigValues.rebox.contract.current_payments_status.waiting,
          },
          {
            label: 'Em dia',
            value: ConfigValues.rebox.contract.current_payments_status.in_day,
          },
          {
            label: 'Bloqueado',
            value: ConfigValues.rebox.contract.current_payments_status.overdue,
          },
          {
            label: 'Cancelado',
            value: ConfigValues.rebox.contract.current_payments_status.stop,
          },
        ],
        rate_type: [
          {
            label: 'Nenhuma',
            value: ConfigValues.rebox.contract.rate_type.undefined,
          },
          {
            label: 'Única',
            value: ConfigValues.rebox.contract.rate_type.single,
          },
          {
            label: 'Recorrente',
            value: ConfigValues.rebox.contract.rate_type.recurrent,
          },
          {
            label: 'Pró-rata (Plus)',
            value: ConfigValues.rebox.contract.rate_type.pro_rata_add,
          },
          {
            label: 'Pró-rata (Revert)',
            value: ConfigValues.rebox.contract.rate_type.pro_rata_sub,
          },
        ],
        allowed_seasonality_for_calls: [
          {
            label: 'A cada 7 dias',
            value:
              ConfigValues.rebox.contract.allowed_seasonality_for_calls.weekly,
          },
          {
            label: 'A cada 30 dias',
            value:
              ConfigValues.rebox.contract.allowed_seasonality_for_calls.monthly,
          },
          {
            label: 'A cada 3 meses',
            value:
              ConfigValues.rebox.contract.allowed_seasonality_for_calls
                .quarterly,
          },
          {
            label: 'A cada 6 meses',
            value:
              ConfigValues.rebox.contract.allowed_seasonality_for_calls
                .semiannual,
          },
          {
            label: 'A cada 1 ano',
            value:
              ConfigValues.rebox.contract.allowed_seasonality_for_calls.yearly,
          },
        ],
      },
      vehicle: {
        color: [
          {
            label: 'Não encontrei minha cor',
            value: ConfigValues.rebox.vehicle.colors.undefined,
          },
          {
            label: 'Amarela',
            value: ConfigValues.rebox.vehicle.colors.yellow,
          },
          {
            label: 'Azul',
            value: ConfigValues.rebox.vehicle.colors.blue,
          },
          {
            label: 'Bege',
            value: ConfigValues.rebox.vehicle.colors.beige,
          },
          {
            label: 'Branca',
            value: ConfigValues.rebox.vehicle.colors.white,
          },
          {
            label: 'Cinza',
            value: ConfigValues.rebox.vehicle.colors.gray,
          },
          {
            label: 'Marrom',
            value: ConfigValues.rebox.vehicle.colors.brown,
          },
          {
            label: 'Prata',
            value: ConfigValues.rebox.vehicle.colors.silver,
          },
          {
            label: 'Preta',
            value: ConfigValues.rebox.vehicle.colors.black,
          },
          {
            label: 'Verde',
            value: ConfigValues.rebox.vehicle.colors.green,
          },
          {
            label: 'Vermelha',
            value: ConfigValues.rebox.vehicle.colors.red,
          },
        ],
        status: [
          { label: 'Ativo', value: ConfigValues.rebox.vehicle.status.active },
          {
            label: 'Bloqueado',
            value: ConfigValues.rebox.vehicle.status.inactive,
          },
        ],
      },
      payment: {
        form_of_payment: [
          {
            label: 'Boleto',
            value: ConfigValues.rebox.contract.form_of_payment.boleto,
          },
          {
            label: 'Cartão de crédito',
            value: ConfigValues.rebox.contract.form_of_payment.credit_card,
          },
          {
            label: 'Cartão de débito',
            value: ConfigValues.rebox.contract.form_of_payment.debit_card,
          },
          {
            label: 'Depósito',
            value: ConfigValues.rebox.contract.form_of_payment.deposit,
          },
          {
            label: 'Dinheiro',
            value: ConfigValues.rebox.contract.form_of_payment.cash,
          },
          {
            label: 'Transferência',
            value: ConfigValues.rebox.contract.form_of_payment.transfer,
          },
          {
            label: 'Pix',
            value: ConfigValues.rebox.contract.form_of_payment.pix,
          },
          {
            label: 'Outro',
            value: ConfigValues.rebox.contract.form_of_payment.undefined,
          },
        ],
        charge_type: [
          {
            label: 'Única',
            value: ConfigValues.rebox.payments.charge_type.single,
          },
          {
            label: 'Recorrente',
            value: ConfigValues.rebox.payments.charge_type.recurrent,
          },
          {
            label: 'Dividida',
            value: ConfigValues.rebox.payments.charge_type.divided,
          },
        ],
        status: [
          {
            label: 'Pendente',
            value: ConfigValues.rebox.payments.status.pending,
          },
          {
            label: 'Atrasada',
            value: ConfigValues.rebox.payments.status.overdue,
          },
          {
            label: 'Confirmada',
            value: ConfigValues.rebox.payments.status.confirmed,
          },
          {
            label: 'Recebida',
            value: ConfigValues.rebox.payments.status.received,
          },
          {
            label: 'Estornada',
            value: ConfigValues.rebox.payments.status.refunded,
          },
          {
            label: 'Cancelada',
            value: ConfigValues.rebox.payments.status.canceled,
          },
          {
            label: 'Deletada',
            value: ConfigValues.rebox.payments.status.deleted,
          },
          {
            label: 'Restaurada',
            value: ConfigValues.rebox.payments.status.restored,
          },
        ],
      },
      user: {
        person_type: [
          {
            label: 'Pessoa física',
            value: ConfigValues.rebox.user.person_type.physical_person,
          },
          {
            label: 'Pessoa jurídica',
            value: ConfigValues.rebox.user.person_type.legal_person,
          },
        ],
        status: [
          { label: 'Ativo', value: ConfigValues.rebox.user.status.active },
          { label: 'Inativo', value: ConfigValues.rebox.user.status.inactive },
          {
            label: 'Suspenso',
            value: ConfigValues.rebox.user.status.suspended,
          },
          {
            label: 'Incompleto',
            value: ConfigValues.rebox.user.status.incomplete,
          },
          { label: 'Deletado', value: ConfigValues.rebox.user.status.deleted },
        ],
        company_size: [
          {
            label: 'Não se aplica',
            value: ConfigValues.rebox.user.company_size.undefined,
          },
          {
            label: 'Autonomo(a)',
            value: ConfigValues.rebox.user.company_size.autonomous,
          },
          {
            label: 'Possuo de 1 a 20 colaboradores',
            value: ConfigValues.rebox.user.company_size.small,
          },
          {
            label: 'Possuo de 21 a 100 colaboradores',
            value: ConfigValues.rebox.user.company_size.medium,
          },
          {
            label: 'Possuo de 101 a 500 colaboradores',
            value: ConfigValues.rebox.user.company_size.large,
          },
          {
            label: 'Possuo acima de 500 colaboradores',
            value: ConfigValues.rebox.user.company_size.big,
          },
        ],
        sex: [
          {
            label: 'Não se aplica',
            value: ConfigValues.rebox.user.sex.undefined,
          },
          {
            label: 'Masculino',
            value: ConfigValues.rebox.user.sex.male,
          },
          {
            label: 'Feminino',
            value: ConfigValues.rebox.user.sex.female,
          },
        ],
        access_level: [
          {
            label: 'Promotor',
            value: ConfigValues.rebox.user.access_level.low,
          },
          {
            label: 'Afiliado',
            value: ConfigValues.rebox.user.access_level.normal,
          },
          {
            label: 'Parceiro',
            value: ConfigValues.rebox.user.access_level.high,
          },
        ],
      },
      communication: {
        noticePeriodsForCharges: [
          { label: 'Que vencem hoje', value: 'BEFORE:0' },
          { label: 'Que vencem amanhã', value: 'BEFORE:1' },
          { label: 'Com 3 dias de antecedência', value: 'BEFORE:3' },
          { label: 'Com 5 dias de antecedência', value: 'BEFORE:5' },
          { label: 'Com 7 dias de antecedência', value: 'BEFORE:7' },
          { label: 'Com 10 dias de antecedência', value: 'BEFORE:10' },
          { label: 'Com vencimento atrasado', value: 'LATER:0' },
          { label: 'Nenhuma das opções', value: 'UNDEFINED' },
        ],
        status: [
          {
            label: 'Para todas pendentes',
            value: ConfigValues.rebox.payments.status.pending,
          },
          {
            label: 'Para todas atrasadas',
            value: ConfigValues.rebox.payments.status.overdue,
          },
        ],
      },
    },
  },
};
