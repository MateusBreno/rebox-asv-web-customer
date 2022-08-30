// ./src/components/buttons/ButtonMain/styles.ts
import styled from 'styled-components';

interface IProps {
  justifyContent?: string;
  widthIcon?: number;
  heightIcon?: number;
  isDisable?: boolean;
}

export const Container = styled.button<IProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: center;
  background-color: ${({ theme }) => theme.colors.black.opacity.veryLow};
  height: 40px;
  width: 100%;
  border-radius: 8px;
  border: 0;
  padding: 1vh 2vw;

  > svg {
    width: ${({ widthIcon }) => widthIcon || 16};
    height: ${({ heightIcon }) => heightIcon || 16};
    opacity: ${({ isDisable }) => (isDisable ? 0.5 : 1)};
  }

  :hover {
    background: ${({ theme }) => theme.colors.black.opacity.low};
  }

  /* :focus {
    border: 1px solid rgba(0, 0, 0, 0.1);
  } */

  :active {
    border: none;
  }
`;

export const Text = styled.p<IProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  color: ${({ theme, isDisable }) =>
    isDisable ? theme.colors.black.opacity.average : theme.colors.black.main};
`;
