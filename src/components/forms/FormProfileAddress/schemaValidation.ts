// ./src/components/forms/FormUserAddress/schemaValidation.ts
import * as Yup from 'yup';

export const schema = Yup.object().shape({
  zip_code: Yup.string().required('É obrigatório informar seu CEP.'),
  state: Yup.string().required('É obrigatório a UF do seu estado.'),
  city: Yup.string().required('É obrigatório informar sua cidade.'),
  number: Yup.number().required(
    'É obrigatório informar o número do seu endereço.',
  ),
  neighborhood: Yup.string().required('É obrigatório informar seu o bairro.'),
  street: Yup.string().required('É obrigatório informar a sua rua.'),
});
