// ./src/components/loadings/LoadingList/index.tsx
import React from 'react';

import { SyncLoader } from 'react-spinners';

import { ConfigStyles } from '@config/index';

import { Container } from './styles';

interface IProps {
  loading: boolean;
}

const LoadingList: React.FC<IProps> = ({ loading }) => {
  return (
    <Container>
      <SyncLoader
        color={ConfigStyles.rebox.colors.blue.main}
        loading={loading}
        size={10}
      />
    </Container>
  );
};

export default LoadingList;
