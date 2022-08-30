// src/components/cards/CardHorizontalButtonNavigate/styles.ts
import styled, { css } from 'styled-components';

interface IProps {
  icon?: {
    colorDefault: string;
    colorHover: string;
  };
  label?: {
    colorDefault: string;
    colorHover: string;
  };
  width?: {
    size: string;
    maxSize: string;
  };
  positionContent: 'flex-start' | 'center' | 'space-between';
  marginBottom?: string;
}

export const Container = styled.div<IProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ positionContent }) => positionContent};
  width: ${({ width }) => width?.size || '100%'};
  max-width: ${({ width }) => width?.maxSize || '100%'};
  background-color: ${({ theme }) => theme.colors.white.main};
  border-radius: 8px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.05);
  padding: 3vh 2vw;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0};
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.white.opacity.average};
  }
`;

export const Group = styled.div<IProps>`
  display: flex;
  justify-content: ${({ positionContent }) => positionContent};
  align-items: center;
`;

export const GroupIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.black.opacity.veryLow};
  border-radius: 50%;
  margin-right: 1.5vw;
`;

export const GroupText = styled.div``;

export const Options = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 1vw;
`;
