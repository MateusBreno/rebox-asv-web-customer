// ./src/pages/privates/CalledNew/index.tsx
import React from 'react';

import { IoArrowBack } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import {
  ButtonDefault,
  FormCalledNew,
  HeaderNavigationPrivate,
  MenuSideBarPrivate,
  SubtitleSecondary,
} from '@components/index';

import {
  Container,
  ContainerGroup,
  Content,
  Options,
  OptionsGroup,
} from './styles';

const CalledNew: React.FC = () => {
  const { goBack } = useHistory();
  const handleGoBack = () => {
    goBack();
  };
  return (
    <Container>
      <HeaderNavigationPrivate />
      <ContainerGroup>
        <MenuSideBarPrivate />
        <Content>
          <SubtitleSecondary textAlign="start">
            Nova assistência
          </SubtitleSecondary>
          <Options>
            <OptionsGroup>
              <ButtonDefault iconLeft={IoArrowBack} onClick={handleGoBack} />
            </OptionsGroup>
          </Options>

          <FormCalledNew />
        </Content>
      </ContainerGroup>
    </Container>
  );
};

export default CalledNew;
