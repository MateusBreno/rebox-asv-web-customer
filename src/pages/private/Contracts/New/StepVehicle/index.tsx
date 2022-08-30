// ./src/pages/privates/Contract/New/StepVehicle/index.tsx
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import {
  SubtitleSecondary,
  Paragraph,
  ButtonMain,
  ButtonDefault,
  InputMask,
  AlertSimpleCustom,
  FormVehicleNew,
} from '@components/index';
import { ConfigTransition, ConfigValues } from '@config/index';
import User from '@models/User';
import Vehicle from '@models/Vehicle';
import {
  newContractStorageService,
  apiRebox,
  sessionStorageService,
} from '@services/index';
import { getValidationErrors } from '@utils/errors';
import { hotToast, toastify } from '@utils/notifiers';

import { schemaFormValidation } from './schemaValidation';
import { IFormValidate } from './typing';

import {
  Container,
  Tabs,
  TabLabels,
  TabLabelsButton,
  TabLabelsDivisor,
  TabItems,
  TabItemsGroup,
  FormValidate,
  Resume,
  SectionsGroup,
  SectionsField,
  DividingLine,
  Buttons,
} from './styles';

interface IProps {
  myStep: number;
  currentStep: number;
  changeStep(newStep: number, willChangeHistory?: boolean): void;
}

const StepVehicle: React.FC<IProps> = ({ myStep, currentStep, changeStep }) => {
  const formValidationRef = useRef<FormHandles>(null);
  const buttonsRef = useRef<any>(null);

  const [user, setUser] = useState<User | null>(
    sessionStorageService.getUser(),
  );
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [tab, setTab] = useState<number>(1);
  const [loadingValidation, setLoadingValidation] = useState<boolean>(false);
  const [alert, setAlert] = useState<string>('');
  const [licensePlate, setLicensePlate] = useState<string>('');

  const handleValidateRegistration = useCallback(
    async (data: IFormValidate) => {
      const idHotToast = hotToast('Carregando...', 'loading');
      try {
        setLoadingValidation(prevState => !prevState);
        formValidationRef.current?.setErrors({});

        await schemaFormValidation.validate(data, {
          abortEarly: false,
        });

        const { data: responseVehicle } = await apiRebox.get(
          `/users/vehicles?license_plate=${data.license_plate}`,
        );

        const [firstVehicle] = responseVehicle.data;

        if (!firstVehicle) {
          setLicensePlate(data.license_plate);
          setVehicle(null);
          toastify(`Não encontramos nenhum veículo com esta placa.`, 'info');
          setTab(2);
          return;
        }

        // Valide se pertence ao cliente cadastrado
        if (user && firstVehicle.users_id !== user?.id) {
          setVehicle(null);
          toastify(
            `Sinto muito, este veículo não pode ser utilizado.`,
            'error',
          );
          setAlert('Sinto muito, este veículo não pode ser utilizado.');
          return;
        }

        newContractStorageService.updateVehicle({
          id: firstVehicle ? firstVehicle.id : '',
          field_type: 'VEHICLE_LICENSE_PLATE',
          query: data.license_plate,
        });

        setVehicle(firstVehicle);
        setAlert('');
        buttonsRef.current?.scrollIntoView();
      } catch (error: any) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formValidationRef.current?.setErrors(errors);

          const { license_plate } = errors;

          if (license_plate) toastify(license_plate, 'error');
        } else if (error.response) {
          toastify(error.response.data.error, 'error');
        } else {
          toastify(
            'Houve um error ao tentar validar os dados do veículo.',
            'error',
          );
        }
      } finally {
        hotToast(idHotToast, 'dismiss');
        setLoadingValidation(prevState => !prevState);
      }
    },
    [user],
  );

  useEffect(() => {
    if (currentStep === myStep) {
      const vehicleExist = newContractStorageService.getVehicle();
      if (vehicleExist.query && tab === 1) {
        handleValidateRegistration({
          license_plate: vehicleExist.query,
        });
      }
    }
  }, [tab, currentStep]);

  return (
    <Container>
      <SubtitleSecondary textAlign="start" nameColor="black">
        Veículo
      </SubtitleSecondary>
      <Paragraph
        textAlign="start"
        nameColor="black"
        opacity={0.8}
        fontWeight={500}
      >
        Deseja contratar para qual veículo?
      </Paragraph>
      <Tabs>
        <TabLabels>
          <TabLabelsButton isActive={tab === 1} onClick={() => setTab(1)}>
            <Paragraph style={{ fontWeight: 500 }}>Um já cadastrado</Paragraph>
          </TabLabelsButton>

          <TabLabelsDivisor />

          <TabLabelsButton isActive={tab === 2} onClick={() => setTab(2)}>
            <Paragraph style={{ fontWeight: 500 }}>Um novo</Paragraph>
          </TabLabelsButton>
        </TabLabels>
        <TabItems>
          {tab === 1 && (
            <TabItemsGroup>
              <FormValidate
                onSubmit={handleValidateRegistration}
                initialData={{
                  license_plate: newContractStorageService.getVehicle().query,
                }}
              >
                <SectionsGroup>
                  <SectionsField>
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
                      opacity={1}
                      fontSize={13}
                      style={{ marginBottom: '2vh' }}
                    >
                      Informe a placa de seu veículo
                    </Paragraph>
                    <InputMask
                      name="license_plate"
                      mask="aaa-9*99"
                      placeholder="Digite a placa"
                      style={{ textTransform: 'uppercase' }}
                      tabIndex={1}
                    />
                  </SectionsField>
                </SectionsGroup>

                <SectionsGroup>
                  <SectionsField>
                    <ButtonDefault
                      type="submit"
                      style={{ width: 200 }}
                      loading={loadingValidation}
                      tabIndex={2}
                    >
                      Buscar
                    </ButtonDefault>
                  </SectionsField>
                </SectionsGroup>
                {vehicle && (
                  <>
                    {/* <DividingLine />
                    {alert && <AlertSimpleCustom text={alert} type="danger" />} */}
                    <Resume>
                      <Paragraph
                        nameColor="black"
                        textAlign="start"
                        fontSize={16}
                        fontWeight={500}
                      >
                        {`${vehicle.brand.toUpperCase()} ${vehicle.model.toUpperCase()} ${vehicle.license_plate.toUpperCase()}`}
                      </Paragraph>
                      <Paragraph
                        nameColor="black"
                        textAlign="start"
                        fontWeight={400}
                        opacity={1}
                      >
                        {`Classificação: ${
                          ConfigTransition.rebox_vehicles_classifications[
                            vehicle.classification.toLowerCase()
                          ]
                        }`}
                      </Paragraph>
                      <Paragraph
                        nameColor="black"
                        textAlign="start"
                        fontWeight={400}
                        opacity={1}
                      >
                        {`Cor: ${
                          ConfigTransition.rebox_vehicles_colors[
                            vehicle.color.toLowerCase()
                          ]
                        }`}
                      </Paragraph>
                      <Paragraph
                        nameColor="black"
                        textAlign="start"
                        fontWeight={400}
                        opacity={1}
                      >
                        {`Ano: ${vehicle.year}`}
                      </Paragraph>
                    </Resume>
                  </>
                )}
              </FormValidate>
            </TabItemsGroup>
          )}
          {tab === 2 && (
            <TabItemsGroup>
              <FormVehicleNew
                userId={user?.id || ''}
                licensePlate={licensePlate}
                forNewSale={{
                  advanceStep: () => {
                    changeStep(currentStep + 1);
                    setTab(1);
                  },
                }}
              />
            </TabItemsGroup>
          )}
        </TabItems>
      </Tabs>
      <Buttons ref={buttonsRef}>
        {tab === 1 && (
          <ButtonMain
            onClick={() => changeStep(currentStep + 1)}
            style={{ marginRight: '10px', maxWidth: 200 }}
            disabled={!vehicle || !!alert}
            isDisable={!vehicle || !!alert}
          >
            Avançar
          </ButtonMain>
        )}
        <ButtonDefault
          onClick={() => changeStep(currentStep - 1)}
          style={{ maxWidth: 200 }}
          disabled={currentStep <= 1}
          isDisable={currentStep <= 1}
        >
          Voltar
        </ButtonDefault>
      </Buttons>
    </Container>
  );
};

export default StepVehicle;
