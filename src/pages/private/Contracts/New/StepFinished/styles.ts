// ./src/pages/privates/Contract/New/StepFinished/styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white.main};
  border-radius: 8px;
  padding: 6vh 20vw;
  margin-top: 1.5vh;
  @media (max-width: 480px) {
    padding: 4vh 10vw;
  }
  @media (max-width: 360px) {
    h4 {
      font-size: ${({ theme }) => theme.fonts.size.subtitle.small}px;
    }
    p {
      font-size: ${({ theme }) => theme.fonts.size.paragraph.normal}px;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4vh 0;
`;
