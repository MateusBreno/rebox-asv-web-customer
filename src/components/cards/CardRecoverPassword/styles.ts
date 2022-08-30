// ./src/components/cards/CardRecoverPassword/styles.ts
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

export const FormForgetPassword = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;

  > button.resend {
    text-align: end;
    font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
    line-height: 10px;

    color: ${({ theme }) => theme.colors.blue.main};

    transition: 180ms ease-in;

    :hover {
      color: ${({ theme }) => theme.colors.black.main};
    }
  }
`;

export const Divisor = styled.div<IDivisor>`
  margin-bottom: ${({ spaceDownInVh }) => spaceDownInVh}vh;
`;
