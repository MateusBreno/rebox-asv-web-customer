// ./src/components/headers/HeaderNavigationPrivate/index.tsx
import React, { useState } from 'react';

import {
  IoNotifications,
  IoPersonCircleOutline,
  IoSettings,
  IoCaretDownOutline,
  IoPersonSharp,
  IoLogOut,
} from 'react-icons/io5';
import { Redirect, useHistory } from 'react-router-dom';

import { ImageLogotipo } from '@assets/images';
import { LinkMain, Paragraph } from '@components/index';
import { ConfigRoutes, ConfigStyles, ConfigTransition } from '@config/index';
import User from '@models/User';
import { apiRebox, sessionStorageService } from '@services/index';
import { toastify } from '@utils/notifiers';

import {
  Container,
  Logotipo,
  ModeSystem,
  ModeSystemView,
  ButtonLinkMenu,
  ExpandedMenu,
  LinkMenu,
  NavigationGroup,
  NavigationItem,
  Profile,
  ProfileImage,
  ProfileName,
} from './styles';

const HeaderNavigationPrivate: React.FC = () => {
  const { location } = useHistory();
  const [user, setUser] = useState<User | any>(sessionStorageService.getUser());
  const [notification, setNotification] = useState<boolean>(false);
  const [isExpandedMenuOpen, setIsExpandedMenuOpen] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean | any>(
    sessionStorageService.checked(),
  );

  const changeExpandedMenuOpen = () => {
    setIsExpandedMenuOpen(!isExpandedMenuOpen);
  };

  const signOut = async () => {
    try {
      toastify('Aguarde. Sua seção está sendo encerrada...', 'info');

      const session = await apiRebox.put(
        `/sessions/${sessionStorageService.getId()}`,
        {},
      );

      sessionStorageService.clean();

      setLoggedIn(!loggedIn);
    } catch (error) {
      toastify(
        'Sinto muito, houve um erro ao tentar encerrar a seção.',
        'error',
      );
    }
  };

  const activateMenuBasedOnRoute = (route: string): boolean => {
    return location.pathname.includes(route);
  };

  return (
    <Container>
      {!loggedIn && (
        <Redirect to={ConfigRoutes.rebox.defaults.returnBase} exact />
      )}
      <Logotipo>
        <LinkMain route={ConfigRoutes.rebox.defaults.mainRedirect}>
          <ImageLogotipo width={110} height={30} />
        </LinkMain>
      </Logotipo>

      <ModeSystem>
        <ModeSystemView>
          <Paragraph fontSize={9} style={{ fontWeight: 500, color: 'white' }}>
            {ConfigTransition.rebox_user_role[user.role.toLowerCase()]}
          </Paragraph>
        </ModeSystemView>
      </ModeSystem>

      <NavigationGroup>
        {/* <NavigationItem>
          <LinkMain route={ConfigRoutes.rebox.privates.setting.path}>
            <IoSettings
              size={20}
              title="ícone de configuração"
              color={
                activateMenuBasedOnRoute(
                  ConfigRoutes.rebox.privates.setting.path,
                )
                  ? ConfigStyles.rebox.colors.blue.main
                  : ConfigStyles.rebox.colors.black.main
              }
              opacity={
                activateMenuBasedOnRoute(
                  ConfigRoutes.rebox.privates.setting.path,
                )
                  ? 1
                  : 0.4
              }
            />
          </LinkMain>
        </NavigationItem> */}
        {/* <NavigationItem>
          <LinkMain route={ConfigRoutes.rebox.privates.notification.path}>
            {notification ? (
              <IoNotifications
                size={20}
                title="ícone de notificação ativo"
                color={ConfigStyles.rebox.colors.blue.main}
                opacity={0.5}
              />
            ) : (
              <IoNotifications
                size={20}
                title="ícone de notificação inativo"
                color={
                  activateMenuBasedOnRoute(
                    ConfigRoutes.rebox.privates.notification.path,
                  )
                    ? ConfigStyles.rebox.colors.blue.main
                    : ConfigStyles.rebox.colors.black.main
                }
                opacity={
                  activateMenuBasedOnRoute(
                    ConfigRoutes.rebox.privates.notification.path,
                  )
                    ? 1
                    : 0.4
                }
              />
            )}
          </LinkMain>
        </NavigationItem> */}
      </NavigationGroup>

      <Profile onClick={changeExpandedMenuOpen}>
        {!user?.image_url ? (
          <IoPersonCircleOutline
            size={45}
            title="ícone de imagem de perfil"
            color={ConfigStyles.rebox.colors.black.main}
            opacity={0.6}
          />
        ) : (
          <ProfileImage src={user?.image_url} />
        )}
        <ProfileName>{user?.name.split(' ')[0] || 'Convidado'}</ProfileName>
        <IoCaretDownOutline
          className={isExpandedMenuOpen ? 'to_spin' : 'normal'}
          size={18}
          title="ícone de expansão do menu escondido"
          color={ConfigStyles.rebox.colors.black.main}
          opacity={0.4}
        />
      </Profile>

      <ExpandedMenu className={isExpandedMenuOpen ? 'open' : 'close'}>
        <LinkMenu
          to={ConfigRoutes.rebox.privates.profile.path}
          isActive={activateMenuBasedOnRoute(
            ConfigRoutes.rebox.privates.profile.path,
          )}
        >
          <IoPersonSharp
            size={20}
            title="ícone de perfil"
            color={
              activateMenuBasedOnRoute(ConfigRoutes.rebox.privates.profile.path)
                ? ConfigStyles.rebox.colors.blue.main
                : ConfigStyles.rebox.colors.black.main
            }
            opacity={0.4}
          />
          <Paragraph
            nameColor={
              activateMenuBasedOnRoute(ConfigRoutes.rebox.privates.profile.path)
                ? 'blue'
                : 'gray'
            }
            textAlign="start"
          >
            Meu perfil
          </Paragraph>
        </LinkMenu>
        <ButtonLinkMenu onClick={signOut}>
          <IoLogOut
            size={20}
            title="ícone de logout"
            color={ConfigStyles.rebox.colors.black.main}
            opacity={0.4}
          />
          <Paragraph nameColor="black" textAlign="start">
            Sair
          </Paragraph>
        </ButtonLinkMenu>
      </ExpandedMenu>
    </Container>
  );
};

export default HeaderNavigationPrivate;
