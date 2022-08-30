import React from 'react';

import { FaWhatsapp } from 'react-icons/fa';

import { LottieLoading } from '@assets/animations';
import { ImageLogotipo } from '@assets/images';
import {
  SubtitleSecondary,
  Paragraph,
  ButtonMain,
  LinkMain,
} from '@components/index';
import { ConfigRoutes, ConfigStyles, ConfigBase } from '@config/index';

import { Container } from './styles';

const Maintenance: React.FC = () => {
  return (
    <Container>
      <LinkMain route={ConfigRoutes.rebox.publics.signIn.path}>
        <ImageLogotipo className="logotipo" style={{ cursor: 'pointer' }} />
      </LinkMain>
      <SubtitleSecondary fontSize={30} style={{ margin: '6vh 0 2vh' }}>
        Voltamos logo!
      </SubtitleSecondary>
      <Paragraph fontSize={18} nameColor="black" fontWeight={600}>
        Nossa equipe está realizando uma manutenção, para deixar tudo ainda mais
        perfeito para você.
      </Paragraph>
      <Paragraph
        fontSize={18}
        nameColor="black"
        fontWeight={500}
        style={{ margin: '6vh 0 2vh' }}
      >
        Mas estamos aqui se precisar!
      </Paragraph>
      <LinkMain
        route={{
          pathname: `${ConfigBase.whatsapp.baseUrls.webApi}/send?phone=${
            ConfigBase.rebox.whatsapp.commercial
          }&text=${'Olá! Pode me ajudar?'}`,
        }}
        target="_blank"
      >
        <ButtonMain
          iconLeft={FaWhatsapp}
          iconLeftColor={ConfigStyles.rebox.colors.white.main}
        >
          Chamar no whatsapp
        </ButtonMain>
      </LinkMain>
      <Paragraph
        fontSize={18}
        nameColor="black"
        fontWeight={600}
        style={{ margin: '2vh 0 0' }}
      >
        Ou ligue {ConfigBase.rebox.telephone.commercial}
      </Paragraph>
    </Container>
  );
};

export default Maintenance;
