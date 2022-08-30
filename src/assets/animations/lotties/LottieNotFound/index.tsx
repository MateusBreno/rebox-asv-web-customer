// ./src/assets/animations/lotties/LottieNotFound/index.tsx
import React from 'react';

import Lottie from 'react-lottie';

import File from './monster.json';

interface IProps {
  isStopped?: boolean;
  isPaused?: boolean;
}

const LottieNotFound: React.FC<IProps> = ({
  children,
  isStopped,
  isPaused,
}) => {
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
      height={320}
      width={320}
      isStopped={isStopped}
      isPaused={isPaused}
    >
      {children}
    </Lottie>
  );
};

export default LottieNotFound;
