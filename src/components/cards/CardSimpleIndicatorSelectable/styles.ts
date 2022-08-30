// ./src/components/cards/CardSimpleIndicatorSelectable/styles.ts
import styled, { css } from 'styled-components';

interface IProps {
  icon: {
    colorDefault: string;
    colorActive: string;
  };
  label: {
    colorDefault: string;
    colorActive: string;
  };
  width?: {
    size: string;
    maxSize: string;
  };
  positionContent: 'flex-start' | 'center';
  isSelected: boolean;
}

interface IGroup {
  isSelected: boolean;
}

export const Container = styled.div<IProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ positionContent }) => positionContent};
  width: ${({ width }) => width?.size || '100%'};
  max-width: ${({ width }) => width?.maxSize || '100%'};
  background-color: ${({ theme }) => theme.colors.white.main};
  border-radius: 8px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.05);
  padding: 3vh 2vw;
  cursor: pointer;

  ${({ isSelected }) =>
    isSelected &&
    css<IProps>`
      /* border: 1px solid ${({ theme }) => theme.colors.blue.main}; */
      background-color: ${({ theme }) => theme.colors.black.opacity.high};
      p {
        color: ${({ label }) => label.colorActive};
      }

      :hover {
        background-color: ${({ theme }) => theme.colors.black.opacity.high};
      }
    `}
`;

export const Group = styled.div<IGroup>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.black.opacity.veryLow};
  border-radius: 50%;
  margin-bottom: 3vh;

  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: ${({ theme }) => theme.colors.white.opacity.veryLow};
    `}
`;
