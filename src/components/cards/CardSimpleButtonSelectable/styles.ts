// ./src/components/cards/CardSimpleButtonSelectable/styles.ts
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

export const Container = styled.div<IProps>`
  display: flex;
  justify-content: ${({ positionContent }) => positionContent};
  align-items: center;
  width: ${({ width }) => width?.size || '100%'};
  max-width: ${({ width }) => width?.maxSize || '100%'};
  background-color: ${({ theme }) => theme.colors.white.main};
  border-radius: 8px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.05);
  padding: 2vh 2vw;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.white.opacity.average};
  }

  ${({ isSelected }) =>
    isSelected &&
    css<IProps>`
      /* border: 1px solid ${({ theme }) => theme.colors.blue.main}; */
      background-color: ${({ theme }) => theme.colors.blue.main};
      p {
        color: ${({ label }) => label.colorActive};
      }

      :hover {
        /* background-color: ${({ theme }) =>
          theme.colors.black.opacity.high}; */
        background-color: ${({ theme }) => theme.colors.blue.main};
      }
    `}

  @media (max-width: 768px) {
    padding: 2vh 5vw;
  }
`;

export const Group = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GroupIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;
