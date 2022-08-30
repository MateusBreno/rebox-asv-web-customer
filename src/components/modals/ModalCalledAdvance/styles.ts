// ./src/components/modals/ModalChargeCancele/styles.ts
import { Form } from '@unform/web';
import Modal from 'react-modal';
import styled from 'styled-components';

export const Container = styled.div``;

export const ModalAdvance = styled(Modal)`
  background-color: ${({ theme }) => theme.colors.white.main};
  border-radius: 10px;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.1);
  border: 0.5px solid ${({ theme }) => theme.colors.black.opacity.low};
  max-height: 450px;
  max-width: 550px;
  width: 80%;
  padding: 10vh 4vw;
  margin: 15vh auto 0;
  position: relative;
  overflow-x: scroll;

  @media (max-width: 539.9px) {
    width: 90%;
    padding: 6vh 6vw;
  }
`;

export const FormAdvance = styled(Form)`
  padding: 0 2vw;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4vh 0 0;
`;

export const SectionsGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3vh 0;
`;

export const SectionsItem = styled.div`
  width: 100%;
  padding: 2vh 0;
`;

export const SectionsItemGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;

  svg {
    position: absolute;
    right: -25px;
  }
`;
