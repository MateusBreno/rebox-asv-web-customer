// ./src/assets/animations/lotties/LottieCheck/index.tsx
import React from 'react';

import Lottie from 'react-lottie';

import File from './file.json';

interface IProps {
  isStopped?: boolean;
  isPaused?: boolean;
}

const LottieCheck: React.FC<IProps> = ({ children, isStopped, isPaused }) => {
  return (
    <Lottie
      options={{
        loop: false,
        autoplay: true,
        animationData: File,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }}
      height={120}
      width={120}
      isStopped={isStopped}
      isPaused={isPaused}
    >
      {children}
    </Lottie>
  );
};

export default LottieCheck;
