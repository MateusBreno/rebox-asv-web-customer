// ./src/components/cards/CardLogIn/index.tsx
import React, { useRef, useState, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { ImageLogotipo } from '@assets/images';
import {
  ButtonMain,
  TitleSecondary,
  InputText,
  LinkMain,
} from '@components/index';
import { ConfigRoutes, ConfigValues } from '@config/index';
import { apiRebox, sessionStorageService } from '@services/index';
import { getValidationErrors } from '@utils/errors';
import { toastify } from '@utils/notifiers';

// Importações internas
import { schema } from './schemaValidation';
import { IOpenSession } from './typing';

import { Container, Divisor, FormOpenSession } from './styles';

const CardLogIn: React.FC = () => {
  const { push } = useHistory();
  const formOpenSessionRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOpenSessionSubmit = useCallback(async (data: IOpenSession) => {
    data.email = data.email.trim();
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

      push(ConfigRoutes.rebox.defaults.mainRedirect);
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
      <ImageLogotipo width={310} height={50} />
      <Divisor spaceDownInVh={6} />
      <TitleSecondary nameColor="blue">Acesse sua conta</TitleSecondary>
      <Divisor spaceDownInVh={6} />
      <FormOpenSession
        ref={formOpenSessionRef}
        onSubmit={handleOpenSessionSubmit}
      >
        <InputText name="email" placeholder="E-mail" />
        <InputText name="password" showIconPassword placeholder="Senha" />
        <LinkMain route="/esqueci-minha-senha" justifyContent="flex-end">
          Esqueci minha senha
        </LinkMain>
        <ButtonMain loading={loading}>Entrar</ButtonMain>
      </FormOpenSession>
    </Container>
  );
};

export default CardLogIn;
