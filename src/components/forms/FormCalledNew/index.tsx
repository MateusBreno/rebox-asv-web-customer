// ./src/components/forms/FormCalledNew/index.tsx
import React, { useCallback, useRef, useState, useEffect } from 'react';

import { FormHandles } from '@unform/core';
import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
import PlacesAutocomplete from 'react-places-autocomplete';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import {
  SubtitleSecondary,
  Paragraph,
  InputText,
  InputMask,
  ButtonDefault,
  InputSelect,
  ButtonMain,
} from '@components/index';
import {
  ConfigAuth,
  ConfigLabel,
  ConfigRoutes,
  ConfigRules,
  ConfigStyles,
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
import { formatDate, formatText } from '@utils/formatters';
import { generateDate } from '@utils/generators';
import { toastify } from '@utils/notifiers';

// Importação interna
import { validatorDate } from '@utils/validators';

import { schema } from './schemaValidation';
import { ISelect, IGeocoderAddressComponent, IFormCalled } from './typing';

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
  ButtonGroup,
} from './styles';

const FormCalledNew: React.FC = () => {
  const { push } = useHistory();
  const formCalledRef = useRef<FormHandles>(null);
  const [vehicleLicensePlate, setVehicleLicensePlate] = useState<string>();
  const [alertCheckVehicle, setAlertCheckVehicle] = useState<number>(1);
  const [loadingCheckVehicle, setLoadingCheckVehicle] = useState<boolean>(
    false,
  );
  const [loadingOpenCalled, setLoadingOpenCalled] = useState<boolean>(false);
  const [user, setUser] = useState<User | any>(sessionStorageService.getUser());
  const [contract, setContract] = useState<Contract>();
  const [services, setServices] = useState<ISelect[]>([]);
  const [
    calledAddressesOrigin,
    setCalledAddressesOrigin,
  ] = useState<CalledAddresses>();
  const [
    calledAddressesDestination,
    setCalledAddressesDestination,
  ] = useState<CalledAddresses>();

  // Google Places e Autocomplete
  const [googleSourceAddress, setGoogleSourceAddress] = useState<string>('');
  const [
    googleDestinationAddress,
    setGoogleDestinationAddress,
  ] = useState<string>('');

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

  const handleCheckVehicle = async () => {
    try {
      setLoadingCheckVehicle(prevState => !prevState);

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
      setLoadingCheckVehicle(prevState => !prevState);
    }
  };

  const handleOpenCalled = async (data: IFormCalled) => {
    try {
      setLoadingOpenCalled(prevState => !prevState);

      formCalledRef.current?.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      // Validar data de agendamento
      let appointment_date = '';
      let appointment_date_compare = data.appointment_date.split('_').join('');
      appointment_date_compare = appointment_date_compare.split(':').join('');
      appointment_date_compare = appointment_date_compare.split('/').join('');
      appointment_date_compare = appointment_date_compare.split(' ').join('');
      if (appointment_date_compare) {
        if (appointment_date_compare.length < 12) {
          toastify(
            'Por favor, informe uma data/hora válida para o agendamento.',
            'error',
          );
          throw new Error('');
        }

        const current_date = generateDate.now();
        const [onlyDate, onlyHour] = data.appointment_date.split(' ');
        const appointment_date_check = `${formatDate.removeMask(
          onlyDate,
        )} ${onlyHour}`;

        if (validatorDate.hasPassed(current_date, appointment_date_check)) {
          toastify(
            'Data/hora informada para o agendamento já passou. Por favor, tente novamente.',
            'error',
          );
          throw new Error('');
        }

        appointment_date = appointment_date_check;
      }

      const { data: responseCalledAddressOrigin } = await apiRebox.post(
        `/called/addresses`,
        calledAddressesOrigin,
      );

      const { data: responseCalledAddressDestination } = await apiRebox.post(
        `/called/addresses`,
        calledAddressesDestination,
      );

      let vehicles_id = '';
      if (contract?.contracts_vehicles) {
        const [contractVehicle] = contract?.contracts_vehicles.filter(
          item =>
            item.vehicle.license_plate.toLowerCase() ===
            data.license_plate.toLowerCase(),
        );
        vehicles_id = contractVehicle.vehicle.id;
      }

      const { data: responseCalled } = await apiRebox.post(`/called`, {
        status: ConfigValues.rebox.called.status.open,
        type: ConfigValues.rebox.called.type.contract,
        contracts_id: contract?.id,
        services_id: data.services_id,
        users_id: user?.id,
        who_is_requesting_id: user?.id,
        vehicles_id,
        location_type: data.location_type,
        vehicle_situation: data.vehicle_situation,
        distance_between_points_in_km: 0,
        appointment_date,
        source_address_id: responseCalledAddressOrigin.data.id,
        destination_address_id: responseCalledAddressDestination.data.id,
        description: data.description || null,
        technical_report: null,
        budget_amount: 0,
        who_is_answering_id: null,
        who_is_performing_the_service_id: null,
      });
      formCalledRef.current?.reset();
      toastify(
        responseCalled.header.message || 'Novo chamado aberto com sucesso!',
        'success',
      );
      push(
        `${ConfigRoutes.rebox.privates.called.path}/${responseCalled.data.id}`,
      );
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        formCalledRef.current?.setErrors(errors);

        const {
          license_plate,
          services_id,
          vehicle_situation,
          source_address,
          destination_address,
          location_type,
        } = errors;

        if (license_plate) toastify(license_plate, 'error');
        if (services_id) toastify(services_id, 'error');
        if (location_type) toastify(location_type, 'error');
        if (vehicle_situation) toastify(vehicle_situation, 'error');
        if (source_address) toastify(source_address, 'error');
        if (destination_address) toastify(destination_address, 'error');
      } else if (error.response) {
        toastify(
          error.response.data.error ||
            'Sinto muito, houve um problema ao tentar acionar o serviço.',
          'error',
        );
      }
    } finally {
      setLoadingOpenCalled(prevState => !prevState);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <Container>
      <FormCalled
        ref={formCalledRef}
        onSubmit={handleOpenCalled}
        initialData={{
          source_address: googleSourceAddress,
          destination_address: googleDestinationAddress,
        }}
      >
        <Sections>
          <SectionsItem>
            <SubtitleSecondary textAlign="start" fontSize={16}>
              Informe a placa do seu veículo?
            </SubtitleSecondary>
            <Paragraph nameColor="black" textAlign="start" opacity={0.6}>
              Digite a placa e cheque se o veículo pode acionar um serviço
            </Paragraph>
            <SectionsItemGroup>
              <InputMask
                name="license_plate"
                mask="aaa-9*99"
                placeholder="Placa do veículo"
                style={{ textTransform: 'uppercase' }}
                onChange={event => {
                  if (!event.target.value.includes('_')) {
                    setVehicleLicensePlate(event.target.value);
                  } else {
                    setVehicleLicensePlate('');
                    setAlertCheckVehicle(0);
                  }
                }}
                tabIndex={1}
                autoFocus
              />
              <ButtonGroup>
                <ButtonDefault
                  className="btn-to-check"
                  type="button"
                  loading={loadingCheckVehicle}
                  isDisable={!vehicleLicensePlate}
                  disabled={!vehicleLicensePlate}
                  onClick={handleCheckVehicle}
                  tabIndex={2}
                >
                  Checar
                </ButtonDefault>
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
              </ButtonGroup>
            </SectionsItemGroup>
          </SectionsItem>

          {alertCheckVehicle === 1 && (
            <>
              <DividingLine />
              <SectionsGroup>
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
                    tabIndex={3}
                  />
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
                    placeholder="Selecione"
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
                          tabIndex={5}
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
                              ConfigValues.rebox.called_addresses.type
                                .destination,
                            )
                          }
                          tabIndex={6}
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
                    placeholder="Selecione"
                    tabIndex={7}
                  />
                </SectionsItem>

                <SectionsItem>
                  <SubtitleSecondary
                    textAlign="start"
                    nameColor="black"
                    fontSize={14}
                  >
                    Agendar chamado? (Opcional)
                  </SubtitleSecondary>
                  <Paragraph
                    nameColor="black"
                    textAlign="start"
                    opacity={0.5}
                    fontSize={13}
                    style={{ marginBottom: '2vh' }}
                  >
                    Informar a data e hora apenas se for um agendamento
                  </Paragraph>

                  <InputMask
                    name="appointment_date"
                    mask="99/99/9999 99:99"
                    placeholder="Informe a data e hora"
                    tabIndex={8}
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
                    Observação (Opcional)
                  </SubtitleSecondary>
                  <Paragraph
                    nameColor="black"
                    textAlign="start"
                    opacity={0.5}
                    fontSize={13}
                    style={{ marginBottom: '2vh' }}
                  >
                    Se desejar acrescentar algo importante
                  </Paragraph>

                  <InputText
                    name="description"
                    placeholder="Descreva aqui"
                    tabIndex={9}
                  />
                </SectionsItem>
              </SectionsGroup>

              <ButtonMain
                type="submit"
                loading={loadingOpenCalled}
                style={{ marginTop: '4vh', maxWidth: 250 }}
                tabIndex={10}
              >
                Acionar
              </ButtonMain>
            </>
          )}
        </Sections>
      </FormCalled>
    </Container>
  );
};

export default FormCalledNew;
