// ./src/components/buttons/ButtonBack/index.tsx
import React, { ButtonHTMLAttributes } from 'react';

import { Container, Text } from './styles';

type IProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  iconRight?: React.ReactSVG;
  iconLeft?: React.ReactSVG;
};

const ButtonBack: React.FC<IProps> = ({
  loading,
  iconLeft: IconLeft,
  iconRight: IconRight,
  children,
  ...rest
}) => {
  return (
    <Container {...rest}>
      {IconLeft}

      {loading ? <Text>Carregando...</Text> : <Text>{children}</Text>}

      {IconRight}
    </Container>
  );
};

export default ButtonBack;
