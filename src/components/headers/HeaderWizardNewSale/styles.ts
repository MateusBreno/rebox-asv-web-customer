// ./src/components/headers/HeaderWizardNewSale/styles.ts
import styled, { css } from 'styled-components';

interface IProps {
  be: 'now' | 'passed_on' | 'will_come';
}

export const Container = styled.div`
  width: 100%;
  padding: 4vh 0 2vh;
`;

export const Wizard = styled.div`
  display: flex;
  width: 100%;
`;

export const WizardItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
`;

export const WizardItemIcon = styled.button<IProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.black.opacity.veryLow};
  border-radius: 50%;
  margin-right: 6px;
  cursor: pointer;

  ${({ be }) =>
    be === 'now' &&
    css`
      background-color: ${({ theme }) => theme.colors.black.opacity.high};
    `}

  ${({ be }) =>
    be === 'passed_on' &&
    css`
      background-color: ${({ theme }) => theme.colors.greenEmerald.main};
    `}
`;

export const WizardItemIconText = styled.p<IProps>`
  margin: 0;
  padding: 0;
  word-break: break-word;
  line-height: 20px;
  font-weight: 500;
  text-align: start;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.medium}px;
  color: ${({ theme }) => theme.colors.black.opacity.average};
  opacity: 1;

  ${({ be }) =>
    be === 'now' &&
    css`
      color: ${({ theme }) => theme.colors.white.main};
    `}
`;

export const WizardItemLabel = styled.button<IProps>`
  margin: 0;
  padding: 0;
  word-break: break-word;
  line-height: 20px;
  font-weight: 500;
  text-align: start;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  color: ${({ theme }) => theme.colors.black.opacity.average};
  opacity: 1;
  margin-right: 6px;

  @media (max-width: 768px) {
    display: none;
  }

  ${({ be }) =>
    be === 'now' &&
    css`
      color: ${({ theme }) => theme.colors.black.main};
    `}

  ${({ be }) =>
    be === 'passed_on' &&
    css`
      color: ${({ theme }) => theme.colors.black.main};
    `}
`;

export const WizardItemBar = styled.div<IProps>`
  flex: 1;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.black.opacity.low};
  margin-right: 6px;

  ${({ be }) =>
    be === 'now' &&
    css`
      background-color: ${({ theme }) => theme.colors.black.opacity.average};
    `}

  ${({ be }) =>
    be === 'passed_on' &&
    css`
      background-color: ${({ theme }) => theme.colors.black.opacity.average};
    `}
`;
