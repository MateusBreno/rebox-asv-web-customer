// src/components/cards/CardHorizontalButtonNavigate/index.tsx
import React, { HTMLAttributes, useMemo } from 'react';

import { IconType } from 'react-icons';

import { Paragraph } from '@components/index';

import { Container, Group, GroupIcon, GroupText, Options } from './styles';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  icon: {
    element: IconType;
    colorDefault: string;
    colorHover: string;
    opacity: number;
    size: number;
  };
  label: {
    text: string;
    colorDefault: string;
    colorHover: string;
  };
  message: {
    text: string;
    colorDefault: string;
    colorHover: string;
  };
  width?: {
    size: string;
    maxSize: string;
  };
  positionContent: 'flex-start' | 'center';
  marginBottom: string;
  options?: any;
}

const CardHorizontalButtonNavigate: React.FC<IProps> = ({
  icon,
  label,
  message,
  positionContent,
  width,
  options,
  marginBottom,
  ...rest
}) => {
  const Icon = useMemo(() => icon.element, []);
  return (
    <Container
      positionContent="space-between"
      icon={{ ...icon }}
      label={{ ...label }}
      width={width}
      marginBottom={marginBottom}
      {...rest}
    >
      <Group positionContent={positionContent}>
        <GroupIcon>
          <Icon
            size={icon.size}
            color={icon.colorDefault}
            opacity={icon.opacity}
          />
        </GroupIcon>
        <GroupText>
          <Paragraph
            className="card-horizontal-button-navigate-label-text"
            nameColor="black"
            textAlign="start"
            fontWeight={600}
          >
            {label.text}
          </Paragraph>
          <Paragraph
            className="card-horizontal-button-navigate-message-text"
            nameColor="black"
            textAlign="start"
            fontWeight={400}
            opacity={0.5}
          >
            {message.text}
          </Paragraph>
        </GroupText>
      </Group>
      <Options>{options}</Options>
    </Container>
  );
};

export default CardHorizontalButtonNavigate;
