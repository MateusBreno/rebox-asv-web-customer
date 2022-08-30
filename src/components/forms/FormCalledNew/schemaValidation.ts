// ./src/components/forms/FormProfileUser/schemaValidation.ts
import * as Yup from 'yup';

export const schema = Yup.object().shape({
  license_plate: Yup.string().required(
    'Por favor, informe uma placa para prosseguir.',
  ),
  services_id: Yup.string().required(
    'Por favor, escolha um de nossos serviços para o acionamento.',
  ),
  vehicle_situation: Yup.string().required(
    'Por favor, informe a situação do seu veículo.',
  ),
  location_type: Yup.string().required(
    'Por favor, informe como é o local da remoção.',
  ),
  source_address: Yup.string().required(
    'Por favor, informe o endereço de origem.',
  ),
  destination_address: Yup.string().required(
    'Por favor, informe o endereço de destino.',
  ),
});
