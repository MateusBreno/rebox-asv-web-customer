// ./src/components/inputs/InputText/styles.ts
import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  isDisable: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(244, 245, 249, 0.5);
  color: ${({ theme }) => theme.colors.black.main};
  width: 100%;
  height: 46px;
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 8px;
  transition: all 0.2s ease-in-out;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  /* Se o input estiver focado, mude a cor do icone e da borda. A cor do icone esta conectado com color */
  ${props =>
    props.isFocused &&
    css`
      color: ${({ theme }) => theme.colors.blue.main};
      border-color: ${({ theme }) => theme.colors.blue.main};
    `}

  /* Se o input estiver preenchido, mude a cor do icone. A cor do icone esta conectado com color */
  ${props =>
    props.isFilled &&
    css`
      color: ${({ theme }) => theme.colors.blue.main};
      border-color: ${({ theme }) => theme.colors.blue.main};
    `}

  > input {
    flex: 1;
    width: 100%;
    height: 100%;
    font-weight: 500;
    font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.black.main};
    padding: 0px 30px;
    background: transparent;
    border: 0;
    border-radius: 15px;

    ::placeholder {
      color: ${({ theme }) => theme.colors.black.opacity.average};
      font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
    }

    @media (min-width: 768px) {
      font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
    }
  }
  ${props =>
    props.isDisable &&
    css`
      > input {
        color: ${({ theme }) => theme.colors.black.opacity.average};
      }
    `}

  > svg {
    margin-right: 20px;
  }
`;
