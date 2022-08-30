// ./src/pages/privates/Contract/New/StepPayment/styles.ts
import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled.div``;

export const DividingLine = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 4vh 0;
`;

export const SectionsPayment = styled.div`
  width: 100%;
  padding: 2vh 0 4vh;
`;

export const FormPayment = styled(Form)``;

export const PersonalInformation = styled.div`
  padding: 0 0 3vh;
`;

export const PersonalInformationGroup = styled.div`
  background-color: ${({ theme }) => theme.colors.white.main};
  border-radius: 8px;
  padding: 2vh 4vw 4vh;
  margin-top: 2vh;

  @media (max-width: 768px) {
    padding: 2vh 8vw 4vh;
  }
`;

export const DueDate = styled.div`
  padding: 3vh 0 1vh;
`;

export const DueDateGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 2vh;
  padding: 3vh 0 0;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 320px) {
    grid-template-columns: 1fr;
  }
`;

export const PaymentMethod = styled.div``;

export const PaymentMethodOptions = styled.div`
  width: 100%;
  display: flex;
  padding: 3vh 0;

  @media (max-width: 540px) {
    flex-direction: column;
    > div {
      margin-bottom: 2vh;
    }
  }
`;

export const PaymentMethodGroup = styled.div`
  background-color: ${({ theme }) => theme.colors.white.main};
  border-radius: 8px;
  padding: 6vh 4vw;

  @media (max-width: 768px) {
    padding: 6vh 8vw;
  }
`;

export const PaymentMethodGroupFields = styled.div`
  max-width: 40%;

  @media (max-width: 940px) {
    max-width: 60%;
  }

  @media (max-width: 768px) {
    max-width: 75%;
  }

  @media (max-width: 540px) {
    max-width: 100%;
  }
`;

export const SectionsGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10vw;
  padding: 3vh 0;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
`;

export const SectionsItem = styled.div`
  width: 100%;

  @media (max-width: 768px) {
    padding: 2vh 0;
  }
`;

export const SectionsItemGroup = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  svg {
    position: absolute;
    right: -25px;
  }
`;

export const Discount = styled.div`
  padding: 3vh 0 1vh;
`;

export const DiscountButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2vh;

  svg {
    margin-right: 8px;
  }
`;

export const DiscountGroup = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white.main};
  border-radius: 8px;
  padding: 4vh 4vw 5vh;
`;

export const DiscountFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10vw;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
`;

export const DiscountItem = styled.div`
  width: 100%;

  @media (max-width: 768px) {
    padding: 2vh 0;
  }
`;

export const DiscountItemGroup = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  svg {
    position: absolute;
    right: -25px;
  }
`;

export const DiscountInformation = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.blue.opacity.low};
  border-radius: 10px;
  padding: 3vh 2vw;
  margin-top: 4vh;

  @media (max-width: 420px) {
    padding: 3vh 10vw;
  }
`;

export const Buttons = styled.div`
  display: flex;
  padding: 2vh 0 4vh;

  > button {
    margin-right: 10px;
  }

  @media (max-width: 380px) {
    flex-direction: column;
    align-items: center;

    > button {
      margin: 0;
      margin-bottom: 2vh;
    }
  }
`;
