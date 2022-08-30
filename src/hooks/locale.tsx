import { createContext, useCallback, useContext } from 'react';

import { useTranslation } from 'react-i18next';

interface IAppLocaleContext {
  handleChangeLocale(language: string): void;
}

const AppLocaleContext = createContext<IAppLocaleContext>(
  {} as IAppLocaleContext,
);

const AppLocaleProvider: React.FC = ({ children }) => {
  const { i18n } = useTranslation();

  const handleChangeLocale = useCallback(
    (language: string) => {
      i18n.changeLanguage(language);
    },
    [i18n],
  );

  return (
    <AppLocaleContext.Provider value={{ handleChangeLocale }}>
      {children}
    </AppLocaleContext.Provider>
  );
};

const useAppLocale = (): IAppLocaleContext => {
  const context = useContext(AppLocaleContext);

  if (!context) {
    throw new Error('useAppLocale must be used within an AppLocaleProvider');
  }

  return context;
};

export { AppLocaleProvider, useAppLocale };
