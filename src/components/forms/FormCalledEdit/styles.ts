// ./src/components/forms/FormCalledNew/styles.ts
import { Form } from '@unform/web';
import styled, { css } from 'styled-components';

interface IDropdownContainer {
  isActive: boolean;
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
  padding: 4vh 6vw;
  border-radius: 10px;
`;

export const FormCalled = styled(Form)`
  width: 100%;
`;

export const DividingLine = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 5vh 0 3vh;
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
  justify-content: flex-end;
  align-items: center;
  position: relative;

  svg {
    position: absolute;
    right: -25px;
  }
`;

export const PlacesAutocompleteGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DropdownContainer = styled.div<IDropdownContainer>`
  ${({ isActive }) =>
    isActive &&
    css`
      border: 1px solid rgba(0, 0, 0, 0.2);
    `}
`;

export const DropdownContainerLoading = styled.div`
  padding: 10px 2vw;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  color: ${({ theme }) => theme.colors.black.main};
`;

export const DropdownContainerGroup = styled.div``;

export const DropdownContainerSuggestions = styled.div<IDropdownContainer>`
  padding: 10px 2vw;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  color: ${({ theme }) => theme.colors.black.main};
  ${({ isActive }) =>
    isActive &&
    css`
      :hover {
        background-color: ${({ theme }) => theme.colors.black.opacity.low};
        cursor: pointer;
      }
    `}
`;
