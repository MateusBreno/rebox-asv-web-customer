// ./src/components/modals/ModalUserAuthenticate/schemaValidation.ts
import * as Yup from 'yup';

export const schema = Yup.object().shape({
  email: Yup.string()
    .required('É obrigatório informar um e-mail.')
    .email('Por favor, insira um e-mail válido.'),

  password: Yup.string().required('É obrigatório informar uma senha.'),
});
