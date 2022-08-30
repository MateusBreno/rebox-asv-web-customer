// ./src/components/modals/ModalUserPassword/index.tsx
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
import { apiRebox } from '@services/index';
import { getValidationErrors } from '@utils/errors';
import { toastify } from '@utils/notifiers';

// Importações internas
import { schema } from './schemaValidation';
import { IFormPassword } from './typing';

import { Container, ModalPassword, FormPassword, Divisor } from './styles';

interface IProps {
  userId: string;
  isOpen: boolean;
  change(): void;
}

const ModalUserPassword: React.FC<IProps> = ({ userId, isOpen, change }) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdatePassword = useCallback(async (data: IFormPassword) => {
    try {
      setLoading(prevState => !prevState);

      formRef.current?.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });
      const response = await apiRebox.put(`/users/${userId}/password`, {
        password: data.password,
      });

      const { header } = response.data;

      toastify(header.message, 'success');
      change();
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);

        const { password, confirm_password } = errors;

        if (password) toastify(password, 'error');
        if (confirm_password) toastify(confirm_password, 'error');
      } else if (error.response) toastify(error.response.data.error, 'error');
    } finally {
      setLoading(prevState => !prevState);
    }
  }, []);

  return (
    <Container>
      <ModalPassword
        isOpen={isOpen}
        onRequestClose={change}
        contentLabel="Password"
      >
        <SubtitleSecondary>Informe a nova senha</SubtitleSecondary>
        <Divisor spaceDownInVh={3} />
        <Paragraph nameColor="black" opacity={0.5}>
          A melhor senha, é a aquela fácil de memorizar e segura ao mesmo tempo.
        </Paragraph>
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
        <FormPassword ref={formRef} onSubmit={handleUpdatePassword}>
          <InputText
            name="password"
            placeholder="Nova senha"
            showIconPassword
          />
          <Divisor spaceDownInVh={1.5} />
          <InputText
            name="confirm_password"
            placeholder="Confirme a nova senha"
            showIconPassword
          />
          <Divisor spaceDownInVh={3} />
          <ButtonMain loading={loading}>Atualizar</ButtonMain>
        </FormPassword>
      </ModalPassword>
    </Container>
  );
};

export default ModalUserPassword;
