// ./src/components/modals/ModalCalledAdvance/schemaValidation.ts
import * as Yup from 'yup';

import { ConfigValues } from '@config/index';
import { formatCNPJ, formatCPF, formatDate } from '@utils/formatters';
import { generateDate } from '@utils/generators';
import { validatorCnpj, validatorCpf, validatorDate } from '@utils/validators';

export const schemaInProgress = Yup.object().shape({
  field_type_provider: Yup.string().required(
    'Por favor, informe o tipo de campo para escolher prestador.',
  ),
  who_is_answering: Yup.string().when('field_type_provider', {
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
  estimated_hours_for_initiation: Yup.string().required(
    'Por favor, informe a estimativa de chegada do prestador.',
  ),
});

export const schemaInAttendance = Yup.object().shape({
  estimated_hours_for_service_start: Yup.string().required(
    'Por favor, informe a estimativa de conclusão do serviço.',
  ),
});

export const schemaDone = Yup.object().shape({
  technical_report: Yup.string().optional(),
});
