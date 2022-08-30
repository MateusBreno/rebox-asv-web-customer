// ./src/pages/privates/Contract/New/StepConclusion/styles.ts
import styled from 'styled-components';

export const Container = styled.div``;

export const DividingLine = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 2vh 0;
`;

export const Resume = styled.div`
  background-color: ${({ theme }) => theme.colors.white.main};
  border-radius: 8px;
  padding: 6vh 4vw;
  margin: 3vh 0;
`;

export const ResumeProduct = styled.div``;

export const ResumeProductGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2vh 0 4vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ResumeProductItem = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    .resume-product-item-description {
      display: grid;
      grid-template-columns: 0.2fr 0.8fr;
    }
    margin-bottom: 2vh;
  }

  @media (max-width: 540px) {
    .resume-product-item-description {
      grid-template-columns: 0.4fr 0.6fr;
    }
  }
`;

export const ResumeProductIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.whiteCloud.opacity.high};
  border-radius: 8px;
  margin-right: 2vw;
`;

export const ResumeProductDescription = styled.div``;

export const ResumeCustomer = styled.div`
  margin: 4vh 0;
`;

export const ResumeCustomerGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3vh;
  margin-top: 2vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ResumeCardCustomer = styled.div`
  background-color: ${({ theme }) => theme.colors.whiteCloud.opacity.average};
  border-radius: 8px 0 0 8px;
  padding: 4vh 4vw;

  @media (max-width: 768px) {
    border-radius: 8px;
  }
`;

export const ResumeCardVehicle = styled.div`
  background-color: ${({ theme }) => theme.colors.whiteCloud.opacity.average};
  border-radius: 0 8px 8px 0;
  padding: 4vh 4vw;

  @media (max-width: 768px) {
    border-radius: 8px;
  }
`;

export const ResumePayment = styled.div`
  margin: 4vh 0;
`;

export const ResumePaymentGroup = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.black.opacity.low};
  border-radius: 8px;
  padding: 5vh 4vw;
  margin: 2vh 0;
`;

export const ResumePaymentInfo = styled.div`
  margin-bottom: 3vh;
`;

export const ResumePaymentBox = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 0.6fr;
  grid-gap: 6vh;
  align-items: center;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

export const ResumePaymentMethod = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.whiteCloud.opacity.high};
  border-radius: 8px;
  padding: 4vh 4vw;
`;

export const ResumePaymentDescription = styled.div``;

export const ResumePaymentDetails = styled.div``;

export const ResumePaymentValues = styled.div``;

export const ResumePaymentValuesInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ResumeDiscountCoupons = styled.div``;

export const ResumeDiscountCouponsGroup = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.black.opacity.low};
  border-radius: 10px;
  padding: 3vh 2vw;
  margin: 2vh 0;

  @media (max-width: 420px) {
    padding: 3vh 10vw;
  }
`;

export const Buttons = styled.div`
  display: flex;
  padding: 2vh 0 4vh;
`;
