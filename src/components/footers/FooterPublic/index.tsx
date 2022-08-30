import React, { useState } from 'react';

import { FaWhatsapp } from 'react-icons/fa';

import { IconFacebook, IconInstagram } from '@assets/icons';
import { ImageLogotipo } from '@assets/images';
import { Paragraph, ButtonMain } from '@components/index';
import { ConfigBase, ConfigStyles } from '@config/index';

import ContactUs from './ContactUs';

import {
  Container,
  BoxLogotipo,
  FooterInformations,
  Partners,
  Rebox,
  Transparency,
  FooterLink,
  FooterLinkModal,
  EmailShareLink,
  FooterInternal,
  SocialMedia,
  SocialMediaLink,
  CompanyInformation,
  ButtonLink,
} from './styles';

const FooterPublic: React.FC = () => {
  const [modalContactUsIsOpen, setModalContactUsIsOpen] = useState<boolean>(
    false,
  );

  /**
   * FUNÇÕES AUXILIARES
   */
  const changeModalContactUsIsOpen = () => {
    setModalContactUsIsOpen(prevState => !prevState);
  };

  return (
    <Container>
      <FooterInformations>
        <BoxLogotipo>
          <ImageLogotipo width={150} height={50} />
        </BoxLogotipo>

        <Transparency>
          <p>Transparência</p>
          {/* <FooterLink to="/">
            <p>Manual do cliente</p>
          </FooterLink> */}
          <FooterLink
            to={{
              pathname: `${ConfigBase.rebox.externalLinks.attachments}/regras-afiliados.pdf`,
            }}
            target="_blank"
          >
            <p>Manual do afiliado</p>
          </FooterLink>
          <FooterLink to="/politica-de-privacidade">
            <p>Termos de uso</p>
          </FooterLink>
          <FooterLink to="/politica-de-privacidade">
            <p>Política de privacidade</p>
          </FooterLink>
        </Transparency>

        <Partners>
          <p>Fale conosco</p>
          <ButtonLink
            to={{
              pathname: `${ConfigBase.whatsapp.baseUrls.webApi}/send?phone=${
                ConfigBase.rebox.whatsapp.commercial
              }&text=${'Olá! Pode me ajudar?'}`,
            }}
            target="_blank"
          >
            <FaWhatsapp
              color={ConfigStyles.rebox.colors.black.main}
              size={20}
            />
            <Paragraph nameColor="black" textAlign="start" fontWeight={500}>
              Atendimento
            </Paragraph>
          </ButtonLink>
          <FooterLinkModal onClick={changeModalContactUsIsOpen}>
            <p>Deixe uma mensagem</p>
          </FooterLinkModal>
        </Partners>
        <Rebox>
          <p>A Rebox</p>
          <FooterLink
            to={{
              pathname: `${ConfigBase.rebox.externalLinks.provider}/cadastro`,
            }}
            target="_blank"
          >
            <p>Para prestadores</p>
          </FooterLink>
          {/* <FooterLink to="/">
            <p>Para empresas</p>
          </FooterLink> */}
          <FooterLink
            to={{
              pathname: `${ConfigBase.rebox.externalLinks.affiliate}/login`,
            }}
            target="_blank"
          >
            <p>Para afiliados</p>
          </FooterLink>
          {/* <EmailShareLink
            subject={'Preciso de ajuda com os planos!'}
            body={
              'Olá Rebox! Estou com dúvidas sobre os planos de assistência veicular 24h, podem me ajudar?'
            }
            url={ConfigBase.emailContactRebox}
          >
            <p>Fale conosco</p>
          </EmailShareLink> */}
        </Rebox>
      </FooterInformations>

      <FooterInternal>
        <SocialMedia>
          <p>
            Siga-nos nas <strong>redes sociais!</strong>
          </p>
          <div>
            <SocialMediaLink
              to={{
                pathname: 'https://www.facebook.com/rebox.assistencia24h',
              }}
              target="_blank"
            >
              <div>
                <IconFacebook />
              </div>
            </SocialMediaLink>
            <SocialMediaLink
              to={{
                pathname:
                  'https://instagram.com/reboxassistencia24h?igshid=1lclt8d915oym',
              }}
              target="_blank"
            >
              <div>
                <IconInstagram />
              </div>
            </SocialMediaLink>
          </div>
        </SocialMedia>
      </FooterInternal>
      <CompanyInformation>
        <div>
          <p>
            <b>© {new Date().getFullYear()} Rebox Soluções Integradas LTDA.</b>
          </p>
          <p>
            Av. das américas, 3443, Bloco 03, 2º Andar, Barra da Tijuca, Rio de
            Janeiro/RJ
          </p>
          <p>CNPJ: 37667.543/0001-77</p>
        </div>
        <div>
          <p>Nosso e-mail: faleconosco@rebox.com.br</p>
          <p>Ou ligue grátis: 0800 100 1100</p>
        </div>
      </CompanyInformation>

      {/* <Kicode>
        <FooterLink to={{ pathname: 'https://kicode.com.br' }} target="_blank">
          <p style={{ textAlign: 'center', fontSize: 12 }}>
            Desenvolvido por <strong>Kicode Softwares</strong>
          </p>
        </FooterLink>
      </Kicode> */}

      <ContactUs
        isOpen={modalContactUsIsOpen}
        onRequestClose={changeModalContactUsIsOpen}
        contentLabel="Fale conosco"
      />
    </Container>
  );
};

export default FooterPublic;
