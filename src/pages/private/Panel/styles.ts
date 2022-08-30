// ./src/pages/privates/Dashboard/styles.ts
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.main`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.whiteCloud.main};
`;

export const ContainerGroup = styled.div`
  flex: 1;
  display: flex;
`;

export const Content = styled.section`
  width: 100%;
  height: calc(100vh - 65px);
  background-color: ${({ theme }) => theme.colors.whiteCloud.main};
  padding: 3vh 4vw;
  overflow-y: scroll;
`;

export const Sections = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 2vh;
  margin-top: 3vh;

  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
  }
`;

export const ButtonLink = styled(Link)`
  max-width: 250px;
`;

export const SectionsGroup = styled.div``;

export const SectionsAside = styled.div`
  @media (max-width: 960px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2vh;
  }

  @media (max-width: 540px) {
    display: flex;
    flex-direction: column;
  }
`;

export const SectionAssistance = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white.main};
  text-align: center;
  padding: 4vh 4vw;
  margin-bottom: 2vh;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  max-height: 220px;

  @media (max-width: 540px) {
    max-height: 360px;
    padding: 4vh 10vw;
  }
`;

export const SectionQuickAccess = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2vh;

  @media (max-width: 540px) {
    display: flex;
    flex-direction: column;
  }
`;

export const SectionQuickAccessLink = styled(Link)``;

export const SectionQuickAccessItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white.main};
  text-align: center;
  padding: 4vh 4vw;
  margin-bottom: 2vh;
  border-radius: 10px;
  width: 100%;
  position: relative;

  svg.iconMain {
    width: 120px;
    height: 120px;
  }

  svg.iconSecondary {
    position: absolute;
    top: 2vh;
    right: 2vh;
  }
`;

export const SectionAffiliate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white.main};
  text-align: center;
  padding: 4vh 4vw;
  margin-bottom: 2vh;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;

  @media (max-width: 540px) {
    max-width: 100%;
    padding: 4vh 10vw;
  }
`;

export const SectionAttachments = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white.main};
  text-align: center;
  padding: 4vh 4vw;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  max-height: 260px;

  @media (max-width: 540px) {
    align-items: center;
    max-width: 100%;
    padding: 4vh 10vw;
  }
`;

export const SectionAttachmentsTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2vh;

  svg {
    width: 100px;
    height: 100px;
    margin-right: 1vw;
  }
`;

export const SectionAttachmentsItems = styled.div``;

export const SectionAttachmentsLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1vh;

  svg {
    margin-right: 10px;
  }
`;
