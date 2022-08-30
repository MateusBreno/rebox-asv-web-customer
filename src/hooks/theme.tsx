import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { ThemeProvider } from 'styled-components';

import { ConfigStorage } from '@config/index';

import * as themes from '../styles/themes';

export type ThemeState = 'light' | 'dark';

interface IAppThemeContext {
  currentTheme: ThemeState;
  handleChangeTheme(): void;
}

const AppThemeContext = createContext<IAppThemeContext>({} as IAppThemeContext);

const AppThemeProvider: React.FC = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeState>(() => {
    const storedTheme = localStorage.getItem(
      ConfigStorage.REBOX_SETTING_THEME,
    ) as ThemeState;

    return storedTheme ? JSON.parse(storedTheme) : 'light';
  });

  // Troca de apenas duas cores
  const handleChangeTheme = useCallback(() => {
    setCurrentTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem(
        ConfigStorage.REBOX_SETTING_THEME,
        JSON.stringify(newTheme),
      );

      return newTheme;
    });
  }, []);

  // Troca de mais de duas cores
  // const handleChangeTheme = useCallback(themeSelected => {
  //   localStorage.setItem(ConfigStorage.REBOX_SETTING_THEME, JSON.stringify(themeSelected));

  //   setCurrentTheme(themeSelected);
  // }, []);

  const value = useMemo(
    () => ({
      currentTheme,
      handleChangeTheme,
    }),
    [currentTheme, handleChangeTheme],
  );

  return (
    <AppThemeContext.Provider value={value}>
      <ThemeProvider theme={themes[currentTheme]}>{children}</ThemeProvider>
    </AppThemeContext.Provider>
  );
};

const useAppTheme = (): IAppThemeContext => {
  const context = useContext(AppThemeContext);

  if (!context) {
    throw new Error('useAppTheme must be used within an AppThemeProvider');
  }

  return context;
};

export { AppThemeProvider, useAppTheme };
