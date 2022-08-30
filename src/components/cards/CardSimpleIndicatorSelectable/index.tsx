// ./src/components/cards/CardSimpleIndicatorSelectable/index.tsx
import React, { HTMLAttributes, useMemo } from 'react';

import { IconType } from 'react-icons';

import { Paragraph } from '@components/index';

import { Container, Group } from './styles';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  icon: {
    element: IconType;
    colorDefault: string;
    colorActive: string;
    opacity: number;
    size: number;
  };
  label: {
    text: string;
    colorDefault: string;
    colorActive: string;
  };
  width?: {
    size: string;
    maxSize: string;
  };
  isSelected: boolean;
  positionContent: 'flex-start' | 'center';
  onClick(): void;
}

const CardSimpleIndicatorSelectable: React.FC<IProps> = ({
  icon,
  label,
  onClick,
  isSelected,
  positionContent,
  width,
  ...rest
}) => {
  const Icon = useMemo(() => icon.element, []);
  return (
    <Container
      onClick={onClick}
      isSelected={isSelected}
      positionContent={positionContent}
      icon={{ ...icon }}
      label={{ ...label }}
      width={width}
      {...rest}
    >
      <Group isSelected={isSelected}>
        <Icon
          size={icon.size}
          color={isSelected ? icon.colorActive : icon.colorDefault}
          opacity={icon.opacity}
        />
      </Group>
      <Paragraph nameColor="black" textAlign="center" fontWeight={500}>
        {label.text}
      </Paragraph>
    </Container>
  );
};

export default CardSimpleIndicatorSelectable;
