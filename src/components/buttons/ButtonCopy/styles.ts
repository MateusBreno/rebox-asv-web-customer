// ./src/components/buttons/ButtonCopy/styles.ts
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 0;
  margin: 0;
  cursor: pointer;

  #paragraph-btn-copy {
    display: flex;
    align-items: center;

    svg {
      margin-right: 4px;
    }
  }
`;

export const Button = styled(CopyToClipboard)``;
