// ./src/pages/privates/Help/index.tsx
import React from 'react';

import { FaWhatsapp } from 'react-icons/fa';

import { IconThingsToSay } from '@assets/icons';
import {
  HeaderNavigationPrivate,
  MenuSideBarPrivate,
  SubtitleSecondary,
  Paragraph,
} from '@components/index';
import { ConfigBase, ConfigStyles, ConfigValues } from '@config/index';

import {
  Container,
  ContainerGroup,
  Content,
  Sections,
  SectionGroup,
  HelpInformation,
  Buttons,
  ButtonLink,
} from './styles';

const Help: React.FC = () => {
  return (
    <Container>
      <HeaderNavigationPrivate />
      <ContainerGroup>
        <MenuSideBarPrivate />
        <Content>
          <SubtitleSecondary textAlign="start">Ajuda</SubtitleSecondary>
          <Sections>
            <SectionGroup>
              <IconThingsToSay />
              <HelpInformation>
                <SubtitleSecondary
                  textAlign="start"
                  fontSize={ConfigStyles.rebox.fonts.size.subtitle.big}
                  style={{ marginBottom: '2vh' }}
                >
                  No que podemos te ajudar?
                </SubtitleSecondary>
                <Paragraph
                  nameColor="black"
                  textAlign="start"
                  fontWeight={600}
                  fontSize={ConfigStyles.rebox.fonts.size.paragraph.big}
                >
                  Estamos aqui para o que precisar!
                </Paragraph>
                <Paragraph
                  nameColor="black"
                  textAlign="start"
                  fontSize={ConfigStyles.rebox.fonts.size.paragraph.big}
                >
                  Fale conosco por qualquer um dos nossos canais.
                </Paragraph>

                <Paragraph
                  nameColor="black"
                  textAlign="start"
                  fontWeight={500}
                  fontSize={ConfigStyles.rebox.fonts.size.subtitle.large}
                  style={{ marginTop: '4vh' }}
                >
                  Ligue para {ConfigBase.rebox.telephone.commercial}
                </Paragraph>
              </HelpInformation>
            </SectionGroup>
            <Buttons>
              <ButtonLink
                to={{
                  pathname: `${
                    ConfigBase.whatsapp.baseUrls.webApi
                  }/send?phone=${
                    ConfigBase.rebox.whatsapp.commercial
                  }&text=${'Olá! Pode me ajudar?'}`,
                }}
                target="_blank"
              >
                <FaWhatsapp
                  color={ConfigStyles.rebox.colors.blue.main}
                  size={20}
                />
                <Paragraph nameColor="blue" textAlign="start" fontWeight={600}>
                  Falar por Whatsapp
                </Paragraph>
              </ButtonLink>
            </Buttons>
          </Sections>
        </Content>
      </ContainerGroup>
    </Container>
  );
};

export default Help;
