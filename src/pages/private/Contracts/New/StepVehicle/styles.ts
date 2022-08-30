// ./src/pages/privates/Contract/New/StepVehicle/styles.ts
import { Form } from '@unform/web';
import styled, { css } from 'styled-components';

interface ITabLabelsButton {
  isActive?: boolean;
}

export const Container = styled.div``;

export const Tabs = styled.div`
  width: 100%;
  margin-top: 5vh;
`;

export const TabLabels = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TabLabelsDivisor = styled.div`
  height: 25px;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.black.opacity.low};
`;

export const TabLabelsButton = styled.button<ITabLabelsButton>`
  display: flex;
  align-items: center;
  padding: 0 3vw;
  transition: ease-in 300ms;

  p {
    color: ${({ theme }) => theme.colors.black.opacity.average};
  }

  :hover {
    p {
      color: ${({ theme }) => theme.colors.black.opacity.high};
    }
  }

  ${({ isActive }) =>
    isActive &&
    css`
      p {
        color: ${({ theme }) => theme.colors.blue.main};
        font-weight: 500;
      }
    `}

  @media (max-width: 960px) {
    p {
      font-size: ${({ theme }) => theme.fonts.size.paragraph.normal}px;
    }
  }
`;

export const TabItems = styled.div``;

export const TabItemsGroup = styled.div``;

export const DividingLine = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 4vh 0;
`;

export const FormValidate = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white.main};
  text-align: center;
  margin: 3vh 0;
  width: 100%;
  padding: 2vh 4vw 6vh;
  border-radius: 10px;
`;

export const Resume = styled.div``;

export const SectionsGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0 10vw;
  padding: 3vh 0;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
`;

export const SectionsField = styled.div`
  width: 100%;

  @media (max-width: 768px) {
    padding: 2vh 0;
  }
`;

export const Buttons = styled.div`
  display: flex;
  padding: 2vh 0 4vh;
`;
