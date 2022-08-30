// ./src/routes/private.tsx
import React, { useState, useEffect } from 'react';

import { Redirect, Route, useLocation } from 'react-router-dom';

import { ConfigRoutes, ConfigValues } from '@config/index';
import Session from '@models/Session';
import { apiRebox, sessionStorageService } from '@services/index';

interface IRoutePrivated {
  component: React.FC<any>;
  path: string;
  exact?: boolean;
}

const PrivateRoute = ({
  component: Component,
  exact = true,
  ...rest
}: IRoutePrivated) => {
  const useQuery = () => new URLSearchParams(useLocation().search);

  const [sessionId, setSessionId] = useState<string>(useQuery().get('s') || '');
  const [token, setToken] = useState<string>(useQuery().get('t') || '');
  const [authorized, setAuthorized] = useState<boolean>();

  const routeIsAuthorized = async () => {
    if (sessionId && token) {
      const { data: responseSession } = await apiRebox.get(
        `/sessions/${sessionId}`,
      );

      const session: Session = responseSession.data;

      if (
        session.type.toLowerCase() !== ConfigValues.rebox.session.type.login
      ) {
        setAuthorized(false);
      }

      if (token !== session.token) {
        setAuthorized(false);
      }

      const { data: responseUser } = await apiRebox.get(
        `/users/${session.users_id}`,
      );

      sessionStorageService.update({
        sessions_id: session.id,
        token: session.token,
        user: responseUser.data,
      });

      setAuthorized(true);
    } else {
      setAuthorized(sessionStorageService.checked());
    }
  };

  useEffect(() => {
    routeIsAuthorized();
  }, []);

  return (
    <Route
      exact={exact}
      {...rest}
      render={props =>
        authorized === true ? (
          <Component {...props} />
        ) : (
          <>
            {authorized === false ? (
              <Redirect
                to={{
                  pathname: ConfigRoutes.rebox.defaults.returnBase,
                  state: { from: props.location },
                }}
              />
            ) : (
              <></>
            )}
          </>
        )
      }
    />
  );
};

export default PrivateRoute;
