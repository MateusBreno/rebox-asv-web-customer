import React, { HTMLAttributes, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Redirect, useHistory } from 'react-router-dom';

import { IconMenuBurguer, IconUser } from '@assets/icons';
import { ImageLogotipo } from '@assets/images';
import { ButtonMain } from '@components/index';
import { ConfigBase } from '@config/index';
import { hotToast, toastify } from '@utils/notifiers';

import { BorderBottom, Container, Navbar, NavbarText } from './styles';

interface IHeaderProps extends HTMLAttributes<HTMLDivElement> {
  handleOpenSidebar(): void;
}

const HeaderNavigationPublic: React.FC<IHeaderProps> = ({
  handleOpenSidebar,
  ...rest
}) => {
  const { t } = useTranslation(['Home2']);
  const { push } = useHistory();
  const [redirect, setRedirect] = useState('');

  return (
    <Container {...rest}>
      {redirect === 'landingpage' && <Redirect to="/" exact />}
      <ImageLogotipo
        className="logotipo"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setRedirect('landingpage');
        }}
      />

      <IconMenuBurguer className="menu-burguer" onClick={handleOpenSidebar} />

      <Navbar>
        <NavbarText to="/">
          Home
          <BorderBottom />
        </NavbarText>
        <NavbarText to="/quem-somos">
          Quem somos
          <BorderBottom />
        </NavbarText>

        <NavbarText to="/nossos-planos">
          Nossos planos
          <BorderBottom />
        </NavbarText>

        {/* <NavbarText to="/assistencia">
          Pedir socorro
          <BorderBottom />
        </NavbarText> */}

        <button
          className="btn-emergency"
          onClick={() => {
            toastify(
              'Estamos com o sistema em manutenção, por favor para acionar ligue 0800 100 1100.',
              'info',
            );
          }}
        >
          Pedir socorro
          <BorderBottom />
        </button>

        {/* <NavbarText
          to={{
            pathname: `${ConfigBase.affiliateBaseURL}`,
          }}
          target="_blank"
        >
          Para afiliados
          <BorderBottom />
        </NavbarText> */}

        <NavbarText to="/boleto">
          2ª via de boleto
          <BorderBottom />
        </NavbarText>

        {/* <NavbarText
          to={{
            pathname: `${ConfigBase.providerBaseURL}/cadastro`,
          }}
          target="_blank"
        >
          Para prestadores
          <BorderBottom />
        </NavbarText> */}

        <ButtonMain onClick={() => push('/login')} style={{ fontSize: 14 }}>
          <IconUser width={14} style={{ marginRight: '.5vw' }} />
          Área do cliente
        </ButtonMain>
      </Navbar>
    </Container>
  );
};

export default HeaderNavigationPublic;
