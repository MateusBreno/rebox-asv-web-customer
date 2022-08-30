// ./src/components/forms/FormVehicleNew/index.tsx
import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import {
  SubtitleSecondary,
  Paragraph,
  InputSelect,
  InputText,
  InputMask,
  ButtonMain,
} from '@components/index';

// Importações internas
import { ConfigLabel, ConfigValues } from '@config/index';
import Vehicle from '@models/Vehicle';
import { apiRebox, newContractStorageService } from '@services/index';
import { getValidationErrors } from '@utils/errors';
import { toastify } from '@utils/notifiers';

import { schemaVehicle } from './schemaValidation';
import { ISelect, IFormVehicle } from './typing';

import {
  Container,
  FormVehicle,
  Sections,
  SectionsGroup,
  SectionsItem,
} from './styles';

interface IProps {
  forNewSale?: {
    advanceStep(): void;
  };
  userId: string;
  licensePlate?: string;
}

const FormVehicleNew: React.FC<IProps> = ({
  userId,
  licensePlate,
  forNewSale,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [brands, setBrands] = useState<ISelect[]>([]);
  const [models, setModels] = useState<ISelect[]>([]);

  const classification = useMemo(() => {
    const { moto_tricycle } = ConfigValues.rebox.product.classification;
    const productStorage = newContractStorageService.getProduct();

    if (productStorage.query === moto_tricycle) {
      return 'MOTO';
    }

    return productStorage.query;
  }, []);

  // const getClassifications = useCallback(async () => {
  //   try {
  //     const { data: responseCarClassifications } = await apiRebox.get(`/cars`);
  //     setClassifications(responseCarClassifications.data);
  //   } catch (error) {
  //     toastify(
  //       'Ops, não conseguimos buscar as classificações de veículos existentes.',
  //       'error',
  //     );
  //   }
  // }, []);

  const getBrands = useCallback(async (value: string) => {
    try {
      const { data: responseCarBrands } = await apiRebox.get(
        `/cars?classification=${value}`,
      );
      setBrands(responseCarBrands.data);
    } catch (error) {
      toastify(
        'Ops, não conseguimos buscar as marcas de veículos existentes.',
        'error',
      );
    }
  }, []);

  const getModels = useCallback(async (value: string) => {
    try {
      const { data: responseCarModels } = await apiRebox.get(
        `/cars?brand=${value}`,
      );
      setModels(responseCarModels.data);
    } catch (error) {
      toastify(
        'Ops, não conseguimos buscar as modelos de veículos existentes.',
        'error',
      );
    }
  }, []);

  const handleRegisterVehicle = useCallback(
    async (data: IFormVehicle) => {
      try {
        setLoading(prevState => !prevState);

        formRef.current?.setErrors({});

        await schemaVehicle.validate(data, {
          abortEarly: false,
        });

        const { data: responseVehicleCreated } = await apiRebox.post(
          `/users/vehicles`,
          {
            ...data,
            classification,
            users_id: userId,
            armored: false,
            status: ConfigValues.rebox.vehicle.status.active,
          },
        );

        const { header, data: vehicleCreated } = responseVehicleCreated;

        toastify(header.message, 'success');

        // Caso o cliente esteja sendo criado no momento da venda
        if (forNewSale) {
          newContractStorageService.updateVehicle({
            id: vehicleCreated.id,
            field_type: 'VEHICLE_LICENSE_PLATE',
            query: data.license_plate,
          });
          forNewSale.advanceStep();
        }
      } catch (error: any) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          const { brand, model, license_plate, year, color } = errors;

          if (brand) toastify(brand, 'error');
          if (model) toastify(model, 'error');
          if (license_plate) toastify(license_plate, 'error');
          if (year) toastify(year, 'error');
          if (color) toastify(color, 'error');
        } else if (error.response) toastify(error.response.data.error, 'error');
      } finally {
        setLoading(prevState => !prevState);
      }
    },
    [classification, userId],
  );

  useEffect(() => {
    getBrands(classification);
    formRef.current?.setData({ license_plate: licensePlate });
  }, []);

  return (
    <Container>
      <FormVehicle ref={formRef} onSubmit={handleRegisterVehicle}>
        <Sections>
          <SectionsGroup>
            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
                style={{ marginBottom: '2vh' }}
              >
                Marca
              </SubtitleSecondary>
              <InputSelect
                name="brand"
                options={brands}
                onChange={event => {
                  getModels(event.target.value);
                }}
                placeholder="Selecione a marca"
                tabIndex={2}
              />
            </SectionsItem>

            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
                style={{ marginBottom: '2vh' }}
              >
                Modelo
              </SubtitleSecondary>
              <InputSelect
                name="model"
                options={models}
                placeholder="Selecione o modelo"
                tabIndex={3}
              />
            </SectionsItem>
          </SectionsGroup>

          <SectionsGroup>
            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
                style={{ marginBottom: '2vh' }}
              >
                Placa
              </SubtitleSecondary>
              <InputMask
                name="license_plate"
                mask="aaa-9*99"
                placeholder="Digite a placa"
                style={{ textTransform: 'uppercase' }}
                tabIndex={4}
              />
            </SectionsItem>

            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
                style={{ marginBottom: '2vh' }}
              >
                Cor
              </SubtitleSecondary>
              <InputSelect
                name="color"
                options={ConfigLabel.rebox.others.vehicle.color}
                placeholder="Selecione a cor"
                tabIndex={5}
              />
            </SectionsItem>
          </SectionsGroup>

          <SectionsGroup>
            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
                style={{ marginBottom: '2vh' }}
              >
                Ano
              </SubtitleSecondary>
              <InputText
                name="year"
                type="number"
                placeholder="Digite o ano"
                min={0}
                tabIndex={6}
              />
            </SectionsItem>
          </SectionsGroup>

          <ButtonMain
            type="submit"
            loading={loading}
            style={{ marginTop: '4vh', maxWidth: 250 }}
            tabIndex={8}
          >
            Cadastrar
          </ButtonMain>
        </Sections>
      </FormVehicle>
    </Container>
  );
};

export default FormVehicleNew;
