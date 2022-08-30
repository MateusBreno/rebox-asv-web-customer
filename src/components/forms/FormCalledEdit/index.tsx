// ./src/components/forms/FormCalledEdit/index.tsx
import React, { useCallback, useRef, useState, useEffect } from 'react';

import { FormHandles } from '@unform/core';
import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
import PlacesAutocomplete from 'react-places-autocomplete';
import * as Yup from 'yup';

import {
  SubtitleSecondary,
  Paragraph,
  InputText,
  InputMask,
  ButtonDefault,
  InputSelect,
  ButtonMain,
  ButtonCopy,
} from '@components/index';
import {
  ConfigAuth,
  ConfigLabel,
  ConfigRules,
  ConfigStyles,
  ConfigTransition,
  ConfigValues,
} from '@config/index';
import Called from '@models/Called';
import CalledAddresses from '@models/CalledAddresses';
import Contract from '@models/Contract';
import Service from '@models/Service';
import User from '@models/User';
import {
  apiGoogleMaps,
  apiRebox,
  sessionStorageService,
} from '@services/index';
import { getValidationErrors } from '@utils/errors';
import { formatDate, formatMoney, formatText } from '@utils/formatters';
import { generateDate } from '@utils/generators';
import { hotToast, toastify } from '@utils/notifiers';

// Importação interna
import { validatorDate, validatorEmail } from '@utils/validators';

import { schema } from './schemaValidation';
import {
  IProps,
  ISelect,
  IGeocoderAddressComponent,
  IFormCalled,
} from './typing';

import {
  Container,
  FormCalled,
  Sections,
  SectionsGroup,
  SectionsItem,
  SectionsItemGroup,
  DividingLine,
  PlacesAutocompleteGroup,
  DropdownContainer,
  DropdownContainerGroup,
  DropdownContainerLoading,
  DropdownContainerSuggestions,
} from './styles';

const FormCalledEdit: React.FC<IProps> = ({ called, refresh }) => {
  const formCalledRef = useRef<FormHandles>(null);

  const [user, setUser] = useState<User | any>(sessionStorageService.getUser());
  const [contract, setContract] = useState<Contract>();
  const [services, setServices] = useState<ISelect[]>([]);

  const [loadingOpenCalled, setLoadingOpenCalled] = useState<boolean>(false);
  const [disabledForEditing, setdIsabledForEditing] = useState<boolean>(
    called.status === ConfigValues.rebox.called.status.canceled ||
      called.status === ConfigValues.rebox.called.status.deleted,
  );
  const [vehicleLicensePlate, setVehicleLicensePlate] = useState<string>('');
  const [alertCheckVehicle, setAlertCheckVehicle] = useState<number>(0);
  const [estimatedHoursForInitiation] = useState<string>(
    called.estimated_hours_for_initiation ||
      `${ConfigRules.rebox.called.maximumHoursForArrivalAtOrigin}`,
  );
  const [estimatedHoursForServiceStart] = useState<string>(
    called.estimated_hours_for_service_start ||
      `${ConfigRules.rebox.called.maximumHoursToMeetTheDestination}`,
  );

  const [fieldTypeProvider, setFieldTypeProvider] = useState<string>(
    ConfigValues.rebox.default.outhers.called_edit.field_type.user_email,
  );
  const [providerId, setProviderId] = useState<string>('');
  const [alertCheckProvider, setAlertCheckProvider] = useState<number>(0);

  const [fieldTypeMotorist, setFieldTypeMotorist] = useState<string>(
    ConfigValues.rebox.default.outhers.called_edit.field_type.user_email,
  );
  const [motoristId, setMotoristId] = useState<string>('');
  const [alertCheckMotorist, setAlertCheckMotorist] = useState<number>(0);

  const [
    calledAddressesOrigin,
    setCalledAddressesOrigin,
  ] = useState<CalledAddresses>();
  const [
    calledAddressesDestination,
    setCalledAddressesDestination,
  ] = useState<CalledAddresses>();

  // Google Places e Autocomplete
  const [googleSourceAddress, setGoogleSourceAddress] = useState<string>(
    called.source_address?.full_address || '',
  );
  const [
    googleDestinationAddress,
    setGoogleDestinationAddress,
  ] = useState<string>(called.destination_address?.full_address || '');

  const getAddressesFormatted = (
    address_components: IGeocoderAddressComponent[],
  ) => {
    const [zip_code] = address_components.filter(item =>
      item.types.includes('postal_code'),
    );
    const [country] = address_components.filter(item =>
      item.types.includes('country'),
    );
    const [state] = address_components.filter(item =>
      item.types.includes('administrative_area_level_1'),
    );
    const [city] = address_components.filter(item =>
      item.types.includes('administrative_area_level_2'),
    );
    const [neighborhood] = address_components.filter(item =>
      item.types.includes('sublocality_level_1'),
    );
    const [street] = address_components.filter(item =>
      item.types.includes('route'),
    );
    const [number] = address_components.filter(item =>
      item.types.includes('street_number'),
    );

    return {
      country,
      state,
      city,
      neighborhood,
      street,
      number,
      zip_code,
    };
  };

  const getServices = useCallback(async () => {
    try {
      const { data: response } = await apiRebox.get(`/services`);

      const responseServices: Service[] = response.data;
      const servicesUpdated: ISelect[] = [];

      responseServices.forEach(element => {
        servicesUpdated.push({
          label: formatText.capitalizedFirstLetter(element.name),
          value: element.id,
        });
      });

      setServices(servicesUpdated);
    } catch (error) {
      toastify(`Houve um error ao buscar os serviços.`, 'error');
    }
  }, []);

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

  const buildInitialData = useCallback(() => {
    const {
      date_created,
      appointment_date,
      description,
      budget_amount,
      call_initiation_date,
      service_start_date,
      closing_date,
      technical_report,
      vehicle,
      who_is_answering,
      who_is_performing_the_service,
    } = called;
    const [dateCreated, hourCreated] = date_created.split(' ');

    let appointment = '';
    if (appointment_date) {
      const [appointmentDate, appointmentHour] = appointment_date.split(' ');
      appointment = `${formatDate.addMask(appointmentDate)} ${appointmentHour}`;
    }

    let callInitiation = '';
    if (call_initiation_date) {
      const [
        callInitiationDate,
        callInitiationHour,
      ] = call_initiation_date.split(' ');
      callInitiation = `${formatDate.addMask(
        callInitiationDate,
      )} ${callInitiationHour}`;
    }

    let serviceStart = '';
    if (service_start_date) {
      const [serviceStartDate, serviceStartHour] = service_start_date.split(
        ' ',
      );
      serviceStart = `${formatDate.addMask(
        serviceStartDate,
      )} ${serviceStartHour}`;
    }

    let closing = '';
    if (closing_date) {
      const [closingDate, closingHour] = closing_date.split(' ');
      closing = `${formatDate.addMask(closingDate)} ${closingHour}`;
    }

    return {
      date_created: `${formatDate.addMask(dateCreated)} ${hourCreated}`,
      appointment_date: appointment,
      license_plate: vehicle ? vehicle.license_plate.toUpperCase() : '',
      source_address: googleSourceAddress,
      destination_address: googleDestinationAddress,
      description: description || '',
      budget_amount: formatMoney.fromNumberToPrice(budget_amount || 0),
      call_initiation_date: callInitiation,
      estimated_hours_for_initiation: estimatedHoursForInitiation,
      service_start_date: serviceStart,
      estimated_hours_for_service_start: estimatedHoursForServiceStart,
      closing_date: closing,
      who_is_answering: who_is_answering?.email || '',
      who_is_performing_the_service: who_is_performing_the_service?.email || '',
      technical_report: technical_report || '',
    };
  }, [
    called,
    googleDestinationAddress,
    googleSourceAddress,
    estimatedHoursForInitiation,
    estimatedHoursForServiceStart,
  ]);

  const handleCurrentLocation = (option: string) => {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;
      const {
        data: { results },
      } = await apiGoogleMaps.get(
        `/geocode/json?key=${ConfigAuth.google.keys.maps}&latlng=${latitude},${longitude}`,
      );

      const [firstResult] = results;

      const {
        country,
        city,
        neighborhood,
        state,
        street,
        number,
        zip_code,
      } = getAddressesFormatted(firstResult.address_components);
      const calledAddress: CalledAddresses = {
        type: ConfigValues.rebox.called_addresses.type.origin,
        latitude: firstResult.geometry.location.lat,
        longitude: firstResult.geometry.location.lng,
        full_address: firstResult.formatted_address,
        reference_type: 'GOOGLE_MAPS',
        reference_id: firstResult.place_id,
        country: country.short_name,
        state: state.short_name,
        city: city.long_name,
        neighborhood: neighborhood ? neighborhood.long_name : '',
        street: street ? street.long_name : '',
        number: number ? Number.parseInt(number.long_name, 10) : 0,
        zip_code: zip_code ? zip_code.long_name : '',
      };

      if (option === ConfigValues.rebox.called_addresses.type.origin) {
        setGoogleSourceAddress(firstResult.formatted_address);
        setCalledAddressesOrigin(calledAddress);
      } else {
        setGoogleDestinationAddress(firstResult.formatted_address);
        setCalledAddressesDestination({
          ...calledAddress,
          type: ConfigValues.rebox.called_addresses.type.destination,
        });
      }
    });
  };

  const handleGoogleSourceSelect = async (originAddress: string) => {
    const {
      data: { results },
    } = await apiGoogleMaps.get(
      `/geocode/json?key=${ConfigAuth.google.keys.maps}&address=${originAddress}`,
    );
    const [firstResult] = results;
    setGoogleSourceAddress(firstResult.formatted_address);
    const {
      country,
      city,
      neighborhood,
      state,
      street,
      number,
      zip_code,
    } = getAddressesFormatted(firstResult.address_components);
    setCalledAddressesOrigin({
      type: ConfigValues.rebox.called_addresses.type.origin,
      latitude: firstResult.geometry.location.lat,
      longitude: firstResult.geometry.location.lng,
      full_address: firstResult.formatted_address,
      reference_type: 'GOOGLE_MAPS',
      reference_id: firstResult.place_id,
      country: country.short_name,
      state: state.short_name,
      city: city.long_name,
      neighborhood: neighborhood ? neighborhood.long_name : '',
      street: street ? street.long_name : '',
      number: number ? Number.parseInt(number.long_name, 10) : 0,
      zip_code: zip_code ? zip_code.long_name : '',
    });
  };

  const handleGoogleDestinationSelect = async (destinationAddress: string) => {
    const {
      data: { results },
    } = await apiGoogleMaps.get(
      `/geocode/json?key=${ConfigAuth.google.keys.maps}&address=${destinationAddress}`,
    );
    const [firstResult] = results;
    setGoogleDestinationAddress(firstResult.formatted_address);
    const {
      country,
      city,
      neighborhood,
      state,
      street,
      number,
      zip_code,
    } = getAddressesFormatted(firstResult.address_components);
    setCalledAddressesDestination({
      type: ConfigValues.rebox.called_addresses.type.destination,
      latitude: firstResult.geometry.location.lat,
      longitude: firstResult.geometry.location.lng,
      full_address: firstResult.formatted_address,
      reference_type: 'GOOGLE_MAPS',
      reference_id: firstResult.place_id,
      country: country.short_name,
      state: state.short_name,
      city: city.long_name,
      neighborhood: neighborhood ? neighborhood.long_name : '',
      street: street ? street.long_name : '',
      number: number ? Number.parseInt(number.long_name, 10) : 0,
      zip_code: zip_code ? zip_code.long_name : '',
    });
  };

  const handleCheckVehicle = useCallback(async () => {
    const idHotToast = hotToast('Carregando...', 'loading');
    try {
      const { data: responseContract } = await apiRebox.get(
        `/called/validate?vehicles_license_plate=${vehicleLicensePlate}`,
      );

      const contractFound: Contract = responseContract.data;
      setContract(contractFound);
      if (contractFound.code) {
        setAlertCheckVehicle(1);
      } else {
        toastify('Este veículo não está coberto por um plano', 'error');
        setAlertCheckVehicle(2);
      }
    } catch (error: any) {
      if (error.response) {
        toastify(
          error.response.data.error ||
            'Sinto muito, não foi possível validar o veículo.',
          'error',
        );
      }
      setAlertCheckVehicle(2);
    } finally {
      hotToast(idHotToast, 'dismiss');
    }
  }, [vehicleLicensePlate]);

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

  const handleCheckMotorist = useCallback(
    async (value: string) => {
      const Motorist = await getUserByQuery(
        value,
        ConfigValues.rebox.user.role.motorist,
        fieldTypeMotorist,
      );

      if (Motorist) {
        setAlertCheckMotorist(1);
        setMotoristId(Motorist.id || '');
      } else setAlertCheckMotorist(2);
    },
    [fieldTypeMotorist],
  );

  const handleChangeFormByStatus = useCallback(
    (status: string) => {
      const {
        open,
        in_progress,
        in_attendance,
        done,
        canceled,
        deleted,
      } = ConfigValues.rebox.called.status;

      const {
        call_initiation_date,
        service_start_date,
        closing_date,
        technical_report,
        who_is_answering,
        who_is_performing_the_service,
      } = called;

      const {
        user_email,
      } = ConfigValues.rebox.default.outhers.called_edit.field_type;

      let callInitiation = '';
      let serviceStart = '';
      let closing = '';

      if (call_initiation_date) {
        const [
          callInitiationDate,
          callInitiationHour,
        ] = call_initiation_date.split(' ');
        callInitiation = `${formatDate.addMask(
          callInitiationDate,
        )} ${callInitiationHour}`;
      }

      if (service_start_date) {
        const [serviceStartDate, serviceStartHour] = service_start_date.split(
          ' ',
        );
        serviceStart = `${formatDate.addMask(
          serviceStartDate,
        )} ${serviceStartHour}`;
      }

      if (closing_date) {
        const [closingDate, closingHour] = closing_date.split(' ');
        closing = `${formatDate.addMask(closingDate)} ${closingHour}`;
      }

      const changes = {
        call_initiation_date: '',
        estimated_hours_for_initiation: '',
        service_start_date: '',
        estimated_hours_for_service_start: '',
        closing_date: '',
        field_type_provider: user_email,
        who_is_answering: '',
        field_type_motorist: user_email,
        who_is_performing_the_service: '',
        technical_report: '',
      };

      if (status === open) {
        formCalledRef.current?.setData(changes);
      }

      if (status === in_progress) {
        formCalledRef.current?.setData({
          ...changes,
          call_initiation_date: callInitiation,
          estimated_hours_for_initiation: estimatedHoursForInitiation,
          who_is_answering: who_is_answering?.email || '',
          who_is_performing_the_service:
            who_is_performing_the_service?.email || '',
        });
      }

      if (status === in_attendance) {
        formCalledRef.current?.setData({
          call_initiation_date: callInitiation,
          estimated_hours_for_initiation: estimatedHoursForInitiation,
          service_start_date: serviceStart,
          estimated_hours_for_service_start: estimatedHoursForServiceStart,
          closing_date: '',
          field_type_provider: user_email,
          who_is_answering: who_is_answering?.email || '',
          field_type_motorist: user_email,
          who_is_performing_the_service:
            who_is_performing_the_service?.email || '',
          technical_report: '',
        });
      }

      if (status === done || status === canceled || status === deleted) {
        formCalledRef.current?.setData({
          call_initiation_date: callInitiation,
          estimated_hours_for_initiation: estimatedHoursForInitiation,
          service_start_date: serviceStart,
          estimated_hours_for_service_start: estimatedHoursForServiceStart,
          closing_date: closing,
          field_type_provider: user_email,
          who_is_answering: who_is_answering?.email || '',
          field_type_motorist: user_email,
          who_is_performing_the_service:
            who_is_performing_the_service?.email || '',
          technical_report: technical_report || '',
        });
      }
    },
    [estimatedHoursForInitiation, estimatedHoursForServiceStart],
  );

  const handleUpdateCalled = useCallback(
    async (data: IFormCalled) => {
      const idHotToast = hotToast(`Atualizando acionamento`, 'loading');
      try {
        setLoadingOpenCalled(prevState => !prevState);

        formCalledRef.current?.setErrors({});

        await schema.validate(data, {
          abortEarly: false,
        });

        if (alertCheckProvider === 2) {
          throw new Error(
            'Oops! Informe um prestador válido para o acionamento.',
          );
        }

        if (data.source_address !== called.source_address?.full_address) {
          await apiRebox.put(
            `/called/addresses/${called.source_address_id}`,
            calledAddressesOrigin,
          );
        }

        if (
          data.destination_address !== called.destination_address?.full_address
        ) {
          await apiRebox.put(
            `/called/addresses/${called.destination_address_id}`,
            calledAddressesDestination,
          );
        }

        // ID do veículo em assistência
        let vehicles_id = '';
        if (contract?.contracts_vehicles) {
          const [contractVehicle] = contract?.contracts_vehicles.filter(
            item =>
              item.vehicle.license_plate.toLowerCase() ===
              data.license_plate.toLowerCase(),
          );
          vehicles_id = contractVehicle.vehicle.id;
        }

        const { data: response } = await apiRebox.put(`/called/${called.id}`, {
          users_id: called.users_id,
          contracts_id: contract?.id || called.contracts_id,
          vehicles_id: vehicles_id || called.vehicles_id,
          date_created: formatDate.removeMask(data.date_created),
          appointment_date: data.appointment_date
            ? formatDate.removeMask(data.appointment_date)
            : null,
          type: data.type,
          services_id: data.services_id,
          vehicle_situation: data.vehicle_situation,
          source_address_id: called.source_address_id,
          destination_address_id: called.destination_address_id,
          location_type: data.location_type,
          description: data.description,
          budget_amount: formatMoney.revertToFloat(data.budget_amount),
          status: data.status,
          call_initiation_date: data.call_initiation_date
            ? formatDate.removeMask(data.call_initiation_date)
            : null,
          estimated_hours_for_initiation: data.call_initiation_date
            ? data.estimated_hours_for_initiation
            : null,
          service_start_date: data.service_start_date
            ? formatDate.removeMask(data.service_start_date)
            : null,
          estimated_hours_for_service_start: data.service_start_date
            ? data.estimated_hours_for_service_start
            : null,
          closing_date: data.closing_date
            ? formatDate.removeMask(data.closing_date)
            : null,
          who_is_requesting_id: called.who_is_requesting_id,
          who_is_answering_id: providerId || called.who_is_answering_id || null,
          who_is_performing_the_service_id:
            motoristId || called.who_is_performing_the_service_id || null,
          technical_report: data.technical_report || null,
        });

        const { header } = response;
        toastify(
          header.message || 'Acionamento atualizado com sucesso!',
          'success',
        );
        refresh();
      } catch (error: any) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formCalledRef.current?.setErrors(errors);

          const {
            date_created,
            appointment_date,
            type,
            services_id,
            license_plate,
            vehicle_situation,
            source_address,
            destination_address,
            location_type,
            description,
            budget_amount,
            status,
            call_initiation_date,
            estimated_hours_for_initiation,
            service_start_date,
            estimated_hours_for_service_start,
            closing_date,
            field_type_provider,
            who_is_answering,
            field_type_motorist,
            who_is_performing_the_service,
            technical_report,
          } = errors;

          if (date_created) toastify(date_created, 'error');
          if (appointment_date) toastify(appointment_date, 'error');
          if (type) toastify(type, 'error');
          if (license_plate) toastify(license_plate, 'error');
          if (services_id) toastify(services_id, 'error');
          if (location_type) toastify(location_type, 'error');
          if (vehicle_situation) toastify(vehicle_situation, 'error');
          if (source_address) toastify(source_address, 'error');
          if (destination_address) toastify(destination_address, 'error');
          if (description) toastify(description, 'error');
          if (budget_amount) toastify(budget_amount, 'error');
          if (status) toastify(status, 'error');
          if (call_initiation_date) toastify(call_initiation_date, 'error');
          if (estimated_hours_for_initiation)
            toastify(estimated_hours_for_initiation, 'error');
          if (service_start_date) toastify(service_start_date, 'error');
          if (estimated_hours_for_service_start)
            toastify(estimated_hours_for_service_start, 'error');
          if (closing_date) toastify(closing_date, 'error');
          if (field_type_provider) toastify(field_type_provider, 'error');
          if (who_is_answering) toastify(who_is_answering, 'error');
          if (field_type_motorist) toastify(field_type_motorist, 'error');
          if (who_is_performing_the_service)
            toastify(who_is_performing_the_service, 'error');
          if (technical_report) toastify(technical_report, 'error');
        } else if (error.response) {
          toastify(
            error.response.data.error ||
              'Sinto muito, houve um problema ao tentar atualizar o acionamento.',
            'error',
          );
        }
      } finally {
        hotToast(idHotToast, 'dismiss');
        setLoadingOpenCalled(prevState => !prevState);
      }
    },
    [
      called,
      calledAddressesOrigin,
      calledAddressesDestination,
      alertCheckProvider,
      contract,
      providerId,
      motoristId,
    ],
  );

  useEffect(() => {
    if (vehicleLicensePlate) handleCheckVehicle();
  }, [vehicleLicensePlate]);

  useEffect(() => {
    getServices();
  }, []);

  return (
    <Container>
      <ButtonCopy
        textCopy={called?.code || ''}
        labelText={called.code}
        labelColor="black"
        labelAlign="start"
        labelSize={11}
        labelOpacity={0.4}
        iconColor="black"
        iconSize={12}
        iconOpacity={0.8}
      />
      <FormCalled
        ref={formCalledRef}
        onSubmit={handleUpdateCalled}
        initialData={buildInitialData()}
      >
        <Sections>
          <SectionsGroup>
            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
              >
                Data da solicitação
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Data/hora em que o acionamento foi aberto
              </Paragraph>
              <InputMask
                name="date_created"
                mask="99/99/9999 99:99"
                placeholder="Informe a data e hora"
                tabIndex={1}
                disabled={disabledForEditing}
                isDisable={disabledForEditing}
              />
            </SectionsItem>

            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
              >
                Data de atendimento
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Data/hora que o acionamento deverá ser realizado
              </Paragraph>
              <InputMask
                name="appointment_date"
                mask="99/99/9999 99:99"
                placeholder="Informe a data e hora"
                tabIndex={2}
                disabled={disabledForEditing}
                isDisable={disabledForEditing}
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
                Tipo de acionamento
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Define o formato de cobrança do chamado
              </Paragraph>
              <InputSelect
                name="type"
                options={ConfigLabel.rebox.others.called.type}
                placeholder="Selecione"
                selectedDefault={called.type}
                tabIndex={3}
                disabled={disabledForEditing}
                isDisable={disabledForEditing}
              />
            </SectionsItem>

            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
              >
                Qual o serviço solicitado?
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Escolha um de nossos serviços de assistência
              </Paragraph>
              <InputSelect
                name="services_id"
                placeholder="Selecione"
                options={services}
                selectedDefault={called.services_id}
                tabIndex={4}
                disabled={disabledForEditing}
                isDisable={disabledForEditing}
              />
            </SectionsItem>
          </SectionsGroup>

          <DividingLine />

          <SectionsGroup>
            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
              >
                Veículo em assistência
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Informa a placa do veículo do cliente
              </Paragraph>
              <SectionsItemGroup>
                <InputMask
                  name="license_plate"
                  mask="aaa-9*99"
                  placeholder="Placa do veículo"
                  style={{ textTransform: 'uppercase' }}
                  tabIndex={5}
                  onChange={event => {
                    if (!event.target.value.includes('_')) {
                      setVehicleLicensePlate(event.target.value);
                    } else {
                      setVehicleLicensePlate('');
                      setAlertCheckVehicle(0);
                    }
                  }}
                  disabled={disabledForEditing}
                  isDisable={disabledForEditing}
                />
                {alertCheckVehicle === 1 && (
                  <IoCheckmarkCircle
                    color={ConfigStyles.rebox.colors.greenEmerald.main}
                    size={20}
                  />
                )}
                {alertCheckVehicle === 2 && (
                  <IoCloseCircle
                    color={ConfigStyles.rebox.colors.red.main}
                    size={20}
                  />
                )}
              </SectionsItemGroup>
            </SectionsItem>

            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
              >
                Qual a situação do veículo?
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Define o estado que o veículo está
              </Paragraph>

              <InputSelect
                name="vehicle_situation"
                options={ConfigLabel.rebox.others.called.vehicleSituation}
                selectedDefault={called.vehicle_situation}
                placeholder="Selecione"
                tabIndex={6}
                disabled={disabledForEditing}
                isDisable={disabledForEditing}
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
                Onde está o veículo?
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                A partir do
                {` ${ConfigRules.google.places.autocomplete.minimumTextLimit}º `}
                caracter aparecem sugestões
              </Paragraph>

              <PlacesAutocomplete
                value={googleSourceAddress}
                onChange={setGoogleSourceAddress}
                onSelect={handleGoogleSourceSelect}
                highlightFirstSuggestion={true}
                shouldFetchSuggestions={
                  googleSourceAddress.length >
                  ConfigRules.google.places.autocomplete.minimumTextLimit
                }
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <PlacesAutocompleteGroup>
                    <InputText
                      {...getInputProps({
                        className: 'location-search-input',
                      })}
                      name="source_address"
                      placeholder="Endereço de origem"
                      showIconCurrentLocation={true}
                      nameColorCurrentLocation="blue"
                      onKeyDown={() => {
                        console.log('');
                      }}
                      functionIconCurrentLocation={() =>
                        handleCurrentLocation(
                          ConfigValues.rebox.called_addresses.type.origin,
                        )
                      }
                      tabIndex={7}
                      disabled={disabledForEditing}
                      isDisable={disabledForEditing}
                    />
                    <DropdownContainer
                      isActive={
                        loading ||
                        googleSourceAddress.length >=
                          ConfigRules.google.places.autocomplete
                            .minimumTextLimit
                      }
                    >
                      {loading && (
                        <DropdownContainerLoading>
                          Carregando...
                        </DropdownContainerLoading>
                      )}
                      {suggestions.map(suggestion => (
                        <DropdownContainerGroup key={suggestion.id}>
                          <DropdownContainerSuggestions
                            {...getSuggestionItemProps(suggestion)}
                            isActive={suggestion.active}
                          >
                            <span>{suggestion.description}</span>
                          </DropdownContainerSuggestions>
                        </DropdownContainerGroup>
                      ))}
                    </DropdownContainer>
                  </PlacesAutocompleteGroup>
                )}
              </PlacesAutocomplete>
            </SectionsItem>

            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
              >
                Para onde vai o veículo?
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                A partir do
                {` ${ConfigRules.google.places.autocomplete.minimumTextLimit}º `}
                caracter aparecem sugestões
              </Paragraph>

              <PlacesAutocomplete
                value={googleDestinationAddress}
                onChange={setGoogleDestinationAddress}
                onSelect={handleGoogleDestinationSelect}
                highlightFirstSuggestion={true}
                shouldFetchSuggestions={
                  googleDestinationAddress.length >
                  ConfigRules.google.places.autocomplete.minimumTextLimit
                }
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <PlacesAutocompleteGroup>
                    <InputText
                      {...getInputProps({
                        className: 'location-search-input',
                      })}
                      name="destination_address"
                      placeholder="Endereço de destino"
                      showIconCurrentLocation={true}
                      nameColorCurrentLocation="blue"
                      onKeyDown={() => {
                        console.log('');
                      }}
                      functionIconCurrentLocation={() =>
                        handleCurrentLocation(
                          ConfigValues.rebox.called_addresses.type.destination,
                        )
                      }
                      tabIndex={8}
                      disabled={disabledForEditing}
                      isDisable={disabledForEditing}
                    />
                    <DropdownContainer
                      isActive={
                        loading ||
                        googleDestinationAddress.length >=
                          ConfigRules.google.places.autocomplete
                            .minimumTextLimit
                      }
                    >
                      {loading && (
                        <DropdownContainerLoading>
                          Carregando...
                        </DropdownContainerLoading>
                      )}
                      {suggestions.map(suggestion => (
                        <DropdownContainerGroup key={suggestion.id}>
                          <DropdownContainerSuggestions
                            {...getSuggestionItemProps(suggestion)}
                            isActive={suggestion.active}
                          >
                            <span>{suggestion.description}</span>
                          </DropdownContainerSuggestions>
                        </DropdownContainerGroup>
                      ))}
                    </DropdownContainer>
                  </PlacesAutocompleteGroup>
                )}
              </PlacesAutocomplete>
            </SectionsItem>
          </SectionsGroup>

          <SectionsGroup>
            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
              >
                Como é o local da remoção?
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Escolha o tipo do local onde o carro se encontra
              </Paragraph>

              <InputSelect
                name="location_type"
                options={ConfigLabel.rebox.others.called.locationType}
                selectedDefault={called.location_type}
                placeholder="Selecione"
                tabIndex={9}
                disabled={disabledForEditing}
                isDisable={disabledForEditing}
              />
            </SectionsItem>

            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
              >
                Descrição
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Observação feita pelo cliente no momento da solicitação
              </Paragraph>

              <InputText
                name="description"
                placeholder="Descreva aqui"
                tabIndex={10}
                disabled={disabledForEditing}
                isDisable={disabledForEditing}
              />
            </SectionsItem>
          </SectionsGroup>

          <DividingLine />

          <SectionsGroup>
            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
              >
                Custo
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Valor a ser pago pelo cliente por este acionamento
              </Paragraph>

              <InputText
                name="budget_amount"
                placeholder="Apenas números"
                tabIndex={11}
                onChange={value => {
                  value.target.value = formatMoney.replaceFloatPatternsForMoney(
                    value.target.value,
                  );
                }}
                disabled={disabledForEditing}
                isDisable={disabledForEditing}
              />
            </SectionsItem>

            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
              >
                Situação do acionamento
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Define o status atual deste chamado
              </Paragraph>
              <InputSelect
                name="status"
                options={ConfigLabel.rebox.others.called.status}
                placeholder="Selecione"
                selectedDefault={called.status}
                tabIndex={12}
                disabled={disabledForEditing}
                isDisable={disabledForEditing}
                onChange={event => {
                  handleChangeFormByStatus(event.target.value);
                }}
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
                Atendimento iniciado em
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Data/hora que iniciamos o atendimento ao cliente
              </Paragraph>
              <InputMask
                name="call_initiation_date"
                mask="99/99/9999 99:99"
                placeholder="Informe a data e hora"
                tabIndex={13}
                disabled={disabledForEditing}
                isDisable={disabledForEditing}
              />
            </SectionsItem>

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
                  ConfigLabel.rebox.others.called.estimatedHoursForInitiation
                }
                placeholder="Selecione"
                selectedDefault={
                  called?.call_initiation_date
                    ? estimatedHoursForInitiation
                    : ''
                }
                tabIndex={14}
                disabled={disabledForEditing}
                isDisable={disabledForEditing}
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
                Serviço iniciado em
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Data/hora que prestador iniciou o serviço
              </Paragraph>
              <InputMask
                name="service_start_date"
                mask="99/99/9999 99:99"
                placeholder="Informe a data e hora"
                tabIndex={15}
                disabled={disabledForEditing}
                isDisable={disabledForEditing}
              />
            </SectionsItem>

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
                  ConfigLabel.rebox.others.called.estimatedHoursForServiceStart
                }
                placeholder="Selecione"
                selectedDefault={
                  called?.service_start_date
                    ? estimatedHoursForServiceStart
                    : ''
                }
                tabIndex={16}
                disabled={disabledForEditing}
                isDisable={disabledForEditing}
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
                Serviço finalizado em
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Data/hora que prestador terminou o serviço
              </Paragraph>
              <InputMask
                name="closing_date"
                mask="99/99/9999 99:99"
                placeholder="Informe a data e hora"
                tabIndex={17}
                disabled={disabledForEditing}
                isDisable={disabledForEditing}
              />
            </SectionsItem>
          </SectionsGroup>

          <DividingLine />

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
                  formCalledRef.current?.setData({ who_is_answering: '' });
                }}
                disabled={disabledForEditing}
                isDisable={disabledForEditing}
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
                      ConfigValues.rebox.default.outhers.called_edit.field_type
                        .user_cpf
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
                    disabled={disabledForEditing}
                    isDisable={disabledForEditing}
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
                    disabled={disabledForEditing}
                    isDisable={disabledForEditing}
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
                Escolher colaborador por
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Tipo de campo que deseja usar para buscar colaborador
              </Paragraph>
              <InputSelect
                name="field_type_motorist"
                placeholder="Selecione"
                tabIndex={20}
                options={ConfigLabel.rebox.validation.calledEdit.fieldType}
                selectedDefault={fieldTypeMotorist}
                onChange={event => {
                  setFieldTypeMotorist(event.target.value);
                  setAlertCheckMotorist(0);
                  formCalledRef.current?.setData({
                    who_is_performing_the_service: '',
                  });
                }}
                disabled={disabledForEditing}
                isDisable={disabledForEditing}
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
                    fieldTypeMotorist.toLowerCase()
                  ]
                } do colaborador`}
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Define o colaborador/motorista do prestador que fará o serviço
              </Paragraph>
              <SectionsItemGroup>
                {fieldTypeMotorist !==
                ConfigValues.rebox.default.outhers.called_edit.field_type
                  .user_email ? (
                  <InputMask
                    name="who_is_performing_the_service"
                    placeholder={`Informe o ${
                      ConfigTransition.rebox_called_field_type[
                        fieldTypeMotorist.toLowerCase()
                      ]
                    }`}
                    mask={
                      fieldTypeMotorist ===
                      ConfigValues.rebox.default.outhers.called_edit.field_type
                        .user_cpf
                        ? '999.999.999-99'
                        : '99.999.999/9999-99'
                    }
                    tabIndex={21}
                    onChange={event => {
                      const cpfCnpj = formatText.removeAllNonDigits(
                        event.target.value,
                      );
                      if (cpfCnpj.length === 11 || cpfCnpj.length === 14) {
                        handleCheckMotorist(cpfCnpj);
                      } else if (alertCheckMotorist !== 0) {
                        setAlertCheckMotorist(0);
                      }
                    }}
                    disabled={disabledForEditing}
                    isDisable={disabledForEditing}
                  />
                ) : (
                  <InputText
                    name="who_is_performing_the_service"
                    placeholder="Informe o e-mail"
                    tabIndex={21}
                    onChange={event => {
                      const email = event.target.value;
                      if (validatorEmail.check(email)) {
                        handleCheckMotorist(email);
                      } else if (alertCheckMotorist !== 2)
                        setAlertCheckMotorist(2);
                      else if (email === '') setAlertCheckMotorist(0);
                    }}
                    disabled={disabledForEditing}
                    isDisable={disabledForEditing}
                  />
                )}
                {alertCheckMotorist === 1 && (
                  <IoCheckmarkCircle
                    color={ConfigStyles.rebox.colors.greenEmerald.main}
                    size={20}
                  />
                )}
                {alertCheckMotorist === 2 && (
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
                disabled={disabledForEditing}
                isDisable={disabledForEditing}
              />
            </SectionsItem>
          </SectionsGroup>

          <ButtonMain
            type="submit"
            loading={loadingOpenCalled}
            style={{ marginTop: '4vh', maxWidth: 250 }}
            tabIndex={23}
            disabled={disabledForEditing}
            isDisable={disabledForEditing}
          >
            Salvar
          </ButtonMain>
        </Sections>
      </FormCalled>
    </Container>
  );
};

export default FormCalledEdit;
