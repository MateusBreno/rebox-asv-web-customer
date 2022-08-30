// ./src/components/cards/CardRecoverPassword/schemaValidation.ts
import * as Yup from 'yup';

export const schemaEmail = Yup.object().shape({
  email: Yup.string().required(
    'Por favor, insira um e-mail para prosseguir...',
  ),
});

export const schemaCode = Yup.object().shape({
  code: Yup.string()
    .required('Por favor, insira um código recebido para prosseguir...')
    .min(4, 'O código precisa ter 4 dígitos.')
    .max(4, 'O código precisa ter 4 dígitos.'),
});

export const schemaPassword = Yup.object().shape({
  password: Yup.string().required('O campo "Nova senha" é obrigatório.'),
  confirm_password: Yup.string()
    .required('O campo "Confirme a nova senha" é obrigatório.')
    .when('password', {
      is: value => !!value.length,
      then: Yup.string().required(
        'O campo "Confirme a nova senha" é obrigatório.',
      ),
      otherwise: Yup.string(),
    })
    .oneOf(
      [Yup.ref('password')],
      'As senhas não correspondem! Por favor tente novamente.',
    ),
});
