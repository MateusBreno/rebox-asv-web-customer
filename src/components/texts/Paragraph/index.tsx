// ./src/components/texts/Paragraph/index.tsx
import React, { HTMLAttributes } from 'react';

import { IProps } from '../typing';

import { Container, Text } from './styles';

interface IPropsParagraph
  extends IProps,
    HTMLAttributes<HTMLParagraphElement> {}

const Paragraph: React.FC<IPropsParagraph> = ({
  children,
  fontSize,
  fontWeight = 400,
  opacity = 1,
  nameColor = 'blue',
  textAlign = 'center',
  ...rest
}) => {
  return (
    <Container>
      <Text
        nameColor={nameColor}
        fontSize={fontSize}
        opacity={opacity}
        textAlign={textAlign}
        fontWeight={fontWeight}
        {...rest}
      >
        {children}
      </Text>
    </Container>
  );
};

export default Paragraph;
