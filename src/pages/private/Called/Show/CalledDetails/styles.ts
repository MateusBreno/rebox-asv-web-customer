// ./src/pages/privates/Called/Show/CalledDetails/styles.ts
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

interface IProgress {
  percentage: number;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white.main};
  text-align: center;
  margin: 3vh 0;
  width: 100%;
  padding: 3vh 4.5vw;
  border-radius: 10px;
`;

export const Sections = styled.div`
  width: 100%;
  padding: 3vh 0;

  @media (max-width: 1024px) {
    .row-1 {
      display: grid;
      grid-template-columns: 0.25fr 0.4fr 0.35fr;
      grid-template-rows: 1fr 1fr;
      row-gap: 5vh;
      grid-template-areas:
        'box-1 box-2 box-3'
        'box-4 box-4 box-5';
    }
  }

  @media (max-width: 768px) {
    .row-2,
    .row-4,
    .row-6 {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @media (max-width: 540px) {
    .row-1 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      row-gap: 3vh;
      grid-template-areas:
        'box-1 box-5'
        'box-2 box-3'
        'box-4 box-4';
    }
  }

  @media (max-width: 480px) {
    .row-1 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr 1fr;
      row-gap: 3vh;
      grid-template-areas:
        'box-1 box-5'
        'box-2 box-2'
        'box-3 box-3'
        'box-4 box-4';
    }
  }

  @media (max-width: 360px) {
    .row-1 {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
      row-gap: 3vh;
      grid-template-areas:
        'box-1'
        'box-2'
        'box-3'
        'box-4'
        'box-5';
    }
  }
`;

export const SectionsGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5vh;

  @media (max-width: 768px) {
    margin-bottom: 3vh;
  }
`;

export const DividingLine = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 6vh 0;
`;

export const Service = styled.div`
  grid-area: box-1;
  flex: 0.15;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 540px) {
    align-items: center;
    p {
      text-align: center;
    }
  }
`;

export const ServiceImage = styled.div``;

export const Circumstances = styled.div`
  grid-area: box-2;
  flex: 0.25;
  padding: 0 1.5vw;
`;

export const VehicleSituation = styled.div``;

export const LocationType = styled.div``;

export const Dates = styled.div`
  grid-area: box-3;
  flex: 0.2;
`;

export const DatesGroup = styled.div``;

export const Time = styled.div`
  grid-area: box-4;
  flex: 0.2;
  padding: 0 1.5vw;
`;

export const Progress = styled.div<IProgress>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  position: relative;
  height: 6px;
  margin: 1.5vh 0;

  .active {
    background-color: ${({ theme }) => theme.colors.blue.main};
    width: ${({ percentage }) => `${percentage}%`};
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.black.opacity.low};
  position: absolute;
`;

export const Period = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 0.3fr;
  align-items: center;
`;

export const CallSituation = styled.div`
  grid-area: box-5;
  flex: 0.2;
`;

export const SourceAddress = styled.div`
  flex: 0.4;
`;

export const DestinationAddress = styled.div`
  flex: 0.4;
  padding: 0 2vw;

  @media (max-width: 768px) {
    padding: 2vh 0;
  }
`;

export const Distance = styled.div`
  flex: 0.2;
`;

export const Budget = styled.div``;

export const BudgetGroup = styled.div``;

export const BudgetFormOfPayment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 6px;
  }
`;

export const Customer = styled.div`
  flex: 0.5;
  margin-right: 2vw;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 3.5vh;
  }
`;

export const VehicleInService = styled.div`
  flex: 0.5;
`;

export const Description = styled.div``;

export const Providers = styled.div`
  flex: 0.5;
  margin-right: 2vw;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 3.5vh;
  }
`;

export const Driver = styled.div`
  flex: 0.5;
`;
