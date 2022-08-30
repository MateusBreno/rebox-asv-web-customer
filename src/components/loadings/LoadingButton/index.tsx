// ./src/components/loadings/LoadingButton/index.tsx
import React, { useEffect, useState } from 'react';

import { FiRefreshCw } from 'react-icons/fi';

import { Paragraph } from '@components/index';
import { ConfigStyles } from '@config/index';

import { Container } from './styles';

interface IProps {
  loading: boolean;
  color?: string;
}
const ROTATION_SIZE = 45;
const ROTATION_SPEED = 100;
const FINAL_DEGREE_OF_ROTATION = 360 - ROTATION_SIZE;

const LoadingButton: React.FC<IProps> = ({
  loading,
  color = ConfigStyles.rebox.colors.blue.main,
}) => {
  const [degree, setDegree] = useState<number>(0);

  useEffect(() => {
    const c = setTimeout(() => {
      if (degree >= FINAL_DEGREE_OF_ROTATION) {
        setDegree(0);
      } else {
        setDegree(number => number + ROTATION_SIZE);
      }
    }, ROTATION_SPEED);
    if (loading === false) clearTimeout(c);
  }, [degree]);

  return (
    <Container>
      <FiRefreshCw
        size={16}
        color={color}
        style={{ transform: `rotate(${degree}deg)` }}
      />
    </Container>
  );
};

export default LoadingButton;
