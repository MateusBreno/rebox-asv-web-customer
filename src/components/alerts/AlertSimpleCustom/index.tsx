// ./src/components/alerts/AlertSimpleCustom/index.tsx
import React, { useMemo } from 'react';

import { IconType } from 'react-icons';
import {
  IoAlertCircle,
  IoCheckmarkCircle,
  IoHelpCircle,
  IoInformationCircle,
} from 'react-icons/io5';

import { Paragraph } from '@components/index';
import { ConfigStyles } from '@config/index';

import { Container, Group } from './styles';

interface IProps {
  text: string;
  type: 'danger' | 'info' | 'success' | 'warning';
}

interface IComponentOptions {
  [key: string]: {
    iconElement: IconType;
    iconColor: string;
    boxBackgroundColor: string;
    boxBorderColor: string;
  };
}

const AlertSimpleCustom: React.FC<IProps> = ({ text, type }) => {
  const {
    iconElement: Icon,
    iconColor,
    boxBorderColor,
    boxBackgroundColor,
  } = useMemo(() => {
    const { colors } = ConfigStyles.rebox;
    const component: IComponentOptions = {
      danger: {
        iconElement: IoAlertCircle,
        iconColor: colors.red.main,
        boxBackgroundColor: colors.red.opacity.veryLow,
        boxBorderColor: colors.red.opacity.low,
      },
      warning: {
        iconElement: IoInformationCircle,
        iconColor: colors.yellowRisenShine.main,
        boxBackgroundColor: colors.yellowRisenShine.opacity.veryLow,
        boxBorderColor: colors.yellowRisenShine.opacity.low,
      },
      info: {
        iconElement: IoHelpCircle,
        iconColor: colors.lightBlue.main,
        boxBackgroundColor: colors.lightBlue.opacity.veryLow,
        boxBorderColor: colors.lightBlue.opacity.low,
      },
      success: {
        iconElement: IoCheckmarkCircle,
        iconColor: colors.greenEmerald.main,
        boxBackgroundColor: colors.greenEmerald.opacity.veryLow,
        boxBorderColor: colors.greenEmerald.opacity.low,
      },
    };
    return component[type];
  }, []);
  return (
    <Container
      boxBackgroundColor={boxBackgroundColor}
      boxBorderColor={boxBorderColor}
    >
      <Group>
        <Icon color={iconColor} size={18} />
      </Group>
      <Paragraph nameColor="black" textAlign="start" fontWeight={500}>
        {text}
      </Paragraph>
    </Container>
  );
};

export default AlertSimpleCustom;
