// ./src/App.tsx
import React, { Suspense } from 'react';

import { LoadScript } from '@react-google-maps/api';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import '@locales/index';
import 'react-toastify/dist/ReactToastify.css';

import { LoadingSuspense } from './components/index';
import { ConfigAuth } from './config';
import AppProvider from './hooks';
import Routes from './routes';

import { GlobalStyles } from './styles';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LoadingSuspense />}>
          <AppProvider>
            <LoadScript
              googleMapsApiKey={ConfigAuth.google.keys.maps}
              libraries={['places']}
              language="pt_BR"
            >
              <Routes />
            </LoadScript>
            <GlobalStyles />
            <Toaster />
            <ToastContainer />
          </AppProvider>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
