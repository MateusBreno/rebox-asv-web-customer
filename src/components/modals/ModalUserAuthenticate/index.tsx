// ./src/components/modals/ModalUserAuthenticate/index.tsx
import React, { useRef, useState, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { IoClose } from 'react-icons/io5';
import * as Yup from 'yup';

import {
  InputText,
  ButtonMain,
  SubtitleSecondary,
  Paragraph,
  ButtonDefault,
} from '@components/index';
import LinkMain from '@components/links/LinkMain';
import { ConfigValues } from '@config/index';
import User from '@models/User';
import {
  apiRebox,
  newContractStorageService,
  sessionStorageService,
} from '@services/index';
import { getValidationErrors } from '@utils/errors';
import { toastify } from '@utils/notifiers';

// Importações internas
import { schema } from './schemaValidation';
import { IOpenSession } from './typing';

import { Container, ModalSignIn, FormOpenSession, Divisor } from './styles';

interface IProps {
  isOpen: boolean;
  change(): void;
  forNewSale?: {
    advanceStep(): void;
  };
}

const ModalUserAuthenticate: React.FC<IProps> = ({
  // userId,
  isOpen,
  change,
  forNewSale,
}) => {
  const formOpenSessionRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOpenSessionSubmit = useCallback(async (data: IOpenSession) => {
    try {
      setLoading(prevState => !prevState);

      formOpenSessionRef.current?.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      const { data: response } = await apiRebox.post('/sessions', {
        email: data.email,
        password: data.password,
      });

      const { user, token, id } = response.data;

      // Autorizar a acessar apenas usuários do tipo client
      if (user.role !== ConfigValues.rebox.user.role.client) {
        toastify('Usuário sem autorização para acessar.', 'error');
        await apiRebox.put(`/sessions/${id}`);
        return;
      }

      // Autorizar apenas usuários ativos
      if (user.status !== ConfigValues.rebox.user.status.active) {
        if (user.status === ConfigValues.rebox.user.status.inactive)
          toastify(
            'Seu acesso está inativado, por favor contate nossa central.',
            'error',
          );

        if (user.status === ConfigValues.rebox.user.status.suspended)
          toastify(
            'Seu acesso foi suspendido, por favor contate nossa central.',
            'error',
          );

        if (user.status === ConfigValues.rebox.user.status.deleted)
          toastify(
            'Sua conta foi cancelada, por favor contate a nossa central.',
            'error',
          );

        await apiRebox.put(`/sessions/${id}`);
        return;
      }

      sessionStorageService.updateRemember();
      sessionStorageService.update({
        user,
        token,
        sessions_id: id,
      });

      // Caso o cliente esteja logando pelo checkout
      if (forNewSale) {
        const customer: User = user;
        newContractStorageService.updateCustomer({
          id: customer.id || '',
          field_type:
            ConfigValues.rebox.default.outhers.checkout.stepCustomer.field_type
              .signIn,
          query: customer.email,
        });
        forNewSale.advanceStep();
      }
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formOpenSessionRef.current?.setErrors(errors);

        const { email, password } = errors;

        if (email) toastify(email, 'error');
        if (password) toastify(password, 'error');
      } else if (error.response) toastify(error.response.data.error, 'error');
    } finally {
      setLoading(prevState => !prevState);
    }
  }, []);

  return (
    <Container>
      <ModalSignIn
        isOpen={isOpen}
        onRequestClose={change}
        contentLabel="Password"
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
        <SubtitleSecondary>Acessar sua conta</SubtitleSecondary>
        <Paragraph
          nameColor="black"
          opacity={0.7}
          style={{ marginBottom: '3vh' }}
        >
          Entre com o e-mail cadastrado e sua senha.
        </Paragraph>
        <FormOpenSession
          ref={formOpenSessionRef}
          onSubmit={handleOpenSessionSubmit}
        >
          <InputText name="email" placeholder="E-mail" />
          <InputText name="password" showIconPassword placeholder="Senha" />
          <ButtonMain loading={loading}>
            {forNewSale ? 'Continuar' : 'Entrar'}
          </ButtonMain>
        </FormOpenSession>
        <Paragraph
          nameColor="black"
          opacity={0.7}
          style={{ margin: '3vh 0 1vh' }}
        >
          Precisa recuperar sua senha?
        </Paragraph>
        <LinkMain route="/esqueci-minha-senha" justifyContent="center">
          Esqueci minha senha
        </LinkMain>
      </ModalSignIn>
    </Container>
  );
};

export default ModalUserAuthenticate;
