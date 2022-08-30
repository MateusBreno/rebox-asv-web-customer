// ./src/components/loadings/LoadingForm/index.tsx
import React from 'react';

import { List } from 'react-content-loader';

import { Container } from './styles';

const LoadingForm: React.FC = () => {
  return (
    <Container>
      <List style={{ margin: '6vh 0 2vh' }} />
      <List style={{ margin: '2vh 0' }} />
      <List style={{ margin: '2vh 0' }} />
    </Container>
  );
};

export default LoadingForm;
