// ./src/components/forms/FormVehicleNew/schemaValidation.ts
import * as Yup from 'yup';

export const schemaVehicle = Yup.object().shape({
  brand: Yup.string().required('Por favor, informe a marca do veículo.'),
  model: Yup.string().required('Por favor, informe o modelo do veículo.'),
  license_plate: Yup.string().required(
    'Por favor, informe a placa do veículo.',
  ),
  year: Yup.number()
    .positive('O ano do veículo precisa ser um número positivo.')
    .integer('O ano do veículo precisa ser um número inteiro.')
    .required('Por favor, informe o ano do veículo.')
    .min(1950, 'Ops, permitimos apenas veículos de ano superior a 1950.')
    .max(
      new Date().getFullYear(),
      `Ops, permitimos somente veículos de ano igual ou inferior a ${new Date().getFullYear()}.`,
    ),
  color: Yup.string().required('Por favor, informe a cor do veículo.'),
});
