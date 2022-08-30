// ./src/components/modals/ModalCalledCancele/index.tsx
import React, { useCallback, useState } from 'react';

import { IoClose } from 'react-icons/io5';

import {
  SubtitleSecondary,
  Paragraph,
  ButtonMain,
  ButtonDefault,
} from '@components/index';
import { apiRebox, sessionStorageService } from '@services/index';
import { toastify } from '@utils/notifiers';

import { Container, ModalCancel, Buttons } from './styles';

interface IProps {
  calledId: string;
  isOpen: boolean;
  change(): void;
  refresh(): void;
}

const ModalCalledCancele: React.FC<IProps> = ({
  calledId,
  isOpen,
  change,
  refresh,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleCancelCalled = useCallback(async () => {
    try {
      setLoading(prevState => !prevState);
      const { data: responseCanceleCalled } = await apiRebox.post(
        `/called/${calledId}/cancele`,
        {
          who_is_canceling_id: sessionStorageService.getUser()?.id,
        },
      );
      const { header, data } = responseCanceleCalled;
      toastify(
        header.message || `Acionamento cancelado com sucesso!`,
        `success`,
      );
      refresh();
    } catch (error: any) {
      let messageError = `Sinto muito, não foi possível cancelar o chamado.`;
      if (error.response) messageError = error.response.data.error;
      toastify(messageError, `error`);
    } finally {
      setLoading(prevState => !prevState);
      change();
    }
  }, []);

  return (
    <Container>
      <ModalCancel
        isOpen={isOpen}
        onRequestClose={change}
        contentLabel="Password"
      >
        <SubtitleSecondary>Tem certeza que deseja cancelar?</SubtitleSecondary>
        <Paragraph nameColor="black" opacity={0.5} style={{ marginTop: '2vh' }}>
          Esta ação é irreversível. Você não poderá restaurar este acionamento
          depois.
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
        <Buttons>
          <ButtonMain
            loading={loading}
            onClick={handleCancelCalled}
            style={{ marginRight: '1vw' }}
          >
            Sim, cancelar
          </ButtonMain>
          <ButtonDefault onClick={change}>Não, voltar</ButtonDefault>
        </Buttons>
      </ModalCancel>
    </Container>
  );
};

export default ModalCalledCancele;
