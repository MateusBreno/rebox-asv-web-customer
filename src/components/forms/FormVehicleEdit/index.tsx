// ./src/components/forms/FormVehicleEdit/index.tsx
import React, { useRef, useState, useCallback, useEffect } from 'react';

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
import { ConfigLabel } from '@config/index';
import Vehicle from '@models/Vehicle';
import { apiRebox } from '@services/index';
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
  vehicle: Vehicle;
}

const FormVehicleEdit: React.FC<IProps> = ({ vehicle }) => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [classifications, setClassifications] = useState<ISelect[]>([]);
  const [brands, setBrands] = useState<ISelect[]>([]);
  const [models, setModels] = useState<ISelect[]>([]);

  const getClassifications = useCallback(async () => {
    try {
      const { data: responseCarClassifications } = await apiRebox.get(`/cars`);
      setClassifications(responseCarClassifications.data);
    } catch (error) {
      toastify(
        'Ops, não conseguimos buscar as classificações de veículos existentes.',
        'error',
      );
    }
  }, []);

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

  const handleUpdateVehicle = async (data: IFormVehicle) => {
    try {
      setLoading(prevState => !prevState);

      formRef.current?.setErrors({});

      await schemaVehicle.validate(data, {
        abortEarly: false,
      });

      const { data: responseVehicleUpdated } = await apiRebox.put(
        `/users/vehicles/${vehicle?.id}`,
        {
          ...data,
          users_id: vehicle?.users_id,
          armored: false,
        },
      );

      const { header } = responseVehicleUpdated;

      toastify(header.message, 'success');
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);

        const {
          classification,
          brand,
          model,
          license_plate,
          year,
          color,
        } = errors;

        if (classification) toastify(classification, 'error');
        if (brand) toastify(brand, 'error');
        if (model) toastify(model, 'error');
        if (license_plate) toastify(license_plate, 'error');
        if (year) toastify(year, 'error');
        if (color) toastify(color, 'error');
      } else if (error.response) toastify(error.response.data.error, 'error');
    } finally {
      setLoading(prevState => !prevState);
    }
  };

  useEffect(() => {
    getClassifications();
    if (vehicle?.classification) getBrands(vehicle?.classification);
    if (vehicle?.brand) getModels(vehicle?.brand.toUpperCase());
  }, []);

  return (
    <Container>
      <FormVehicle
        ref={formRef}
        onSubmit={handleUpdateVehicle}
        initialData={{
          license_plate: vehicle?.license_plate,
          year: vehicle?.year,
        }}
      >
        <Sections>
          <SectionsGroup>
            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
              >
                Classificação
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Define o porte do veículo do cliente
              </Paragraph>
              <InputSelect
                name="classification"
                options={classifications}
                selectedDefault={vehicle?.classification}
                onChange={event => {
                  getBrands(event.target.value);
                }}
                placeholder="Selecione o porte"
                tabIndex={1}
              />
            </SectionsItem>

            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
              >
                Marca
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Empresa responsável pela fabricação do veículo
              </Paragraph>
              <InputSelect
                name="brand"
                options={brands}
                selectedDefault={
                  vehicle?.brand ? vehicle?.brand.toUpperCase() : ''
                }
                onChange={event => {
                  getModels(event.target.value);
                }}
                placeholder="Selecione a marca"
                tabIndex={2}
              />
            </SectionsItem>
          </SectionsGroup>

          <SectionsGroup>
            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
              >
                Modelo
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Define a linha de fabricação do veículo
              </Paragraph>
              <InputSelect
                name="model"
                options={models}
                selectedDefault={
                  vehicle?.model ? vehicle?.model.toUpperCase() : ''
                }
                placeholder="Selecione o modelo"
                tabIndex={3}
              />
            </SectionsItem>

            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
              >
                Placa
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Registro identificador do veículo no país
              </Paragraph>
              <InputMask
                name="license_plate"
                mask="aaa-9*99"
                placeholder="Digite a placa"
                style={{ textTransform: 'uppercase' }}
                tabIndex={4}
              />
            </SectionsItem>
          </SectionsGroup>

          <SectionsGroup>
            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
              >
                Cor
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Define a cor do veículo do cliente
              </Paragraph>
              <InputSelect
                name="color"
                options={ConfigLabel.rebox.others.vehicle.color}
                selectedDefault={vehicle?.color}
                placeholder="Selecione a cor"
                tabIndex={5}
              />
            </SectionsItem>

            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
              >
                Ano
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Informe o ano do modelo ou de fabricação do carro
              </Paragraph>
              <InputText
                name="year"
                type="number"
                placeholder="Digite o ano"
                min={0}
                tabIndex={6}
              />
            </SectionsItem>
          </SectionsGroup>

          <SectionsGroup>
            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
              >
                Status
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Define a situação do veículo
              </Paragraph>
              <InputSelect
                name="status"
                options={ConfigLabel.rebox.others.vehicle.status}
                selectedDefault={
                  vehicle?.status ? vehicle?.status.toUpperCase() : ''
                }
                placeholder="Selecione a situação"
                tabIndex={7}
              />
            </SectionsItem>
          </SectionsGroup>

          <ButtonMain
            type="submit"
            loading={loading}
            style={{ marginTop: '4vh', maxWidth: 250 }}
            tabIndex={8}
          >
            Salvar
          </ButtonMain>
        </Sections>
      </FormVehicle>
    </Container>
  );
};

export default FormVehicleEdit;
