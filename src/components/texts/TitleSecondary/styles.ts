// ./src/components/texts/TitleMain/styles.ts
import styled from 'styled-components';

import { IProps } from '../typing';

export const Container = styled.div`
  width: 100%;
`;

export const Text = styled.h2<IProps>`
  margin: 0;
  padding: 0;
  word-break: break-word;
  line-height: 30px;
  font-weight: ${({ fontWeight }) => fontWeight || 600};
  text-align: ${({ textAlign }) => textAlign};
  font-size: ${({ theme, fontSize }) =>
    fontSize || theme.fonts.size.title.small}px;
  color: ${({ theme, nameColor }) => theme.colors[nameColor || 'blue'].main};
  opacity: ${({ opacity }) => opacity || 1};
`;
