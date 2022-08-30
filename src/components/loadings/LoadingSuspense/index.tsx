// ./src/components/loadings/LoadingSuspense/index.tsx
import React from 'react';

import { LottieDots } from '@assets/animations';
import { SubtitleMain, Paragraph } from '@components/index';

import { Container, Content } from './styles';

const LoadingSuspense: React.FC = () => {
  return (
    <Container>
      <Content>
        {/* <SubtitleMain fontSize={30} fontWeight={600}>
          Por favor, aguarde...
        </SubtitleMain>
        <Paragraph
          nameColor="black"
          fontWeight={500}
          fontSize={18}
          style={{ margin: '2vh 0 4vh' }}
        >
          Estamos preparando tudo para você!
        </Paragraph> */}
        <LottieDots />
      </Content>
    </Container>
  );
};

export default LoadingSuspense;
