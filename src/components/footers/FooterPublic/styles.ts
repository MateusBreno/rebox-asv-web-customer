import { Link } from 'react-router-dom';
import { EmailShareButton } from 'react-share';
import styled from 'styled-components';

export const Container = styled.footer`
  background-color: ${({ theme }) => theme.colors.whiteCloud.main};
`;

export const FooterInformations = styled.section`
  padding: 10vh 12vw 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 0 5vw;

  @media (max-width: 768px) {
    padding: 6vh 12vw 0;
    grid-template-columns: 1fr;

    > div {
      margin-bottom: 4vh;
    }
  }

  > div > p {
    color: ${({ theme }) => theme.colors.black.main};
    font-size: ${({ theme }) => theme.fonts.size.paragraph.extraLarge}px;
    font-weight: 600;
    margin-bottom: 4vh;
  }
`;

export const BoxLogotipo = styled.div``;

export const Transparency = styled.div``;

export const Partners = styled.div``;

export const Rebox = styled.div``;

export const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.black.main};
  font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  font-weight: 400;

  :hover {
    color: ${({ theme }) => theme.colors.blue.opacity.high};
  }

  > p {
    margin-bottom: 2vh;
  }
`;

export const ButtonLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.8px solid #1d1d1d;
  border-radius: 10px;
  padding: 1vh 2vw;
  margin: 0 1vw 2vh 0;
  max-width: 200px;

  @media (max-width: 768px) {
    margin-right: 2vw;
  }

  > svg {
    margin-right: 8px;
  }

  :hover {
    border: 1.8px solid rgba(29, 29, 29, 0.5);
  }
`;

export const FooterLinkModal = styled.button`
  color: ${({ theme }) => theme.colors.black.main};
  font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
  font-weight: 400;

  :hover {
    color: ${({ theme }) => theme.colors.blue.opacity.high};
  }

  > p {
    margin-bottom: 2vh;
  }
`;

export const EmailShareLink = styled(EmailShareButton)`
  > p {
    color: ${({ theme }) => theme.colors.black.main};
    font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
    font-weight: 400;

    :hover {
      color: ${({ theme }) => theme.colors.blue.opacity.high};
    }
    margin-bottom: 2vh;
  }
`;

export const FooterInternal = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6vh 12vw;

  @media (max-width: 768px) {
    padding: 2vh 12vw 6vh;
  }
`;

export const SocialMedia = styled.div`
  > div {
    display: flex;
    justify-content: center;
  }

  > p {
    color: ${({ theme }) => theme.colors.black.main};
    font-size: ${({ theme }) => theme.fonts.size.paragraph.large}px;
    font-weight: 500;
    margin-bottom: 2vh;
  }
`;

export const SocialMediaLink = styled(Link)`
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1.8px solid #1d1d1d;
    border-radius: 50%;
    padding: 10px;
    margin-right: 1vw;

    @media (max-width: 768px) {
      margin-right: 2vw;
    }

    :hover {
      border: 1.8px solid rgba(29, 29, 29, 0.5);
    }
    > svg {
      max-width: 16px;
      max-height: 16px;
    }
  }
`;

export const CompanyInformation = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 6vw;
  padding: 4vh 0 6vh;
  border-top: 1px solid rgba(29, 29, 29, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
  }

  > div > p {
    color: ${({ theme }) => theme.colors.black.main};
    font-size: ${({ theme }) => theme.fonts.size.paragraph.normal}px;
    font-weight: 500;
    margin-bottom: 1vh;
  }
`;

export const Kicode = styled.div`
  padding-bottom: 4vh;
`;
