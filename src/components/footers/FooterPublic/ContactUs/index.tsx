import React, { useCallback, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Props } from 'react-modal';
import { ToastContainer } from 'react-toastify';
import * as Yup from 'yup';

import { IconClose } from '@assets/icons';
import {
  InputText,
  InputMask,
  InputSelect,
  ButtonMain,
} from '@components/index';
import { apiRebox } from '@services/index';
import { getValidationErrors } from '@utils/errors';
import { toastify } from '@utils/notifiers';

import { schema } from './schemaValidation';

import {
  Container,
  FieldModal,
  ButtonCloseModal,
  TextArea,
  TextAreaMessage,
} from './styles';

interface IPropsContactUsFormData {
  name: string;
  email: string;
  cellphone: string;
  subject: string;
  message: any;
}

const ContactUs: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  contentLabel,
  ...rest
}) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const changeMessage = (event: any) => {
    setMessage(event.target.value);
  };

  const handleSubmitContactUs = async (data: IPropsContactUsFormData) => {
    try {
      setLoading(prevState => !prevState);

      formRef.current?.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      const {
        data: { header },
      } = await apiRebox.post(`/attendances/contactsus`, {
        name: data.name,
        email: data.email,
        cellphone: data.cellphone,
        subject: data.subject,
        message,
        origin: 'cliente',
      });

      toastify(
        header.message || 'Recebemos sua mensagem, retornaremos logo logo!',
        'success',
      );

      formRef.current?.reset();
      setMessage('');
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);

        const { name, email, cellphone, subject } = errors;

        if (name) toastify(name, 'error');
        if (email) toastify(email, 'error');
        if (cellphone) toastify(cellphone, 'error');
        if (subject) toastify(subject, 'error');
      } else if (error.response) {
        toastify(
          error.response.data.error ||
            'Houve um erro ao tentar enviar os dados para contato.',
          'error',
        );
      }
    } finally {
      setLoading(prevState => !prevState);
    }
  };

  return (
    <Container
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      {...rest}
    >
      <h1>Fale com a gente!</h1>
      <ButtonCloseModal onClick={onRequestClose}>
        <IconClose />
      </ButtonCloseModal>
      <Form ref={formRef} onSubmit={handleSubmitContactUs}>
        <FieldModal>
          <InputText name="name" placeholder="Nome completo ou Razão social" />
        </FieldModal>

        <FieldModal>
          <InputText name="email" placeholder="Seu e-mail" />
        </FieldModal>

        <FieldModal>
          <InputMask
            name="cellphone"
            placeholder="Seu whatsapp e/ou celular"
            mask="+55 99 99999-9999"
          />
        </FieldModal>

        <FieldModal>
          <InputSelect
            name="subject"
            placeholder="Selecione o assunto"
            options={[
              { label: 'Fazer uma crítica', value: 'Críticas' },
              { label: 'Dar uma sugestão', value: 'Sugestão' },
              { label: 'Tirar uma dúvida', value: 'Dúvida' },
              { label: 'Fazer um elogio', value: 'Elogio' },
            ]}
          />
        </FieldModal>

        <FieldModal>
          <TextArea>
            <TextAreaMessage
              name="message"
              placeholder="Digite aqui sua mensagem..."
              value={message}
              onChange={changeMessage}
            />
          </TextArea>
        </FieldModal>
        <ButtonMain loading={loading}>Enviar</ButtonMain>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default ContactUs;
