// ./src/components/modals/ModalUserPassword/schemaValidation.ts
import * as Yup from 'yup';

import { ConfigRules } from '@config/index';

export const schema = Yup.object().shape({
  password: Yup.string()
    .required('O campo "Nova senha" é obrigatório.')
    .test(
      'min-length',
      'A senha precisa conter ao mesmo 6 caracteres.',
      value =>
        value
          ? value.length >= ConfigRules.rebox.user.password.minimumCharacterSize
          : false,
    ),
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
