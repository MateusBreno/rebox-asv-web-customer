// ./src/components/headers/HeaderNavigationPrivate/styles.ts
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  isActive?: boolean;
}

export const Container = styled.header`
  /* position: fixed; */
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white.main};
  height: 65px;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 0 2vw;
`;

export const Logotipo = styled.div``;

export const ModeSystem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 2.5vw;
`;

export const ModeSystemView = styled.div`
  background-color: #34495e;
  padding: 0.4vh 0.8vw;
  border-radius: 5px;
  opacity: 1;

  @media (max-width: 320px) {
    display: none;
  }
`;

export const NavigationGroup = styled.nav`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0 3vw;
`;

export const NavigationItem = styled.div`
  margin-left: 1.5vw;

  @media (max-width: 767.9px) {
    margin-left: 3vw;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  height: 100%;

  > svg {
    transition: 500ms;
  }
  > svg.to_spin {
    transform: rotate(180deg);
  }
`;

export const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;

  @media (max-width: 359.9px) {
    width: 28px;
    height: 28px;
  }
`;

export const ProfileName = styled.span`
  margin: 0;
  padding: 0;
  word-break: break-word;
  line-height: 24px;
  font-weight: 500;
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  color: ${({ theme }) => theme.colors.black.main};
  margin: 0 1vw;
  text-transform: capitalize;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const ExpandedMenu = styled.div`
  display: ${props => (props.className === 'open' ? 'block' : 'none')};
  background-color: ${({ theme }) => theme.colors.white.main};
  width: 40vw;
  max-width: 300px;
  max-height: 200px;
  margin: 0 auto 0;
  padding: 3vh 2vw;
  border-radius: 0 0 0 10px;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  transition: ease-in 400ms;
  position: absolute;
  right: 0;
  top: 65px;

  @media (max-width: 767.9px) {
    width: 60vw;
    padding: 2vh 1.5vw;
  }

  @media (max-width: 379.9px) {
    width: 80vw;
  }
`;

export const LinkMenu = styled(Link)<IProps>`
  display: flex;
  align-items: center;
  padding: 10px 30px;
  border-radius: 10px;

  p {
    font-weight: 500;
    margin-left: 1vw;
  }
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.blue.opacity.veryLow : 'none'};
  :hover {
    background-color: ${({ theme, isActive }) =>
      isActive
        ? theme.colors.blue.opacity.veryLow
        : theme.colors.whiteCloud.main};
  }
`;

export const ButtonLinkMenu = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 30px;
  border-radius: 10px;

  p {
    font-weight: 500;
    margin-left: 1vw;
  }

  :hover {
    background-color: ${({ theme }) => theme.colors.whiteCloud.main};
  }
  width: 100%;
`;
