// ./src/components/buttons/ButtonMain/styles.ts
import styled from 'styled-components';

interface IProps {
  justifyContent: string;
  widthIcon?: number;
  heightIcon?: number;
}

export const Container = styled.button<IProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: center;
  background-color: none;
  border: 1.5px solid ${({ theme }) => theme.colors.blue.main};
  height: 40px;
  width: 100%;
  border-radius: 6px;
  padding: 1.5vh 1.8vw;

  > svg {
    color: ${({ theme }) => theme.colors.blue.main};
    width: ${({ widthIcon }) => widthIcon || 16};
    height: ${({ heightIcon }) => heightIcon || 16};
  }

  :hover {
    border: 1.5px solid ${({ theme }) => theme.colors.black.main};

    > p {
      color: ${({ theme }) => theme.colors.black.main};
    }

    > svg {
      color: ${({ theme }) => theme.colors.black.main};
    }
  }

  @media (max-width: 768px) {
    padding: 1.8vh 4vw;
  }

  @media (max-width: 360px) {
    padding: 1.8vh 6vw;
  }
`;

export const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  color: ${({ theme }) => theme.colors.blue.main};
`;
