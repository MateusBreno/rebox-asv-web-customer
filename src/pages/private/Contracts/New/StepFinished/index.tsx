import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import { LottieCheck } from '@assets/animations';
import {
  SubtitleSecondary,
  Paragraph,
  ButtonMain,
  ButtonOutline,
  TitleMain,
  SubtitleMain,
} from '@components/index';
import { ConfigRoutes, ConfigStyles } from '@config/index';
import { newContractStorageService } from '@services/index';

import { Container, Buttons } from './styles';

interface IProps {
  myStep: number;
  currentStep: number;
  changeStep(newStep: number, willChangeHistory?: boolean): void;
}

const StepFinished: React.FC<IProps> = ({
  myStep,
  currentStep,
  changeStep,
}) => {
  const { push } = useHistory();

  const handleNewPurchase = useCallback(() => {
    newContractStorageService.cleanMany('all');
    changeStep(1, true);
  }, []);
  // const handleSellToNewCustomer = () => {
  //   newContractStorageService.cleanMany('all');
  //   changeStep(1, true);
  // };

  // const handleSellToTheSameCustomer = () => {
  //   newContractStorageService.cleanMany('vehicle');
  //   changeStep(3, true);
  // };

  return (
    <Container>
      <LottieCheck />
      <SubtitleMain>Deu tudo certo!</SubtitleMain>
      <SubtitleSecondary nameColor="black" style={{ margin: '0.5vh 0 3vh' }}>
        Sua compra foi realizada com sucesso.
      </SubtitleSecondary>
      <Paragraph
        nameColor="black"
        fontSize={ConfigStyles.rebox.fonts.size.paragraph.big}
        fontWeight={500}
      >
        Geramos o contrato e todas as instruções foram enviadas para o e-mail
        cadastrado.
      </Paragraph>
      <Buttons>
        <ButtonMain
          onClick={handleNewPurchase}
          style={{ maxWidth: '300px', marginRight: '2vw' }}
        >
          Fazer uma nova compra
        </ButtonMain>
        {/* <ButtonOutline
          onClick={handleSellToTheSameCustomer}
          style={{ maxWidth: '300px' }}
        >
          Vender para mesmo cliente
        </ButtonOutline> */}
      </Buttons>
    </Container>
  );
};

export default StepFinished;
