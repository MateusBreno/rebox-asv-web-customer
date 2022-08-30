// ./src/components/cards/CardSimpleEstimate/index.tsx
import React from 'react';

import { IconType } from 'react-icons';

import { Paragraph, TitleSecondary, LinkMain } from '@components/index';

import { Container, Group, Field } from './styles';

interface IProps {
  icon: IconType;
  iconColor: string;
  iconOpacity: number;
  iconSize: number;
  label: string;
  value: string;
  linkName: string;
  route: string;
}

const CardSimpleEstimate: React.FC<IProps> = ({
  icon: Icon,
  iconColor,
  iconOpacity,
  iconSize,
  label,
  value,
  linkName,
  route,
}) => {
  return (
    <Container>
      <Group>
        <Icon size={iconSize} color={iconColor} opacity={iconOpacity} />
        <Field>
          <Paragraph
            nameColor="gray"
            textAlign="end"
            opacity={0.6}
            fontSize={13}
            style={{ marginBottom: '1vh' }}
          >
            {label}
          </Paragraph>
          <TitleSecondary nameColor="gray" textAlign="end">
            {value}
          </TitleSecondary>
        </Field>
      </Group>
      <LinkMain justifyContent="start" route={route}>
        {linkName}
      </LinkMain>
    </Container>
  );
};

export default CardSimpleEstimate;
