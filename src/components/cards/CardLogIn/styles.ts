// ./src/components/cards/CardLogIn/styles.ts
import { Form } from '@unform/web';
import styled from 'styled-components';

interface IDivisor {
  spaceDownInVh: number;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white.main};
  text-align: center;
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
  padding: 8vh 3vw;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
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
