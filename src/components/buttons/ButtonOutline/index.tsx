// ./src/components/buttons/ButtonOutline/index.tsx
import React, { ButtonHTMLAttributes } from 'react';

import { IconType } from 'react-icons';

import { LoadingButton } from '@components/index';

import { Container, Text } from './styles';

type IProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  iconRight?: IconType;
  iconLeft?: IconType;
};

const ButtonOutline: React.FC<IProps> = ({
  loading,
  iconLeft: IconLeft,
  iconRight: IconRight,
  children,
  ...rest
}) => {
  return (
    <Container
      {...rest}
      justifyContent={!IconLeft ? 'center' : 'space-between'}
    >
      {loading ? (
        <LoadingButton loading={loading} />
      ) : (
        <>
          {IconLeft && <IconLeft size={16} opacity={1} />}

          <Text
            style={{
              margin: !children
                ? '0'
                : IconLeft
                ? '0 0 0 8px'
                : IconRight
                ? '0 8px 0 0'
                : '0',
            }}
          >
            {children}
          </Text>

          {IconRight && <IconRight size={16} opacity={1} />}
        </>
      )}
    </Container>
  );
};

export default ButtonOutline;
