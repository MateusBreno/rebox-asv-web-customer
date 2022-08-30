// ./src/components/links/LinkMain/index.tsx
import React from 'react';

import { IProps } from '../typing';

import { Container, Text } from './styles';

const LinkMain: React.FC<IProps> = ({
  children,
  route,
  target = '_self',
  justifyContent = 'center',
}) => {
  return (
    <Container justifyContent={justifyContent}>
      <Text to={route} target={target}>
        {children}
      </Text>
    </Container>
  );
};

export default LinkMain;
