// ./src/components/links/LinkMain/styles.ts
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  justifyContent?: string;
}

export const Container = styled.div<IProps>`
  display: flex;
  justify-content: flex-end;
  justify-content: ${({ justifyContent }) => justifyContent};
  width: 100%;
  /* margin-top: 5px;
  margin-right: 16px; */
`;

export const Text = styled(Link)`
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  line-height: 10px;
  color: ${({ theme }) => theme.colors.blue.main};
  transition: 180ms ease-in;

  :hover,
  :active,
  :visited,
  :focus {
    text-decoration: none;
    background-color: none;
  }

  :hover {
    color: ${({ theme }) => theme.colors.black.main};
  }
`;
