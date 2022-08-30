// ./src/pages/privates/Panel/index.tsx
import React, { useMemo } from 'react';

import { FiDownload } from 'react-icons/fi';
import { IoOpenOutline } from 'react-icons/io5';

import {
  IconByMyCar,
  IconExportFiles,
  IconSuccessfulPurchase,
} from '@assets/icons';
import {
  ButtonOutline,
  ButtonMain,
  HeaderNavigationPrivate,
  MenuSideBarPrivate,
  Paragraph,
  SubtitleSecondary,
} from '@components/index';
import {
  ConfigBase,
  ConfigRoutes,
  ConfigStyles,
  ConfigValues,
} from '@config/index';
import { sessionStorageService } from '@services/index';

import {
  Container,
  ContainerGroup,
  Content,
  Sections,
  ButtonLink,
  SectionsGroup,
  SectionsAside,
  SectionAssistance,
  SectionQuickAccess,
  SectionQuickAccessLink,
  SectionQuickAccessItem,
  SectionAffiliate,
  SectionAttachments,
  SectionAttachmentsTitle,
  SectionAttachmentsItems,
  SectionAttachmentsLink,
} from './styles';

const Panel: React.FC = () => {
  const userSex = useMemo(() => {
    return sessionStorageService.getUser()?.sex || 'n/a';
  }, []);
  return (
    <Container>
      <HeaderNavigationPrivate />
      <ContainerGroup>
        <MenuSideBarPrivate />
        <Content>
          <SubtitleSecondary textAlign="start">Painel</SubtitleSecondary>
          <Sections>
            <SectionsGroup>
              <SectionAssistance>
                <SubtitleSecondary textAlign="start">
                  Confira suas assistências veiculares
                </SubtitleSecondary>
                <Paragraph
                  nameColor="black"
                  textAlign="start"
                  fontWeight={500}
                  style={{ margin: '1vh 0 2vh' }}
                >
                  Estamos disponíveis 24h por dia em todo o Brasil para te
                  socorrer na hora do sufoco.
                </Paragraph>

                <ButtonLink to={ConfigRoutes.rebox.privates.called.path}>
                  <ButtonOutline>Ver assistências</ButtonOutline>
                </ButtonLink>
              </SectionAssistance>
              <SectionQuickAccess>
                <SectionQuickAccessLink
                  to={ConfigRoutes.rebox.privates.called.next.new.path}
                >
                  <SectionQuickAccessItem>
                    <IoOpenOutline
                      className="iconSecondary"
                      color={ConfigStyles.rebox.colors.blue.main}
                      size={20}
                    />
                    <IconByMyCar className="iconMain" />
                    <Paragraph
                      fontSize={ConfigStyles.rebox.fonts.size.paragraph.big}
                      fontWeight={600}
                    >
                      Solicitar assistência
                    </Paragraph>
                  </SectionQuickAccessItem>
                </SectionQuickAccessLink>

                <SectionQuickAccessLink
                  to={ConfigRoutes.rebox.privates.contract.next.new.path}
                >
                  <SectionQuickAccessItem>
                    <IoOpenOutline
                      className="iconSecondary"
                      color={ConfigStyles.rebox.colors.blue.main}
                      size={20}
                    />
                    <IconSuccessfulPurchase className="iconMain" />
                    <Paragraph
                      fontSize={ConfigStyles.rebox.fonts.size.paragraph.big}
                      fontWeight={600}
                    >
                      Nova compra
                    </Paragraph>
                  </SectionQuickAccessItem>
                </SectionQuickAccessLink>
              </SectionQuickAccess>
            </SectionsGroup>
            <SectionsAside>
              <SectionAffiliate>
                <SubtitleSecondary textAlign="center">
                  {userSex === ConfigValues.rebox.user.sex.male
                    ? 'Venha ser um afiliado!'
                    : userSex === ConfigValues.rebox.user.sex.female
                    ? 'Venha ser uma afiliada!'
                    : 'Venha ser um(a) afiliado(a)!'}
                </SubtitleSecondary>

                <Paragraph
                  nameColor="black"
                  textAlign="center"
                  fontWeight={600}
                  style={{ margin: '2vh 0' }}
                >
                  Já pensou em ter uma renda extra indicando planos da Rebox?
                </Paragraph>
                {/* <Paragraph
                  nameColor="black"
                  textAlign="start"
                  fontWeight={500}
                  style={{ marginBottom: '2vh' }}
                >
                  Você pode ganhar até R$ 3.750,00 por mês, indicando apenas 5
                  clientes por dia!
                </Paragraph> */}

                <Paragraph
                  nameColor="black"
                  textAlign="start"
                  fontWeight={500}
                  style={{ marginBottom: '2vh' }}
                >
                  Basta compartilhar seu código de indicação para seus amigos.
                </Paragraph>

                <Paragraph
                  nameColor="black"
                  textAlign="start"
                  fontWeight={500}
                  style={{ marginBottom: '2vh' }}
                >
                  Acessando o painel do afiliado, você acompanha seu saldo, faz
                  resgates e muito mais.
                </Paragraph>

                <ButtonLink
                  to={{
                    pathname: `${
                      ConfigBase.rebox.externalLinks.affiliate
                    }/painel?s=${sessionStorageService.getId()}&t=${sessionStorageService.getToken()}`,
                  }}
                  target="_blank"
                >
                  <ButtonMain>Área do afiliado</ButtonMain>
                </ButtonLink>
              </SectionAffiliate>
              <SectionAttachments>
                <SectionAttachmentsTitle>
                  <IconExportFiles />
                  <SubtitleSecondary textAlign="start">
                    Anexos
                  </SubtitleSecondary>
                </SectionAttachmentsTitle>
                <SectionAttachmentsItems>
                  <SectionAttachmentsLink
                    to={{
                      pathname: `${ConfigBase.rebox.externalLinks.attachments}/manual-cliente.pdf`,
                    }}
                    target="_blank"
                  >
                    <FiDownload
                      color={ConfigStyles.rebox.colors.blue.main}
                      size={25}
                    />
                    <Paragraph textAlign="start" fontWeight={500}>
                      Manual do cliente
                    </Paragraph>
                  </SectionAttachmentsLink>

                  <SectionAttachmentsLink
                    to={{
                      pathname: `${ConfigBase.rebox.externalLinks.attachments}/regras-afiliados.pdf`,
                    }}
                    target="_blank"
                  >
                    <FiDownload
                      color={ConfigStyles.rebox.colors.blue.main}
                      size={25}
                    />
                    <Paragraph textAlign="start" fontWeight={500}>
                      Regras para afiliados
                    </Paragraph>
                  </SectionAttachmentsLink>
                </SectionAttachmentsItems>
              </SectionAttachments>
            </SectionsAside>
          </Sections>
        </Content>
      </ContainerGroup>
    </Container>
  );
};

export default Panel;
