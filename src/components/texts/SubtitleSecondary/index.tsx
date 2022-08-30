// ./src/components/texts/SubtitleSecondary/index.tsx
import React, { HTMLAttributes } from 'react';

import { IProps } from '../typing';

import { Container, Text } from './styles';

interface IPropsSubtitle extends IProps, HTMLAttributes<HTMLParagraphElement> {}

const SubtitleSecondary: React.FC<IPropsSubtitle> = ({
  children,
  fontSize,
  fontWeight = 600,
  opacity,
  nameColor = 'blue',
  textAlign = 'center',
  ...rest
}) => {
  return (
    <Container>
      <Text
        nameColor={nameColor}
        fontSize={fontSize}
        fontWeight={fontWeight}
        opacity={opacity}
        textAlign={textAlign}
        {...rest}
      >
        {children}
      </Text>
    </Container>
  );
};

export default SubtitleSecondary;
