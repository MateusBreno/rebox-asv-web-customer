import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.whiteCloud.main};

  @media (max-width: 768px) {
    padding: 0 2vw;
  }
`;
