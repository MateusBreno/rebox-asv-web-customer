import * as Yup from 'yup';

import { ConfigValues } from '@config/index';
import {
  formatCNPJ,
  formatCPF,
  formatDate,
  formatText,
} from '@utils/formatters';
import { generateDate } from '@utils/generators';
import { validatorCnpj, validatorCpf, validatorDate } from '@utils/validators';

export const schema = Yup.object().shape({
  name: Yup.string().required('Por favor, informe o nome completo do cliente.'),
  person_type: Yup.string().required(
    'Por favor, informe o tipo de pessoa (física/jurídica).',
  ),
  cpf_cnpj: Yup.string().when('person_type', {
    is: value => value === ConfigValues.rebox.user.person_type.physical_person,
    then: Yup.string()
      .required('Por favor, informe o CPF do cliente.')
      .test('cpf-valid', 'Por favor, informe um CPF válido.', value =>
        validatorCpf.check(formatCPF.removeMask(value || '')),
      ),
    otherwise: Yup.string()
      .required('Por favor, informe o CNPJ do cliente.')
      .test(
        'cnpj-valid',
        'Por favor, informe um CNPJ válido.',
        value => !validatorCnpj.check(formatCNPJ.removeMask(value || '')),
      ),
  }),
  date_of_birth: Yup.string().when('cpf_cnpj', {
    is: value => formatText.removeAllNonDigits(value).length !== 14,
    then: Yup.string()
      .required('Por favor, informe a data de nascimento do cliente.')
      .test(
        'date-valid',
        'Por favor, informe uma data de nascimento válida.',
        value =>
          value ? formatText.removeAllNonDigits(value).length >= 8 : false,
      )
      .test(
        'date-max',
        'Sinto muito, o cliente não pode ter nascido em data posterior a hoje.',
        value => {
          const [tomorrowDate] = generateDate.nextDays(1).split(' ');

          return value
            ? validatorDate.hasPassed(
                tomorrowDate,
                formatDate.removeMask(value),
              )
            : false;
        },
      ),
    otherwise: Yup.string().optional(),
  }),
  sex: Yup.string().optional(),
  email: Yup.string()
    .required('Por favor, informe o e-mail do cliente.')
    .email('Por favor, informe um endereço de e-mail válido.'),
  cellphone: Yup.string()
    .required('Por favor, informe o celular/whatsapp do cliente.')
    .test(
      'cellphone-valid',
      'Por favor, informe um celular/whatsapp válido.',
      value => formatText.removeAllNonDigits(value || '').length === 13,
    ),
  telephone: Yup.string()
    .optional()
    .test(
      'telephone-valid',
      'Por favor, informe um telefone válido.',
      value =>
        value && value.length > 0
          ? formatText.removeAllNonDigits(value).length === 10
          : true, // Validando o teste pelo fato do campo ser opcional
    ),
  company_size: Yup.string().when('person_type', {
    is: value => value === ConfigValues.rebox.user.person_type.legal_person,
    then: Yup.string().required(
      'Por favor, informe o tamanho da empresa/companhia.',
    ),
    otherwise: Yup.string().optional(),
  }),
});
