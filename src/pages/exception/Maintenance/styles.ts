import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.whiteCloud.main};
  padding: 0 30vw;

  @media (max-width: 768px) {
    padding: 0 2vw;
  }
`;
