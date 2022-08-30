// ./src/pages/privates/Settings/index.tsx
import React from 'react';

import {
  HeaderNavigationPrivate,
  MenuSideBarPrivate,
  SubtitleSecondary,
} from '@components/index';

import { Container, ContainerGroup, Content } from './styles';

const Settings: React.FC = () => {
  return (
    <Container>
      <HeaderNavigationPrivate />
      <ContainerGroup>
        <MenuSideBarPrivate />
        <Content>
          <SubtitleSecondary textAlign="start">Configurações</SubtitleSecondary>
        </Content>
        {/* <Sections></Sections> */}
      </ContainerGroup>
    </Container>
  );
};

export default Settings;
