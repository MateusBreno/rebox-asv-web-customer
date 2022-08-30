import * as Yup from 'yup';

export const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Por favor, digite um e-mail válido.')
    .required('O e-mail é obrigatório'),
  cellphone: Yup.string().required('O celular é obrigatório'),
  subject: Yup.string().required('Por favor, informe um assunto.'),
});
