import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

/* VERSÃO MOBILE
 * - 1024px
 * - 960px
 * - 768px
 * - 540px
 * - 480px
 * - 360px
 * - 320px
 */

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.white.main};

  height: 100px;
  width: 100%;
  padding: 0 4vw;

  > svg.logotipo {
    width: 160px;
  }

  > svg.menu-burguer {
    display: flex;
    cursor: pointer;
    width: 30px;

    color: ${({ theme }) => theme.colors.black.main};
    transition: 180ms ease-in;

    :hover {
      color: #000000;
    }

    @media (min-width: 1024px) {
      display: none;
    }
  }
`;

export const BorderBottom = styled.div`
  width: 0%;
  height: 2px;
  background: #07359b;
  transition: width 0.3s;
`;

export const Navbar = styled.nav`
  display: none;
  align-items: center;

  .btn-emergency {
    color: #1d1d1d;
    font-size: ${({ theme }) => theme.fonts.size.paragraph.normal}px;
    font-weight: 600;
    line-height: 24, 38px;

    margin-right: 3vw;
    white-space: nowrap;

    text-decoration: none;
    transition: 180ms ease-in;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    :hover {
      color: #000;

      ${BorderBottom} {
        margin-top: 6px;
        width: 100%;
      }
    }

    :active {
      transform: translateY(0);
    }
  }

  @media (min-width: 1024px) {
    display: flex;
  }
`;

export const NavbarText = styled(Link)`
  color: #1d1d1d;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.normal}px;
  font-weight: 600;
  line-height: 24, 38px;

  margin-right: 3vw;
  white-space: nowrap;

  text-decoration: none;
  transition: 180ms ease-in;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  :hover {
    color: #000;

    ${BorderBottom} {
      margin-top: 6px;
      width: 100%;
    }
  }

  :active {
    transform: translateY(0);
  }
`;
