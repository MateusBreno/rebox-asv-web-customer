// ./src/components/texts/Paragraph/styles.ts
import styled from 'styled-components';

import { IProps } from '../typing';

export const Container = styled.div`
  width: 100%;
`;

export const Text = styled.p<IProps>`
  margin: 0;
  padding: 0;
  word-break: break-word;
  line-height: 1.8;
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  text-align: ${({ textAlign }) => textAlign};
  font-size: ${({ theme, fontSize }) =>
    fontSize || theme.fonts.size.paragraph.large}px;
  color: ${({ theme, nameColor }) => theme.colors[nameColor || 'blue'].main};
  opacity: ${({ opacity }) => opacity};
`;
