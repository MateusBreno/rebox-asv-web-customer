// ./src/components/cards/CardSimpleButtonSelectable/index.tsx
import React, { HTMLAttributes, useMemo } from 'react';

import { IconType } from 'react-icons';

import { Paragraph } from '@components/index';

import { Container, Group, GroupIcon } from './styles';

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
    size: number;
  };
  width?: {
    size: string;
    maxSize: string;
  };
  isSelected: boolean;
  positionContent: 'flex-start' | 'center';
  onClick(): void;
}

const CardSimpleButtonSelectable: React.FC<IProps> = ({
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
      <Group>
        <GroupIcon>
          <Icon
            size={icon.size}
            color={isSelected ? icon.colorActive : icon.colorDefault}
            opacity={icon.opacity}
          />
        </GroupIcon>
        <Paragraph
          className="card-simple-button-selectable-label-text"
          nameColor="black"
          textAlign="start"
          fontSize={label.size}
          fontWeight={600}
        >
          {label.text}
        </Paragraph>
      </Group>
    </Container>
  );
};

export default CardSimpleButtonSelectable;
