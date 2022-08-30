// ./src/components/buttons/ButtonCopy/index.tsx
import React, { HTMLAttributes } from 'react';

import { IoMdCopy } from 'react-icons/io';

import { Paragraph } from '@components/index';
import { ConfigStyles } from '@config/index';
import { hotToast } from '@utils/notifiers';

import { Container, Button } from './styles';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  textCopy: string;
  labelText?: string;
  labelSize?: number;
  labelColor?:
    | 'white'
    | 'whiteCloud'
    | 'black'
    | 'blue'
    | 'lightBlue'
    | 'red'
    | 'orange'
    | 'orangeCarrot'
    | 'gray'
    | 'purple'
    | 'greenEmerald'
    | 'greenSea'
    | 'yellowSunFlower'
    | 'yellowRisenShine';
  labelAlign?: 'start' | 'end' | 'center' | 'justify';
  labelOpacity?: number;
  iconShow?: boolean;
  iconColor?:
    | 'white'
    | 'whiteCloud'
    | 'black'
    | 'blue'
    | 'lightBlue'
    | 'red'
    | 'orange'
    | 'orangeCarrot'
    | 'gray'
    | 'purple'
    | 'greenEmerald'
    | 'greenSea'
    | 'yellowSunFlower'
    | 'yellowRisenShine';
  iconSize?: number;
  iconOpacity?: number;
}

const ButtonCopy: React.FC<IProps> = ({
  children,
  textCopy,
  labelText = '',
  labelSize = ConfigStyles.rebox.fonts.size.paragraph.large,
  labelColor = 'blue',
  labelAlign = 'start',
  labelOpacity = 1,
  iconShow = true,
  iconColor = 'blue',
  iconSize = 16,
  iconOpacity = 1,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <Button
        text={textCopy}
        onCopy={() => {
          hotToast('Copiado!', 'success');
        }}
      >
        {children ? (
          <>{children}</>
        ) : (
          <Paragraph
            id={'paragraph-btn-copy'}
            fontSize={labelSize}
            textAlign={labelAlign}
            opacity={labelOpacity}
            nameColor={labelColor}
          >
            {iconShow && (
              <IoMdCopy
                color={ConfigStyles.rebox.colors[iconColor].main}
                size={iconSize}
                opacity={iconOpacity}
              />
            )}
            {labelText}
          </Paragraph>
        )}
      </Button>
    </Container>
  );
};

export default ButtonCopy;
