// ./src/components/forms/FormProfileUser/index.tsx
import React, { ChangeEvent, useRef, useState, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { IoCamera } from 'react-icons/io5';
import * as Yup from 'yup';

import {
  InputText,
  InputMask,
  InputSelect,
  ButtonMain,
  Paragraph,
  SubtitleSecondary,
} from '@components/index';
import {
  ConfigLabel,
  ConfigRules,
  ConfigStyles,
  ConfigValues,
} from '@config/index';
import User from '@models/User';
import { apiRebox, sessionStorageService } from '@services/index';
import { getValidationErrors } from '@utils/errors';
import {
  formatCellphone,
  formatCNPJ,
  formatCPF,
  formatDate,
  formatText,
} from '@utils/formatters';
import { toastify } from '@utils/notifiers';

// Importações internas
import { schema } from './schemaValidation';
import { IFormUser } from './typing';

import {
  Container,
  Avatar,
  AvatarProfile,
  AvatarProfileGroup,
  AvatarProfileImage,
  AvatarProfileLabel,
  AvatarProfileAttachment,
  AvatarInputAttachment,
  FormUser,
  DividingLine,
  Sections,
  SectionsGroup,
  SectionsItem,
  SectionsItemGroup,
} from './styles';

const FormProfileUser: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [user, setUser] = useState<User | null>(
    sessionStorageService.getUser(),
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [personType, setPersonType] = useState<string>(
    user?.cnpj
      ? ConfigValues.rebox.user.person_type.legal_person
      : ConfigValues.rebox.user.person_type.physical_person,
  );

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      // Ver a imagem que foi selecionada
      if (e.target.files) {
        const userData = new FormData();

        // O name do campo input, e pegar o valor da imagem selecionada.
        userData.append('attachment_profile', e.target.files[0]);

        try {
          const { data: responseAvatar } = await apiRebox.post(
            `/users/${user?.id}/upload/avatar`,
            userData,
          );

          sessionStorageService.update({
            sessions_id: sessionStorageService.getId() || '',
            token: sessionStorageService.getToken() || '',
            user: responseAvatar.data,
          });

          toastify(responseAvatar.header.message, 'success');
        } catch (error: any) {
          toastify(error.response.data.error, 'error');
        }
      }
    },
    [],
  );

  const handleUpdateUser = useCallback(
    async (data: IFormUser) => {
      try {
        setLoading(prevState => !prevState);
        formRef.current?.setErrors({});

        await schema.validate(data, {
          abortEarly: false,
        });

        const { data: responseUpdateUser } = await apiRebox.put(
          `/users/${user?.id}`,
          {
            name: data.name.toLowerCase(),
            date_of_birth: data.date_of_birth
              ? formatDate.removeMask(data.date_of_birth)
              : null,
            person_type: data.person_type,
            cpf:
              data.person_type ===
              ConfigValues.rebox.user.person_type.physical_person
                ? formatCPF.removeMask(data.cpf_cnpj)
                : null,
            cnpj:
              data.person_type ===
              ConfigValues.rebox.user.person_type.legal_person
                ? formatCNPJ.removeMask(data.cpf_cnpj)
                : null,
            sex: data.sex ? data.sex : null,
            email: data.email.toLowerCase(),
            cellphone: formatCellphone.removeMask(data.cellphone),
            telephone: data.telephone
              ? formatText.removeAllNonDigits(data.telephone)
              : null,
            status: data.status,
            role: user?.role,
            company_size: data.company_size ? data.company_size : null,
            access_level: user?.access_level,
            subordinate_of: user?.subordinate_of || null,
            id_who_indicated: null,
            is_partner: user?.is_partner,
            accept_terms_of_use: user?.accept_terms_of_use,
            gateway_customers_id: user?.gateway_customers_id,
          },
        );

        const { header, data: userUpdated } = responseUpdateUser;

        setUser(userUpdated);
        sessionStorageService.update({
          user: userUpdated,
          sessions_id: sessionStorageService.getId() || '',
          token: sessionStorageService.getToken() || '',
        });

        toastify(header.message, 'success');
      } catch (error: any) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          const {
            name,
            date_of_birth,
            person_type,
            cpf_cnpj,
            sex,
            email,
            cellphone,
            telephone,
            status,
            company_size,
          } = errors;

          if (name) toastify(name, 'error');
          if (date_of_birth) toastify(date_of_birth, 'error');
          if (person_type) toastify(person_type, 'error');
          if (cpf_cnpj) toastify(cpf_cnpj, 'error');
          if (sex) toastify(sex, 'error');
          if (email) toastify(email, 'error');
          if (cellphone) toastify(cellphone, 'error');
          if (telephone) toastify(telephone, 'error');
          if (status) toastify(status, 'error');
          if (company_size) toastify(company_size, 'error');
        } else if (error.response) {
          toastify(error.response.data.error, 'error');
        } else {
          toastify(
            'Houve um error ao tentar atualizar os dados deste cliente.',
            'error',
          );
        }
      } finally {
        setLoading(prevState => !prevState);
      }
    },
    [user],
  );

  return (
    <Container>
      <Avatar>
        <AvatarProfile>
          {user?.image_url ? (
            <AvatarProfileGroup>
              <AvatarProfileImage src={user?.image_url} />
              <AvatarProfileLabel htmlFor="avatar">
                <IoCamera size={24} />
                <AvatarInputAttachment
                  type="file"
                  name="attachment_profile"
                  id="avatar"
                  onChange={handleAvatarChange}
                />
              </AvatarProfileLabel>
            </AvatarProfileGroup>
          ) : (
            <AvatarProfileAttachment htmlFor="avatar">
              <IoCamera size={30} opacity={0.3} />
              <Paragraph nameColor="black" fontSize={10} opacity={0.7}>
                Clique aqui para alterar
              </Paragraph>
              <AvatarInputAttachment
                type="file"
                name="attachment_profile"
                id="avatar"
                onChange={handleAvatarChange}
              />
            </AvatarProfileAttachment>
          )}
        </AvatarProfile>
      </Avatar>
      <FormUser
        ref={formRef}
        onSubmit={handleUpdateUser}
        initialData={{
          ...user,
          name: user?.name ? user.name.toUpperCase() : '',
          date_of_birth: user?.date_of_birth
            ? formatDate.addMask(user.date_of_birth)
            : '',
          cpf_cnpj: user?.cpf || user?.cnpj,
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
                {personType ===
                ConfigValues.rebox.user.person_type.physical_person
                  ? 'Nome completo'
                  : 'Razão social / Nome Fantasia'}
              </SubtitleSecondary>
              <InputText
                name="name"
                placeholder="Informe o nome"
                tabIndex={1}
                autoFocus
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
                {personType ===
                ConfigValues.rebox.user.person_type.physical_person
                  ? 'Data de nascimento'
                  : 'Iniciou a empresa em'}
              </SubtitleSecondary>
              <InputMask
                name="date_of_birth"
                mask={'99/99/9999'}
                placeholder="Informe a data"
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
                style={{ marginBottom: '2vh' }}
              >
                Tipo de pessoa
              </SubtitleSecondary>
              <InputSelect
                name="person_type"
                options={ConfigLabel.rebox.others.user.person_type}
                placeholder="Selecione"
                selectedDefault={personType}
                tabIndex={3}
                onChange={event => setPersonType(event.target.value)}
              />
            </SectionsItem>
            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
                style={{ marginBottom: '2vh' }}
              >
                {personType ===
                ConfigValues.rebox.user.person_type.physical_person
                  ? 'CPF'
                  : 'CNPJ'}
              </SubtitleSecondary>
              <InputMask
                name="cpf_cnpj"
                mask={
                  personType ===
                  ConfigValues.rebox.user.person_type.physical_person
                    ? '999.999.999-99'
                    : '99.999.999/9999-99'
                }
                placeholder="Número do documento"
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
                Sexo
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Define o sexo de nascimento do cliente
              </Paragraph>
              <InputSelect
                name="sex"
                options={ConfigLabel.rebox.others.user.sex}
                placeholder="Selecione"
                selectedDefault={user?.sex}
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
              >
                E-mail
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Informe o endereço eletrônico de contato do cliente
              </Paragraph>
              <InputText
                name="email"
                placeholder="Informe o e-mail"
                tabIndex={6}
              />
            </SectionsItem>

            <SectionsItem>
              <SubtitleSecondary
                textAlign="start"
                nameColor="black"
                fontSize={14}
              >
                Celular/Whatsapp
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Informe o celular e/ou whatsapp para contato
              </Paragraph>
              <InputMask
                name="cellphone"
                mask={'+55 (99) 99999-9999'}
                placeholder="Informe o celular"
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
              >
                Telefone
              </SubtitleSecondary>
              <Paragraph
                nameColor="black"
                textAlign="start"
                opacity={0.5}
                fontSize={13}
                style={{ marginBottom: '2vh' }}
              >
                Pode ser telefone residencial, comercial, coorporativo etc.
              </Paragraph>
              <InputMask
                name="telephone"
                mask={'(99) 9999-9999'}
                placeholder="Informe o telefone"
                tabIndex={8}
              />
            </SectionsItem>
          </SectionsGroup>

          {personType === ConfigValues.rebox.user.person_type.legal_person && (
            <>
              <DividingLine />
              <SectionsGroup>
                <SectionsItem>
                  <SubtitleSecondary
                    textAlign="start"
                    nameColor="black"
                    fontSize={14}
                  >
                    Tamanho da empresa
                  </SubtitleSecondary>
                  <Paragraph
                    nameColor="black"
                    textAlign="start"
                    opacity={0.5}
                    fontSize={13}
                    style={{ marginBottom: '2vh' }}
                  >
                    Define o tamanho da companhia pelo número de colaboradores
                  </Paragraph>
                  <InputSelect
                    name="company_size"
                    options={ConfigLabel.rebox.others.user.company_size}
                    placeholder="Selecione"
                    selectedDefault={
                      user?.company_size
                        ? user.company_size
                        : ConfigValues.rebox.user.company_size.undefined
                    }
                    tabIndex={9}
                    disabled={
                      personType ===
                      ConfigValues.rebox.user.person_type.physical_person
                    }
                    isDisable={
                      personType ===
                      ConfigValues.rebox.user.person_type.physical_person
                    }
                  />
                </SectionsItem>
              </SectionsGroup>
            </>
          )}

          <ButtonMain
            type="submit"
            loading={loading}
            style={{ marginTop: '4vh', maxWidth: 250 }}
            tabIndex={10}
          >
            Salvar
          </ButtonMain>
        </Sections>
      </FormUser>
    </Container>
  );
};

export default FormProfileUser;
