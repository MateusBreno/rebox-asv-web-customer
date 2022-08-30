// ./src/components/menus/MenuSideBarPrivate/styles.ts
import { Link } from 'react-router-dom';
import styled from 'styled-components';

/* VERSÃO RESPONSIVA
 * - 1920px
 * - 1440px
 * - 1024px
 * - 960px
 * - 768px
 * - 540px
 * - 480px
 * - 360px
 * - 320px
 */

interface IProps {
  isExpanded?: boolean;
  isActive?: boolean;
}

export const Container = styled.section<IProps>`
  display: flex;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.white.main};
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  max-width: 22vw;
  min-width: 6vw;
  width: ${({ isExpanded }) => (isExpanded ? '22vw' : '6vw')};
  height: calc(100vh - 65px);
  /* top: 65px;
  left: 0;
  position: fixed; */
  position: relative;
  transition: ease-in 200ms;
  padding: ${({ isExpanded }) => (isExpanded ? '4vh 1.5vw' : '4vh 1vw')};

  @media (max-width: 1024px) {
    max-width: 26vw;
    width: ${({ isExpanded }) => (isExpanded ? '26vw' : '8vw')};
  }

  @media (max-width: 960px) {
    max-width: 34vw;
    width: ${({ isExpanded }) => (isExpanded ? '34vw' : '10vw')};
  }

  @media (max-width: 768px) {
    min-width: 0;
    max-width: 40vw;
    width: ${({ isExpanded }) => (isExpanded ? '40vw' : '0')};
    padding: ${({ isExpanded }) => (isExpanded ? '4vh 1.5vw' : '0')};
  }

  @media (max-width: 540px) {
    max-width: 200vw;
    width: ${({ isExpanded }) => (isExpanded ? '200vw' : '0')};
    padding: ${({ isExpanded }) => (isExpanded ? '4vh 4vw' : '0')};
  }
`;

export const ButtonExpande = styled.button<IProps>`
  position: absolute;
  top: 1vh;
  right: -15px;
  z-index: 5;

  > svg {
    transition: 500ms;
  }
  > svg.to_spin {
    transform: rotate(180deg);
  }

  @media (max-width: 768px) {
    top: 40vh;
    right: -30px;
  }
`;

export const Options = styled.div`
  width: 100%;
`;

export const OptionNavigate = styled.div`
  width: 100%;
`;

export const OptionNavigateItem = styled(Link)<IProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${({ isExpanded }) => (isExpanded ? '1.7vh 1vw' : '2.2vh 1vw')};
  border-radius: 6px;
  position: relative;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.blue.opacity.veryLow : 'none'};

  svg {
    opacity: ${({ isActive }) => (isActive ? 1 : '0.4')};
  }

  :hover {
    background-color: ${({ theme, isActive }) =>
      isActive
        ? theme.colors.blue.opacity.veryLow
        : theme.colors.whiteCloud.main};
  }

  @media (max-width: 768px) {
    padding: ${({ isExpanded }) => (isExpanded ? '1.7vh 1vw' : '2.2vh 0')};
  }
`;

export const Divisor = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 2vh 0;
`;

export const Tag = styled.div`
  position: absolute;
  bottom: 31%;
  right: 7px;
  margin: 0;
  padding: 3px 5px;
  word-break: break-word;
  font-weight: 600;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.yellowSunFlower.main};
  border-radius: 4px;
  text-align: center;
  font-size: 7px;
`;

export const Version = styled.div<IProps>`
  position: absolute;
  bottom: 2vh;
  left: ${({ isExpanded }) => (isExpanded ? '36%' : '32%')};

  @media (max-width: 768px) {
    display: ${({ isExpanded }) => (isExpanded ? 'flex' : 'none')};
  }
`;
