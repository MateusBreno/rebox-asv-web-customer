// ./src/pages/privates/Dashboard/styles.ts
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

export const Sections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white.main};
  text-align: center;
  margin: 3vh 0;
  width: 100%;
  padding: 0 4vw 6vh;
  border-radius: 10px;
`;

export const SectionGroup = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 4vw;
  svg {
    width: 400px;
    height: 400px;
  }

  @media (max-width: 960px) {
    padding: 4vh 4vw;
    flex-direction: column;
    svg {
      width: 300px;
      height: 300px;
    }
  }

  @media (max-width: 540px) {
    svg {
      width: 200px;
      height: 200px;
    }
  }
`;

export const HelpInformation = styled.div``;

export const Buttons = styled.div``;

export const ButtonLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.blue.main};
  border-radius: 10px;
  padding: 1vh 2vw;

  > svg {
    margin-right: 8px;
  }

  :hover {
    border: 1px solid rgba(29, 29, 29, 0.5);
  }
`;
