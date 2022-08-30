import React from 'react';

import { AppLocaleProvider } from './locale';
import { AppThemeProvider } from './theme';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AppLocaleProvider>
      <AppThemeProvider>{children}</AppThemeProvider>
    </AppLocaleProvider>
  );
};

export default AppProvider;
