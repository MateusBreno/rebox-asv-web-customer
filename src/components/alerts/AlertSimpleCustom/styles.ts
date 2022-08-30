// ./src/components/alerts/AlertSimpleCustom/styles.ts
import styled from 'styled-components';

interface IProps {
  boxBackgroundColor: string;
  boxBorderColor: string;
}

export const Container = styled.div<IProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 2vh 0;
  padding: 3vh 3vw;
  background-color: ${({ boxBackgroundColor }) => boxBackgroundColor};
  border: 1px solid ${({ boxBorderColor }) => boxBorderColor};
  border-radius: 8px;
`;

export const Group = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;
