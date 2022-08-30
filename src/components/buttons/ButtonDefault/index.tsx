// ./src/components/buttons/ButtonMain/index.tsx
import React, { ButtonHTMLAttributes } from 'react';

import { IconType } from 'react-icons';

import { LoadingButton } from '@components/index';
import { ConfigStyles } from '@config/index';

import { Container, Text } from './styles';

type IProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  iconLeft?: IconType;
  iconLeftColor?: string;
  iconRight?: IconType;
  iconRightColor?: string;
  isDisable?: boolean;
};

const ButtonDefault: React.FC<IProps> = ({
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
      {loading ? (
        <LoadingButton
          loading={loading}
          color={ConfigStyles.rebox.colors.black.main}
        />
      ) : (
        <>
          {IconLeft && (
            <IconLeft
              size={16}
              color={iconLeftColor || ConfigStyles.rebox.colors.black.main}
              opacity={1}
            />
          )}
          <Text
            isDisable={isDisable}
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
          {IconRight && (
            <IconRight
              size={16}
              color={iconRightColor || ConfigStyles.rebox.colors.black.main}
              opacity={1}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default ButtonDefault;
