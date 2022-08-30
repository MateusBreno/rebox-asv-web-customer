// ./src/assets/animations/lotties/LottieDots/index.tsx
import React from 'react';

import Lottie from 'react-lottie';

import File from './file.json';

interface IProps {
  isStopped?: boolean;
  isPaused?: boolean;
}

const LottieDots: React.FC<IProps> = ({ children, isStopped, isPaused }) => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: File,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }}
      height={250}
      width={250}
      isStopped={isStopped}
      isPaused={isPaused}
    >
      {children}
    </Lottie>
  );
};

export default LottieDots;
