import React, { createContext, useCallback, useContext, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { apiRebox, sessionStorageService } from '@services/index';

interface IAuthState {
  token: string;
  user: any;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: {
    name: string;
    email: string;
  };

  signIn(credential: ISignInCredentials): Promise<void>;
  updateUser(): void;
  signOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const signIn = useCallback(async ({ email, password }) => {
    try {
      setLoading(prevState => !prevState);

      const { data: session } = await apiRebox.post('/sessions', {
        email,
        password,
      });

      const { user, token, id } = session.data;

      // apiRebox.defaults.headers.authorization = `Bearer ${token}`;

      sessionStorageService.update({
        user,
        token,
        sessions_id: id,
      });

      return session;
    } catch (error) {
      console.error('Houve um problema ao tentar efetuar o login: ', error);
    } finally {
      setLoading(prevState => !prevState);
    }
  }, []);

  return <div />;
};

export default AuthProvider;
