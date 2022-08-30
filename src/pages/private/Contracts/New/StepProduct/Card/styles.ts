import Modal from 'react-modal';
import styled, { css } from 'styled-components';

interface IContainer {
  isSelected: boolean;
}

export const Container = styled.div<IContainer>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white.main};
  text-align: center;
  padding: 4vh 2vw;
  margin-bottom: 2vh;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.white.main};
  width: 100%;
  position: relative;

  svg.info {
    position: absolute;
    top: 1.5vh;
    right: 2vh;
    cursor: pointer;
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.blue.main};
    `}
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1vh 0;
`;

export const PricePrefix = styled.p`
  font-weight: 500;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  color: ${({ theme }) => theme.colors.black.main};
  margin-right: 10px;
  @media (min-width: 475px) {
    font-size: ${({ theme }) => theme.fonts.size.paragraph.extraLarge}px;
  }
`;

export const PriceBig = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black.main};
  font-size: ${({ theme }) => theme.fonts.size.subtitle.large}px;
  @media (min-width: 475px) {
    font-size: ${({ theme }) => theme.fonts.size.subtitle.extraLarge}px;
  }
`;

export const PriceColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 6px;
`;

export const PriceCents = styled.p`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.normal}px;
  @media (min-width: 475px) {
    font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  }
`;

export const PricePerMonthText = styled.p`
  font-weight: 500;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  line-height: 17px;
  color: #1d1d1d;
  @media (min-width: 475px) {
    font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  }
`;

export const ModalProduct = styled(Modal)`
  background-color: ${({ theme }) => theme.colors.white.main};
  border-radius: 10px;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.1);
  border: 0.5px solid ${({ theme }) => theme.colors.black.opacity.low};
  max-height: 600px;
  max-width: 550px;
  width: 80%;
  padding: 8vh 4vw;
  margin: 15vh auto 0;
  position: relative;
  overflow-x: scroll;

  @media (max-width: 539.9px) {
    width: 90%;
    padding: 6vh 6vw;
  }
`;
