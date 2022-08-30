// ./src/routes/index.tsx
import React, { lazy, Suspense } from 'react';

import { Route, Switch } from 'react-router-dom';

import { LoadingSuspense } from '@components/index';
import { ConfigRoutes } from '@config/index';

// Pages
import {
  SignIn,
  RecoverPassword,
  Panel,
  Vehicles,
  Contracts,
  ContractNew,
  Charges,
  Called,
  CalledNew,
  CalledShow,
  Profile,
  Settings,
  Help,
  // ContractShow,
  // Notification,
  // VehicleShow,
  NotFound,
  Maintenance,
} from '@pages/index';

import PrivateRoute from './private';

const Routes: React.FC = () => (
  <Switch>
    {/* Atividades liberadas a todos */}
    <Route
      path={ConfigRoutes.rebox.publics.home.path}
      component={SignIn}
      exact
    />
    <Route
      path={ConfigRoutes.rebox.publics.signIn.path}
      component={SignIn}
      exact
    />
    <Route
      path={ConfigRoutes.rebox.publics.recoverPassword.path}
      component={RecoverPassword}
      exact
    />
    {/* <Route
      path={ConfigRoutes.rebox.publics.register.path}
      component={Register}
      exact
    /> */}

    {/* Atividades apenas para pessoal autorizado */}
    {
      <>
        <PrivateRoute
          path={ConfigRoutes.rebox.privates.panel.path}
          component={Panel}
          exact
        />
        <PrivateRoute
          path={ConfigRoutes.rebox.privates.vehicle.path}
          component={Vehicles}
          exact
        />
        <PrivateRoute
          path={ConfigRoutes.rebox.privates.contract.path}
          component={Contracts}
          exact
        />
        <PrivateRoute
          path={ConfigRoutes.rebox.privates.contract.next.new.path}
          component={ContractNew}
          exact
        />
        <PrivateRoute
          path={ConfigRoutes.rebox.privates.charge.path}
          component={Charges}
          exact
        />
        <PrivateRoute
          path={ConfigRoutes.rebox.privates.called.path}
          component={Called}
          exact
        />
        <PrivateRoute
          path={ConfigRoutes.rebox.privates.called.next.new.path}
          component={CalledNew}
          exact
        />
        <PrivateRoute
          path={ConfigRoutes.rebox.privates.called.next.drives.next.show.path}
          component={CalledShow}
          exact
        />
        <PrivateRoute
          path={ConfigRoutes.rebox.privates.profile.path}
          component={Profile}
          exact
        />
        <PrivateRoute
          path={ConfigRoutes.rebox.privates.setting.path}
          component={Settings}
          exact
        />
        <PrivateRoute
          path={ConfigRoutes.rebox.privates.help.path}
          component={Help}
          exact
        />
      </>
      /*
      <PrivateRoute
        path={ConfigRoutes.rebox.privates.contract.next.show.path}
        component={ContractShow}
        exact
      />
      <PrivateRoute
        path={ConfigRoutes.rebox.privates.called.next.show.path}
        component={CalledShow}
        exact
      />
      <PrivateRoute
        path={ConfigRoutes.rebox.privates.notification.path}
        component={Notification}
        exact
      />
      <PrivateRoute
        path={ConfigRoutes.rebox.privates.vehicle.next.show.path}
        component={VehicleShow}
        exact
      /> */
    }
    <Route path="*" component={Maintenance} />
  </Switch>
);

export default Routes;
