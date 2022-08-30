// ./src/components/texts/SubtitleMain/index.tsx
import React, { HTMLAttributes } from 'react';

import { IProps } from '../typing';

import { Container, Text } from './styles';

interface IPropsSubtitle extends IProps, HTMLAttributes<HTMLParagraphElement> {}

const SubtitleMain: React.FC<IPropsSubtitle> = ({
  children,
  fontSize,
  fontWeight = 600,
  opacity,
  nameColor = 'blue',
  textAlign = 'center',
}) => {
  return (
    <Container>
      <Text
        nameColor={nameColor}
        fontSize={fontSize}
        fontWeight={fontWeight}
        opacity={opacity}
        textAlign={textAlign}
      >
        {children}
      </Text>
    </Container>
  );
};

export default SubtitleMain;
