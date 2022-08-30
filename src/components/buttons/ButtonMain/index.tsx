// ./src/components/buttons/ButtonMain/index.tsx
import React, { ButtonHTMLAttributes } from 'react';

import { IconType } from 'react-icons';

import { Container, Text } from './styles';

type IProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  iconLeft?: IconType;
  iconLeftColor?: string;
  iconRight?: IconType;
  iconRightColor?: string;
  isDisable?: boolean;
};

const ButtonMain: React.FC<IProps> = ({
  loading,
  iconLeft: IconLeft,
  iconLeftColor,
  iconRight: IconRight,
  iconRightColor,
  isDisable,
  children,
  ...rest
}) => {
  return (
    <Container
      {...rest}
      justifyContent={!IconRight ? 'center' : 'space-between'}
      isDisable={isDisable}
    >
      {IconLeft && (
        <IconLeft
          size={16}
          color={iconLeftColor}
          opacity={1}
          style={{ marginRight: '5px' }}
        />
      )}

      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <Text isDisable={isDisable}>{children}</Text>
      )}

      {IconRight && (
        <IconRight
          size={16}
          color={iconRightColor}
          opacity={1}
          style={{ marginLeft: '5px' }}
        />
      )}
    </Container>
  );
};

export default ButtonMain;
