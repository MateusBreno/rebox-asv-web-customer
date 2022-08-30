// ./src/pages/privates/Contract/New/StepProduct/styles.ts
import styled from 'styled-components';

export const Container = styled.div``;

export const Group = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 3vh;
  padding: 4vh 0;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
    grid-gap: 2vh;
  }
`;

export const Buttons = styled.div`
  display: flex;
  padding: 2vh 0 4vh;
`;
