// ./src/pages/privates/Dashboard/styles.ts
import { Form } from '@unform/web';
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

export const FormPage = styled(Form)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  > div {
    height: 40px;
    border-radius: 0;

    > input {
      padding: 0 5px;
      max-width: 60px;
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  flex-direction: row;

  > button > p {
    font-size: ${({ theme }) => theme.fonts.size.paragraph.normal}px;
  }
`;

export const PaginationGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const PaginationGroupText = styled.p`
  margin: 0;
  padding: 0 5px;
  word-break: break-word;
  line-height: 16px;
  font-weight: 500;
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  color: ${({ theme }) => theme.colors.black.main};
`;
