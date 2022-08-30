// ./src/components/modals/ModalUserAuthenticate/styles.ts
import { Form } from '@unform/web';
import Modal from 'react-modal';
import styled from 'styled-components';

interface IDivisor {
  spaceDownInVh: number;
}

export const Container = styled.div``;

export const ModalSignIn = styled(Modal)`
  background-color: ${({ theme }) => theme.colors.white.main};
  border-radius: 10px;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.1);
  border: 0.5px solid ${({ theme }) => theme.colors.black.opacity.low};
  max-height: 600px;
  max-width: 550px;
  width: 80%;
  padding: 8vh 4vw;
  margin: 15vh auto 0;
  position: relative;

  @media (max-width: 539.9px) {
    width: 90%;
    padding: 6vh 6vw;
  }
`;

export const FormOpenSession = styled(Form)`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

export const Divisor = styled.div<IDivisor>`
  margin-bottom: ${({ spaceDownInVh }) => spaceDownInVh}vh;
`;
