// ./src/components/forms/FormProfileUser/schemaValidation.ts
import * as Yup from 'yup';

import { ConfigValues } from '@config/index';
import { formatCNPJ, formatCPF, formatDate } from '@utils/formatters';
import { generateDate } from '@utils/generators';
import { validatorCnpj, validatorCpf, validatorDate } from '@utils/validators';

export const schema = Yup.object().shape({
  date_created: Yup.string()
    .required('Por favor, informe a data e hora da solicitação do acionamento.')
    .test(
      'date-created-valid',
      'Por favor, informe uma data e hora da solicitação válida.',
      value => (value ? !value.includes('_') : false),
    )
    .test(
      'date-created-max',
      'Sinto muito, a solicitação não pode ter sido feita em data/hora posterior a hoje.',
      value => {
        if (value) {
          const tomorrowDate = generateDate.nextDays(1);
          const [date, hour] = value.split(' ');

          return validatorDate.hasPassed(
            tomorrowDate,
            `${formatDate.removeMask(date)} ${hour}`,
          );
        }
        return false;
      },
    ),
  appointment_date: Yup.string()
    .optional()
    .test(
      'appointment-valid',
      'Por favor, informe uma data e hora de agendamento válida.',
      value => (value ? !value.includes('_') : true),
    )
    .test(
      'appointment-date-min',
      `Oops! A data e hora do agendamento precisa a partir de hoje.`,
      value => {
        if (value) {
          const [date, hour] = value.split(' ');
          return validatorDate.hasPassed(
            generateDate.now(),
            `${formatDate.removeMask(date)} ${hour}`,
          );
        }
        return false;
      },
    ),
  type: Yup.string().required('Por favor, informe o tipo do acionamento.'),
  services_id: Yup.string().required(
    'Por favor, escolha um de nossos serviços para o acionamento.',
  ),
  license_plate: Yup.string()
    .required('Por favor, informe uma placa para este acionamento.')
    .test(
      'license-plate-valid',
      'Por favor, informe uma placa válida para o veículo em assistência.',
      value => (value ? !value.includes('_') : false),
    ),
  vehicle_situation: Yup.string().required(
    'Por favor, informe a situação do seu veículo.',
  ),
  source_address: Yup.string().required(
    'Por favor, informe o endereço de origem.',
  ),
  destination_address: Yup.string().required(
    'Por favor, informe o endereço de destino.',
  ),
  location_type: Yup.string().required(
    'Por favor, informe como é o local da remoção.',
  ),
  description: Yup.string().optional(),
  budget_amount: Yup.string().required(
    'Por favor, informe o custo deste acionamento.',
  ),
  status: Yup.string().required(
    'Por favor, informe a situação deste acionamento.',
  ),
  call_initiation_date: Yup.string().when('status', {
    is: value => {
      const {
        in_progress,
        in_attendance,
        done,
      } = ConfigValues.rebox.called.status;
      if (value === in_progress) return true;
      if (value === in_attendance) return true;
      if (value === done) return true;

      return false;
    },
    then: Yup.string()
      .required(
        'Por favor, informe a data e hora que o atendimento foi iniciado.',
      )
      .test(
        'call-initiation-date-valid',
        'Por favor, informe uma data e hora válida de início do atendimento.',
        value => (value ? !value.includes('_') : false),
      )
      .test(
        'call-initiation-date-max',
        'Sinto muito, o atendimento não pode estar sendo realizado em data/hora posterior a hoje.',
        value => {
          if (value) {
            const [date, hour] = value.split(' ');

            return validatorDate.hasPassed(
              generateDate.nextDays(1),
              `${formatDate.removeMask(date)} ${hour}`,
            );
          }
          return false;
        },
      ),
    otherwise: Yup.string().optional(),
  }),
  estimated_hours_for_initiation: Yup.string().when('call_initiation_date', {
    is: value => !!value,
    then: Yup.string().required(
      'Por favor, informe a estimativa de chegada do prestador.',
    ),
    otherwise: Yup.string().optional(),
  }),
  service_start_date: Yup.string().when('status', {
    is: value => {
      const { in_attendance, done } = ConfigValues.rebox.called.status;
      if (value === in_attendance) return true;
      if (value === done) return true;

      return false;
    },
    then: Yup.string()
      .required('Por favor, informe a data e hora que o serviço foi iniciado.')
      .test(
        'service-start-date-valid',
        'Por favor, informe uma data e hora válida de início do serviço.',
        value => (value ? !value.includes('_') : false),
      )
      .test(
        'service-start-date-max',
        'Sinto muito, o serviço não pode estar sendo realizado em data/hora posterior a hoje.',
        value => {
          if (value) {
            const [date, hour] = value.split(' ');

            return validatorDate.hasPassed(
              generateDate.nextDays(1),
              `${formatDate.removeMask(date)} ${hour}`,
            );
          }
          return false;
        },
      ),
    otherwise: Yup.string().optional(),
  }),
  estimated_hours_for_service_start: Yup.string().when('service_start_date', {
    is: value => !!value,
    then: Yup.string().required(
      'Por favor, informe a estimativa de conclusão do serviço.',
    ),
    otherwise: Yup.string().optional(),
  }),
  closing_date: Yup.string().when('status', {
    is: value => value === ConfigValues.rebox.called.status.done,
    then: Yup.string()
      .required(
        'Por favor, informe a data e hora que o serviço foi finalizado.',
      )
      .test(
        'closing-date-valid',
        'Por favor, informe uma data e hora válida de início do serviço.',
        value => (value ? !value.includes('_') : false),
      )
      .test(
        'closing-date-max',
        'Sinto muito, o serviço não pode ser concluído em data/hora posterior a hoje.',
        value => {
          if (value) {
            const [date, hour] = value.split(' ');

            return validatorDate.hasPassed(
              generateDate.nextDays(1),
              `${formatDate.removeMask(date)} ${hour}`,
            );
          }
          return false;
        },
      ),
    otherwise: Yup.string().optional(),
  }),
  field_type_provider: Yup.string().required(
    'Por favor, informe o tipo de campo para escolher prestador.',
  ),
  who_is_answering: Yup.string().when('status', {
    is: value => {
      const {
        in_progress,
        in_attendance,
        done,
      } = ConfigValues.rebox.called.status;
      if (value === in_progress) return true;
      if (value === in_attendance) return true;
      if (value === done) return true;

      return false;
    },
    then: Yup.string().when('field_type_provider', {
      is: value =>
        value ===
        ConfigValues.rebox.default.outhers.called_edit.field_type.user_email,
      then: Yup.string()
        .required('Por favor, informe o e-mail do prestador.')
        .email(
          'Por favor, informe um endereço de e-mail válido para o prestador.',
        ),
      otherwise: Yup.string().when('field_type_provider', {
        is: value =>
          value ===
          ConfigValues.rebox.default.outhers.called_edit.field_type.user_cpf,
        then: Yup.string()
          .required('Por favor, informe o CPF do prestador.')
          .test(
            'cpf-valid',
            'Por favor, informe um CPF válido para o prestador.',
            value => {
              if (value) {
                return validatorCpf.check(formatCPF.removeMask(value));
              }
              return false;
            },
          ),
        otherwise: Yup.string()
          .required('Por favor, informe o CNPJ do prestador.')
          .test(
            'cnpj-valid',
            'Por favor, informe um CNPJ válido para o prestador.',
            value => {
              if (value) {
                return !validatorCnpj.check(formatCNPJ.removeMask(value));
              }
              return false;
            },
          ),
      }),
    }),
    otherwise: Yup.string().optional(),
  }),
  field_type_motorist: Yup.string().required(
    'Por favor, informe o tipo de campo para escolher colaborador.',
  ),
  who_is_performing_the_service: Yup.string().when('status', {
    is: value => {
      const {
        in_progress,
        in_attendance,
        done,
      } = ConfigValues.rebox.called.status;
      if (value === in_progress) return true;
      if (value === in_attendance) return true;
      if (value === done) return true;

      return false;
    },
    then: Yup.string().when('field_type_motorist', {
      is: value =>
        value ===
        ConfigValues.rebox.default.outhers.called_edit.field_type.user_email,
      then: Yup.string()
        .optional()
        .email(
          'Por favor, informe um endereço de e-mail válido para o colaborador.',
        ),
      otherwise: Yup.string().when('field_type_motorist', {
        is: value =>
          value ===
          ConfigValues.rebox.default.outhers.called_edit.field_type.user_cpf,
        then: Yup.string()
          .optional()
          .test(
            'cpf-valid',
            'Por favor, informe um CPF válido para o colaborador.',
            value => {
              if (value) {
                return validatorCpf.check(formatCPF.removeMask(value));
              }
              return false;
            },
          ),
        otherwise: Yup.string()
          .optional()
          .test(
            'cnpj-valid',
            'Por favor, informe um CNPJ válido para o colaborador.',
            value => {
              if (value) {
                return !validatorCnpj.check(formatCNPJ.removeMask(value));
              }
              return false;
            },
          ),
      }),
    }),
    otherwise: Yup.string().optional(),
  }),
  technical_report: Yup.string().optional(),
});
