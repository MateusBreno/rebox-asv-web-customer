import Modal from 'react-modal';
import styled from 'styled-components';

export const Container = styled(Modal)`
  background-color: ${({ theme }) => theme.colors.white.main};
  border-radius: 10px;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.1);
  border: 0.5px solid ${({ theme }) => theme.colors.blue.opacity.veryLow};
  max-height: 800px;
  max-width: 550px;
  width: 80%;
  padding: 40px 80px;
  margin: 5vh auto 0;
  position: relative;

  @media (max-width: 539.9px) {
    margin: 5vh 10vw 0;
    padding: 6vh 6vw;
  }

  > h1 {
    text-align: center;
    font-weight: 500;
    font-size: ${({ theme }) => theme.fonts.size.subtitle.normal}px;
    color: ${({ theme }) => theme.colors.black.main};
    margin-bottom: 10px;

    @media (max-width: 539.9px) {
      font-size: ${({ theme }) => theme.fonts.size.paragraph.extraLarge}px;
    }
  }

  > p {
    text-align: center;
    font-weight: 400;
    font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
    color: ${({ theme }) => theme.colors.blue.opacity.average};
    margin-bottom: 20px;

    @media (max-width: 539.9px) {
      font-size: ${({ theme }) => theme.fonts.size.paragraph.normal}px;
    }
  }

  > form {
    padding: 20px 10% 0;
  }
`;

export const ButtonCloseModal = styled.button`
  position: absolute;
  top: 10%;
  left: 93%;

  @media (max-width: 539.9px) {
    top: 2vh;
    left: 90%;
  }

  > svg {
    width: 12px;
    margin: 0;
  }
`;

export const FieldModal = styled.div`
  margin-bottom: 2vh;
`;

export const TextArea = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  background: rgba(244, 245, 249, 0.5);
  color: #000000;

  width: 100%;
  height: 100px;

  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 10px;

  transition: all 0.2s ease-in-out;
`;

export const TextAreaMessage = styled.textarea`
  flex: 1;
  width: 100%;
  height: 100%;

  font-family: ${({ theme }) => theme.fonts.family.Montserrat};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  line-height: 24px;
  color: #000;

  padding: 10px 30px 0;

  background: transparent;
  border: 0;
  border-radius: 15px;

  ::placeholder {
    color: rgba(29, 29, 29, 0.5);
    font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  }

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  }
`;
