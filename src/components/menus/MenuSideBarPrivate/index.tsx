// ./src/components/menus/MenuSideBarPrivate/index.tsx
import React, { useState } from 'react';

import { FaCarAlt, FaCarCrash } from 'react-icons/fa';
import {
  IoStatsChart,
  IoChevronForwardCircleSharp,
  IoPeople,
  IoWallet,
  IoCube,
  IoLogoUsd,
  IoCart,
  IoCarSport,
  IoHelpBuoy,
  IoBuild,
} from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import { Paragraph } from '@components/index';
import { ConfigRoutes, ConfigStyles } from '@config/index';

import {
  Container,
  ButtonExpande,
  Options,
  OptionNavigate,
  OptionNavigateItem,
  Divisor,
  Tag,
  Version,
} from './styles';

const MenuSideBarPrivate: React.FC = () => {
  const { location } = useHistory();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const activateMenuBasedOnRoute = (route: string): boolean => {
    return location.pathname.includes(route);
  };

  return (
    <Container isExpanded={isExpanded}>
      <ButtonExpande
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(state => !state)}
      >
        <IoChevronForwardCircleSharp
          className={isExpanded ? 'to_spin' : 'normal'}
          size={30}
          title="ícone de expansão do menu"
          color={ConfigStyles.rebox.colors.black.main}
          opacity={0.3}
        />
      </ButtonExpande>
      <Options>
        <OptionNavigate>
          {isExpanded && (
            <Paragraph
              nameColor="black"
              textAlign="start"
              opacity={0.3}
              style={{ fontWeight: 600, marginBottom: '4vh' }}
            >
              NAVEGAÇÃO
            </Paragraph>
          )}

          <OptionNavigateItem
            to={ConfigRoutes.rebox.privates.panel.path}
            isActive={activateMenuBasedOnRoute(
              ConfigRoutes.rebox.privates.panel.path,
            )}
            isExpanded={isExpanded}
          >
            <IoStatsChart
              size={isExpanded ? 20 : 24}
              title="ícone de dashboard"
              color={
                activateMenuBasedOnRoute(ConfigRoutes.rebox.privates.panel.path)
                  ? ConfigStyles.rebox.colors.blue.main
                  : ConfigStyles.rebox.colors.black.main
              }
            />
            {isExpanded && (
              <>
                <Paragraph
                  nameColor={
                    activateMenuBasedOnRoute(
                      ConfigRoutes.rebox.privates.panel.path,
                    )
                      ? 'blue'
                      : 'gray'
                  }
                  textAlign="start"
                  style={{
                    marginLeft: '1vw',
                    fontWeight: 500,
                  }}
                >
                  Painel
                </Paragraph>
              </>
            )}
          </OptionNavigateItem>

          <OptionNavigateItem
            to={ConfigRoutes.rebox.privates.called.path}
            isActive={activateMenuBasedOnRoute(
              ConfigRoutes.rebox.privates.called.path,
            )}
            isExpanded={isExpanded}
          >
            <FaCarCrash
              size={isExpanded ? 20 : 28}
              title="ícone de carro"
              color={
                activateMenuBasedOnRoute(
                  ConfigRoutes.rebox.privates.called.path,
                )
                  ? ConfigStyles.rebox.colors.blue.main
                  : ConfigStyles.rebox.colors.black.main
              }
            />
            {isExpanded && (
              <Paragraph
                nameColor={
                  activateMenuBasedOnRoute(
                    ConfigRoutes.rebox.privates.called.path,
                  )
                    ? 'blue'
                    : 'gray'
                }
                textAlign="start"
                style={{
                  marginLeft: '1vw',
                  fontWeight: 500,
                }}
              >
                Minhas assistências
              </Paragraph>
            )}
          </OptionNavigateItem>

          <OptionNavigateItem
            to={ConfigRoutes.rebox.privates.contract.path}
            isActive={activateMenuBasedOnRoute(
              ConfigRoutes.rebox.privates.contract.path,
            )}
            isExpanded={isExpanded}
          >
            <IoCart
              size={isExpanded ? 20 : 24}
              title="ícone de carrinho de compra"
              color={
                activateMenuBasedOnRoute(
                  ConfigRoutes.rebox.privates.contract.path,
                )
                  ? ConfigStyles.rebox.colors.blue.main
                  : ConfigStyles.rebox.colors.black.main
              }
            />
            {isExpanded && (
              <Paragraph
                nameColor={
                  activateMenuBasedOnRoute(
                    ConfigRoutes.rebox.privates.contract.path,
                  )
                    ? 'blue'
                    : 'gray'
                }
                textAlign="start"
                style={{
                  marginLeft: '1vw',
                  fontWeight: 500,
                }}
              >
                Meus contratos
              </Paragraph>
            )}
          </OptionNavigateItem>

          <OptionNavigateItem
            to={ConfigRoutes.rebox.privates.charge.path}
            isActive={activateMenuBasedOnRoute(
              ConfigRoutes.rebox.privates.charge.path,
            )}
            isExpanded={isExpanded}
          >
            <IoLogoUsd
              size={isExpanded ? 20 : 24}
              title="ícone de dinheiro"
              color={
                activateMenuBasedOnRoute(
                  ConfigRoutes.rebox.privates.charge.path,
                )
                  ? ConfigStyles.rebox.colors.blue.main
                  : ConfigStyles.rebox.colors.black.main
              }
            />
            {isExpanded && (
              <>
                <Paragraph
                  nameColor={
                    activateMenuBasedOnRoute(
                      ConfigRoutes.rebox.privates.charge.path,
                    )
                      ? 'blue'
                      : 'gray'
                  }
                  textAlign="start"
                  style={{
                    marginLeft: '1vw',
                    fontWeight: 500,
                  }}
                >
                  Minhas cobranças
                </Paragraph>
              </>
            )}
          </OptionNavigateItem>

          <OptionNavigateItem
            to={ConfigRoutes.rebox.privates.vehicle.path}
            isActive={activateMenuBasedOnRoute(
              ConfigRoutes.rebox.privates.vehicle.path,
            )}
            isExpanded={isExpanded}
          >
            <FaCarAlt
              size={isExpanded ? 20 : 24}
              title="ícone de carteira"
              color={
                activateMenuBasedOnRoute(
                  ConfigRoutes.rebox.privates.vehicle.path,
                )
                  ? ConfigStyles.rebox.colors.blue.main
                  : ConfigStyles.rebox.colors.black.main
              }
            />
            {isExpanded && (
              <>
                <Paragraph
                  nameColor={
                    activateMenuBasedOnRoute(
                      ConfigRoutes.rebox.privates.vehicle.path,
                    )
                      ? 'blue'
                      : 'gray'
                  }
                  textAlign="start"
                  style={{
                    marginLeft: '1vw',
                    fontWeight: 500,
                  }}
                >
                  Meus veículos
                </Paragraph>
              </>
            )}
          </OptionNavigateItem>
          <Divisor />

          <OptionNavigateItem
            to={ConfigRoutes.rebox.privates.help.path}
            isActive={activateMenuBasedOnRoute(
              ConfigRoutes.rebox.privates.help.path,
            )}
            isExpanded={isExpanded}
          >
            <IoHelpBuoy
              size={isExpanded ? 20 : 24}
              title="ícone de boia salva vidas"
              color={
                activateMenuBasedOnRoute(ConfigRoutes.rebox.privates.help.path)
                  ? ConfigStyles.rebox.colors.blue.main
                  : ConfigStyles.rebox.colors.black.main
              }
            />
            {isExpanded && (
              <>
                <Paragraph
                  nameColor={
                    activateMenuBasedOnRoute(
                      ConfigRoutes.rebox.privates.help.path,
                    )
                      ? 'blue'
                      : 'gray'
                  }
                  textAlign="start"
                  style={{
                    marginLeft: '1vw',
                    fontWeight: 500,
                  }}
                >
                  Ajuda
                </Paragraph>
                {/* <Tag>Em breve</Tag>{' '} */}
              </>
            )}
          </OptionNavigateItem>
        </OptionNavigate>
      </Options>
      <Version isExpanded={isExpanded}>
        <Paragraph
          nameColor="black"
          fontSize={11}
          opacity={0.3}
          style={{ fontWeight: 500 }}
        >
          {isExpanded ? 'Versão 2.0' : 'v2.0'}
        </Paragraph>
      </Version>
    </Container>
  );
};

export default MenuSideBarPrivate;
