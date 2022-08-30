// ./src/components/modals/ModalCalledAdvance/index.tsx
import React, { useCallback, useRef, useState, useMemo } from 'react';

import { FormHandles } from '@unform/core';
import { IoCheckmarkCircle, IoClose, IoCloseCircle } from 'react-icons/io5';
import * as Yup from 'yup';

import {
  SubtitleSecondary,
  Paragraph,
  ButtonMain,
  ButtonDefault,
  InputSelect,
  InputMask,
  InputText,
} from '@components/index';
import {
  ConfigLabel,
  ConfigStyles,
  ConfigTransition,
  ConfigValues,
} from '@config/index';
import Called from '@models/Called';
import User from '@models/User';
import { apiRebox } from '@services/index';
import { getValidationErrors } from '@utils/errors';
import { formatText } from '@utils/formatters';
import { hotToast, toastify } from '@utils/notifiers';
import { validatorEmail } from '@utils/validators';

import {
  schemaInProgress,
  schemaInAttendance,
  schemaDone,
} from './schemaValidation';
import {
  IFormDataInProgress,
  IFormDataInAttendance,
  IFormDataDone,
} from './typing';

import {
  Container,
  ModalAdvance,
  FormAdvance,
  Buttons,
  SectionsGroup,
  SectionsItem,
  SectionsItemGroup,
} from './styles';

interface IProps {
  called: Called;
  isOpen: boolean;
  change(): void;
  refresh(): void;
}

const ModalCalledAdvance: React.FC<IProps> = ({
  called: calledData,
  isOpen,
  change,
  refresh,
}) => {
  const formInProgressRef = useRef<FormHandles>(null);
  const formInAttendanceRef = useRef<FormHandles>(null);
  const formDoneRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [called, setCalled] = useState<Called>(calledData);
  const [fieldTypeProvider, setFieldTypeProvider] = useState<string>(
    ConfigValues.rebox.default.outhers.called_edit.field_type.user_email,
  );
  const [providerId, setProviderId] = useState<string>('');
  const [alertCheckProvider, setAlertCheckProvider] = useState<number>(0);

  const nextStatus = useMemo(() => {
    const {
      open,
      in_progress,
      in_attendance,
      done,
    } = ConfigValues.rebox.called.status;
    if (called.status === open) return in_progress;
    if (called.status === in_progress) return in_attendance;
    if (called.status === in_attendance) return done;

    return ``;
  }, [called]);

  const getUserByQuery = useCallback(
    async (value: string, role: string, fieldType: string) => {
      const typeDoc: string =
        ConfigTransition.rebox_called_field_type[fieldType.toLowerCase()];
      const idHotToast = hotToast(
        `Verificando ${typeDoc.toUpperCase()}`,
        'loading',
      );
      try {
        const query =
          fieldType ===
          ConfigValues.rebox.default.outhers.called_edit.field_type.user_email
            ? value
            : formatText.removeAllNonDigits(value);
        const { data: responseUser } = await apiRebox.get(
          `/users?role=${role}&query=${query}`,
        );

        const [userFound]: User[] = responseUser.data;
        return userFound;
      } catch (error: any) {
        toastify(
          error.response
            ? error.response.data.error
            : `Houve um error ao tentar verificar o ${typeDoc} do ${
                ConfigTransition.rebox_user_role[role.toLowerCase()]
              }.`,
          'error',
        );
        return undefined;
      } finally {
        hotToast(idHotToast, 'dismiss');
      }
    },
    [],
  );

  const handleCheckProvider = useCallback(
    async (value: string) => {
      const provider = await getUserByQuery(
        value,
        ConfigValues.rebox.user.role.provider,
        fieldTypeProvider,
      );

      if (provider) {
        setAlertCheckProvider(1);
        setProviderId(provider.id || '');
      } else setAlertCheckProvider(2);
    },
    [fieldTypeProvider],
  );

  const handleAdvanceToInProgress = useCallback(
    async (data: IFormDataInProgress) => {
      const idHotToast = hotToast(`Iniciando atendimento`, 'loading');
      try {
        setLoading(prevState => !prevState);

        formInProgressRef.current?.setErrors({});

        await schemaInProgress.validate(data, {
          abortEarly: false,
        });

        if (alertCheckProvider !== 1) {
          throw new Error('Por favor, informe um prestador válido.');
        }

        const { data: response } = await apiRebox.put(`/called/${called.id}`, {
          users_id: called.users_id,
          contracts_id: called.contracts_id,
          vehicles_id: called.vehicles_id,
          date_created: called.date_created,
          appointment_date: called.appointment_date,
          type: called.type,
          services_id: called.services_id,
          vehicle_situation: called.vehicle_situation,
          source_address_id: called.source_address_id,
          destination_address_id: called.destination_address_id,
          location_type: called.location_type,
          description: called.description,
          budget_amount: called.budget_amount,
          status: ConfigValues.rebox.called.status.in_progress,
          call_initiation_date: null,
          estimated_hours_for_initiation: data.estimated_hours_for_initiation,
          service_start_date: null,
          estimated_hours_for_service_start: null,
          closing_date: null,
          who_is_requesting_id: called.who_is_requesting_id,
          who_is_answering_id: providerId,
          who_is_performing_the_service_id: null,
          technical_report: called.technical_report,
        });

        const { header, data: calledUpdated } = response;
        setCalled(calledUpdated);
        toastify(
          'Atendimento ao acionamento foi iniciado com sucesso!',
          'success',
        );
        change();
        refresh();
      } catch (error: any) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formInProgressRef.current?.setErrors(errors);

          const {
            estimated_hours_for_initiation,
            field_type_provider,
            who_is_answering,
          } = errors;

          if (estimated_hours_for_initiation)
            toastify(estimated_hours_for_initiation, 'error');
          if (field_type_provider) toastify(field_type_provider, 'error');
          if (who_is_answering) toastify(who_is_answering, 'error');
        } else {
          let messageError = `Sinto muito, não foi possível iniciar o atendimento ao chamado.`;
          if (error.response) messageError = error.response.data.error;
          toastify(messageError, `error`);
        }
      } finally {
        hotToast(idHotToast, 'dismiss');
        setLoading(prevState => !prevState);
      }
    },
    [called, providerId, alertCheckProvider],
  );

  const handleAdvanceToInAttendance = useCallback(
    async (data: IFormDataInAttendance) => {
      const idHotToast = hotToast(`Iniciando prestação de serviço`, 'loading');
      try {
        setLoading(prevState => !prevState);

        formInAttendanceRef.current?.setErrors({});

        await schemaInAttendance.validate(data, {
          abortEarly: false,
        });

        const { data: response } = await apiRebox.put(`/called/${called.id}`, {
          users_id: called.users_id,
          contracts_id: called.contracts_id,
          vehicles_id: called.vehicles_id,
          date_created: called.date_created,
          appointment_date: called.appointment_date,
          type: called.type,
          services_id: called.services_id,
          vehicle_situation: called.vehicle_situation,
          source_address_id: called.source_address_id,
          destination_address_id: called.destination_address_id,
          location_type: called.location_type,
          description: called.description,
          budget_amount: called.budget_amount,
          status: ConfigValues.rebox.called.status.in_attendance,
          call_initiation_date: called.call_initiation_date,
          estimated_hours_for_initiation: called.estimated_hours_for_initiation,
          service_start_date: null,
          estimated_hours_for_service_start:
            data.estimated_hours_for_service_start,
          closing_date: null,
          who_is_requesting_id: called.who_is_requesting_id,
          who_is_answering_id: called.who_is_answering_id,
          who_is_performing_the_service_id:
            called.who_is_performing_the_service_id,
          technical_report: called.technical_report,
        });

        const { header, data: calledUpdated } = response;
        setCalled(calledUpdated);
        toastify('Prestação de serviço iniciada com sucesso!', 'success');
        change();
        refresh();
      } catch (error: any) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formInAttendanceRef.current?.setErrors(errors);

          const { estimated_hours_for_service_start } = errors;

          if (estimated_hours_for_service_start)
            toastify(estimated_hours_for_service_start, 'error');
        } else {
          let messageError = `Sinto muito, não foi possível iniciar a prestação de serviço.`;
          if (error.response) messageError = error.response.data.error;
          toastify(messageError, `error`);
        }
      } finally {
        hotToast(idHotToast, 'dismiss');
        setLoading(prevState => !prevState);
      }
    },
    [called],
  );

  const handleAdvanceToDone = useCallback(
    async (data: IFormDataDone) => {
      const idHotToast = hotToast(`Encerrando prestação de serviço`, 'loading');
      try {
        setLoading(prevState => !prevState);

        formDoneRef.current?.setErrors({});

        await schemaDone.validate(data, {
          abortEarly: false,
        });

        const { data: response } = await apiRebox.put(`/called/${called.id}`, {
          users_id: called.users_id,
          contracts_id: called.contracts_id,
          vehicles_id: called.vehicles_id,
          date_created: called.date_created,
          appointment_date: called.appointment_date,
          type: called.type,
          services_id: called.services_id,
          vehicle_situation: called.vehicle_situation,
          source_address_id: called.source_address_id,
          destination_address_id: called.destination_address_id,
          location_type: called.location_type,
          description: called.description,
          budget_amount: called.budget_amount,
          status: ConfigValues.rebox.called.status.done,
          call_initiation_date: called.call_initiation_date,
          estimated_hours_for_initiation: called.estimated_hours_for_initiation,
          service_start_date: called.service_start_date,
          estimated_hours_for_service_start:
            called.estimated_hours_for_service_start,
          closing_date: null,
          who_is_requesting_id: called.who_is_requesting_id,
          who_is_answering_id: called.who_is_answering_id,
          who_is_performing_the_service_id:
            called.who_is_performing_the_service_id,
          technical_report: data.technical_report,
        });

        const { header, data: calledUpdated } = response;
        setCalled(calledUpdated);
        toastify('Prestação de serviço finalizada com sucesso!', 'success');
        change();
        refresh();
      } catch (error: any) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formDoneRef.current?.setErrors(errors);

          const { technical_report } = errors;

          if (technical_report) toastify(technical_report, 'error');
        } else {
          let messageError = `Sinto muito, não foi possível encerrar a prestação de serviço.`;
          if (error.response) messageError = error.response.data.error;
          toastify(messageError, `error`);
        }
      } finally {
        hotToast(idHotToast, 'dismiss');
        setLoading(prevState => !prevState);
      }
    },
    [called],
  );

  return (
    <Container>
      <ModalAdvance
        isOpen={isOpen}
        onRequestClose={change}
        contentLabel="Advance"
      >
        <ButtonDefault
          iconLeft={IoClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            maxWidth: 50,
            padding: 0,
          }}
          onClick={change}
        />
        {nextStatus === ConfigValues.rebox.called.status.in_progress && (
          <>
            <SubtitleSecondary>Iniciar atendimento</SubtitleSecondary>
            {/* <Paragraph
              nameColor="black"
              opacity={0.5}
              style={{ marginTop: '2vh' }}
            >
              Marca o momento que estamos enviando um prestador até o cliente.
            </Paragraph> */}
            <FormAdvance
              ref={formInProgressRef}
              onSubmit={handleAdvanceToInProgress}
            >
              <SectionsGroup>
                <SectionsItem>
                  <SubtitleSecondary
                    textAlign="start"
                    nameColor="black"
                    fontSize={14}
                  >
                    Escolher prestador por
                  </SubtitleSecondary>
                  <Paragraph
                    nameColor="black"
                    textAlign="start"
                    opacity={0.5}
                    fontSize={13}
                    style={{ marginBottom: '2vh' }}
                  >
                    Tipo de campo que deseja usar para buscar prestador
                  </Paragraph>
                  <InputSelect
                    name="field_type_provider"
                    placeholder="Selecione"
                    tabIndex={18}
                    options={ConfigLabel.rebox.validation.calledEdit.fieldType}
                    selectedDefault={fieldTypeProvider}
                    onChange={event => {
                      setFieldTypeProvider(event.target.value);
                      setAlertCheckProvider(0);
                      formInProgressRef.current?.setData({
                        who_is_answering: '',
                      });
                    }}
                  />
                </SectionsItem>

                <SectionsItem>
                  <SubtitleSecondary
                    textAlign="start"
                    nameColor="black"
                    fontSize={14}
                  >
                    {`${
                      ConfigTransition.rebox_called_field_type[
                        fieldTypeProvider.toLowerCase()
                      ]
                    } do prestador`}
                  </SubtitleSecondary>
                  <Paragraph
                    nameColor="black"
                    textAlign="start"
                    opacity={0.5}
                    fontSize={13}
                    style={{ marginBottom: '2vh' }}
                  >
                    Define o prestador que será responsável pelo serviço
                  </Paragraph>
                  <SectionsItemGroup>
                    {fieldTypeProvider !==
                    ConfigValues.rebox.default.outhers.called_edit.field_type
                      .user_email ? (
                      <InputMask
                        name="who_is_answering"
                        placeholder={`Informe o ${
                          ConfigTransition.rebox_called_field_type[
                            fieldTypeProvider.toLowerCase()
                          ]
                        }`}
                        mask={
                          fieldTypeProvider ===
                          ConfigValues.rebox.default.outhers.called_edit
                            .field_type.user_cpf
                            ? '999.999.999-99'
                            : '99.999.999/9999-99'
                        }
                        tabIndex={19}
                        onChange={event => {
                          const cpfCnpj = formatText.removeAllNonDigits(
                            event.target.value,
                          );
                          if (cpfCnpj.length === 11 || cpfCnpj.length === 14) {
                            handleCheckProvider(cpfCnpj);
                          } else if (alertCheckProvider !== 0) {
                            setAlertCheckProvider(0);
                          }
                        }}
                      />
                    ) : (
                      <InputText
                        name="who_is_answering"
                        placeholder="Informe o e-mail"
                        tabIndex={19}
                        onChange={event => {
                          const email = event.target.value;
                          if (validatorEmail.check(email)) {
                            handleCheckProvider(email);
                          } else if (alertCheckProvider !== 2)
                            setAlertCheckProvider(2);
                          else if (email === '') setAlertCheckProvider(0);
                        }}
                      />
                    )}
                    {alertCheckProvider === 1 && (
                      <IoCheckmarkCircle
                        color={ConfigStyles.rebox.colors.greenEmerald.main}
                        size={20}
                      />
                    )}
                    {alertCheckProvider === 2 && (
                      <IoCloseCircle
                        color={ConfigStyles.rebox.colors.red.main}
                        size={20}
                      />
                    )}
                  </SectionsItemGroup>
                </SectionsItem>
              </SectionsGroup>
              <SectionsGroup>
                <SectionsItem>
                  <SubtitleSecondary
                    textAlign="start"
                    nameColor="black"
                    fontSize={14}
                  >
                    Estimativa de chegada
                  </SubtitleSecondary>
                  <Paragraph
                    nameColor="black"
                    textAlign="start"
                    opacity={0.5}
                    fontSize={13}
                    style={{ marginBottom: '2vh' }}
                  >
                    Tempo estimado para a chegada do prestador até o cliente
                  </Paragraph>
                  <InputSelect
                    name="estimated_hours_for_initiation"
                    options={
                      ConfigLabel.rebox.others.called
                        .estimatedHoursForInitiation
                    }
                    placeholder="Selecione"
                    tabIndex={14}
                  />
                </SectionsItem>
              </SectionsGroup>
              <Buttons>
                <ButtonMain
                  loading={loading}
                  type={`submit`}
                  style={{ marginRight: '1vw' }}
                >
                  Iniciar
                </ButtonMain>
                <ButtonDefault type="button" onClick={change}>
                  Voltar
                </ButtonDefault>
              </Buttons>
            </FormAdvance>
          </>
        )}

        {nextStatus === ConfigValues.rebox.called.status.in_attendance && (
          <>
            <SubtitleSecondary>Iniciar prestação de serviço</SubtitleSecondary>
            {/* <Paragraph
              nameColor="black"
              opacity={0.5}
              style={{ marginTop: '2vh' }}
            >
              Marca o momento que estamos enviando um prestador até o cliente.
            </Paragraph> */}
            <FormAdvance
              ref={formInAttendanceRef}
              onSubmit={handleAdvanceToInAttendance}
            >
              <SectionsGroup>
                <SectionsItem>
                  <SubtitleSecondary
                    textAlign="start"
                    nameColor="black"
                    fontSize={14}
                  >
                    Estimativa de finalização
                  </SubtitleSecondary>
                  <Paragraph
                    nameColor="black"
                    textAlign="start"
                    opacity={0.5}
                    fontSize={13}
                    style={{ marginBottom: '2vh' }}
                  >
                    Tempo estimado para prestador terminar o serviço
                  </Paragraph>

                  <InputSelect
                    name="estimated_hours_for_service_start"
                    options={
                      ConfigLabel.rebox.others.called
                        .estimatedHoursForServiceStart
                    }
                    placeholder="Selecione"
                    tabIndex={16}
                  />
                </SectionsItem>
              </SectionsGroup>
              <Buttons>
                <ButtonMain
                  loading={loading}
                  type={`submit`}
                  style={{ marginRight: '1vw' }}
                >
                  Iniciar
                </ButtonMain>
                <ButtonDefault type="button" onClick={change}>
                  Voltar
                </ButtonDefault>
              </Buttons>
            </FormAdvance>
          </>
        )}

        {nextStatus === ConfigValues.rebox.called.status.done && (
          <>
            <SubtitleSecondary>
              Finalizar prestação de serviço
            </SubtitleSecondary>
            <FormAdvance ref={formDoneRef} onSubmit={handleAdvanceToDone}>
              <SectionsGroup>
                <SectionsItem>
                  <SubtitleSecondary
                    textAlign="start"
                    nameColor="black"
                    fontSize={14}
                  >
                    Parecer técnico
                  </SubtitleSecondary>
                  <Paragraph
                    nameColor="black"
                    textAlign="start"
                    opacity={0.5}
                    fontSize={13}
                    style={{ marginBottom: '2vh' }}
                  >
                    Observação feita pelo colaborador que atendeu ao chamado
                  </Paragraph>

                  <InputText
                    name="technical_report"
                    placeholder="Descreva aqui"
                    tabIndex={22}
                  />
                </SectionsItem>
              </SectionsGroup>
              <Buttons>
                <ButtonMain
                  loading={loading}
                  type={`submit`}
                  style={{ marginRight: '1vw' }}
                >
                  Finalizar
                </ButtonMain>
                <ButtonDefault type="button" onClick={change}>
                  Voltar
                </ButtonDefault>
              </Buttons>
            </FormAdvance>
          </>
        )}
      </ModalAdvance>
    </Container>
  );
};

export default ModalCalledAdvance;
