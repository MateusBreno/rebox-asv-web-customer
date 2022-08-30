// ./src/pages/privates/Profile/styles.ts
import styled, { css } from 'styled-components';

interface IProps {
  isActive?: boolean;
}

export const Container = styled.main`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.whiteCloud.main};
`;

export const ContainerGroup = styled.div`
  flex: 1;
  display: flex;
`;

export const Content = styled.section`
  width: 100%;
  height: calc(100vh - 65px);
  background-color: ${({ theme }) => theme.colors.whiteCloud.main};
  padding: 3vh 4vw;
  overflow-y: scroll;
`;

export const ButtonsOption = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  @media (max-width: 768px) {
    padding: 3vh 0;
  }
`;

export const Tabs = styled.div`
  width: 100%;
`;

export const TabLabels = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TabLabelsButton = styled.button<IProps>`
  padding: 2vh 3vw;
  border-radius: 10px 10px 0 0;
  /* background-color: ${({ theme }) => theme.colors.black.opacity.veryLow}; */

  p {
    color: ${({ theme }) => theme.colors.black.main};
  }

  :hover {
    p {
      color: ${({ theme }) => theme.colors.blue.main};
    }
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${({ theme }) => theme.colors.white.main};
      p {
        color: ${({ theme }) => theme.colors.blue.main};
      }

      :hover {
        background-color: ${({ theme }) => theme.colors.white.main};
        p {
          color: ${({ theme }) => theme.colors.blue.main};
        }
      }
    `}
`;

export const TabItems = styled.div`
  border-radius: 0 10px 10px;
  padding: 4vh 4vw;
  background-color: ${({ theme }) => theme.colors.white.main};
`;
