// ./src/components/modals/ModalUserCloseAccount/index.tsx
import React, { useCallback, useState } from 'react';

import { IoClose } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import {
  SubtitleSecondary,
  Paragraph,
  ButtonMain,
  ButtonDefault,
} from '@components/index';
import { apiRebox } from '@services/index';
import { toastify } from '@utils/notifiers';

import { Container, ModalClose, Buttons } from './styles';

interface IProps {
  userId: string;
  isOpen: boolean;
  change(): void;
}

const ModalUserCloseAccount: React.FC<IProps> = ({
  userId,
  isOpen,
  change,
}) => {
  const { goBack } = useHistory();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCloseAccount = useCallback(async () => {
    try {
      setLoading(prevState => !prevState);
      const {
        data: { header },
      } = await apiRebox.delete(`/users/${userId}?type=all`);
      change();
      toastify(header.message, 'success');
      goBack();
    } catch (error: any) {
      toastify(
        error.response.data.error ||
          'Sinto muito, houve um problema ao tentar encerrar a conta do usuário.',
        'error',
      );
    } finally {
      setLoading(prevState => !prevState);
    }
  }, []);

  return (
    <Container>
      <ModalClose
        isOpen={isOpen}
        onRequestClose={change}
        contentLabel="Password"
      >
        <SubtitleSecondary>Encerrar esta conta?</SubtitleSecondary>
        <Paragraph nameColor="black" opacity={0.5} style={{ marginTop: '2vh' }}>
          Esta ação é definitiva, irreversível. Todos os dados do usuário
          protegidos pela L.G.P.D. serão deletados de nossa base de dados.
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
            onClick={handleCloseAccount}
            style={{ marginRight: '1vw' }}
          >
            Sim, encerrar
          </ButtonMain>
          <ButtonDefault onClick={change}>Não, voltar</ButtonDefault>
        </Buttons>
      </ModalClose>
    </Container>
  );
};

export default ModalUserCloseAccount;
