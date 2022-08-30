// ./src/pages/privates/Contract/New/StepVehicle/schemaValidation.ts
import * as Yup from 'yup';

export const schemaFormValidation = Yup.object().shape({
  license_plate: Yup.string().required(
    'Por favor, informe a placa do veículo.',
  ),
});
