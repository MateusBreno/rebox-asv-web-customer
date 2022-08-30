// ./src/components/cards/CardRecoverPassword/index.tsx
import React, { useCallback, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { ImageLogotipo } from '@assets/images';
import {
  ButtonMain,
  InputText,
  LinkMain,
  Paragraph,
  SubtitleSecondary,
} from '@components/index';
import { ConfigRoutes } from '@config/index';
import { apiRebox, recoverPasswordStorageService } from '@services/index';
import { getValidationErrors } from '@utils/errors';
import { toastify } from '@utils/notifiers';

// Importações internas
import { schemaEmail, schemaCode, schemaPassword } from './schemaValidation';
import { IFormEmail, IFormCode, IFormPassword } from './typing';

import { Container, FormForgetPassword, Divisor } from './styles';

const CardRecoverPassword: React.FC = () => {
  const { push } = useHistory();
  const formEmailRef = useRef<FormHandles>(null);
  const formCodeRef = useRef<FormHandles>(null);
  const formPasswordRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [referralAttempts, setReferralAttempts] = useState<number>(0);
  const [numberOfCodeErrors, setNumberOfCodeErrors] = useState<number>(0);

  const handleSubmitEmail = useCallback(async (data: IFormEmail) => {
    try {
      setLoading(prevState => !prevState);

      formEmailRef.current?.setErrors({});

      await schemaEmail.validate(data, {
        abortEarly: false,
      });

      const { data: responseRecoverPassword } = await apiRebox.post(
        `/users/recover-password`,
        {
          email: data.email,
        },
      );

      toastify(
        'Um código de validação foi enviado para o e-mail cadastrado.',
        'success',
      );

      recoverPasswordStorageService.update(responseRecoverPassword.data);
      recoverPasswordStorageService.setFoundUserEmail(data.email);

      setStep(2);
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        formEmailRef.current?.setErrors(errors);

        const { email } = errors;

        if (email) toastify(email, 'error');
      } else if (error.response) {
        toastify(error.response.data.error, 'error');
      } else {
        console.error(
          'Erro ao tentar enviar e-mail para validar recuperação de senha:',
          error,
        );
      }
    } finally {
      setLoading(prevState => !prevState);
    }
  }, []);

  const handleSubmitCode = useCallback(async (data: IFormCode) => {
    try {
      if (numberOfCodeErrors < 4) {
        setLoading(prevState => !prevState);

        formCodeRef.current?.setErrors({});

        await schemaCode.validate(data, {
          abortEarly: false,
        });

        const recoverPassword = recoverPasswordStorageService.get();

        if (recoverPassword) {
          await apiRebox.post(`/users/recover-password/${recoverPassword.id}`, {
            code: data.code,
          });

          setStep(3);
        } else {
          toastify(
            'Houve um problema ao tentar validar o código. Se persistir, contate nossa equipe.',
            'error',
          );
        }
      } else {
        toastify(
          'O número de tentativas se esgotou, por favor entre em contato com a nossa central.',
          'info',
        );
      }
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        formCodeRef.current?.setErrors(errors);

        const { code } = errors;

        if (code) toastify(code, 'error');
      } else if (error.response) {
        toastify(error.response.data.error, 'error');
        setNumberOfCodeErrors(numberOfCodeErrors + 1);
      }
    } finally {
      setLoading(prevState => !prevState);
    }
  }, []);

  const handleSubmitPassword = useCallback(async (data: IFormPassword) => {
    try {
      setLoading(prevState => !prevState);

      formPasswordRef.current?.setErrors({});

      await schemaPassword.validate(data, {
        abortEarly: false,
      });

      const recoverPassword = recoverPasswordStorageService.get();

      if (recoverPassword) {
        const { data: responseRecoverPassword } = await apiRebox.put(
          `/users/${recoverPassword.users_id}/password`,
          {
            password: data.password,
          },
        );
        const { header } = responseRecoverPassword;
        toastify(header.message, 'success');

        recoverPasswordStorageService.clean();

        setTimeout(() => push(ConfigRoutes.rebox.defaults.returnBase), 3000);
      } else {
        toastify(
          'Houve um problema ao tentar atualizar a senha. Se persistir, contate nossa equipe.',
          'error',
        );
      }
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formPasswordRef.current?.setErrors(errors);

        const { password, confirm_password } = errors;

        if (password) toastify(password, 'error');
        if (confirm_password) toastify(confirm_password, 'error');
      } else if (error.response) toastify(error.response.data.error, 'error');
    } finally {
      setLoading(prevState => !prevState);
    }
  }, []);

  const resendCode = async () => {
    try {
      if (referralAttempts < 4) {
        const users_email = recoverPasswordStorageService.getFoundUserEmail();
        await apiRebox.post(`/users/recover-password`, {
          email: users_email,
        });
        setReferralAttempts(referralAttempts + 1);
      } else {
        toastify(
          'O número de tentativas se esgotou, por favor entre em contato com a nossa central.',
          'info',
        );
      }
    } catch (error) {
      toastify(
        'Houve um erro ao reenviar o código de validação, por favor tente novamente mais tarde.',
        'error',
      );
    }
  };

  return (
    <Container>
      <ImageLogotipo width={310} height={50} />

      {step === 1 && (
        <>
          <Divisor spaceDownInVh={3} />
          <SubtitleSecondary>Recuperar senha</SubtitleSecondary>
          <Divisor spaceDownInVh={2} />
          <Paragraph nameColor="gray" opacity={0.4}>
            Digite abaixo o e-mail cadastrado
          </Paragraph>
          <Divisor spaceDownInVh={4} />
          <FormForgetPassword ref={formEmailRef} onSubmit={handleSubmitEmail}>
            <InputText
              name="email"
              placeholder="E-mail cadastrado"
              type="email"
            />
            <Divisor spaceDownInVh={2} />
            <ButtonMain loading={loading}>Continuar</ButtonMain>
            <Divisor spaceDownInVh={4} />
            <Paragraph nameColor="gray">Lembrei minha senha</Paragraph>
            <Divisor spaceDownInVh={2} />
            <LinkMain route="/login">Acessar minha conta</LinkMain>
          </FormForgetPassword>
        </>
      )}

      {step === 2 && (
        <>
          <Divisor spaceDownInVh={3} />
          <SubtitleSecondary>Código de validação</SubtitleSecondary>
          <Divisor spaceDownInVh={2} />
          <Paragraph nameColor="gray" opacity={0.4}>
            Digite abaixo o código recebido no e-mail
          </Paragraph>
          <Divisor spaceDownInVh={4} />
          <FormForgetPassword ref={formCodeRef} onSubmit={handleSubmitCode}>
            <InputText name="code" placeholder="Código recebido" />
            <Divisor spaceDownInVh={2.5} />
            <button className="resend" onClick={resendCode}>
              Não recebi o código
            </button>
            <Divisor spaceDownInVh={3.5} />
            <ButtonMain loading={loading}>Continuar</ButtonMain>
            <Divisor spaceDownInVh={4} />
            <Paragraph nameColor="gray">Lembrei minha senha</Paragraph>
            <Divisor spaceDownInVh={2} />
            <LinkMain route="/login">Acessar minha conta</LinkMain>
          </FormForgetPassword>
        </>
      )}

      {step === 3 && (
        <>
          <Divisor spaceDownInVh={3} />
          <SubtitleSecondary>Alterar senha</SubtitleSecondary>
          <Divisor spaceDownInVh={2} />
          <Paragraph nameColor="gray" opacity={0.4}>
            Digite sua nova senha abaixo
          </Paragraph>
          <Divisor spaceDownInVh={4} />
          <FormForgetPassword
            ref={formPasswordRef}
            onSubmit={handleSubmitPassword}
          >
            <InputText
              name="password"
              placeholder="Nova senha"
              showIconPassword
            />
            <Divisor spaceDownInVh={1} />
            <InputText
              name="confirm_password"
              placeholder="Confirme a nova senha"
              showIconPassword
            />
            <Divisor spaceDownInVh={2} />
            <ButtonMain loading={loading}>Alterar a senha</ButtonMain>
            <Divisor spaceDownInVh={4} />
            <Paragraph nameColor="gray">Lembrei minha senha</Paragraph>
            <Divisor spaceDownInVh={2} />
            <LinkMain route="/login">Acessar minha conta</LinkMain>
          </FormForgetPassword>
        </>
      )}
    </Container>
  );
};

export default CardRecoverPassword;
