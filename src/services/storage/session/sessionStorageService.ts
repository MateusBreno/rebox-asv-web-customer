// ./src/services/storage/session/sessionStorageService.ts
import { ConfigRules, ConfigStorage } from '@config/index';
import User from '@models/User';
import { generateDate } from '@utils/generators';
import { validatorDate } from '@utils/validators';

import { ISaveStateSession, IRemember } from './typing';

const updateRemember = (): void => {
  const [date] = generateDate.now().split(' ');
  const remember: IRemember = {
    date,
    expires_in: ConfigRules.rebox.session.limitOfDaysToExpireAccess,
  };
  localStorage.setItem(
    ConfigStorage.REBOX_SESSION_REMEMBER,
    JSON.stringify(remember),
  );
};

const validateRemember = (): boolean => {
  const remember = localStorage.getItem(ConfigStorage.REBOX_SESSION_REMEMBER);
  if (!remember) {
    return true;
  }

  const { date, expires_in }: IRemember = JSON.parse(remember);
  const daysAgo = generateDate.beforeDays(expires_in);
  if (validatorDate.hasPassed(daysAgo, date)) {
    clean();
    return false;
  }

  return true;
};

const update = ({ token, user, sessions_id }: ISaveStateSession): void => {
  const remember = localStorage.getItem(ConfigStorage.REBOX_SESSION_REMEMBER);

  if (remember) {
    localStorage.setItem(ConfigStorage.REBOX_SESSION_TOKEN, token);
    localStorage.setItem(
      ConfigStorage.REBOX_SESSION_LOGGED_IN_USER,
      JSON.stringify(user),
    );
    localStorage.setItem(ConfigStorage.REBOX_SESSION_ID, sessions_id);
  } else if (!remember || remember === null) {
    sessionStorage.setItem(ConfigStorage.REBOX_SESSION_TOKEN, token);
    sessionStorage.setItem(
      ConfigStorage.REBOX_SESSION_LOGGED_IN_USER,
      JSON.stringify(user),
    );
    sessionStorage.setItem(ConfigStorage.REBOX_SESSION_ID, sessions_id);
  }

  // apiRebox.defaults.headers.authorization = `Bearer ${token}`;
};

const checked = (): boolean => {
  if (!validateRemember()) return false;

  const existUserInLocalStorage = localStorage.getItem(
    ConfigStorage.REBOX_SESSION_TOKEN,
  );

  let token = null;
  let user = null;

  if (existUserInLocalStorage) {
    token = localStorage.getItem(ConfigStorage.REBOX_SESSION_TOKEN);
    user = localStorage.getItem(ConfigStorage.REBOX_SESSION_LOGGED_IN_USER);
  } else {
    token = sessionStorage.getItem(ConfigStorage.REBOX_SESSION_TOKEN);
    user = sessionStorage.getItem(ConfigStorage.REBOX_SESSION_LOGGED_IN_USER);
  }

  if (token && user) {
    // apiRebox.defaults.headers.authorization = `Bearer ${token}`;
    return true;
  }

  return false;
};

const getUser = (): User | null => {
  if (localStorage.getItem(ConfigStorage.REBOX_SESSION_TOKEN)) {
    return JSON.parse(
      localStorage.getItem(ConfigStorage.REBOX_SESSION_LOGGED_IN_USER) || '{}',
    );
  }

  if (sessionStorage.getItem(ConfigStorage.REBOX_SESSION_TOKEN)) {
    return JSON.parse(
      sessionStorage.getItem(ConfigStorage.REBOX_SESSION_LOGGED_IN_USER) ||
        '{}',
    );
  }

  return null;
};

const getToken = (): string | null => {
  if (localStorage.getItem(ConfigStorage.REBOX_SESSION_TOKEN)) {
    return localStorage.getItem(ConfigStorage.REBOX_SESSION_TOKEN);
  }
  return sessionStorage.getItem(ConfigStorage.REBOX_SESSION_TOKEN);
};

const getId = (): string | null => {
  if (localStorage.getItem(ConfigStorage.REBOX_SESSION_ID)) {
    return localStorage.getItem(ConfigStorage.REBOX_SESSION_ID);
  }
  return sessionStorage.getItem(ConfigStorage.REBOX_SESSION_ID);
};

const clean = (): void => {
  localStorage.removeItem(ConfigStorage.REBOX_SESSION_REMEMBER);
  localStorage.removeItem(ConfigStorage.REBOX_SESSION_ID);
  localStorage.removeItem(ConfigStorage.REBOX_SESSION_LOGGED_IN_USER);
  localStorage.removeItem(ConfigStorage.REBOX_SESSION_TOKEN);
  sessionStorage.removeItem(ConfigStorage.REBOX_SESSION_REMEMBER);
  sessionStorage.removeItem(ConfigStorage.REBOX_SESSION_ID);
  sessionStorage.removeItem(ConfigStorage.REBOX_SESSION_LOGGED_IN_USER);
  sessionStorage.removeItem(ConfigStorage.REBOX_SESSION_TOKEN);
};

export default {
  update,
  checked,
  getUser,
  getToken,
  getId,
  clean,
  updateRemember,
  validateRemember,
};
