// ./src/components/forms/FormProfileAddress/index.tsx
import React, { useRef, useState, useCallback, useEffect } from 'react';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import {
  InputText,
  InputMask,
  ButtonMain,
  Paragraph,
  SubtitleSecondary,
} from '@components/index';
import { ConfigBase } from '@config/index';
import Address from '@models/Address';
import User from '@models/User';
import {
  apiViaCep,
  apiRebox,
  sessionStorageService,
  addressStorageService,
} from '@services/index';
import { getValidationErrors } from '@utils/errors';
import { formatText } from '@utils/formatters';
import { toastify } from '@utils/notifiers';

// Importações internas
import { schema } from './schemaValidation';
import { IFormAddress } from './typing';

import {
  Container,
  FormAddress,
  Sections,
  SectionsGroup,
  SectionsItem,
  SectionsItemGroup,
  LinkSearchCep,
} from './styles';

const FormProfileAddress: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [user, setUser] = useState<User | null>(
    sessionStorageService.getUser(),
  );
  const [address, setAddress] = useState<Address>(
    addressStorageService.get() || ({} as Address),
  );
  const [formIsEnabled, setFormIsEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getAddress = useCallback(async () => {
    try {
      let url = `/users/address?page=1&per_page=1`;
      url += `&users_id=${user?.id}`;
      const { data: response } = await apiRebox.get(url);
      const [firstAddress] = response.data;
      formRef.current?.setData({
        zip_code: firstAddress.zip_code,
      });
      setAddress(firstAddress);
      addressStorageService.update(firstAddress);
    } catch (error: any) {
      if (error.response) {
        const { error: message } = error.response.data;
        toastify(
          message || 'Houve um problema ao buscar seu endereço.',
          'error',
        );
      }
    }
  }, []);

  const handleGetAddressByZipcode = useCallback(async (cepText: string) => {
    try {
      if (cepText.length !== 8) {
        return;
      }
      const { data: responseViaCep } = await apiViaCep.get(`/${cepText}/json/`);

      if (responseViaCep.logradouro) {
        const currentData = formRef.current?.getData();

        formRef.current?.setData({
          ...currentData,
          state: responseViaCep.uf,
          city: responseViaCep.localidade,
          neighborhood: responseViaCep.bairro,
          street: responseViaCep.logradouro,
        });
      }
    } catch (error) {
      setFormIsEnabled(true);
      toastify(
        'Não foi possível buscar seu endereço pelo cep. Por favor tente novamente.',
        'error',
      );
    }
  }, []);

  const handleSubmitAddress = useCallback(
    async (data: IFormAddress) => {
      try {
        setLoading(prevState => !prevState);

        formRef.current?.setErrors({});

        await schema.validate(data, {
          abortEarly: false,
        });

        const body_adress: Address = {
          users_id:
            address && address.users_id ? address.users_id : user?.id || '',
          country: 'BR',
          state: data.state,
          city: data.city,
          neighborhood: data.neighborhood,
          zip_code: data.zip_code,
          street: data.street,
          number: Number.parseInt(`${data.number}`, 10),
          complement: data.complement || '',
        };

        if (!address || !address.id) {
          const { data: responseCreateAddress } = await apiRebox.post(
            '/users/address',
            body_adress,
          );
          const { header, data: addressUserCreated } = responseCreateAddress;
          setAddress(addressUserCreated);
          toastify(
            header.message || 'Seu endereço foi registrado com sucesso!',
            'success',
          );
        } else {
          const { data: responseUpdateAddress } = await apiRebox.put(
            `/users/address/${address.id}`,
            body_adress,
          );
          const { header, data: addressUserUpdated } = responseUpdateAddress;
          setAddress(addressUserUpdated);
          toastify(
            header.message || 'Seu endereço foi atualizado com sucesso!',
            'success',
          );
        }

        addressStorageService.update(body_adress);
      } catch (error: any) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          const {
            zip_code,
            state,
            city,
            neighborhood,
            street,
            number,
          } = errors;

          if (zip_code) toastify(zip_code, 'error');
          if (state) toastify(state, 'error');
          if (city) toastify(city, 'error');
          if (neighborhood) toastify(neighborhood, 'error');
          if (street) toastify(street, 'error');
          if (number) toastify(number, 'error');
        } else if (error.response) {
          toastify(error.response.data.error, 'error');
        }
      } finally {
        setLoading(prevState => !prevState);
      }
    },
    [user, address],
  );

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <Container>
      <FormAddress
        ref={formRef}
        onSubmit={handleSubmitAddress}
        initialData={{
          zip_code: address?.zip_code || '',
          state: address?.state ? address.state.toUpperCase() : '',
          city: address?.city ? address.city.toUpperCase() : '',
          neighborhood: address?.neighborhood
            ? address.neighborhood.toUpperCase()
            : '',
          street: address?.street ? address.street.toUpperCase() : '',
          number: address?.number || '',
          complement: address?.complement
            ? formatText.capitalizedFirstLetter(address.complement)
            : '',
        }}
      >
        <Sections>
          <SectionsGroup>
            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
                style={{ marginBottom: '2vh' }}
              >
                CEP
              </SubtitleSecondary>
              <InputMask
                name="zip_code"
                placeholder="Informe o CEP"
                mask="99999-999"
                tabIndex={1}
                autoFocus
                onChange={event => {
                  const cep = event.target.value;
                  handleGetAddressByZipcode(formatText.removeAllNonDigits(cep));
                }}
              />
              <LinkSearchCep
                to={{
                  pathname: ConfigBase.correio.baseUrls.buscaCepInter,
                }}
                key="config"
                target="_blank"
                tabIndex={2}
              >
                Não sei o cep
              </LinkSearchCep>
            </SectionsItem>
            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
                style={{ marginBottom: '2vh' }}
              >
                UF
              </SubtitleSecondary>
              <InputText
                name="state"
                placeholder="Informe o estado"
                readOnly={!formIsEnabled}
                required
                tabIndex={3}
                onChange={event => {
                  event.target.value = event.target.value.toUpperCase();
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
                style={{ marginBottom: '2vh' }}
              >
                Cidade
              </SubtitleSecondary>
              <InputText
                name="city"
                placeholder="Informe a cidade"
                readOnly={!formIsEnabled}
                required
                tabIndex={4}
                onChange={event => {
                  event.target.value = event.target.value.toUpperCase();
                }}
              />
            </SectionsItem>
            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
                style={{ marginBottom: '2vh' }}
              >
                Bairro
              </SubtitleSecondary>
              <InputText
                name="neighborhood"
                placeholder="Informe o bairro"
                readOnly={!formIsEnabled}
                required
                tabIndex={5}
                onChange={event => {
                  event.target.value = event.target.value.toUpperCase();
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
                style={{ marginBottom: '2vh' }}
              >
                Rua
              </SubtitleSecondary>
              <InputText
                name="street"
                placeholder="Informe a rua"
                readOnly={!formIsEnabled}
                required
                tabIndex={6}
                onChange={event => {
                  event.target.value = event.target.value.toUpperCase();
                }}
              />
            </SectionsItem>
            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
                style={{ marginBottom: '2vh' }}
              >
                Número
              </SubtitleSecondary>
              <InputText
                name="number"
                placeholder="Número"
                required
                tabIndex={7}
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
                Complemento
              </SubtitleSecondary>
              <InputText
                name="complement"
                placeholder="Complemento"
                tabIndex={8}
                onChange={event => {
                  event.target.value = formatText.capitalizedFirstLetter(
                    event.target.value,
                  );
                }}
              />
            </SectionsItem>
          </SectionsGroup>
        </Sections>

        <ButtonMain
          type="submit"
          loading={loading}
          style={{ marginTop: '4vh', maxWidth: 250 }}
          tabIndex={9}
        >
          Salvar
        </ButtonMain>
      </FormAddress>
    </Container>
  );
};

export default FormProfileAddress;
