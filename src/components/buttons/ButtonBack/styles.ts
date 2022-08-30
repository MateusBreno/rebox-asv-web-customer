// ./src/components/buttons/ButtonBack/styles.ts
import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(
    270deg,
    rgba(7, 53, 155, 0.7) 2.02%,
    #07359b 100%
  );
  height: 40px;
  width: 100%;
  border-radius: 10px;
  border: 0;
  padding: 0 20px;

  :hover {
    background: ${({ theme }) => theme.colors.blue.main};
  }
`;

export const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  color: ${({ theme }) => theme.colors.white.main};
`;
