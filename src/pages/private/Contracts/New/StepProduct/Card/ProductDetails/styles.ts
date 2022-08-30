import Modal from 'react-modal';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const BorderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 560px; */
  width: 100%;
  height: 4vh;
  background: ${({ theme }) => theme.colors.blue.main};
  margin-bottom: 2vh;
`;

export const BorderHeaderText = styled.p`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.normal}px;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.white.main};
  text-transform: uppercase;

  @media (min-width: 768px) {
    /* font-size: 14px; */
  }
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fonts.size.subtitle.normal}px;
  line-height: 32px;
  color: #07359b;
  text-align: center;
  text-transform: uppercase;
  margin: 0 2vw 3vh;
  @media (min-width: 768px) {
    font-size: 26px;
  }
`;

export const Economy = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2vh;
`;

export const ScratchedPrice = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.paragraph.normal}px;
  line-height: 20px;
  color: #1d1d1d;
  text-align: center;
  text-decoration: line-through;
  margin-right: 1vw;

  @media (min-width: 475px) {
    font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  }
`;

export const EconomizeDiscount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #07359b;
  padding: 1vh 1.6vw;

  @media (min-width: 768px) {
  }
`;

export const EconomizeDiscountText = styled.p`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.normal}px;
  line-height: 20px;
  color: #07359b;
  @media (min-width: 425px) {
    font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2vh;
`;

export const PricePrefix = styled.div`
  font-weight: 500;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  line-height: 22px;
  color: #1d1d1d;
  margin-top: -20px;
  margin-right: 5px;
  @media (min-width: 475px) {
    font-size: ${({ theme }) => theme.fonts.size.paragraph.extraLarge}px;
  }
`;

export const PriceBig = styled.h1`
  font-weight: bold;
  font-size: 40px;
  line-height: 66px;
  color: #1d1d1d;
  @media (min-width: 475px) {
    font-size: 54px;
  }
`;

export const PriceColumn = styled.div``;

export const PriceCents = styled.p`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  line-height: 22px;
  @media (min-width: 475px) {
    font-size: ${({ theme }) => theme.fonts.size.paragraph.extraLarge}px;
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

export const AnnualSubscriptionText = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.paragraph.big}px;
  font-weight: 600;
  line-height: 17px;
  text-align: center;
  color: #1d1d1d;
  margin-bottom: 4vh;

  @media (min-width: 475px) {
    font-size: ${({ theme }) => theme.fonts.size.paragraph.big}px;
  }
`;

export const InformationsExtra = styled.div`
  background-color: ${({ theme }) => theme.colors.blue.opacity.veryLow};
  border-radius: 8px;
  margin: 0 2vw;
  padding: 2vh 2vw;

  @media (max-width: 767.9px) {
    padding: 2vh 8vw;
    margin: 0 10vw;
  }
`;

export const InformationsExtraView = styled.div`
  padding: 1.5vh 0;
`;

export const InformationsExtraLabel = styled.p`
  color: ${({ theme }) => theme.colors.blue.main};
  font-weight: 400;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  line-height: 16px;
  text-align: center;
  margin-bottom: 0.8vh;
`;

export const MaximumUsesText = styled.p`
  color: ${({ theme }) => theme.colors.black.main};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  line-height: 16px;
  text-align: center;
  margin: 3vh auto;
  padding: 0 2vw;

  @media (min-width: 475px) {
    font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  }
`;

export const InformationsExtraText = styled.p`
  color: ${({ theme }) => theme.colors.black.main};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  line-height: 16px;
  text-align: center;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2vh;
`;

export const DividerTitle = styled.p`
  padding: 0 10px;
  color: ${({ theme }) => theme.colors.blue.main};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.big}px;
  line-height: 16px;
  text-align: center;
`;

export const DividerLine = styled.div`
  background: ${({ theme }) => theme.colors.blue.main};
  height: 0.6px;
  width: 12%;
`;

export const Items = styled.div`
  padding: 2vh 3vw 0;

  @media (max-width: 767.9px) {
    padding: 2vh 10vw 0;
  }
`;

export const ProductItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2vh;

  > div > svg {
    width: 18px;
    margin-right: 1.5vw;

    path {
      fill: #00df1e;
    }
  }

  > p {
    color: ${({ theme }) => theme.colors.black.main};
    font-weight: 500;
    font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  }
`;
