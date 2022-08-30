// ./src/pages/privates/Contract/New/styles.ts
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

export const Options = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4vh;
`;

export const OptionsGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .btn-update {
    margin-right: 0.5vw;
    min-width: 140px;
  }

  @media (max-width: 540px) {
    .btn-update {
      margin-right: 2vw;
      min-width: auto;
    }
  }

  @media (max-width: 320px) {
    > button {
      width: 50px;
      > p {
        display: none;
      }
    }
  }
`;

export const Sections = styled.div``;
