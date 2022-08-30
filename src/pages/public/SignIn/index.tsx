// ./src/pages/SignIn/index.tsx
import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';

import { CardLogIn } from '@components/index';
import { ConfigRoutes } from '@config/index';
import { sessionStorageService } from '@services/index';

import { Container } from './styles';

const SignIn: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(
    sessionStorageService.checked(),
  );

  return (
    <Container>
      {loggedIn && (
        <Redirect to={ConfigRoutes.rebox.defaults.mainRedirect} exact />
      )}
      <CardLogIn />
    </Container>
  );
};

export default SignIn;
