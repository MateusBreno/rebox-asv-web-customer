// ./src/components/cards/CardSimpleEstimate/styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white.main};
  border-radius: 8px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.05);
  padding: 5vh 4vw;

  @media (max-width: 768px) {
    padding: 3vh 4vw;
  }

  @media (max-width: 480px) {
    padding: 3vh 10vw;
  }
`;

export const Group = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vh;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
