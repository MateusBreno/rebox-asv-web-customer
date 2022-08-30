// ./src/components/buttons/ButtonMain/styles.ts
import styled, { css } from 'styled-components';

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
  /* background: linear-gradient(
    270deg,
    rgba(7, 53, 155, 0.7) 2.02%,
    #07359b 100%
  ); */
  background-color: ${({ theme }) => theme.colors.blue.main};
  height: 40px;
  width: 100%;
  border-radius: 8px;
  border: 0;
  padding: 1vh 2vw;

  @media (max-width: 768px) {
    padding: 1vh 6vw;
  }

  ${({ isDisable }) =>
    isDisable &&
    css`
      background-color: ${({ theme }) => theme.colors.blue.opacity.high};
    `}

  > svg {
    width: ${({ widthIcon }) => widthIcon || 16};
    height: ${({ heightIcon }) => heightIcon || 16};
  }

  :hover,
  :focus {
    background: linear-gradient(
      270deg,
      rgba(7, 53, 155, 0.7) 2.02%,
      #07359b 100%
    );
  }
`;

export const Text = styled.p<IProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  color: ${({ theme }) => theme.colors.white.main};

  ${({ isDisable }) =>
    isDisable &&
    css`
      opacity: 0.5;
    `}
`;
