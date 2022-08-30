// ./src/pages/privates/Contract/New/index.tsx
import React, { useCallback, useEffect, useState } from 'react';

import { IoArrowBack } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import {
  ButtonDefault,
  HeaderNavigationPrivate,
  HeaderWizardNewSale,
  MenuSideBarPrivate,
  SubtitleSecondary,
} from '@components/index';
import { newContractStorageService } from '@services/index';

import StepConclusion from './StepConclusion';
import StepFinished from './StepFinished';
import StepPayment from './StepPayment';
import StepProduct from './StepProduct';
import StepVehicle from './StepVehicle';

import {
  Container,
  ContainerGroup,
  Content,
  Options,
  OptionsGroup,
  Sections,
} from './styles';

const ContractNew: React.FC = () => {
  const { goBack } = useHistory();

  const [step, setStep] = useState<number>(1);
  const [stepHistory, setStepHistory] = useState<number>(1);

  const changeStep = (desiredStep: number) => {
    setStep(desiredStep);
  };

  const handleChangeSteps = useCallback(
    (desiredStep: number, willChangeHistory?: boolean) => {
      setStep(desiredStep);
      if (stepHistory < desiredStep || willChangeHistory)
        setStepHistory(desiredStep);
    },
    [stepHistory],
  );

  const handleGoBack = () => {
    goBack();
  };

  useEffect(() => {
    if (step === 1 && stepHistory === 1)
      newContractStorageService.cleanMany('all');
  }, [step, stepHistory]);

  return (
    <Container>
      <HeaderNavigationPrivate />
      <ContainerGroup>
        <MenuSideBarPrivate />
        <Content>
          <SubtitleSecondary textAlign="start">Nova compra</SubtitleSecondary>
          <Options>
            <OptionsGroup>
              <ButtonDefault iconLeft={IoArrowBack} onClick={handleGoBack} />
            </OptionsGroup>
          </Options>
          <HeaderWizardNewSale
            stepActive={step}
            stepHistory={stepHistory}
            changeStep={changeStep}
          />
          <Sections>
            {step === 1 && (
              <StepProduct
                myStep={1}
                currentStep={step}
                changeStep={handleChangeSteps}
              />
            )}

            {step === 2 && (
              <StepVehicle
                myStep={2}
                currentStep={step}
                changeStep={handleChangeSteps}
              />
            )}

            {step === 3 && (
              <StepPayment
                myStep={3}
                currentStep={step}
                changeStep={handleChangeSteps}
              />
            )}

            {step === 4 && (
              <StepConclusion
                myStep={4}
                currentStep={step}
                changeStep={handleChangeSteps}
              />
            )}

            {step === 5 && (
              <StepFinished
                myStep={6}
                currentStep={step}
                changeStep={handleChangeSteps}
              />
            )}
          </Sections>
        </Content>
      </ContainerGroup>
    </Container>
  );
};

export default ContractNew;
