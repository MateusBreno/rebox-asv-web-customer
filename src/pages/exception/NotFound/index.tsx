// ./src/pages/errors/NotFound/index.tsx
import React, { useMemo, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { LottieNotFound } from '@assets/animations';
import {
  SubtitleMain,
  Paragraph,
  ButtonDefault,
  HeaderNavigationPrivate,
  MenuSideBarPrivate,
} from '@components/index';
import { ConfigRoutes } from '@config/index';
import User from '@models/User';
import { sessionStorageService } from '@services/index';

import {
  Container,
  ContainerNotFound,
  ContainerGroup,
  Content,
} from './styles';

const NotFound: React.FC = () => {
  const { push, goBack } = useHistory();
  const [user, setUser] = useState<User | null>(
    sessionStorageService.getUser(),
  );
  const Item = useMemo(
    () => (
      <ContainerNotFound>
        <LottieNotFound />
        <SubtitleMain fontSize={30} fontWeight={600}>
          Oops!
        </SubtitleMain>
        <Paragraph
          nameColor="black"
          fontSize={20}
          fontWeight={500}
          style={{ margin: '2vh 0 3vh' }}
        >
          Página não encontrada
        </Paragraph>
        {user ? (
          <ButtonDefault style={{ maxWidth: 140 }} onClick={goBack}>
            Voltar
          </ButtonDefault>
        ) : (
          <ButtonDefault
            style={{ maxWidth: 180 }}
            onClick={() => push(ConfigRoutes.rebox.defaults.returnBase)}
          >
            ir para o início
          </ButtonDefault>
        )}
      </ContainerNotFound>
    ),
    [user],
  );

  return (
    <>
      {user ? (
        <Container>
          <HeaderNavigationPrivate />
          <ContainerGroup>
            <MenuSideBarPrivate />
            <Content>{Item}</Content>
          </ContainerGroup>
        </Container>
      ) : (
        <>{Item}</>
      )}
    </>
  );
};

export default NotFound;
