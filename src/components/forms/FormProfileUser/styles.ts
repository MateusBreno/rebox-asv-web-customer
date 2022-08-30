// ./src/components/forms/FormProfileUser/styles.ts
import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled.div``;

export const Avatar = styled.div`
  width: 100%;
`;

export const AvatarProfile = styled.div`
  width: 100%;
  position: relative;
  input {
    display: none;
  }
`;

export const AvatarProfileGroup = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
`;

export const AvatarProfileLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0px;
  right: -8px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white.main};
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const AvatarProfileImage = styled.img`
  margin-right: 1vw;
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

export const AvatarProfileAttachment = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border: 2px dashed rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  cursor: pointer;
`;

export const AvatarInputAttachment = styled.input``;

export const FormUser = styled(Form)`
  width: 100%;
  margin-top: 2vh;
`;

export const DividingLine = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 4vh 0;
`;

export const Sections = styled.div`
  width: 100%;
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
